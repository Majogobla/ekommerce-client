import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Authenticated() 
{
  const {logout, user} = useAuth({middleware: 'auth'});

  return (
    <>
      <div className="bg-indigo-800 py-4">
        <div className="container mx-auto flex flex-col justify-center items-center md:justify-between  md:flex-row">
          <Link to="/">
            <h1 className=" text-white text-3xl font-bold pl-4">Ekommerce</h1>
          </Link>

          <nav className="flex flex-col gap-4 md:flex-row mt-6 md:mt-0 items-center">
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
              to="/cart"
              className="text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>

            <Link to="/user" className="text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center">{user?.name}</Link>

            <button
              type="button"
              className="text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center"
              onClick={logout}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6 mx-auto"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      <Outlet />

      <footer className="bg-indigo-800 py-4">
        <div className="container mx-auto flex flex-col justify-center items-center md:justify-between  md:flex-row">
          <Link to="/">
            <h1 className=" text-white text-3xl font-bold pl-4">Ekommerce</h1>
          </Link>

          <p className="mt-6 md:mt-0 text-white font-bold uppercase">Todos los derechos reservados {new Date().getFullYear()}.</p>

          <nav className="flex flex-col gap-4 md:flex-row mt-6 md:mt-0">
            <Link
                to="/users"
                className="text-white uppercase py-1 px-3 hover:bg-gray-400 hover:text-black cursor-pointer transition-colors font-bold rounded text-center"
              >
                Contact Us
              </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default Authenticated;
