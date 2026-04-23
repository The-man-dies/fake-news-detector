// infrastructure/adapters/EmailAdapter.ts

import { IEmailService } from '../../domain/interfaces/IEmailService'

export class EmailAdapter implements IEmailService {
  async send(to: string, subject: string, body: string): Promise<void> {
    // Implémentation avec Nodemailer ou SendGrid
    console.log(`Sending email to ${to}: ${subject}`)
  }

  async sendBulk(
    recipients: string[],
    subject: string,
    body: string,
  ): Promise<void> {
    // Implémentation bulk
    for (const recipient of recipients) {
      await this.send(recipient, subject, body)
    }
  }
}
