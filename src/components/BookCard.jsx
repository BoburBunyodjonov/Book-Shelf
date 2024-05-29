import { useState } from "react";
import { PropTypes } from "prop-types";
import generateSign, { getLocalStorage } from "@/utils/helpers";
import axios from "axios";
import { BASE_URL, SECRET_KEY } from "@/utils/constants";
import { Badge, EditBookModal } from ".";

export default function BookCard({ book, setBooks, handleFetch }) {
  const [showOverlayEdit, setShowOverlayEdit] = useState(false);
  const [bookId, setBookId] = useState(null);

  const toggleOverlayEdit = () => {
    setShowOverlayEdit(!showOverlayEdit);
  };

  const handleEditClick = () => {
    toggleOverlayEdit();
    setBookId(book?.book?.id);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/books/${book?.book?.id}`,
        {
          headers: {
            Key: JSON.parse(getLocalStorage("ut")).username,
            Sign: generateSign(
              "DELETE",
              `/books/${book?.book?.id}`,
              "",
              SECRET_KEY
            ),
          },
        }
      );
      setBooks(response.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      tabIndex="0"
      className="bg-rose-300  rounded-lg p-3 cursor-pointer space-y-1"
    >
      <EditBookModal
        showOverlayEdit={showOverlayEdit}
        toggleOverlayEdit={toggleOverlayEdit}
        handleFetch={handleFetch}
        bookId={bookId}
      />

      <p>
        <img
          className="w-full h-[150px] object-contain"
          src={book?.book?.cover ?? "not found data"}
          alt={book?.book?.title}
        />
      </p>
      <p className="">
        <b>Title</b>: {book?.book?.title ?? "not found data"}
      </p>
      <p>
        <b>Author</b>: {book?.book?.author ?? "not found data"}
      </p>
      <p>
        <b>Published</b>: {book?.book?.published ?? "not found data"}
      </p>
      <p>
        <b>Pages</b>: {book?.book?.pages ?? "not found data"}
      </p>
      <p>
        <b>ISBN</b>: {book?.book?.isbn ?? "not found data"}
      </p>

      <div className="">
        <Badge
          status={
            book?.status == 0
              ? "New"
              : book?.status == 2
              ? "Reading"
              : book?.status == 3
              ? "Finished"
              : ""
          }
        >
          {book?.status == 0
            ? "New"
            : book?.status == 2
            ? "Reading"
            : book?.status == 3
            ? "Finished"
            : ""}
        </Badge>
        <div className="text-white flex justify-between space-x-2 py-3">
          <i
            className="w-[50%] text-center bg-red-500 py-3 px-5 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </i>
          <i
            onClick={handleEditClick}
            className="w-[50%] text-center bg-indigo-500 py-3 px-5 rounded-lg"
          >
            Edit
          </i>
        </div>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  setBooks: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
};
