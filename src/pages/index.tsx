import { useCallback, useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import { getAnyLangs } from "src/libs/supabase";
import { LangList } from "src/components/LangList";
import { PostLang } from "src/components/PostLang";
import { useAppContext } from "src/layout/AuthLayout";

export type Lang = {
  id: number;
  user_id: string;
  body: string;
  created_at: Date;
  user_name: string;
};

export type Profiles = {
  user_name: string;
};

const App = () => {
  const test = useAppContext();
  const { user } = Auth.useUser();
  const [langs, setLangs] = useState<Lang[]>([]);
  console.log(test);

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
          <PostLang getLangList={getLangList} user_id={test.id} />
        </>
      )}
    </>
  );
};
export default App;
