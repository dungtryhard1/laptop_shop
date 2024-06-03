import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { journalApi } from "../../../../service/journals.service";
import { categoryJournalApi } from "../../../../service/categoryJournal.service";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddJournal() {
  const initialState = {
    content: "",
    title: "",
    publishDate: "",
    categoryBlogId: "",
    images: [], // New field for images
  };

  const [journal, setJournal] = useState(initialState);
  const [categoryJournals, setCategoryJournals] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCategoryJournals = async () => {
      try {
        const response = await categoryJournalApi.getCategoryJournal();
        setCategoryJournals(response.data);
      } catch (error) {
        console.error("Error fetching category journals:", error);
      }
    };

    fetchCategoryJournals();
  }, []);

  const handleEditorChange = (field, editor) => {
    const data = editor.getData();
    setJournal({ ...journal, [field]: data });
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const files = Array.from(e.target.files);
      setJournal({ ...journal, images: files });
    } else {
      const value = e.target.value;
      setJournal({ ...journal, [e.target.name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("content", journal.content);
      formData.append("title", journal.title);
      formData.append("publishDate", journal.publishDate);
      formData.append("categoryBlogId", journal.categoryBlogId);
      journal.images.forEach((image, index) => {
        formData.append("images", image, `images.${index}`);
      });
      toast.info("Add New Journal will take a few seconds");
      const response = await journalApi.createJournal(formData);
      nav("/admin/journals");
      toast.success("Add New Journal Successfully!!!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error creating journal:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Journal</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={journal.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Content
            </label>
            <div className="overflow-y-auto max-h-64">
              <CKEditor
                editor={ClassicEditor}
                data={journal.content}
                onChange={(event, editor) =>
                  handleEditorChange("content", editor)
                }
              />
            </div>
          </div>
          {/* Publish Date */}
          <div>
            <label
              htmlFor="publishDate"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Publish Date
            </label>
            <input
              id="publishDate"
              name="publishDate"
              type="date"
              value={journal.publishDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Category Journal */}
          <div>
            <label
              htmlFor="categoryBlogId"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Category Journal
            </label>
            <select
              id="categoryBlogId"
              name="categoryBlogId"
              value={journal.categoryBlogId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Category Journal</option>
              {categoryJournals.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Images */}
          <div>
            <label
              htmlFor="images"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Images
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Form Actions */}
          <div className="flex flex-col items-center md:flex-row md:justify-end space-y-2 md:space-y-0 mt-4">
            {/* Add button */}
            <button
              type="submit"
              className="w-full md:w-24 p-2 bg-blue-500 text-white rounded mr-3"
            >
              Add
            </button>
            {/* Reset button */}
            <button
              type="reset"
              className="w-full md:w-24 p-2 bg-yellow-500 text-white rounded mr-3"
            >
              Reset
            </button>
            {/* Cancel button */}
            <Link to="/admin/journals">
              <button
                type="button"
                className="w-full md:w-24 p-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJournal;
