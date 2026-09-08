'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/onboarding')
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSignup}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        Create your account
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#B08D57] text-white rounded-lg py-2 font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Sign up'}
      </button>

      <p className="text-sm text-center text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-[#2DD4BF] font-medium">
          Log in
        </Link>
      </p>
    </form>
  )
}