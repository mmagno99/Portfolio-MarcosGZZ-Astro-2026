import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { handleQuote } from '../../features/quote/server.mjs';
export const prerender = false;
export const POST: APIRoute = async ({ request, clientAddress }) => {
  const env = {
    BREVO_SMTP_USER:
      process.env.BREVO_SMTP_USER ?? import.meta.env.BREVO_SMTP_USER,
    BREVO_SMTP_PASS:
      process.env.BREVO_SMTP_PASS ?? import.meta.env.BREVO_SMTP_PASS,
    QUOTE_MAIL_FROM:
      process.env.QUOTE_MAIL_FROM ?? import.meta.env.QUOTE_MAIL_FROM,
    QUOTE_MAIL_TO: process.env.QUOTE_MAIL_TO ?? import.meta.env.QUOTE_MAIL_TO,
  };
  return handleQuote(request, {
    env,
    ip: clientAddress,
    send: async (
      message: Parameters<
        ReturnType<typeof nodemailer.createTransport>['sendMail']
      >[0],
    ) => {
      const transport = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: { user: env.BREVO_SMTP_USER, pass: env.BREVO_SMTP_PASS },
        connectionTimeout: 8000,
        dnsTimeout: 5000,
        greetingTimeout: 8000,
        socketTimeout: 12000,
      });
      try {
        await transport.sendMail(message);
      } catch (error) {
        const failure = error as { code?: string; responseCode?: number };
        // Keep credentials, recipients and message content out of server logs.
        console.error('Quote SMTP failure', {
          code: failure.code,
          responseCode: failure.responseCode,
          reason:
            failure.responseCode === 525 ? 'unauthorized_ip' : 'send_failed',
        });
        throw error;
      } finally {
        transport.close();
      }
    },
  });
};
