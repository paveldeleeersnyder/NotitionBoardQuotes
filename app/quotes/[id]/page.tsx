import Table from '@/app/ui/table';
import { getProducts } from '@/lib/fetches';

export default async function Home(props: { params: Promise<{ id: string }> }) {
  const param = await props.params
  const product_data = await getProducts(param.id);
  const product_columns = Object.keys(product_data[0])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-10 px-5 bg-whit sm:items-start">
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <h2 className="text-xl mb-4">Products</h2>
        <Table columns={product_columns} rows={product_data}></Table>
      </main>
    </div>
  );
}
