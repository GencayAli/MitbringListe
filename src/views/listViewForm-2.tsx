import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import "../model/listViewForm.css"

interface Submission {
  id: string;
  listId: string;
  name: string;
  item: string;
  people: string;
}

export default function DetailViewRoute() {
  const { id } = useParams(); 
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    item: "",
    people: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/submissions?listId=${id}`)
      .then((response) => response.json())
      .then((data) => setSubmissions(data));
  }, [id]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newSubmission = {
      ...formData,
      listId: id, 
    };

    fetch("http://localhost:3000/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubmission),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmissions((prevSubmissions) => [...prevSubmissions, data]);
        toast.success("Beitrag erfolgreich hinzugefügt!");
        setFormData({ name: "", item: "", people: "" }); 
      });
  }

  return (
    <div>
      <h1>Wer bringt was</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>Wer</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>Was bringt:</span>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>People: </span>
            <input
              type="text"
              name="people"
              value={formData.people}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Beitragen</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Wer</th>
            <th>Was</th>
            <th>Anzahl</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.item}</td>
              <td>{s.people}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
//
