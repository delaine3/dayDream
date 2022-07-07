import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { random_writing_exercise_list } from "../lib/writingExcercisesList";
import { Form, TextArea } from "semantic-ui-react";

const WritingExcerciseForm = ({
  formId,
  writingExcerciseForm,
  forNewCharacter = true,
}) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    promt_text_area_contents: writingExcerciseForm.promt_text_area_contents,
    randomWritingExcercise: writingExcerciseForm.randomWritingExcercise,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/writing_excercise/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/writing_excercise/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update character");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/writing_excercise", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add character");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === "into_astrology" ? target.checked : target.value;

    const name = target.name;
    if (name == "randomWritingExcercise") {
      value =
        random_writing_exercise_list[
          Math.floor(Math.random() * random_writing_exercise_list.length)
        ];
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewCharacter ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure character info is filled for character charachter_name, charachter_name, birth_place, and image url*/
  const formValidate = () => {
    let err = {};

    return err;
  };

  return (
    <div className="char-form">
      <h1 id="page-title">Writing Excercise</h1>
      <Form id={formId} onSubmit={handleSubmit}>
        <p className="char-blurb">
          Click the button below for a writing excercise prompt. Respond to it
          in the text area below.
        </p>

        <div>
          <p>{form.randomWritingExcercise}</p>
          <button name="randomWritingExcercise" onClick={handleChange}>
            New Writing Prompt
          </button>

          <label htmlFor="promt_text_area_contents">Submission</label>

          <TextArea
            style={{ minHeight: 300 }}
            type="text"
            name="promt_text_area_contents"
            value={form.promt_text_area_contents}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit">
            Submit
          </button>

          <>{message != "" ? message : <></>}</>
          <div>
            {Object.keys(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default WritingExcerciseForm;
