import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-[#B08D57]">DokoBook</h1>
      <p className="text-gray-500 mt-2 max-w-md">
        Booking, invoicing, and automatic reminders — built for local
        service businesses in Nepal.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/signup"
          className="bg-[#B08D57] text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Get started
        </Link>
        <Link
          href="/login"
          className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Log in
        </Link>
      </div>
    </main>
  )
}