import { useState } from "preact/hooks";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  async function handleRegister(e: Event) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await fetch("/api/ongs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      const resData = await response.json();

      alert(`Your access ID: ${resData.id}`);

      globalThis.location.href = "/";
    } catch (_err) {
      alert("Registration error, please try again.");
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="NGO Name"
        value={name}
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
      />
      <input
        type="text"
        placeholder="WhatsApp"
        value={whatsapp}
        onInput={(e) => setWhatsapp((e.target as HTMLInputElement).value)}
      />
      <div className="input-group">
        <input
          type="text"
          placeholder="City"
          value={city}
          onInput={(e) => setCity((e.target as HTMLInputElement).value)}
        />
        <input
          type="text"
          placeholder="State"
          style={{ width: 80 }}
          value={uf}
          onInput={(e) => setUf((e.target as HTMLInputElement).value)}
        />
      </div>
      <button className="button" type="submit">
        Register
      </button>
    </form>
  );
}
