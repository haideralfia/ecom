import ProductsView from '@/components/ProductsView';
import { getAllCategoriess } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

export default async function Home() {
  const products = await getAllProducts(); //its a helper function
  const categories = await getAllCategoriess();

  //   console.log(
  //     crypto.randomUUID().slice(0, 5) +
  //       `>>> Rerendered the home page cache with ${products.length} products and  ${categories.length} categories`
  //   );
  return (
    <div className=''>
      <h1>Hello babe!</h1>
      {/* render all the products here */}

      <div>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
