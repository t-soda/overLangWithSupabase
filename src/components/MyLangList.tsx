import React, { useEffect, useState } from 'react';
import { getFollows, getMyLangs } from 'src/libs/supabase';
import { Lang } from 'src/pages';
import { LangList } from 'src/components/LangList';
import { User } from '@supabase/gotrue-js';

export const MyLangList = ({ user }: { user: User }) => {
  const [langs, setLangs] = useState<Lang[] | any[]>([]);
  const [page, setPage] = useState<number>(0);

  const getMyLangList = async () => {
    if (user) {
      const follows = await getFollows(user.id);
      const data = await getMyLangs(user.id, follows, page);
      const newLangs = [...langs, ...data];
      setLangs(newLangs);
      console.log({ langs: langs });
    }
    setPage((page) => page + 1);
  };
  const getMore = () => {
    getMyLangList();
  };

  useEffect(() => {
    getMyLangList();
  }, []);
  return (
    <>
      <LangList langs={langs} />
      <button onClick={() => getMore()}>show more...</button>
    </>
  );
};
