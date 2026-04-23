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
    await Promise.all(
      recipients.map((recipients) => this.send(recipients, subject, body)),
    )
  }
}
