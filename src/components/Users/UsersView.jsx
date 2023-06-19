import { useEffect, useState } from "react";
import axios from "axios";

function ContactUsView() {
  const [developerUsers, setDeveloperUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
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
    <div className=" h-screen bg-indigo-100 py-8">
      <div className="container mx-auto px-4 h-full">
        <h2 className="text-center text-3xl font-bold mb-4">Contact Us</h2>

        <div className="grid grid-cols-3 gap-4">
          {developerUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row"
            >
              <img
                className="  h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={`http://localhost:8000/storage/${user.image}`}
                alt={user.name}
              />
              <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                  {user.name}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  Email: {user.email}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-300">
                  Role: {user.role ? user.role.name : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactUsView;
