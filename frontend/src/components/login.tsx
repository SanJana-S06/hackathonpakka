import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Lock, Mail } from "lucide-react";

const SignIn2 = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);

  // shared state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const projects=[] as  any[]
  const handleRegister = async () => {
    setError("");
    setSuccess("");
    if (!username || !email || !password) {
      setError("Please enter username, email and password.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password,projects })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Registration successful!");
        // route to home after successful registration
        navigate("/home");
      }
    } catch (err) {
      setError("Network error");
    }
  };
  const handleLogin = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        setSuccess("Login successful!");
        // optionally store token here: localStorage.setItem('token', data?.data?.token)
        // then navigate to home
        setTimeout(() => {
         controllNavigation();
        }, 1500);
      }
    } catch (err) {
      setError("Network error");
    }
      const controllNavigation=async ()=>{
    try {
    const res = await fetch('/api/v1/users/me', { credentials: "include" });
    const data = await res.json();
    console.log("User data:", data);
    const initialProjects = data.data.projects
    if (initialProjects && initialProjects.length > 0) {
      navigate("/home");
    } else {
      navigate("/create-project");
    }
  }catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  useEffect(() => {
   controllNavigation();
  }, [handleLogin]);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white rounded-xl  z-1">
      <div className="w-full max-w-sm bg-gradient-to-b from-sky-50/50 to-white  rounded-3xl shadow-xl shadow-opacity-10 p-8 flex flex-col items-center border border-blue-100 text-black">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-4 shadow-lg shadow-opacity-5">
          <LogIn className="w-7 h-7 text-black" />
        </div>

        <div className="w-full mb-4 flex items-center justify-evenly flex-wrap">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              {isRegister ? "Create account" : "Sign in with email"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isRegister ? "Register a new account" : "Sign in to continue"}
            </p>
          </div>

          <div className="text-sm">
            {isRegister ? (
              <button
                onClick={() => { setIsRegister(false); setError(""); setSuccess(""); }}
                className="text-sky-600 font-medium underline"
              >
                Already have an account? Sign in
              </button>
            ) : (
              <button
                onClick={() => { setIsRegister(true); setError(""); setSuccess(""); }}
                className="text-sky-600 font-medium underline"
              >
                New here? Create account
              </button>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 mb-2">
          {isRegister ? (
            <>
              <div className="relative">
                <input
                  placeholder="Username"
                  type="text"
                  value={username}
                  className="w-full pl-3 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center">
                <div className="text-sm text-red-500 text-left ">{error}</div>
              </div>
              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-2 mt-2"
              >
                Create account
              </button>

              {success && <div className="text-green-500 mt-2">{success}</div>}
            </>
          ) : (
            <>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="w-full flex justify-between">
                <div className="text-sm text-red-500 text-left">{error}</div>
                <button className="text-xs  hover:underline font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-2 mt-2"
              >
                Sign in
              </button>

              {success && <div className="text-green-500 mt-2">{success}</div>}
            </>
          )}
        </div>

        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
          <span className="mx-2 text-xs text-gray-400">Or sign in with</span>
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
        </div>

        <div className="flex gap-3 w-full justify-center mt-2">
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export { SignIn2 };

