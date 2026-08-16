import { define } from "@/utils.ts";
import { listIncidentsByOng } from "@/repository/incident.repository.ts";
import { findOng } from "@/repository/ong.repository.ts";
import { Incident } from "@/model/incident.ts";
import Logout from "@/islands/Logout.tsx";
import IncidentsList from "@/islands/IncidentsList.tsx";
import ProfileHeader from "@/islands/ProfileHeader.tsx";

export default define.page(async function Profile(ctx) {
  const ongId = ctx.state?.ongId;
  let incidents: Incident[] = [];
  let ongName = "";

  if (ongId) {
    incidents = await listIncidentsByOng(ongId);
    const ong = await findOng(ongId);
    if (ong) {
      ongName = ong.name;
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src="/logo.svg" alt="Be The Hero" />
        <ProfileHeader ongName={ongName} />

        <a className="button" href="/incidents/new">
          Register new case
        </a>
        <Logout />
      </header>

      <IncidentsList initialIncidents={incidents} />
    </div>
  );
});
