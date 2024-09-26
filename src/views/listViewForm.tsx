/* import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Submission, Person } from "../model/person";

export default function DetailViewRoute() {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [listTitle, setListTitle] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    item: "",
    people: "",
  });
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/persons/${id}`)
      .then((response) => response.json())
      .then((data: Person) => {
        setListTitle(data.title);
      });

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

  function handleEdit(id: string) {
    const submissionToEdit = submissions.find((s) => s.id === id);
    if (submissionToEdit) {
      setFormData({
        name: submissionToEdit.name,
        item: submissionToEdit.item,
        people: submissionToEdit.people,
      });
      setIsEditing(id);
    }
  }

  function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedSubmission = {
      ...formData,
      listId: id,
    };

    fetch(`http://localhost:3000/submissions/${isEditing}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSubmission),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((s) => (s.id === isEditing ? updatedData : s))
        );
        toast.success("Beitrag erfolgreich aktualisiert!");
        setIsEditing(null);
        setFormData({ name: "", item: "", people: "" });
      });
  }

  return (
    <div>
      <h1>{listTitle}</h1>
      <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
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
        <button type="submit">
          {isEditing ? "Aktualisieren" : "Beitragen"}
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Wer</th>
            <th>Was</th>
            <th>Anzahl</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.item}</td>
              <td>{s.people}</td>
              <td>
                <button onClick={() => handleEdit(s.id)}>ändern</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 */