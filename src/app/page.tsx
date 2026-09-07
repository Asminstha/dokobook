import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('businesses').select('*')

  return (
    <main style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>DokoBook — Supabase Connection Test</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error.message}</p>
      ) : (
        <p style={{ color: 'green' }}>
          ✅ Connected successfully. Found {data?.length ?? 0} businesses (expected: 0, since no one has signed up yet).
        </p>
      )}
    </main>
  )
}