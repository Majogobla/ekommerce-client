import ProductCard from "../Products/ProductCard";

function CategoriesView({ categoryId, categories, products }) 
{
  const selectedCategory = categories.find((category) => category.id === categoryId);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.subcategory.category_id === categoryId)
    : products;

  if (filteredProducts.length === 0) {
    return (
      <div>
        <h2 className="text-center text-xl pb-5">Category: <br/>
        <a  className=" uppercase font-bold" href="">
         {selectedCategory ? selectedCategory.name : "All"}

        </a>
         </h2>
        <p className=" text-2xl text-center m-32 p-12 rounded bg-slate-400">No products found for this category.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center text-xl pb-5">Category: <br/>
      <a className=" uppercase font-bold" href="">

       {selectedCategory ? selectedCategory.name : "All"}
      </a>
       </h2>
      <div className="grid grid-cols-4 gap-4 card-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
}

export default CategoriesView;
