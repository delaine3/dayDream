import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Character from "../models/Writing_Excercise";

const Index = ({ characters }) => (
  <div>
    <div className="index-grid">
      <div className="index-card">
        <img
          src="https://static.vecteezy.com/system/resources/previews/005/161/959/large_2x/cartoon-wild-animals-in-the-jungle-free-vector.jpg"
          alt="charachter"
          className="writing-excercises-icons"
        />{" "}
        <Link href="/characters">
          <div className="char">
            <button>Character Creator</button>
          </div>
        </Link>
      </div>{" "}
      <div className="index-card">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/142/632/large_2x/princesa-story-cartoon-free-vector.jpg"
          alt="plot"
          className="writing-excercises-icons"
        />{" "}
        <br />
        <Link href="/plots">
          <div className="char">
            <button>Plot Creator</button>
          </div>
        </Link>
      </div>{" "}
      <div className="index-card">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/214/921/original/vector-workplace-with-typewriter-illustration.jpg"
          border="0"
          className="writing-excercises-icons"
        />{" "}
        <Link href="/writing_excercises">
          <div className="char">
            {" "}
            <button>Random writing excercises</button>
          </div>
        </Link>
      </div>
    </div>
    <div id="atrribution">
      Image Attribution: <br />
      <a href="https://www.vecteezy.com/free-vector/writing">
        Writing Vectors by Vecteezy
      </a>
      <br />
      <a href="https://www.vecteezy.com/free-vector/animals">
        Animals Vectors by Vecteezy
      </a>
      <br />
      <a href="https://www.vecteezy.com/free-vector/story">
        Story Vectors by Vecteezy
      </a>
    </div>
  </div>
);

/* Retrieves character(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Character.find({});
  const characters = result.map((doc) => {
    const character = doc.toObject();
    character._id = character._id.toString();
    return character;
  });

  return { props: { characters: characters } };
}

export default Index;
