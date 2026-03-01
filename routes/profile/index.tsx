import { asset, Head } from "$fresh/runtime.ts";
import Logout from "../../islands/logout.tsx";
import IncidentsList from "../../islands/incidents_list.tsx";
import ProfileHeader from "../../islands/ProfileHeader.tsx";

export default function Profile() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/profile.css" />
      </Head>
      <div className="profile-container">
        <header>
          <img src={asset("/logo.svg")} alt="Be The Hero" />
          <ProfileHeader />

          <a className="button" href="/incidents/new">
            Register new case
          </a>
          <Logout />
        </header>

        <IncidentsList />
      </div>
    </>
  );
}
