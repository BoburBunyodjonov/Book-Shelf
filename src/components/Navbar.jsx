import { removeLocalStorage } from "@/utils/helpers";
import PropTypes from "prop-types";
export default function Navbar({ setSearch }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl text-red-400 font-bold">Book Shelf</h1>
      </div>
      <div className="border p-2 rounded-full border-gray-600">
          <i className="fa-solid fa-magnifying-glass text-white px-3"></i>
          <input
            placeholder="Search..."
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            className=" text-white bg-transparent outline-none w-[400px]"
          />
        </div>
      <div className="flex items-center space-x-1">
        <p 
        className="text-white text-md font-semibold cursor-pointer" 
        onClick={() => {
            removeLocalStorage("ut"), (window.location.href = "/sign-in");
          }}>Logout</p>
          <i className="text-white fa-solid fa-right-from-bracket"></i>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  setSearch: PropTypes.func,
};
