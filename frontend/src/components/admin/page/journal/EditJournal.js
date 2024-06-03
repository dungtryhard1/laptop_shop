import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { journalApi } from "../../../../service/journals.service";
import { categoryJournalApi } from "../../../../service/categoryJournal.service";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditJournal() {
  const [files, setFiles] = useState([]);
  const { journalId } = useParams();
  const [categoryBlogId, setCategoryBlogId] = useState([]);
  const nav = useNavigate();

  const [journal, setJournal] = useState({
    title: "",
    content: "",
    publishDate: null,
    categoryJournalId: "",
    isHidden: false,
    newImage: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryJournalApi.getCategoryJournal();
        setCategoryBlogId(response.data);
      } catch (error) {
        console.error("Error fetching category journals:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await journalApi.getJournalById(journalId);
        setJournal(response.data);
      } catch (error) {
        console.error("Error fetching journal:", error);
      }
    };

    if (journalId) {
      fetchJournal();
    }
  }, [journalId]);

  const handleDeleteImage = (id) => {
    console.log("Delete image with ID:", id);
  };

  const handleEditorChange = (field, editor) => {
    const data = editor.getData();
    setJournal((prevJournal) => ({
      ...prevJournal,
      [field]: data,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setJournal((prevJournal) => ({
        ...prevJournal,
        [name]: checked,
      }));
    } else if (name === "newImage") {
      const imageFiles = Array.from(files);
      setJournal((prevJournal) => ({
        ...prevJournal,
        [name]: imageFiles,
      }));
      const selectedFiles = Array.from(e.target.files);
      setFiles([...selectedFiles]);
    } else {
      setJournal((prevJournal) => ({
        ...prevJournal,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append title, content, publishDate, and categoryBlogId to formData
      formData.append("blog[title]", journal.title);
      formData.append("blog[content]", journal.content);
      formData.append("blog[publishDate]", journal.publishDate);
      formData.append("blog[categoryBlogId]", journal.categoryBlogId);
      formData.append("blog[isHidden]", journal.isHidden);

      // Append newImage files to formData
      if (journal.newImage) {
        journal?.newImage.forEach((imageFile, index) => {
          formData.append(`images`, imageFile, `images.${index}`);
        });
      }
      toast.info("Update Journal will take a few seconds");

      // Submit formData
      await journalApi.updateJournal(journalId, formData);
      nav("/admin/journals");
      // Show success message
      toast.success("Update Journal Successfully!!!");
    } catch (error) {
      // Show error message
      console.error("Error updating journal:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Journal</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="title"
              value={journal.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
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
          <div>
            <label
              htmlFor="publishDate"
              className="block mb-2 text-sm font-medium text-gray-600 flex items-center"
            >
              <span className="mr-2">
                <FaCalendarAlt />
              </span>
              Publish Date
            </label>
            <DatePicker
              selected={
                journal.publishDate ? new Date(journal.publishDate) : null
              }
              onChange={(date) =>
                setJournal((prevJournal) => ({
                  ...prevJournal,
                  publishDate: date,
                }))
              }
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 border border-gray-300 rounded"
              popperPlacement="bottom-start"
            />
          </div>

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
              {categoryBlogId.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  selected={category._id === journal.categoryBlogId}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="flex items-center">
            <input
              id="isHidden"
              name="isHidden"
              type="checkbox"
              checked={journal.isHidden}
              onChange={handleChange}
              className="mr-2 h-6 w-6 text-blue-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <label
              htmlFor="isHidden"
              className="text-sm font-medium text-gray-600"
            >
              Hide Journal
            </label>
          </div> */}

          <div className="flex">
            <label>ADD NEW IMAGES</label>
            <input
              name="newImage"
              type="file"
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded"
              multiple
            />
          </div>
          <div className=" flex gap-3 h-16 w-full">
            {files.map((file, index) => (
              <img
                className=""
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
              />
            ))}
          </div>
          <div className="flex items-center md:flex-row md:justify-end space-y-2 md:space-y-0 mt-4">
            <button
              type="submit"
              className="w-full md:w-24 p-2 bg-blue-500 text-white rounded mr-3"
            >
              Update
            </button>
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

export default EditJournal;
