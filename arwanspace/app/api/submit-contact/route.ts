import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, telegram_username, message, source } = body;

    // 1. Save to Supabase DB
    const supabase = await createClient();

    // We try to insert, but don't fail completely if DB is not setup locally for testing
    try {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name,
          email,
          telegram_username,
          message,
          source: source || 'form'
        }]);

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        // Continue to telegram even if DB fails during local dev without tables
      }
    } catch (e) {
      console.error("Supabase connection error:", e);
    }

    // 2. Send to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log("Telegram not configured. Skipping Telegram notification.");
      return NextResponse.json({ success: true, warning: "Telegram not configured" });
    }

    const telegramText = `📩 *Pesan Baru dari ${source || 'form'}*\n\n*Nama:* ${name}\n*Email:* ${email}\n*Telegram:* @${telegram_username || '-'}\n*Pesan:*\n${message}`;

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const tgResponse = await fetch(tgUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: 'Markdown'
      }),
    });

    if (!tgResponse.ok) {
      console.error("Telegram API Error:", await tgResponse.text());
      // Don't fail the client request if just telegram fails
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Submit Contact Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
