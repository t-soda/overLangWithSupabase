import Link from 'next/link';
import { client } from 'src/libs/supabase';

export const Header = () => {
  const getProfile = async () => {
    const { data, error } = await client.from('profile').select('*');
    if (!error && data) {
      return data[0];
    }
    return null;
  };

  const userInfo = getProfile();

  return (
    <header>
      <Link href="/" passHref>
        <a>
          <h1>Over Lang</h1>
        </a>
      </Link>
      <span>{JSON.stringify(userInfo)}</span>
    </header>
  );
};
