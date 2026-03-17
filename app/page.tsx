import Table from '@/app/ui/table';
import { getQuotes, getTotalAmountOfQuotes } from '@/lib/fetches';
import Pagination from '@/app/ui/pagination';

const QUOTES_PER_PAGE = 50;

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const amountOfQuotes = await getTotalAmountOfQuotes();

  const quoteData = await getQuotes(currentPage);

  quoteData.forEach(q => {
    q.link = `/quotes/${q.id}`
  })

  const quote_columns = Object.keys(quoteData[0])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-5 px-5 bg-whit sm:items-start">
        <h2 className="text-3xl mb-4 uppercase">Quotes ({amountOfQuotes})</h2>
        <Table columns={quote_columns} rows={quoteData}></Table>
      </main>
      <Pagination totalPages={Math.ceil(amountOfQuotes / QUOTES_PER_PAGE)}/>
    </div>
  );
}
