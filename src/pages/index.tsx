import { useCallback, useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import { getEveryLangs, getFollows, getMyLangs } from "src/libs/supabase";
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
  const [langs, setLangs] = useState<Lang[] | any[]>([]);
  const [page, setPage] = useState<number>(0);

  const getMyLangList = async () => {
    setIsAny(false);
    if (user) {
      const follows = await getFollows(user.id);
      const data = await getMyLangs(user.id, follows, page);
      console.log({ fetch: data });
      const newLangs = [...langs, ...data];
      setLangs(newLangs);
      console.log({ langs: langs });
    }
  };

  const getAnyLangList = async () => {
    setIsAny(true);
    const data = await getEveryLangs(page);
    setLangs(data);
  };

  const getMore = () => {
    setPage((page) => page + 1);
    getMyLangList();
  };

  useEffect(() => {
    getMyLangList();
  }, []);

  return (
    <>
      {user && (
        <>
          <button onClick={() => getMyLangList()}>&#x1f3e0;</button>
          <button onClick={() => getAnyLangList()}>Any</button>
          <LangList langs={langs} />
          <button onClick={() => getMore()}>show more...</button>
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
