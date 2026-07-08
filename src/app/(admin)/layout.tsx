import Link from "next/link";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 border-r bg-slate-900 text-white p-6">
        <h1 className="mb-8 text-xl font-bold">
          Payment Gateway
        </h1>

        <nav className="space-y-2">
            <Link href="/dashboard" className="block rounded px-3 py-2 hover:bg-slate-700">
                Dashboard
            </Link>

            <Link href="/products" className="block rounded px-3 py-2 hover:bg-slate-700">
                Product Mapping
            </Link>

            <Link href="/orders" className="block rounded px-3 py-2 hover:bg-slate-700">
                Orders
            </Link>

            <Link href="/api-logs" className="block rounded px-3 py-2 hover:bg-slate-700">
                API Logs
            </Link>

            <Link href="/payment-logs" className="block rounded px-3 py-2 hover:bg-slate-700">
                Payment Logs
            </Link>

            <Link href="/issues" className="block rounded px-3 py-2 hover:bg-slate-700">
                Issues
            </Link>

            <Link href="/users" className="block rounded px-3 py-2 hover:bg-slate-700">
                Users
            </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-slate-100">

        <header className="border-b bg-white px-8 py-4 shadow-sm">
          <h2 className="text-xl font-semibold">
            Admin Dashboard
          </h2>
        </header>

        <section className="p-8">
          {children}
        </section>

      </main>

    </div>
  );
}