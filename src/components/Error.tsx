import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function Error() {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8  flex flex-col items-center text-gray-600 gap-y-5 text-center sm:px-6 lg:px-8 ">

          <h2 className="text-5xl font-bold text-slate-900">Error 404</h2>
          <p>
            Oops! The page you are looking for doesn’t exist.
          </p>
          <Button onClick={() => navigate("/customer")} className="bg-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none cursor-pointer">Return to website</Button>
      </div>
    </div>
  );
}
