import NotFoundPage from "@/app/not-found";
// import { products } from "@/app/product-data";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ProductDetails({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Compare as strings in case product ids are numbers
  // const product = products.find((x) => String(x.id) === String(id));
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
    <div className="container mx-auto p-8">
      <div>
        <Image
          src={src}
          alt={product.name ?? "Product Image"}
          width={500}
          height={500}
        />
      </div>
      <div className="w-1/2 ml-12">
        <h2 className="mt-6">{product.name}</h2>
        <h2 className="mb-6 mt-6">${product.price}</h2>
        <h2 className="mb-4">Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}