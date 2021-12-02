import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { LangList } from "src/components/LangList";
import { client, getLangs, getProfile, getUserId } from "src/libs/supabase";
import { Lang } from "src/pages";
import { Follow } from "src/components/Follow";
import { Auth } from "@supabase/ui";

const UserPage = () => {
  const [id, setId] = useState<string | string[] | undefined>();
  const [followingId, setFollowingId] = useState<number>(0);
  const [followedId, setFollowedId] = useState<number>(0);
  const [langs, setLangs] = useState<Lang[]>([]);
  const { user } = Auth.useUser();
  const location = useRouter();
  const getLangList = async () => {
    const data = await getLangs(location.query.userId);
    setLangs(data);
  };

  const getUserInfo = async () => {
    const data = await getUserId(location.query.userId);
    if (data) {
      setFollowedId(data.id);
    }
  };

  useEffect(() => {
    getLangList();
    getUserInfo();
  }, [location.isReady]);

  return (
    <div>
      <Follow followingId={user.id} followedId={followedId} />
      <LangList langs={langs} />
    </div>
  );
};

export default UserPage;
