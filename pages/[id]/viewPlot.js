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
      <div>
        <img className="view-card-img" src={plot.image_url} />
      </div>
      <br />
      <div>
        <div className="view-card-writ">
          <div>
            <p className="label charachter_name">
              Prompt:<span className="char-info">{plot.plot_idea}</span>
            </p>
            <p className="label places-lived">
              Response: <span className="char-info">{plot.plot}</span>
            </p>
          </div>
          <Link href="/[id]/editPlot" as={`/${plot._id}/editPlot`}>
            <button className="btn edit">Edit</button>
          </Link>
          <button className="btn delete" onClick={handleDelete}>
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
