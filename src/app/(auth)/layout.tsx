export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#B08D57]">DokoBook</h1>
          <p className="text-sm text-gray-500 mt-1">by DokoByte Digital</p>
        </div>
        {children}
      </div>
    </div>
  )
}