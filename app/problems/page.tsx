import Table from '@/app/ui/table';
import { getUnprocessable } from '@/lib/fetches';

export default async function Home() {
  const unprocessable_data = await getUnprocessable();
  const unprocessable_columns = Object.keys(unprocessable_data[0])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-5 px-5 bg-whit sm:items-start">
        <h2 className="text-3xl mb-4 uppercase">Failed Quotes</h2>
        <Table columns={unprocessable_columns} rows={unprocessable_data}></Table>
      </main>
    </div>
  );
}
