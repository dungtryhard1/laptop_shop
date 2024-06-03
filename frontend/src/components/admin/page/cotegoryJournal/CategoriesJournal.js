import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { categoryJournalApi } from "../../../../service/categoryJournal.service";
import { toast } from "react-toastify";

const CategoryJournals = () => {
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredCategoryJournals = categories.filter((category) => {
    return category.name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryJournalApi.getCategoryJournal();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handledelete = async (id) => {
    if (confirm("Do you want to delete this category?")) {
      try {
        const response = await categoryJournalApi.deleteCategoryJournal(id);
        toast.success("Delete Journal Category successfull");
        const updatedCategories = await categoryJournalApi.getCategoryJournal();
        setCategories(updatedCategories.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mt-5">
        <div className="relative rounded-2xl border w-full md:w-[600px] h-[50px] text-base text-primeColor flex items-center gap-2 justify-between px-6 mb-4 md:mb-0">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            placeholder="Search your category here"
            value={searchKeyword}
            onChange={handleSearch}
          />
          <FaSearch className="w-5 h-5 hover:cursor-pointer" />
        </div>
        <div className="flex items-center">
          {" "}
          <div className="ml-auto">
            <Link to={"/admin/add-categoryJournal"}>
              <button
                type="button"
                className="w-50 p-2 bg-green-500 text-white rounded mr-20"
              >
                Add New Journal Category
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
                Category name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-4 py-3">
                Hidden
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Status
              </th> */}
              <th scope="col" className="px-6 py-3">
                <span className="">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategoryJournals.map((category) => (
              <tr
                key={category._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category.name}
                </th>
                <td className="px-6 py-4">{category.description}</td>
                <td className="px-6 py-4">
                  <input type="checkbox" checked={category.isHidden} />
                </td>
                {/* <td className="px-6 py-4">{category.status}</td> */}
                <td className="px-6 py-4 ">
                  <Link to={`/admin/edit-categoryJournal/${category._id}`}>
                    <button className="font-medium text-blue-600 dark:text-blue-500">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handledelete(category._id)}
                    className="font-medium text-red-600 dark:text-blue-500 ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <nav
        aria-label="Page navigation example "
        className="flex items-center justify-center mt-4"
      >
        <ul className="flex space-x-2 md:space-x-4 text-base h-10">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CategoryJournals;
