import { getValue } from "firebase/remote-config";

import { remoteConfig } from "@/lib/firebase";

export default function Dashboard() {
  const val = getValue(remoteConfig, "google_sign_in");

  return <>{val.asBoolean() && "You signed in with Google"}</>;
}
