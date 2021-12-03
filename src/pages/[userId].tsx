import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { LangList } from "src/components/LangList";
import { client, getUserLangs, getProfile, getUserId } from "src/libs/supabase";
import { Lang } from "src/pages";
import { Follow } from "src/components/Follow";
import { Auth } from "@supabase/ui";

const UserPage = () => {
  const [followedId, setFollowedId] = useState<string>("");
  const [langs, setLangs] = useState<Lang[]>([]);
  const { user } = Auth.useUser();
  const location = useRouter();
  const getLangList = async () => {
    const data = await getUserLangs(location.query.userId);
    setLangs(data);
  };

  const getUserInfo = async () => {
    const data = await getUserId(location.query.userId);
    if (data) {
      setFollowedId(data.users_id);
    }
  };

  useEffect(() => {
    getLangList();
    getUserInfo();
  }, [location.isReady]);
  console.log(user);

  return (
    <>
      {user && followedId && (
        <>
          <Follow followId={user.id} followedId={followedId} />
          <LangList langs={langs} />
        </>
      )}
    </>
  );
};

export default UserPage;
