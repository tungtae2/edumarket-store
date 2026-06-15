"use server";

import { Resend } from "resend";
import OrderApprovedEmail from "@/components/emails/OrderApprovedEmail";
import React from "react";

// Use API key if provided, else it will fail gracefully later
const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function sendOrderApprovedEmail(
  customerEmail: string,
  customerName: string,
  orderId: string,
  downloadLink: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Mocking email delivery to:", customerEmail);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: "Edumarket <noreply@yourdomain.com>", // You must verify your domain in Resend
      to: [customerEmail],
      subject: "🎉 คำสั่งซื้อของคุณได้รับการอนุมัติแล้ว!",
      react: React.createElement(OrderApprovedEmail, {
        customerName,
        orderId,
        downloadLink,
      }),
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
