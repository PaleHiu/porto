import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  budget?: string;
}

/**
 * Kirim pesan kontak ke Supabase atau simpan secara aman di fallback storage jika belum ada key
 */
export async function submitInquiry(data: ContactSubmission): Promise<{ success: boolean; message: string; isSimulated: boolean }> {
  try {
    if (supabase) {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject || 'Portfolio Inquiry',
          message: data.message,
          budget: data.budget || 'Not specified',
          created_at: new Date().toISOString(),
        }
      ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        success: true,
        message: 'Message delivered successfully to database! I will reply within 24 hours.',
        isSimulated: false
      };
    } else {
      // Local fallback simulator for effortless testing before Supabase keys are provided
      const existing = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
      existing.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem('portfolio_inquiries', JSON.stringify(existing));

      // Simulate network latency
      await new Promise(r => setTimeout(r, 600));

      return {
        success: true,
        message: 'Message received! (Operating in preview mode — fully ready for your Supabase keys).',
        isSimulated: true
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to send message. Please contact via WhatsApp or Email.';
    return {
      success: false,
      message: errorMsg,
      isSimulated: false
    };
  }
}
