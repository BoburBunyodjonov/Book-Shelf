import { PropTypes } from "prop-types";
import { Button } from "./ButtonStyles";
import Overlay from "./Overlay";
import { useState } from "react";
import { getLocalStorage } from "@/utils/helpers";
import axios from "axios";
import { BASE_URL, SECRET_KEY } from "@/utils/constants";
import generateSign from "@/utils/helpers";

export default function EditBookModal({
  showOverlayEdit,
  toggleOverlayEdit,
  handleFetch,
  bookId,
}) {
  const [status, setStatus] = useState("");

  const handleEdit = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/books/${bookId}`,
        {
          status: Number(status),
        },
        {
          headers: {
            Key: JSON.parse(getLocalStorage("ut")).username,
            Sign: generateSign(
              "PATCH",
              `/books/${bookId}`,
              {
                status: Number(status),
              },
              SECRET_KEY
            ),
          },
        }
      );
      handleFetch();
      toggleOverlayEdit();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Overlay show={showOverlayEdit}>
      <div className="bg-white p-7 rounded shadow w-[500px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl">Edit a book</h1>
          <i
            onClick={toggleOverlayEdit}
            role="button"
            className="fa-regular fa-circle-xmark"
          ></i>
        </div>
        <select
          name=""
          id=""
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border bg-white  border-gray-300 rounded p-2"
        >
          <option value="0">New</option>
          <option value="2">reading</option>
          <option value="3">Finished</option>
        </select>

        <div className="flex justify-between gap-2 pt-4">
          <Button onClick={toggleOverlayEdit} outlined>
            Close
          </Button>
          <Button onClick={handleEdit} filled>
            Submit
          </Button>
        </div>
      </div>
    </Overlay>
  );
}

EditBookModal.propTypes = {
  showOverlayEdit: PropTypes.bool.isRequired,
  toggleOverlayEdit: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
  bookId: PropTypes.number,
};
