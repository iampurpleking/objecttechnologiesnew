import nodemailer from "nodemailer";

type ContactMode = "email" | "call" | "whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const contactMode = String(body.contactMode || "").trim() as ContactMode;
    const email = body.email ? String(body.email || "").trim() : "";
    const phone = body.phone ? String(body.phone || "").trim() : "";
    const message = body.message ? String(body.message || "").trim() : "";

    // Basic validation
    if (!name) {
      return new Response(
        JSON.stringify({ error: "Missing required field: name" }),
        { status: 400 },
      );
    }

    if (!["email", "call", "whatsapp"].includes(contactMode)) {
      return new Response(JSON.stringify({ error: "Invalid contact mode" }), {
        status: 400,
      });
    }

    // Mode-specific validations
    if (contactMode === "email") {
      if (!email) {
        return new Response(
          JSON.stringify({
            error: "Email address is required for email contact mode",
          }),
          { status: 400 },
        );
      }
      if (!message) {
        return new Response(
          JSON.stringify({
            error: "Message is required for email contact mode",
          }),
          { status: 400 },
        );
      }
    }

    if (contactMode === "call") {
      if (!phone) {
        return new Response(
          JSON.stringify({
            error: "Phone number is required for call contact mode",
          }),
          { status: 400 },
        );
      }
    }

    // Build email content for internal notification
    const to = "info@objecttecnologies.app";
    const subject = `New contact request (${contactMode}) from ${name}`;
    let text = `Name: ${name}\nContact mode: ${contactMode}\nEmail: ${email || "N/A"}\nPhone: ${phone || "N/A"}\n\n`;

    if (contactMode === "email") {
      text += `User message:\n${message}\n\n`;
    } else if (contactMode === "call") {
      // Per requirement, include a call message note
      text += `Request: Please call the user at the phone number above. Our agents will call them in a few minutes.\n\n`;
      if (message) {
        text += `Additional message from user:\n${message}\n\n`;
      }
    } else if (contactMode === "whatsapp") {
      // Inform internal team that user opted for WhatsApp and include the quick link
      text += `User opted for WhatsApp contact.\n`;
      text += `Quick WhatsApp link: https://wa.me/message/7AURUA4G6E65N1\n\n`;
      if (phone) {
        text += `Phone provided: ${phone}\n\n`;
      }
      if (message) {
        text += `User message:\n${message}\n\n`;
      }
    }

    // Prepare SMTP transport if configured
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = process.env.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT, 10)
      : undefined;

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port: port || 587,
        secure: !!(port === 465),
        auth: { user, pass },
      });

      // Build mail options
      const mailOptions: any = {
        from: `Object Technologies <${user}>`,
        to,
        subject,
        text,
      };

      // If the user provided an email, set reply-to so agents can reply directly
      if (email) {
        mailOptions.replyTo = email;
      }

      await transporter.sendMail(mailOptions);

      return new Response(JSON.stringify({ message: "Notification sent" }), {
        status: 200,
      });
    }

    // If SMTP not configured, log the payload for manual handling
    console.log("Contact submission (no SMTP configured):", {
      name,
      contactMode,
      email,
      phone,
      message,
    });
    return new Response(
      JSON.stringify({
        message: "Received (no SMTP configured). Check server logs.",
      }),
      { status: 202 },
    );
  } catch (err: any) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ error: err?.message || "Server error" }),
      { status: 500 },
    );
  }
}
