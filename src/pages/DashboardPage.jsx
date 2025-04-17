import React from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
      <div className="container p-4">
          <h2 className="text-xl font-bold mb-2">Dashboard</h2>
          {user ? (
              <p>Welcome, {user.email}! Your role is: {user.role}</p>
          ) : (
              <p>You are not logged in.</p>
          )}
      </div>

  );
};

export default DashboardPage;
