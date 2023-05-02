import { AzureKeyCredential } from '@azure/core-auth';
import { EmailClient } from '@azure/communication-email';
import { sendEmailInput } from './dto/sendEmail.dto';
export declare class EmailService {
    key: AzureKeyCredential;
    endpoint: string;
    emailClient: EmailClient;
    sendEmail(input: sendEmailInput): Promise<{
        result_code: string;
        action: string;
    }>;
}
