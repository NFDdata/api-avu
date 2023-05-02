"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const core_auth_1 = require("@azure/core-auth");
const communication_email_1 = require("@azure/communication-email");
let EmailService = class EmailService {
    constructor() {
        this.key = new core_auth_1.AzureKeyCredential(process.env.AZURE_KEY_CREDENTIAL);
        this.endpoint = process.env.AZURE_EMAIL_ENDPOINT;
        this.emailClient = new communication_email_1.EmailClient(this.endpoint, this.key);
    }
    async sendEmail(input) {
        try {
            const message = {
                senderAddress: '<donotreply@70774841-5825-4eda-b030-c428a2860af2.azurecomm.net>',
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
                await new Promise(resolve => setTimeout(resolve, Number(process.env.POLLER_WAIT_TIME) * 1000));
                timeElapsed += 10;
                if (timeElapsed > 18 * Number(process.env.POLLER_WAIT_TIME))
                    throw 'Polling timed out.';
            }
            if (poller.getResult().status === communication_email_1.KnownEmailSendStatus.Succeeded)
                return {
                    result_code: 'send.email_success',
                    action: `Successfully sent the email (operation id: ${poller.getResult().id})`
                };
        }
        catch (e) {
            console.error(e);
            return {
                result_code: 'send.email_fail',
                action: 'Failed sent the email'
            };
        }
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map