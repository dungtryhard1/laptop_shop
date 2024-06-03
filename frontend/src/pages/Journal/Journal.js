import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { publicjournalsApi } from "../../service/publicJounals.service";
import NavTitle from "../../components/pageProps/shopPage/shopBy/NavTitle";

const Journal = () => {
  const [categories, setCategories] = useState([]);
  const [journals, setJournals] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [totalJournals, setTotalJournals] = useState(0);

  const handleGetByCategory = (categoryId) => {
    const isSelected = selectedCategories.includes(categoryId);
    if (!isSelected) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      const updatedCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
      setSelectedCategories(updatedCategories);
    }
    setPage(1);
  };

  const fetchData = async () => {
    try {
      const categoriesResponse = await publicjournalsApi.getCategoryJounals();
      setCategories(categoriesResponse.data);

      const journalsResponse = await publicjournalsApi.getJounals({
        categoryBlog: selectedCategories,
        page: page,
        perPage: perPage,
      });
      setJournals(journalsResponse.data.blogs);
      setTotalJournals(journalsResponse.data.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategories, page, perPage]);

  const handleClickJournal = async (id) => {
    try {
      const journalDetailResponse = await publicjournalsApi.getJounalByID(id);
      const journalDetail = journalDetailResponse.data;
      navigate(`/journal-detail/${id}`, { state: { journal: journalDetail } });
    } catch (error) {
      console.error("Error fetching journal detail:", error);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-container mx-auto px-4 m-5">
      {isLoading && (
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-3xl mr-4">Loading</span>
            <svg
              className="animate-spin h-8 w-8 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full">
              <div className="flex items-center justify-between mt-5">
                <NavTitle title="Journal Category" icons={false} />
                <button
                  onClick={toggleFilter}
                  className="focus:outline-none mb-4"
                >
                  {isFilterOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div
                className={`flex flex-col gap-4 text-sm lg:text-base text-[#767676] ${
                  isFilterOpen ? "block" : "hidden"
                }`}
              >
                {categories?.map((category) => (
                  <div key={category._id} className="flex items-center me-4">
                    <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id={category._id}
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleGetByCategory(category._id)}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      htmlFor={category._id}
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10 mt-5">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journals.map((journal) => (
              <div key={journal._id} className="max-w-lg mx-auto">
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => handleClickJournal(journal._id)}
                >
                  <img
                    src={journal.image.url}
                    alt="Journal Image"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 w-72 whitespace-nowrap overflow-hidden text-ellipsis">
                      {journal.title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      {new Date(journal.publishDate).toLocaleDateString(
                        "en-US"
                      )}
                    </p>
                    <p className="text-gray-600">
                      Category: {journal.categoryBlogId.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
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

                {Array.from(
                  Array(Math.ceil(totalJournals / perPage)).keys()
                ).map((pageNumber) => (
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
                ))}

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
        </div>
      </div>
    </div>
  );
};

export default Journal;
