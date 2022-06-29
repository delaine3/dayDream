import { useState } from "react";
import { useRouter } from "next/router";
import dbConnect from "../../lib/dbConnect";
import Character from "../../models/Character";

/* Allows you to view character card info and delete character card*/
const PetPage = ({ character }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const charachterID = router.query.id;

    try {
      await fetch(`/api/characters/${charachterID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the character.");
    }
  };

  return (
    <div   key={character._id}>
      <div className="char-img">
        <img className="view-card-img" src={character.image_url} />
        <div className="button-container" ><button className="delete" onClick={handleDelete}>
          Delete
        </button></div>
      </div>
      <div className="view-card-char">
        <div>
          <p className="label charachter_name">
            Character name:
            <span className="char-info">{character.charachter_name}</span>
          </p>
          <p className="label places-lived">
            Places lived:{" "}
            <span className="char-info">{character.places_lived}</span>
          </p>
          <p className="label age">
            Age:<span className="char-info">{character.age}</span>{" "}
          </p>
          <p className="label socioeconomic_status">
            Socioeconomic Status:{" "}
            <span className="char-info"> {character.socioeconomic_status}</span>
          </p>
          <p className="label birth_place">
            Birth Place:{" "}
            <span className="char-info"> {character.birth_place}</span>
          </p>
          <p className="label birth_order">
            Birth Order:{" "}
            <span className="char-info"> {character.birth_order}</span>
          </p>

          <p className="label into_astrology">
            Into Astrology:
            <span className="char-info">
              {" "}
              {character.into_astrology ? <span>Yes</span> : <span>No</span>}
            </span>
          </p>
          <div className="diet info">
            <p className="label">
              Diet:
              <span className="char-info">
                <ul>
                  {character.diet.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </span>
            </p>
          </div>
          <div className="insecurities info">
            <p className="label">
              Insecurities:
              <span className="char-info">
                <ul>
                  {character.insecurities.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </span>
            </p>
          </div>

          <div className="securities info">
            <p className="label">
              Securities
              <span className="char-info">
                <ul>
                  {character.securities.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </span>
            </p>
          </div>
          {/* Extra Character Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">
              Likes
              <span className="char-info">
                <ul>
                  {character.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </span>
            </p>
          </div>
          <div className="dislikes info">
            <p className="label">
              Dislikes
              <span className="char-info">
                <ul>
                  {character.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </span>
            </p>
          </div>
        </div>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const character = await Character.findById(params.id).lean();
  character._id = character._id.toString();

  return { props: { character } };
}

export default PetPage;
