import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Character from '../models/Writing_Excercise'

const Index = ({ characters }) => (
  <>
     <div>
     <div className="nav">

          <div className="center nav-writing-exc">
      
        <ul className="writing-excercises-grid">
       
          <li >
          <Link className="nav-link" href="/characters">
            <a>
              {" "}
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/161/959/large_2x/cartoon-wild-animals-in-the-jungle-free-vector.jpg"
                alt="charachter"
                width="100px"
                className="writing-excercises-icons"
              />
              <br/>
              <label className="writing-excercises-icon-descriptor">Characters</label>
              </a>
              </Link>
          </li>
          <li >
          <Link className="nav-link" href="/plots">
            <a>
              {" "}
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/142/632/large_2x/princesa-story-cartoon-free-vector.jpg"
                alt="plot"
                width="100px"
                className="writing-excercises-icons"
              />
              <br/>
              <label className="writing-excercises-icon-descriptor">Plot</label>
              </a>
              </Link>
          </li>
          <li >
              {" "}
              <Link className="nav-link" href="/writing_excercises"><a>
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/214/921/original/vector-workplace-with-typewriter-illustration.jpg"
                border="0"
                className="writing-excercises-icons"
                width="100px"
                height="100px"
              />{" "}
              <br/>
              <label className="writing-excercises-icon-descriptor">
                Random writing excercises
              </label>
              </a>
              </Link>
          </li>
        </ul>
      </div>
      </div>
<p>Image Attribution</p>
<a href="https://www.vecteezy.com/free-vector/writing">Writing Vectors by Vecteezy</a>
<a href="https://www.vecteezy.com/free-vector/animals">Animals Vectors by Vecteezy</a>
<a href="https://www.vecteezy.com/free-vector/story">Story Vectors by Vecteezy</a>
        </div>
  </>
)

/* Retrieves character(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Character.find({})
  const characters = result.map((doc) => {
    const character = doc.toObject()
    character._id = character._id.toString()
    return character
  })

  return { props: { characters: characters } }
}

export default Index
