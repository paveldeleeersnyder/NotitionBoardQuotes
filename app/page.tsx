import Table from '@/app/ui/table';
import { getQuotes } from '@/lib/fetches';

export default async function Home() {
  const quote_data = await getQuotes();

  quote_data.forEach(q => {
    q.link = `/quotes/${q.id}`
  })

  const quote_columns = Object.keys(quote_data[0])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-5 px-5 bg-whit sm:items-start">
        <h2 className="text-3xl mb-4 uppercase">Quotes</h2>
        <Table columns={quote_columns} rows={quote_data}></Table>
      </main>
    </div>
  );
}
