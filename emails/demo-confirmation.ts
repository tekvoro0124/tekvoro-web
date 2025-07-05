interface EmailParams {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
}

export default function ({ name, email, company, phone, message }: EmailParams) {
  return {
    subject: `New Demo Booking from ${name}`,
    body: `
📩 New Demo Booked!

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
${message ? `Message: ${message}` : ''}

Please follow up to schedule their demo and share further details.

---
Sent from Tekvoro Website
    `.trim(),
  };
} 