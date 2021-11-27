import { useCallback, useEffect, useState } from 'react';
import { Auth } from '@supabase/ui';
import { getAnyLangs } from 'src/libs/supabase';
import { LangList } from 'src/components/LangList';
import { PostLang } from 'src/components/PostLang';

export type Lang = {
  id: number;
  user_id: string;
  body: string;
  created_at: Date;
};

const App = () => {
  const { user } = Auth.useUser();
  const [langs, setLangs] = useState<Lang[]>([]);

  const getLangList = useCallback(async () => {
    const data = await getAnyLangs();
    setLangs(data);
  }, [setLangs]);

  useEffect(() => {
    getLangList();
  }, [getLangList]);
  return (
    <>
      {user && (
        <>
          <LangList langs={langs} />
          <PostLang getLangList={getLangList} uuid={user.id} />
        </>
      )}
    </>
  );
};
export default App;
