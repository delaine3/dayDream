import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Plot from "../../models/Plot";

/* Allows you to view plot card info and delete plot card*/
const PlotsPage = ({ plot }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const charachterID = router.query.id;

    try {
      await fetch(`/api/plot/${charachterID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the plot.");
    }
  };

  return (
    <div key={plot._id}>
      <div className="plot">
        <div className="plot">
          <p className="label ">
            Prompt: <br /> <span className="char-info">{plot.plot_idea}</span>
          </p>
          <label>Response</label>
          <p className="view"> {plot.plot}</p>
        </div>
        <div className="btn-container">
        <Link href="/[id]/editPlot" as={`/${plot._id}/editPlot`}>
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

  const plot = await Plot.findById(params.id).lean();
  plot._id = plot._id.toString();

  return { props: { plot } };
}

export default PlotsPage;
