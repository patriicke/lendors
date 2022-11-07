import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[calc(100vh_-_5rem)] w-screen flex items-center justify-center bg-blueish-2">
      <div className="p-4 flex flex-col items-center justify-center gap-5">
        <h1 className="text-white font-medium text-xl">Page Not Found!</h1>
        <button
          className="border border-redish p-1 px-4 rounded-md text-white"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
