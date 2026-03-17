import Table from '@/app/ui/table';
import { getUnprocessable, getTotalUnprocessableQuotes } from '@/lib/fetches';
import Pagination from '@/app/ui/pagination';

const QUOTES_PER_PAGE = 50;

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const amountOfQuotes = await getTotalUnprocessableQuotes();

  const unprocessable_data = await getUnprocessable(currentPage);
  const unprocessable_columns = Object.keys(unprocessable_data[0])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-5 px-5 bg-whit sm:items-start">
        <h2 className="text-3xl mb-4 uppercase">Failed Quotes ({unprocessable_data.length})</h2>
        <Table columns={unprocessable_columns} rows={unprocessable_data}></Table>
      </main>
      <Pagination totalPages={Math.ceil(amountOfQuotes / QUOTES_PER_PAGE)}/>
    </div>
  );
}
