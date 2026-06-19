import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Create a Supabase client with the service role key for webhook inserts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    // 1. Authenticate the request via x-api-key
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey || apiKey !== process.env.TRADING_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse payload
    const body = await req.json();
    const { pair, signal_type, price, confidence, description, detail_line, execution_status } = body;

    // 3. Basic validation
    if (!pair || !signal_type) {
      return NextResponse.json({ error: 'Missing pair or signal_type' }, { status: 400 });
    }

    // 4. Insert into database using admin client (bypassing RLS for webhook)
    const { data, error } = await supabaseAdmin
      .from('trade_signals')
      .insert([
        {
          pair,
          signal_type,
          price: price || 0,
          confidence: confidence || 0,
          description: description || '',
          detail_line: detail_line || null,
          execution_status: execution_status || 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Signal created successfully', data }, { status: 201 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get('limit');

    // Create an authenticated client to check session
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            // Read-only in GET handlers
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const isDashboard = !!session;

    // Fetch signals
    let query = supabaseAdmin.from('trade_signals').select('*').order('timestamp', { ascending: false });

    if (!isDashboard || limit) {
       // Public preview: default to 5
       query = query.limit(limit ? parseInt(limit, 10) : 5);
    } else {
       // Dashboard: fetch more (e.g. 50 or today's signals)
       // For MVP we just fetch the last 20
       query = query.limit(20);
    }

    const { data, error } = await query;

    if (error) {
      // Mock data if table not exists yet
      return NextResponse.json(getMockSignals());
    }

    if (!data || data.length === 0) {
        return NextResponse.json(getMockSignals());
    }

    return NextResponse.json(data);
  } catch (error) {
    // Fallback to mock data
    return NextResponse.json(getMockSignals());
  }
}

function getMockSignals() {
  return [
    {
      id: 'mock-1',
      pair: 'BTC/USD',
      signal_type: 'buy',
      price: 68500.50,
      confidence: 0.87,
      description: 'EMA cross + RSI oversold',
      timestamp: new Date().toISOString(),
      execution_status: 'sent_to_mt5',
      detail_line: [
        { time: '09:00', value: 68000 },
        { time: '09:30', value: 68200 },
        { time: '10:00', value: 68500 }
      ]
    },
    {
      id: 'mock-2',
      pair: 'EUR/USD',
      signal_type: 'sell',
      price: 1.0850,
      confidence: 0.92,
      description: 'Resistance rejection',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      execution_status: 'closed',
      detail_line: [
        { time: '08:00', value: 1.0820 },
        { time: '08:30', value: 1.0860 },
        { time: '09:00', value: 1.0850 }
      ]
    }
  ];
}
