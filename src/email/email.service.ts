import { Injectable } from '@nestjs/common';
import { AzureKeyCredential } from '@azure/core-auth';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';
import { sendEmailInput } from './dto/sendEmail.dto';

@Injectable()
export class EmailService {
  key = new AzureKeyCredential(process.env.AZURE_KEY_CREDENTIAL);
  endpoint = process.env.AZURE_EMAIL_ENDPOINT;

  emailClient = new EmailClient(this.endpoint, this.key);

  async sendEmail(input: sendEmailInput) {
    try {
      const message = {
        senderAddress:
          '<donotreply@70774841-5825-4eda-b030-c428a2860af2.azurecomm.net>',
        content: {
          subject: input.subject,
          plainText: input.plainText
        },
        recipients: {
          to: [
            {
              address: input.address,
              displayName: 'Customer Name'
            }
          ]
        }
      };

      const poller = await this.emailClient.beginSend(message);

      if (!poller.getOperationState().isStarted)
        throw 'Poller was not started.';

      let timeElapsed = 0;
      while (!poller.isDone()) {
        poller.poll();

        await new Promise(resolve =>
          setTimeout(resolve, Number(process.env.POLLER_WAIT_TIME) * 1000)
        );
        timeElapsed += 10;

        if (timeElapsed > 18 * Number(process.env.POLLER_WAIT_TIME))
          throw 'Polling timed out.';
      }

      if (poller.getResult().status === KnownEmailSendStatus.Succeeded)
        return {
          result_code: 'send.email_success',
          action: `Successfully sent the email (operation id: ${
            poller.getResult().id
          })`
        };
    } catch (e) {
      console.error(e);
      return {
        result_code: 'send.email_fail',
        action: 'Failed sent the email'
      };
    }
  }
}
