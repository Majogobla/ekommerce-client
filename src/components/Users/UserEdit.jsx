import { createRef, useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function UserEdit() 
{
  const nameRef = createRef();
  const lastnameRef = createRef();
  const emailRef = createRef();
  const phoneRef = createRef();

  const { user, editUser } = useAuth({middleware: 'auth', url: '/'});
  
  useEffect(() =>
  {
    if(user)
    {
      nameRef.current.value = user.name
      lastnameRef.current.value = user.last_name
      emailRef.current.value = user.email
      phoneRef.current.value = user.phone
    }
  },
  [user]);

  const handleSubmit = async e =>
  {
    e.preventDefault();

    const userEdited =
    {
      name: nameRef.current.value,
      last_name: lastnameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value
    }
    
    editUser(userEdited);
  }

  return (
    <main className="flex-1 flex items-center">
      <div className="container mx-auto w-full my-10">
        <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 mx-auto">
          <div className="p-6 space-y-2 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Edit your profile info
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 uppercase">Name</label>

                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Your first name" ref={nameRef}/>
              </div>

              <div>
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 uppercase">Last name</label>

                <input type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Your last name" ref={lastnameRef}/>
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 uppercase">Email</label>

                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Your email" ref={emailRef}/>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 uppercase">Phone</label>

                <input type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Your phone number" ref={phoneRef}/>
              </div>
              
              <button type="submit" className="w-full text-yellow-500 bg-indigo-800 hover:bg-yellow-500 hover:text-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer transition-colors uppercase font-bold">Save Changes</button>
              
              <Link to="/user" >
                <p className="mt-4 text-indigo-800 bg-yellow-500 hover:bg-indigo-800 hover:text-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm py-2.5 cursor-pointer transition-colors uppercase font-bold inline-block px-5">Return</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
};

export default UserEdit;