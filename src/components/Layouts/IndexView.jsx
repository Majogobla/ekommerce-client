import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

import ProductCard from "../Products/ProductCard";
import { Categories } from "./Categories";
//route for images
import banner1 from "../../../src/img/fondo1.jpg";
import banner2 from "../../../src/img/fondo2.jpg";

export const IndexView = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const ProductUrl = "http://localhost:8000/api/products";
      const CategoriesUrl = "http://localhost:8000/api/categories";

      const [productResp, categoriesResp] = await Promise.all([
        axios.get(ProductUrl),
        axios.get(CategoriesUrl),
      ]);
      setProduct(productResp.data);
      setCategories(categoriesResp.data);
    };
    fetchData();
  }, []);

  const maxProductToShow = 8;
  const productsToShow = product.slice(0, maxProductToShow);
  const carouselSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const renderProductCarouselItems = () => {
    const items = [];

    for (let i = 0; i < productsToShow.length; i += 4) {
      const productGroup = productsToShow.slice(i, i + 4);

      const productGroupItems = productGroup.map((product) => (
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
  return (
    <>
      <div className="bg-indigo-800 py-4">
        <div className="container mx-auto flex flex-col justify-center items-center md:justify-between  md:flex-row">
          <Link to="/">
            <h1 className=" text-white text-3xl font-bold">Ekommerce</h1>
          </Link>

          <nav className="flex flex-col gap-4 md:flex-row mt-6 md:mt-0">
            <Link
              to="/products"
              className="text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center"
            >
              Products
            </Link>

            <Link
              to="/orders"
              className="text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center"
            >
              Orders
            </Link>

            <Link
              to="#"
              className="text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center"
            >
              Contact Us
            </Link>

            <Link
              to="/cart"
              className="text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
      <div className="relative mt-0">
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-800 text-3xl font-bold">
              Welcome to Ekommerce! <br />
              <p className="text-xl">
              Look at all our products 
              </p>
              <Link to={'/products'}>
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-800 text-3xl font-bold">
              Welcome to Ekommerce! <br />
              <p className="text-xl">
              Look at all our products 
              </p>
              <Link to={'/products'}>
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
            <div className="bg-white p-6 rounded shadow md:w-1/2">
              <h3 className="text-xl font-bold mb-2">Categories</h3>
              <div className="">
                <Categories autoPlay infiniteLoop categories={categories} />
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow md:w-3/2">
              <h3 className="text-xl font-bold mb-2">Featured Products</h3>
              <div className="mt-0">
                <Carousel {...carouselSettings}>
                  {renderProductCarouselItems()}
                </Carousel>
              </div>
            </div>
          </div>
          {/* <div className="mt-5 bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">New Arrivals</h3>
              
            </div> */}
        </div>
      </div>
    </>
  );
};
