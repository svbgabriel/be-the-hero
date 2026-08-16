import { useEffect, useState } from "preact/hooks";

interface ProfileHeaderProps {
  ongName?: string;
}

export default function ProfileHeader({ ongName: initialOngName }: ProfileHeaderProps) {
  const [ongName, setOngName] = useState(initialOngName || "");

  useEffect(() => {
    if (!ongName) {
      setOngName(localStorage.getItem("ongName") || "");
    }
  }, [ongName]);

  return <span>Welcome, {ongName}</span>;
}
