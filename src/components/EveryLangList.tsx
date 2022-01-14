import React, { useEffect, useState } from "react";
import { getAnyLangs } from "src/libs/supabase";
import { Lang } from "src/pages";
import { LangList } from "src/components/LangList";
import { User } from "@supabase/gotrue-js";

export const EveryLangList = ({ user }: { user: User }) => {
  const [langs, setLangs] = useState<Lang[] | any[]>([]);
  const [page, setPage] = useState<number>(0);

  const getEveryLangList = async () => {
    if (user) {
      const data = await getAnyLangs(page);
      const newLangs = [...langs, ...data];
      setLangs(newLangs);
      console.log({ langs: langs });
    }
    setPage((page) => page + 1);
  };
  const getMore = () => {
    getEveryLangList();
  };

  useEffect(() => {
    getEveryLangList();
  }, []);
  return (
    <>
      <LangList langs={langs} />
      <button onClick={() => getMore()}>show more...</button>
    </>
  );
};
