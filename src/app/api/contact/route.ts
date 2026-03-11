import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { location, distance, perches, estimatedValue, name, email, phone } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chathumiewmini01@gmail.com",
        // FIX: Point to the variable name in your .env.local file
        pass: process.env.EMAIL_APP_PASSWORD, 
      },
    });

    const mailOptions = {
      from: "chathumiewmini01@gmail.com",
      to: "chathumiewmini01@gmail.com",
      replyTo: email,
      subject: `New Survey Request: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #3D2B1F; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Survey Inquiry</h1>
          </div>
          <div style="padding: 20px; color: #333;">
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <h3 style="color: #3D2B1F;">Property Details</h3>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Distance:</strong> ${distance}</p>
            <p><strong>Perches:</strong> ${perches}</p>
            <p><strong>User Estimate:</strong> ${estimatedValue}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}