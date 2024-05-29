import { Link } from "react-router-dom";
import { CenterContainer, Input } from "../components";
import axios from "axios";
import { BASE_URL, SECRET_KEY } from "@/utils/constants";
import generateSign from "@/utils/helpers";
import { useState } from "react";
import { handleError } from "@/services/notify";
import { setLocalStorage } from "@/utils/helpers";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${BASE_URL}/myself`, {
        headers: {
          Key: formData.username,
          Sign: generateSign("GET", "/myself", "", SECRET_KEY),
        },
      });
      if (response.data.isOk && response.data.message === "ok") {
        setLocalStorage(
          "ut",
          JSON.stringify({
            sign: generateSign("GET", "/myself", "", SECRET_KEY),
            username: formData.username,
          })
        );
        window.location.href = "/";
      } else {
        handleError("Bunday foydalanuvchi mavjud emas!");
      }
    } catch (error) {
      handleError("Bunday foydalanuvchi mavjud emas");
      console.error("Error signing in:", error);
    }
  };

  return (
    <CenterContainer>
      <div className="h-screen grid place-items-center">
        <form className="bg-white px-5 py-5 rounded-md w-[400px]">
          <h2 className="font-bold text-3xl text-center my-5">Login</h2>
          <Input
            label="Username"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            disabled={formData.username === "" || formData.password === ""}
            onClick={(e) => handleSignIn(e)}
            className={`w-full p-2 rounded-md text-white ${
              formData.username === "" || formData.password === ""
                ? "bg-gray-300"
                : "bg-rose-500"
            }`}
          >
            Submit
          </button>

          <small className="block mt-2 text-center">
            Already signed up? 
            <Link to="/sign-up" className="text-rose-500">
              Go to register
            </Link>
          </small>
        </form>
      </div>
    </CenterContainer>
  );
}
