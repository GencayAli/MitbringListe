import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import "../../src/App.css";

export default function CreateListRoute() {
  const navigate = useNavigate();
  const [create, setCreate] = useState({
    id: -1,
    kürzel: "",
    title: "",
    email: "",
  }); 

  function handleChange(t: ChangeEvent<HTMLInputElement>) {
    const { name, value } = t.target;
    setCreate((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formdata = new FormData(ev.currentTarget);
    const data = Object.fromEntries(formdata); 

    if (create.id === -1)
      fetch("http://localhost:3000/persons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          toast.success("Liste wurde erfolgreich erstellt.");
          navigate("/liste/" + data.id);
        });
  }

  return (
    <div>
      <h1>Mitbringliste erstellen</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>Kürzel</span>
            <input
              type="text"
              name="kürzel"
              required
              value={create.kürzel}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Title</span>
            <input
              type="text"
              name="title"
              required
              value={create.title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              required
              defaultValue={create.email}
              onChange={handleChange}
            />
          </label>
        </div>{" "}
        <br />
        <button type="submit"> ANLEGEN </button>
      </form>
    </div>
  );
}
