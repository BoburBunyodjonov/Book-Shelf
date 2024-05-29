import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, SECRET_KEY } from "../utils/constants";
import { getLocalStorage } from "@/utils/helpers";
import generateSign from "@/utils/helpers";
import { BookCard, Navbar, AddBookModal } from "@/components";
import Container from "@/components/ContainerStyles";

export default function BookStore() {
  const [books, setBooks] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlayEdit, setShowOverlayEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  console.log("search", search);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const toggleOverlayEdit = () => {
    setShowOverlayEdit(!showOverlayEdit);
  };

  const handleFetch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books`, {
        headers: {
          Key: JSON.parse(getLocalStorage("ut")).username,
          Sign: generateSign("GET", "/books", "", SECRET_KEY),
        },
      });
      setBooks(response.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    try {
      if (search !== "") {
        const response = await axios.get(`${BASE_URL}/books/:title=${search}`, {
          headers: {
            Key: JSON.parse(getLocalStorage("ut")).username,
            Sign: generateSign(
              "GET",
              `/books/:title=${search}`,
              "",
              SECRET_KEY
            ),
          },
        });
        console.log(response.data.data);
        setSearchData(response.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (search !== "") {
      handleSearch();
    }
  }, [search]);

  return (
    <Container>
      <div className="w-[80%] min-h-full mx-auto py-5">
        <Navbar setSearch={setSearch} />
        {search && (
          <table className="w-[50%] absolute z-50 top-100 rounded grid h-[100px] overflow-x-scroll">
            {searchData.map((data) => (
              <tr
                key={data?.id}
                className="border bg-white p-2 flex justify-between"
              >
                <td className="w-[50%] border-r border-gray-300">
                  <b>{data?.title}</b>
                </td>
                <td className="p-2 border-r w-[25%] border-gray-300">
                  {data?.author}
                </td>
                <td className="p-2 w-[25%]">{data?.isbn}</td>
              </tr>
            ))}
          </table>
        )}

        <div className=" flex justify-between items-start mt-10">
          <div className="text-white">
            <h1 className="text-5xl">
              You have got{" "}
              <span className="text-rose-500">
                {books?.length} book{books?.length !== 1 ? "s" : ""}
              </span>
            </h1>
          </div>
          <button
            onClick={toggleOverlay}
            type="button"
            className="rounded-md text-rose-400 border-2 border-dashed border-rose-400 p-2 px-5"
          >
            <i className="fas fa-plus"></i> Create a book
          </button>
        </div>

        <AddBookModal
          handleFetch={handleFetch}
          showOverlay={showOverlay}
          toggleOverlay={toggleOverlay}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
          {Array.isArray(books) &&
            books.map((book) => (
              <BookCard
                key={book?.book.id}
                book={book}
                setBooks={setBooks}
                toggleOverlayEdit={toggleOverlayEdit}
                handleFetch={handleFetch}
                showOverlayEdit={showOverlayEdit}
              />
            ))}
        </div>
      </div>
    </Container>
  );
}
