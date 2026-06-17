import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Mock response if API key is missing
      console.log("Mock AI Response Triggered (Missing GEMINI_API_KEY)");
      return NextResponse.json({
        reply: "👋 Hai! Saya AI Companion Arwan'space. Saat ini masih dalam mode demo (API Key belum di-setup). Tim kami akan segera merespons pertanyaan Anda. Jika Anda ingin meminta penawaran, ketik 'minta penawaran' atau isi form kontak di sebelah."
      });
    }

    const systemPrompt = "Kamu adalah AI asisten untuk Arwan'space, platform personal branding dan layanan digital. Jelaskan layanan: web design, online invitation, personal portfolio, SaaS UMKM, aplikasi edukasi, keuangan, home tools, dan konsultasi. Jika pengguna ingin penawaran, arahkan untuk mengisi form kontak.";

    // Format history for Gemini API
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Add current message
    formattedHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          role: "system",
          parts: [{ text: systemPrompt }]
        },
        contents: formattedHistory,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Gemini API Error:", errData);
      throw new Error('Failed to fetch from Gemini API');
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";

    return NextResponse.json({ reply: replyText });

  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
