import Table from '@/app/ui/table';
import { getProducts, getQuoteDetails } from '@/lib/fetches';

export default async function Home(props: { params: Promise<{ id: string }> }) {
  const param = await props.params
  const product_data = await getProducts(param.id);
  const product_columns = Object.keys(product_data[0])

  const quote_data = await getQuoteDetails(param.id);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-5 px-5 bg-whit sm:items-start">
        <h2 className="text-3xl mb-4 uppercase">Products for {param.id}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-3">
          {Object.keys(quote_data).map((key) => (
            <div
              key={key}
              className="
                bg-white
                border border-gray-200
                rounded-xl
                p-4
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-(--primary) mb-1">
                {key}
              </p>

              <p className="text-gray-900 text-sm break-words">
                {quote_data[key]}
              </p>
            </div>
          ))}
        </div>
        <Table columns={product_columns} rows={product_data}></Table>
      </main>
    </div>
  );
}
