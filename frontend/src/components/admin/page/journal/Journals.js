import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { journalApi } from "../../../../service/journals.service";
import { toast } from "react-toastify";

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [totalJournals, setTotalJournals] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const fetchData = async () => {
    try {
      const response = await journalApi.getJournal({
        title: searchTitle,
        page: page,
        perPage: perPage,
      });
      setJournals(response.data.blogs);
      setTotalJournals(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching journals:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTitle, page, perPage]);

  const handleDelete = async (journalId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journal?"
    );
    if (confirmDelete) {
      try {
        await journalApi.deleteJournal(journalId);
        const updatedJournals = journals.filter(
          (journal) => journal._id !== journalId
        );
        setJournals(updatedJournals);
        toast.success("Journal deleted successfully!");
      } catch (error) {
        console.error("Error deleting journal:", error);
      }
    }
  };

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mt-5">
        <div className="relative rounded-2xl border w-full md:w-[600px] h-[50px] text-base text-primeColor flex items-center gap-2 justify-between px-6 mb-4 md:mb-0">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            placeholder="Search your products here"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          {" "}
          <div className="ml-auto">
            <Link to={"/admin/add-journal"}>
              <button
                type="button"
                className="w-50 p-2 bg-green-500 text-white rounded mr-20"
              >
                Add New Journal
              </button>
            </Link>
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Publish Date
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => (
              <tr
                key={journal._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {journal.title}
                </th>
                <td className="px-6 py-4">
                  {journal.content.length > 100 ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${journal.content.substring(0, 100)}...`,
                      }}
                    ></span>
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{ __html: journal.content }}
                    ></span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {new Date(journal.publishDate).toLocaleDateString("en-US")}
                </td>
                <td className="px-6 py-4">
                  {journal?.image && (
                    <img
                      src={journal?.image?.url}
                      alt={`Image`}
                      className="w-20 h-20 object-cover"
                    />
                  )}
                </td>

                <tr className="flex justify-center">
                  <td className="px-2 py-2 w-fit flex justify-between items-center">
                    <Link to={`/admin/edit-journal/${journal._id}`}>
                      <button className="font-medium text-blue-600 dark:text-blue-500">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(journal._id)}
                      className="font-medium text-red-600 dark:text-blue-500 ml-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex justify-center mt-8">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <button
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === 1 ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => handleChangePage(page - 1)}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>

            {Array.from(Array(Math.ceil(totalJournals / perPage)).keys()).map(
              (pageNumber) => (
                <li key={pageNumber}>
                  <button
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border ${
                      page === pageNumber + 1
                        ? "border-primeColor bg-slate-900 text-white hover:bg-slate-950 hover:text-white dark:bg-slate-950 dark:text-black"
                        : pageNumber === 0
                        ? "border-gray-300 bg-white text-black"
                        : "border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                    onClick={() => handleChangePage(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              )
            )}

            <li>
              <button
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === Math.ceil(totalJournals / perPage)
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                onClick={() => handleChangePage(page + 1)}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Journal;
