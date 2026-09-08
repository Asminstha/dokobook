'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export default function OnboardingPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('salon')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleCreateBusiness(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in.')
      setLoading(false)
      return
    }

    const baseSlug = slugify(name)
    // Add a short random suffix so two businesses with the same name
    // don't collide on the same public URL
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`

    const { error: insertError } = await supabase.from('businesses').insert({
      name,
      slug,
      phone,
      category,
      owner_user_id: user.id,
    })

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <form
        onSubmit={handleCreateBusiness}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-4"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Tell us about your business
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            This takes less than a minute.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sunita's Salon"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone number
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98XXXXXXXX"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business type
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
          >
            <option value="salon">Salon / Spa</option>
            <option value="clinic">Clinic</option>
            <option value="tutor">Tutor / Tuition Center</option>
            <option value="gym">Gym</option>
            <option value="other">Other</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#B08D57] text-white rounded-lg py-2 font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Setting up...' : 'Continue to dashboard'}
        </button>
      </form>
    </main>
  )
}