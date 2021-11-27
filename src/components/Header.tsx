import { Auth } from '@supabase/ui';
import Link from 'next/link';
import { client } from 'src/libs/supabase';
import { EditProfile } from 'src/components/EditProfile';

export const Header = () => {
  const getProfile = async () => {
    const { data, error } = await client.from('profile').select('*');
    if (!error && data) {
      return data[0];
    }
    return null;
  };

  const userInfo = getProfile();
  const { user } = Auth.useUser();

  return (
    <header>
      <Link href="/" passHref>
        <a>
          <h1>Over Lang</h1>
        </a>
      </Link>
      <EditProfile user={user} />
    </header>
  );
};
