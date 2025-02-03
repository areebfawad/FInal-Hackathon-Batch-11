import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // Ensure you import from react-router-dom

export default function LoginPage() {
  let navigate = useNavigate();

  async function LoginUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData.get("email"), "formdata");
    console.log(formData.get("password"), "password");

    let email = formData.get("email");
    let password = formData.get("password");

    if (!email || !password) {
      toast.error("Please Fill All Fields");
      return;
    }

    const objToSend = {
      email: email,
      password: password,
    };

    try {
      const loginingUser = await axios.post(
        "https://smit-final-hackaton-backend-production-da72.up.railway.app/api/auth/login",
        objToSend
      );

    if(loginingUser.status === 200){
        let token = loginingUser.data.token 
        localStorage.setItem("auth-token", token);
        let decodedToken = jwtDecode(token);
        console.log(decodedToken);
        if (decodedToken.role == "admin") {
          navigate("/admin");
        }else if(decodedToken.role == "user"){
          navigate("/user");
        }
    }
        
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left Pane */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          {/* Your SVG Image */}
        </div>
      </div>

      {/* Right Pane */}
      <div className="w-full bg-[#002B5B] lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-white text-center">Login</h1>
          <h1 className="text-sm font-semibold mb-6 text-white text-center">
            Login To Access Your Dashboard
          </h1>

          <form onSubmit={LoginUser} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email@email.com"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <input
                type="password"
                placeholder="******"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-[#E6E6E6] text-black p-2 rounded-md hover:bg-gray-800 hover:text-white focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 mt-4"
              >
                Login
              </button>
            </div>
          </form>

          {/* <div className="mt-4 text-sm text-white text-center">
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-gray-400 hover:underline">
                SignUp here
              </Link>
            </p>
          </div> */}

          <div className="mt-4 text-sm text-white text-center">
            <p>admin credentials</p>
            <p>email : admin@gmail.com</p>
            <p>password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
