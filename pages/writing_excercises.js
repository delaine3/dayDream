import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Writing_Excercise from "../models/Writing_Excercise";
import { useState } from "react";

const Index = ({ writing_excercise }) => {
  const [message, setMessage] = useState("");

  const handleDelete = async (itemId) => {
    console.log("Writing excercise id" + itemId);
    try {
      await fetch(`/api/writing_excercise/${itemId}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the writing_excercise.");
    }
  };
  return (
    <div>
      <h1>
        <Link href="/newWritingExc">
          <button className="newFormButton">
            {" "}
            <a>Add writing excercise</a>{" "}
          </button>
        </Link>
      </h1>
      <div className="grid">
        {/* Create a card for each writing_excercise */}
        {writing_excercise.map((writing_excercise) => (
          <div id="my-card" key={writing_excercise._id}>
            <div className="view-card-writ">
              <label>
                {" "}
                <strong> Prompt:</strong>
              </label>
              <div className="prompt-container">
                <span className="">
                  {writing_excercise.randomWritingExcercise.slice(0, 150)}
                  {writing_excercise.randomWritingExcercise.length > 150
                    ? "..."
                    : ""}
                </span>
              </div>
              <label>
                {" "}
                <strong> Response:</strong>
              </label>
              <div className="response-container">
                <span className="char-info">
                  {writing_excercise.promt_text_area_contents.slice(0, 150)}
                  {writing_excercise.promt_text_area_contents.length > 150
                    ? "..."
                    : ""}{" "}
                </span>{" "}
              </div>
              <div className="snap-to-bottom">
                {/* Extra writing_excercise Info: Likes and Dislikes */}
                <Link
                  href="/[id]/editWritingExcercise"
                  as={`/${writing_excercise._id}/editWritingExcercise`}
                >
                  <button className="edit">Edit</button>
                </Link>
                <Link
                  href="/[id]/viewWritingExc"
                  as={`/${writing_excercise._id}/viewWritingExc`}
                >
                  <button className="view-btn">View</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Retrieves writing_excercise(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data  our database */
  const result = await Writing_Excercise.find({});
  const writing_excercise = result.map((doc) => {
    const writing_excercise = doc.toObject();
    writing_excercise._id = writing_excercise._id.toString();
    return writing_excercise;
  });

  return { props: { writing_excercise: writing_excercise } };
}

export default Index;
