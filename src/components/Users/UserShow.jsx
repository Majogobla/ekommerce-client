import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function UserShow() 
{
  const { user } = useAuth({middleware: 'auth', url: '/'});

  return (
    <main className='flex-1 my-10 flex justify-center items-center'>
      <div className="w-full max-w-sm p-4 border-2 border-indigo-800 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          {
            user?.image ?
            (
              <div className="mx-auto w-1/3 rounded-full overflow-hidden aspect-square flex justify-center items-center">
                <img src={`http://localhost:8000/storage/${user?.image}`} alt="profile photo" className="" />
              </div>
            )
            :
            null
          }

          <h5 className="mb-1 text-xl font-medium text-gray-900 mt-4 text-center">{user?.name} {user?.last_name}</h5>

          <span className="text-sm text-gray-500">{user?.email}</span>

          <span className="text-sm text-gray-500">{user?.phone}</span>

          <div className="flex flex-col gap-4 mt-6 sm:flex-row">
            <Link to="/user/edit" className="py-2 px-4 bg-indigo-800 text-white text-center rounded text-sm hover:bg-yellow-600 transition-colors uppercase font-bold">Edit Info</Link>

            <Link to="/user/image" className="py-2 px-4 bg-indigo-800 text-white text-center rounded text-sm hover:bg-yellow-600 transition-colors uppercase font-bold">Edit Image</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserShow;