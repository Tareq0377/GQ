import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: form.name,
      email: form.email,
      role: "user",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/quiz");
  };

  const handleGoogleSignup = (credentialResponse) => {
    const userInfo = jwtDecode(credentialResponse.credential);
    const user = {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      role: "user",
    };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary-dark">Create Account</h2>

        {/* Manual Sign Up */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition font-medium"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Sign Up */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={() => console.log("Google Sign Up Failed")}
            />
          </div>
          <p className="text-xs text-center text-gray-500">Sign up with your Google account</p>
        </div>

        {/* Login Link */}
        <div className="text-sm text-center text-gray-500 pt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline font-medium"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
