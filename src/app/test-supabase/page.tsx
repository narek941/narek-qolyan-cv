import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Note: This assumes a 'todos' table exists. 
  // You might need to change 'todos' to 'jobs' or another table you have.
  const { data: items, error } = await supabase.from('todos').select()

  return (
    <div className="p-20 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-black mb-8">Supabase Test</h1>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <ul className="space-y-4">
        {items?.map((item: any) => (
          <li key={item.id} className="p-4 bg-zinc-900 rounded-xl border border-white/10">
            {item.name || item.title || JSON.stringify(item)}
          </li>
        )) || <p className="text-white/50">No data found in 'todos' table.</p>}
      </ul>
    </div>
  )
}
