import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { LangList } from 'src/components/LangList';
import { getLangs } from 'src/libs/supabase';
import { Lang } from 'src/pages';

const UserPage = () => {
  const [langs, setLangs] = useState<Lang[]>([]);
  const location = useRouter();
  const getLangList = async () => {
    const data = await getLangs(location.query.user);
    setLangs(data);
  };

  useEffect(() => {
    getLangList();
  }, [location.isReady]);

  return (
    <div>
      <LangList langs={langs} />
    </div>
  );
};

export default UserPage;
