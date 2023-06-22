import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import axios from "axios";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function ContactUsView() {
  const [developerUsers, setDeveloperUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient("/api/users");
        const allUsers = response.data;
        const filteredUsers = allUsers.filter((user) => user.role_id === 3);
        setDeveloperUsers(filteredUsers);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex-1 bg-indigo-100 py-8">
      <div className="container mx-auto px-4 h-full">
        <h2 className="text-center text-3xl font-bold mb-4">Contact Us</h2>
        <div>
          <h1 className="text-3xl font-bold mb-2 cursor-pointer hover:text-red-500 text-center">Team #5</h1>

          <p className="text-2xl text-center p-12 mb-12 bg-white">Development team in the construction of the eKommerce system for the final Laravel project.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 m-12">
          {developerUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row"
                style={{backgroundImage:`url(/src/img/backgroundKodigo.jpg)`,backgroundSize:'cover'}}
            >
              <img
                className="  h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={`http://localhost:8000/storage/${user.image}`}
                alt={user.name}
              />
              <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                  {user.name} {user.last_name}
                </h5>
                <div className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  Email: <br />
                  <div className=" font-bold cursor-pointer hover:text-red-600 text-lg">
                    {user.email}
                  </div>
                </div>
                <div className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  Phone: <br />
                  <div className=" font-bold cursor-pointer hover:text-red-600 text-lg">
                   +{user.phone}
                   </div>
                </div>
                <div className="text-lg text-neutral-500 dark:text-neutral-300">
                  Role: <br />
                  <div className=" font-bold cursor-pointer hover:text-red-600 text-lg uppercase">
                   {user.role ? user.role.name : ""}
                   </div>
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="rounded-full bg-blue-500 hover:bg-blue-800 cursor-pointer w-8 h-8 flex justify-center items-center">
                    <FaTwitter className="text-white" />
                  </div>
                  <div className="rounded-full bg-blue-500 hover:bg-blue-800 cursor-pointer w-8 h-8 flex justify-center items-center">
                    <FaFacebook className="text-white" />
                  </div>
                  <div className="rounded-full bg-blue-500 hover:bg-blue-800 cursor-pointer w-8 h-8 flex justify-center items-center">
                    <FaInstagram className="text-white" />
                  </div>
                  <div className="rounded-full bg-blue-500 hover:bg-blue-800 cursor-pointer w-8 h-8 flex justify-center items-center">
                    <FaLinkedin className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactUsView;
