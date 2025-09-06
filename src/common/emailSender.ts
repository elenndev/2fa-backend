import { Resend } from 'resend';

export async function sendEmail(email: string, content: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Validation Pin!',
    html: `<p>${content}</p>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log(data)
}
