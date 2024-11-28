import { auth, signOut } from "../../../../auth";
import Dashboard from "@/components/Dashboard/page";

import DefaultLayout from "@/components/Layouts/DefaultLayout";


const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="text-center">
      {JSON.stringify(session?.user)}

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
      <DefaultLayout>
        <Dashboard/>
      </DefaultLayout>
    </div>
  );
};

export default SettingsPage;
