// import { auth, signOut } from "../../../../auth";

import { auth, signOut } from "../../../../auth";
import Dashboard from "@/app/Dashboard/page";

const SettingsPage = async () => {
  // const session = await auth();
  // const user = session?.user.id;
  // console.log(user);

  return (
    <div className="text-center">
      {/* {JSON.stringify(session?.user)}

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form> */}

      <Dashboard />
    </div>
  );
};

export default SettingsPage;
