import { useCallback, useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import { getAnyLangs, getMyLangs } from "src/libs/supabase";
import { LangList } from "src/components/LangList";
import { PostLang } from "src/components/PostLang";

export type Lang = {
  id: number;
  users_id: string;
  name: string;
  body: string;
  created_at: Date;
};

export type Profiles = {
  user_name: string;
};

const App = () => {
  const [isAny, setIsAny] = useState<boolean>();
  const { user } = Auth.useUser();
  const [langs, setLangs] = useState<Lang[]>([]);

  const getMyLangList = async () => {
    setIsAny(false);
    const data = await getMyLangs(user?.id);
    setLangs(data);
  };

  const getAnyLangList = async () => {
    setIsAny(true);
    const data = await getAnyLangs();
    setLangs(data);
  };

  useEffect(() => {
    getAnyLangList();
  }, []);

  return (
    <>
      {user && (
        <>
          <button onClick={() => getMyLangList()}>&#x1f3e0;</button>
          <button onClick={() => getAnyLangList()}>Any</button>
          <LangList langs={langs} />
          <PostLang
            getLangList={isAny ? getAnyLangList : getMyLangList}
            users_id={user.id}
          />
        </>
      )}
    </>
  );
};
export default App;
