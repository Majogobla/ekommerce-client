import { useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function UserEditImage() 
{
  const [image, setImage] = useState(null);

  const { user, editImage } = useAuth({middleware: 'auth', url: '/'});
  

  const handleSubmit = async e =>
  {
    e.preventDefault();
    
    const imageFD = new FormData();
    imageFD.append('image', image);

    editImage(imageFD);
  }

  return (
    <main className="flex-1 flex items-center">
      <div className="container mx-auto w-full my-10">
        <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 mx-auto">
          <div className="p-6 space-y-2 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Edit your profile photo
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 uppercase text-center">Image</label>

                {
                  user?.image ?
                  (
                    <div className="mx-auto w-1/3 rounded-full overflow-hidden aspect-square flex justify-center items-center">
                      <img src={`http://localhost:8000/storage/${user?.image}`} alt="profile photo"/>
                    </div>
                  )
                  :
                  null
                }

                <input type="file" name="iamge" id="image" className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" onChange={e => setImage(e.target.files[0])}/>
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

export default UserEditImage;