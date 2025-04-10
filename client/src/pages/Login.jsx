import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Input from '../components/Input';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    console.log("Username:", form.username, "Password:", form.password);
    // TODO: Replace with real authentication
  };

  const handleGoogleLogin = (credentialResponse) => {
    const userInfo = jwtDecode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary-dark">Login to HELP</h2>

        <form onSubmit={handleFormLogin} className="space-y-4">
          <Input
            label="Username"
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
          />
        </div>
      </div>
    </div>
  );
}
