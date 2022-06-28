import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Plot from "../models/Plot";
import { useState } from "react";

const Index = ({ plot }) => {
  const [message, setMessage] = useState("");

  const handleDelete = async (itemId) => {
    console.log("Writing excercise id" + itemId);
    try {
      await fetch(`/api/plot/${itemId}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the plot.");
    }
  };
  return (
    <div>
      <h1>
        <Link href="/newPlot">
          <button className="newFormButton">
            {" "}
            <a>Add plot</a>{" "}
          </button>
        </Link>
      </h1>
      <div className="grid">
        {/* Create a card for each plot */}
        {plot.map((plot) => (
          <div id="my-card" key={plot._id}>
            <div className="view-card-writ">
              <div>
                <p className="label blurb ">
                  Prompt: <span className="char-info">{plot.plot_idea}</span>
                </p>
                <p className="label blurb">
                  Response: <span className="char-info">{plot.plot}</span>{" "}
                </p>
                <div className="btn-container">
                  <Link href="/[id]/editPlot" as={`/${plot._id}/editPlot`}>
                    <button className="btn edit">Edit</button>
                  </Link>
                  <Link href="/[id]/viewPlot" as={`/${plot._id}/viewPlot`}>
                    <button className="btn open">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Retrieves plot(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data  our database */
  const result = await Plot.find({});
  const plot = result.map((doc) => {
    const plot = doc.toObject();
    plot._id = plot._id.toString();
    return plot;
  });

  return { props: { plot: plot } };
}

export default Index;
