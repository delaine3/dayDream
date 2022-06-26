import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Character from "../models/Writing_Excercise";

const Index = ({ characters }) => (
  <>
    <div className="writing-exc">
      <Link href="/characters">
        <a className="icon">
          {" "}
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/161/959/large_2x/cartoon-wild-animals-in-the-jungle-free-vector.jpg"
            alt="charachter"
            width="200"
            height="200"
            className="writing-excercises-icons"
          />
          <label className="writing-excercises-icon-descriptor">
            Characters
          </label>
        </a>
      </Link>
      <Link href="/plots">
        <a className="icon">
          {" "}
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/142/632/large_2x/princesa-story-cartoon-free-vector.jpg"
            alt="plot"
            width="200"
            height="200"
            className="writing-excercises-icons"
          />
          <label className="writing-excercises-icon-descriptor">Plot</label>
        </a>
      </Link>{" "}
      <Link href="/writing_excercises">
        <a className="icon">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/214/921/original/vector-workplace-with-typewriter-illustration.jpg"
            border="0"
            className="writing-excercises-icons"
            width="200"
            height="200"
          />{" "}
          <br />
          <label className="writing-excercises-icon-descriptor">
            Random writing excercises
          </label>
        </a>
      </Link>
    </div>
    <div>
      Image Attribution <br/>
      <a href="https://www.vecteezy.com/free-vector/writing">
        Writing Vectors by Vecteezy
      </a><br/>
      <a href="https://www.vecteezy.com/free-vector/animals">
        Animals Vectors by Vecteezy
      </a><br/>
      <a href="https://www.vecteezy.com/free-vector/story">
        Story Vectors by Vecteezy
      </a>
    </div>
  </>
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
