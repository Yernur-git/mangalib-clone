import React from "react";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <p>You must be logged in to view this page.</p>;

  return (
      <div className="container p-4">
          <h2 className="text-xl font-bold mb-2">User Profile</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
      </div>

  );
};

export default UserProfilePage;
