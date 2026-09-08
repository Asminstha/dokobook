import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_user_id', user.id)
    .single()

  if (!business) {
    redirect('/onboarding')
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] p-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {business.name}
      </h1>
      <p className="text-gray-500 mt-2">
        Your dashboard is coming together in the next step — bookings,
        clients, services, and invoices are next.
      </p>
    </main>
  )
}