import { useEffect, useRef, useState } from "react";

interface User {
  username: string;
  _id: string;
}

interface FindUserProps {
  username: string; // text typed from parent
  onUserClick: (username: string, _id: string) => void;
}

function FindUser({ username, onUserClick }: FindUserProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const hasFetched = useRef(false);

  // ✅ Fetch all users once
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // ✅ Filter users based on `username` prop
  useEffect(() => {
    if (username === "") {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter((user) =>
      user.username.toLowerCase().startsWith(username.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [username, users]);

  return (
    <div>
      {filteredUsers.length > 0 && (
        <ul className="mt-2 border rounded p-2 bg-white max-h-40 overflow-y-auto">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              onClick={() => onUserClick(user.username, user._id)}
              className="p-1 hover:bg-gray-100 cursor-pointer"
            >
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FindUser;
