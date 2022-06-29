import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Writing_Excercise from "../../models/Writing_Excercise";

/* Allows you to view writing_excercise card info and delete writing_excercise card*/
const WritingExcPage = ({ writing_excercise }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const charachterID = router.query.id;

    try {
      await fetch(`/api/writing_excercise/${charachterID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the writing_excercise.");
    }
  };

  return (
    <div key={writing_excercise._id}>
      <div className="plot">
        <p className="label ">
          Prompt: <br /> <span>{writing_excercise.randomWritingExcercise}</span>
        </p>
        <label>Response: </label>
        <p className="view">{writing_excercise.promt_text_area_contents}</p>
        <div className="btn-container">
          <Link
            href="/[id]/editWritingExcercise"
            as={`/${writing_excercise._id}/editWritingExcercise`}
          >
            <button className="edit">Edit</button>
          </Link>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();
  const writing_excercise = await Writing_Excercise.findById(params.id).lean();
  writing_excercise._id = writing_excercise._id.toString();
  return { props: { writing_excercise } };
}

export default WritingExcPage;
