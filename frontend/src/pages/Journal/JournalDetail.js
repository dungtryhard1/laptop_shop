import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { publicjournalsApi } from "../../service/publicJounals.service";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const JournalDetail = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    const fetchJournalDetail = async () => {
      try {
        const response = await publicjournalsApi.getJounalByID(id);
        setJournal(response.data);
      } catch (error) {
        console.error("Error fetching journal detail:", error);
      }
    };

    fetchJournalDetail();
  }, [id]);

  if (!journal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-4">
          <Link to="/journal" className="mr-2">
            <HiOutlineArrowNarrowLeft className="w-6 h-6" />
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-center">{journal.title}</h1>
        <img
          src={journal.image.url}
          alt="Journal Image"
          className="w-full h-auto mb-4"
        />
        <span dangerouslySetInnerHTML={{ __html: journal.content }}></span>
        <p className="text-gray-600 mt-2">
          Publish Date:{" "}
          {new Date(journal.publishDate).toLocaleDateString("en-US")}
        </p>
        <p className="text-gray-600">Category: {journal.categoryBlogId.name}</p>
      </div>
    </div>
  );
};

export default JournalDetail;
