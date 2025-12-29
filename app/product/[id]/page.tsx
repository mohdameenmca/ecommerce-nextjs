import NotFoundPage from "@/app/not-found";
// import { products } from "@/app/product-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";



export default async function ProductDetails({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`);
  const product = await response.json();

  if (!product) {
    notFound();
  }

  const src = product.imageUrl
    ? product.imageUrl.startsWith("/")
      ? product.imageUrl
      : `/${product.imageUrl}`
    : "/placeholder.png";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <Image
            src={src}
            alt={product.name ?? "Product Image"}
            width={600}
            height={600}
            className="w-full h-auto rounded-md object-cover"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mt-4">${product.price}</p>

          <h2 className="mt-6 text-lg font-medium text-gray-800">Description</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="mt-6 flex items-center">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Add to cart
            </button>
            <Link href="/product" className="ml-4 inline-block text-sm text-gray-500 hover:underline">
              Back to products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}