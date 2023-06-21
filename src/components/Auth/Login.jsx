import { createRef, useState  } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Alert from "../ui/Alert";

function Login() 
{
  const emailRef = createRef();
  const passwordRef = createRef();

  const [errors, setErrors] = useState([]);
  const { login } = useAuth(
    {
      middleware: 'guest',
      url: '/',
    }
  );

  const handleSubmit = async e =>
  {
    e.preventDefault();

    const user =
    {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    login(user, setErrors);
  }

  return (
    <div className="w-full flex-1 bg-indigo-800 overflow-hidden px-6 flex flex-col justify-center">
      <main className="flex flex-col items-center justify-center py-10">
        <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-2 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Log-in into eKomerce
            </h1>

            {
              errors ?
              (
                errors.map((error, i) => <Alert key={i}>{error}</Alert>) 
              )
              :
              null
            }

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 uppercase">Email</label>

                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Your email" ref={emailRef}/>
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 uppercase">Password</label>

                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Your password" ref={passwordRef}/>
              </div>
              
              <button type="submit" className="w-full text-yellow-500 bg-indigo-800 hover:bg-yellow-500 hover:text-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer transition-colors">Log-in</button>

              <p className="text-sm font-light text-gray-800">
                  Don't have an account? {' '}
                  <Link to="/register" className="font-medium text-indigo-800 hover:underline  uppercase">Sign-In</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login