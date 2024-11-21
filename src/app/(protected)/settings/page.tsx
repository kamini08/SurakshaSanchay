import { auth, signOut } from "../../../../auth";
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};
const SettingsPage = async () => {
  const session = await auth();
  const user = session?.user.id;
  console.log(user);

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
        <ECommerce />
      </DefaultLayout>
    </div>
  );
};

export default SettingsPage;
