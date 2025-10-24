import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contactMode, email, message } = body;

    // Basic validation
    if (!name || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const to = 'info@objecttecnologies.app';
    const subject = `New project inquiry from ${name}`;
    const text = `Name: ${name}\nContact mode: ${contactMode}\nEmail: ${email || 'N/A'}\n\nMessage:\n${message}`;

    // Use SMTP if configured
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined;

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port: port || 587,
        secure: !!(port === 465),
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `Object Technologies <${user}>`,
        to,
        subject,
        text,
        replyTo: email || undefined,
      });

      return new Response(JSON.stringify({ message: 'Message sent' }), { status: 200 });
    }

    // If SMTP not configured, log and return 202
    console.log('Contact form submission (no SMTP configured):', { name, contactMode, email, message });
    return new Response(JSON.stringify({ message: 'Received (no SMTP configured). Check server logs.' }), { status: 202 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), { status: 500 });
  }
}
