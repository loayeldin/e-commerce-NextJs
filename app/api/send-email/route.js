

import { Resend } from "resend";
import { EmailTemplate } from "../../_components/email-template";


export async function POST(req) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resend = new Resend(resendApiKey);


  const body = await req.json();

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [body.email],
      subject: "order submitted",
      react: EmailTemplate({ body }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}