import Table from '@/app/ui/table';
import { getProducts, getQuoteDetails } from '@/lib/fetches';

export default async function Home(props: { params: Promise<{ id: string }> }) {
  const param = await props.params
  const product_data = await getProducts(param.id);
  const product_columns = Object.keys(product_data[0])

  const quote_data = await getQuoteDetails(param.id);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-10 px-5 bg-whit sm:items-start">
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <h2 className="text-xl mb-4">Products for {param.id}</h2>
        <div className="flex flex-row flex-wrap">
        {Object.keys(quote_data).map((key) => (
          <div key={key} className='p-2'>
            <p className='font-bold'>{key}</p>
            <p>{quote_data[key]}</p>
          </div>
        ))}
      </div>
        <Table columns={product_columns} rows={product_data}></Table>
      </main>
    </div>
  );
}
