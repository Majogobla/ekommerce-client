import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axiosClient from "../../config/axios";

import ProductCard from "../Products/ProductCard";
import CategoiesView from "../Categories/CategoiesView";

//route for images
import banner1 from "../../../src/img/fondo1.jpg";
import banner2 from "../../../src/img/fondo2.jpg";

export const IndexView = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => 
  {
    const fetchData = async () => 
    {
      const [productResp, categoriesResp] = await Promise.all(
      [
        axiosClient('/api/products'),
        axiosClient('/api/categories'),
      ]);

      setProduct(productResp.data);
      setCategories(categoriesResp.data);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => 
  {
    setSelectedCategory(categoryId);
  };

  const carouselSettings = 
  {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    showThumbs: false,
  };

  const renderProductCarouselItems = () => 
  {
    const maxProductToShow = 8;
    const productsToShow = product.slice(0, maxProductToShow);

    const items = [];

    for (let i = 0; i < productsToShow.length; i += 4) 
    {
      const productGroup = productsToShow.slice(i, i + 4);

      const productGroupItems = productGroup.map((product) => 
      (
        <ProductCard key={product.id} product={product} />
      ));

      items.push(
        <div key={`group-${i}`}>
          <div className="grid grid-cols-4 gap-4">{productGroupItems}</div>
        </div>
      );
    }

    return items;
  };

  useEffect(() => 
  {
    if(selectedCategory !== null)
    {
      const filteredProducts = product.filter(
        (product) => product.category === selectedCategory
      );
    }
  
  }, [selectedCategory,product])
  

  return (
    <>
      <div className="relative mt-0 flex-1">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
        >
          <div>
            <img
              src={banner1}
              alt="Banner 1"
              className="w-full h-auto"
              style={{ maxHeight: "500px" }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold drop-shadow-lg shadow-black">
              Welcome to Ekommerce! <br />
              <p className="text-xl">Look at all our products</p>
              <Link to={"/products"}>
                <button className="bg-blue-500 text-white py-3 px-4 rounded mt-4">
                  Go to Products
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img
              src={banner2}
              alt="Banner 2"
              className="w-full h-auto"
              style={{ maxHeight: "500px" }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-800 text-3xl font-bold drop-shadow-lg shadow-black">
              Welcome to Ekommerce! <br />
              <p className="text-xl">Look at all our products</p>
              <Link to={"/products"}>
                <button className="bg-blue-500 text-white py-3 px-4 rounded mt-4">
                  Go to Products
                </button>
              </Link>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="bg-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className=" text-center text-3xl font-bold mb-4">
            Welcome to Ekommerce!
          </h2>

          <p className="text-xl bg-white p-2 rounded font-bold text-gray-800 mb-6 text-center ">
            Discover the best products and place your orders easily.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-white p-6 rounded shadow md:w-1/5">
              <h3 className="text-xl font-bold mb-2">Categories</h3>

              <ul className="flex flex-wrap gap-2">
                <li
                  className={`cursor-pointer ${
                    selectedCategory === null
                      ? "bg-indigo-800 hover:bg-blue-600 transition-colors"
                      : "bg-indigo-600 "
                  } text-white py-1 px-2 rounded`}
                  onClick={() => handleCategoryChange(null)}
                >
                  All
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`cursor-pointer ${
                      selectedCategory === category.id
                        ? "bg-indigo-800 hover:bg-blue-600 transition-colors"
                        : "bg-indigo-600"
                    } text-white py-1 px-2 rounded`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded shadow md:flex-1">
              {selectedCategory !== null ? (
                <CategoiesView
                  categoryId={selectedCategory}
                  categories={categories}
                  products={product}
                />
              ) :  (
                <div className="bg-white p-6 rounded shadow md:w-3/2">
                  <h3 className="text-xl font-bold mb-2">Featured Products</h3>
                  <div className="mt-0">
                    <Carousel {...carouselSettings}>
                      {renderProductCarouselItems()}
                    </Carousel>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};