import { PropTypes } from "prop-types";
import { handleSuccess } from "../services/notify";
import { Button } from "./ButtonStyles";
import Input from "./Input";
import Overlay from "./Overlay";
import { useState } from "react";
import { getLocalStorage } from "@/utils/helpers";
import axios from "axios";
import { BASE_URL, SECRET_KEY } from "../utils/constants";
import generateSign from "@/utils/helpers";

export default function AddBookModal({
  showOverlay,
  toggleOverlay,
  handleFetch,
}) {
  const [bookIsbn, setBookIsbn] = useState("");

  const handleAdd = async () => {
    try {
      await axios.post(
        `${BASE_URL}/books`,
        {
          isbn: bookIsbn,
        },
        {
          headers: {
            Key: JSON.parse(getLocalStorage("ut")).username,
            Sign: generateSign(
              "POST",
              `/books`,
              {
                isbn: bookIsbn,
              },
              SECRET_KEY
            ),
          },
        }
      );
      setBookIsbn("");
      handleFetch();
      handleSuccess("Created");
      toggleOverlay();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Overlay show={showOverlay}>
      <div className="bg-white p-7 rounded shadow w-[500px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl">Create a book</h1>
          <i
            onClick={toggleOverlay}
            role="button"
            className="fa-regular fa-circle-xmark"
          ></i>
        </div>
        <Input
          label="ISBN"
          type="text"
          placeholder="- - - - - - - - - "
          className="w-[300px] border border-gray-300 rounded p-2"
          value={bookIsbn}
          onChange={(e) => setBookIsbn(e.target.value)}
        />
        <div className="flex justify-between gap-2 pt-4">
          <Button onClick={toggleOverlay} outlined>
            Close
          </Button>
          <Button onClick={handleAdd} filled>
            Submit
          </Button>
        </div>
      </div>
    </Overlay>
  );
}

AddBookModal.propTypes = {
  showOverlay: PropTypes.bool.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
};
