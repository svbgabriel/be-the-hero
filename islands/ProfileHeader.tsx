import { useEffect, useState } from "preact/hooks";

export default function ProfileHeader() {
  const [ongName, setOngName] = useState("");

  useEffect(() => {
    setOngName(localStorage.getItem("ongName") || "");
  }, []);

  return <span>Welcome, {ongName}</span>;
}
