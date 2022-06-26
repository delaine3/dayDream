import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { Form, TextArea } from "semantic-ui-react";
import { random_idea } from "../lib/plotIdeas";

const PlotForm = ({ formId, plotForm, forNewPlot = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    plot: plotForm.plot,
    plot_idea: plotForm.plot_idea,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/plot/${id}`, {
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

      mutate(`/api/plot/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update plot");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/plot", {
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
      setMessage("Failed to add plot");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;

    const name = target.name;
    if (name == "plot_idea") {
      value = random_idea[Math.floor(Math.random() * random_idea.length)];
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
      forNewPlot ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure plot info is filled for plot charachter_name, places-lived charachter_name, birth_place, and image url*/
  const formValidate = () => {
    let err = {};

    return err;
  };

  return (
    <>
      <Form id={formId} onSubmit={handleSubmit}>
        <p>{form.plot_idea}</p>
        <button
          className="newFormButton"
          name="plot_idea"
          onClick={handleChange}
        >
          New Writing Prompt
        </button>
        <label htmlFor="plot">Submission</label>
        <TextArea
          style={{ minHeight: 300 }}
          type="text"
          name="plot"
          value={form.plot}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn submit">
          Submit
        </button>
        <>{message != "" ? message : <></>}</>
        <div>
          {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </div>
      </Form>
    </>
  );
};

export default PlotForm;
