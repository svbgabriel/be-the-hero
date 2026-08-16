import { useState } from "preact/hooks";

export default function NewIncidentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  async function handleNewIncident(e: Event) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      globalThis.location.href = "/profile";
    }
    catch (_err) {
      alert("Error registering case, please try again.");
    }
  }

  return (
    <form onSubmit={handleNewIncident}>
      <input
        type="text"
        placeholder="Case Title"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
      />
      <input
        type="text"
        placeholder="Value in BRL"
        value={value}
        onInput={(e) => setValue((e.target as HTMLInputElement).value)}
      />

      <button className="button" type="submit">
        Register
      </button>
    </form>
  );
}
