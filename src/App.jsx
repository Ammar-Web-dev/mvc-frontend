import "./App.css";
import { NavLink } from "react-router";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <div className="flex flex-col sm:flex-row gap-6 animate-fade-in">
        <NavLink
          to="/login"
          className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl min-w-[220px] text-center
                     transition-all duration-300 ease-out hover:-translate-y-1 border border-transparent
                     hover:border-indigo-200"
        >
          <h2 className="text-xl font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
            Login
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Already have an account? Click here to login.
          </p>
        </NavLink>

        <NavLink
          to="/signup"
          className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl min-w-[220px] text-center
                     transition-all duration-300 ease-out hover:-translate-y-1 border border-transparent
                     hover:border-indigo-200"
        >
          <h2 className="text-xl font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
            Signup
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            New here? Click here to create an account.
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default App;