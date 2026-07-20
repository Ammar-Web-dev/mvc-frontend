import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://mvc-production-b794.up.railway.app/users/login",
        { username, password }
      );
      localStorage.setItem("loginToken", response.data.token);
      navigate("/products");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Welcome back
        </h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-slate-600 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none
                       transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-slate-600 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none
                       transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium
                     py-2.5 rounded-lg transition-all duration-200 hover:bg-indigo-700 active:scale-95
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;