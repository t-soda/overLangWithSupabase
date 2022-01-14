import { Auth } from "@supabase/ui";
import Link from "next/link";
import { EditProfile } from "src/components/EditProfile";

export const Header = () => {
  const { user } = Auth.useUser();

  return (
    <header>
      <Link href="/" passHref>
        <a>
          <h1>Over Lang</h1>
        </a>
      </Link>
      {/* <EditProfile user={user} /> */}
    </header>
  );
};
