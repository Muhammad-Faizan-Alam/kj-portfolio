import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  platform: string;
  budget: string;
  timeline: string;
  message: string;
  htmlContent: string;
  plainText: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get secure environment variables (server-side only)
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpSecure = process.env.SMTP_SECURE === "true" || false;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO;
    const emailServiceUrl =
      process.env.EMAIL_SERVICE_URL ||
      "https://email-service-module.vercel.app/api/email/send";

    // Validate required environment variables
    if (!smtpUser || !smtpPass || !emailTo) {
      console.error("Missing SMTP configuration environment variables");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    // Call the external email service with secure credentials (server-to-server)
    const emailResponse = await fetch(emailServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        smtpConfig: {
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          user: smtpUser,
          pass: smtpPass,
        },
        to: emailTo,
        subject: `New portfolio inquiry — ${body.projectType || "General"} from ${body.name}`,
        text: body.plainText,
        html: body.htmlContent,
        from: body.email,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Email service error:", errorText);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: emailResponse.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
