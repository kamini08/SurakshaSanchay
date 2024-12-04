// src/components/LogDetail.tsx
import { auth } from "../../auth";

const LogDetail = async () => {
  const session = await auth(); // Fetch session data
  const userRole = session?.user.role?.toUpperCase();
  const name = session?.user.name;

  return (
    <span className="hidden text-right lg:block">
      <span className="block text-sm font-medium text-black dark:text-white">
        {name}
      </span>
      <span className="block text-xs">{userRole}</span>
    </span>
  );
};

export default LogDetail;
