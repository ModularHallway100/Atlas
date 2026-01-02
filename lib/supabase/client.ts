import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types'

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        return {
            from: () => ({
                select: () => ({
                    eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
                    order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) })
                }),
                insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
                update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) })
            }),
            auth: {
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                signInWithOtp: () => Promise.resolve({ error: null })
            }
        } as any
    }

    return createBrowserClient<Database>(url, key)
}
