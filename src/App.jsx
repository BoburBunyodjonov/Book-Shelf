import { BookStore, NotFoundPage, SignInPage, SignUpPage } from "@/pages";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocalStorage } from "./utils/helpers";

const isAuthenticated = () => {
  return getLocalStorage("ut");
};

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? <BookStore /> : <Navigate to="/sign-up" />
          }
        />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
