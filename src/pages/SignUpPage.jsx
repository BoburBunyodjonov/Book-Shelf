import { Link } from "react-router-dom";
import { CenterContainer, Input } from "../components";
import axios from "axios";
import { useEffect, useState } from "react";
import { handleError } from "../services/notify";
import { BASE_URL, SECRET_KEY } from "../utils/constants";
import { useNavigate } from "react-router-dom";


export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (password.trim() !== confirmPassword.trim()) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
  }, []);

  const sendReq = () => {
    axios
      .post(`${BASE_URL}/signup`, {
        name: username,
        email: email,
        key: username,
        secret: SECRET_KEY,
      })
      .then((response) => {
        if (response.data.isOk) {
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        handleError("Bunday foydalanuvchi mavjud!");
      });
  };

  return (
    <CenterContainer >
     <div className="h-screen grid place-items-center">
     <form className="bg-white px-5 py-5 rounded-md w-[400px]">
        <h2 className="font-bold text-3xl text-center my-5">Register</h2>
        <Input
          label="Username"
          id="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          label="Email"
          id="email"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirm password"
          id="confirm-password"
          type="password"
          className={`${passwordError ? "border-red-500" : ""} border`}
          placeholder="Enter your confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {passwordError && <p className="text-red-500">Xato</p>}

        <button
          type="button"
          onClick={sendReq}
          className="w-full p-2 rounded-md text-white bg-rose-500"
        >
          Submit
        </button>
        <small className="block mt-2 text-center">
          Already signed in?
          <Link to="/sign-in" className="text-rose-500">
            Go to Login
          </Link>
        </small>
      </form>
     </div>
    </CenterContainer>
  );
}
