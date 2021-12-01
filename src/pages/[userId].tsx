import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { LangList } from 'src/components/LangList';
import { client, getLangs, getProfile, getUserId } from 'src/libs/supabase';
import { Lang } from 'src/pages';

const UserPage = () => {
  const [id, setId] = useState<string | string[] | undefined>();
  const [followingId, setFollowingId] = useState();
  const [followedId, setFollowedId] = useState();
  const [langs, setLangs] = useState<Lang[]>([]);
  const location = useRouter();
  const getLangList = async () => {
    const data = await getLangs(location.query.userId);
    setLangs(data);
  };

  const getUserInfo = async () => {
    const data = await getUserId(location.query.userId);
    setFollowedId(data.id);
  };

  useEffect(() => {
    getLangList();
    getUserInfo();
  }, [location.isReady]);

  type FollowProps = {
    following_id: number;
    followed_id: number;
  };

  const Follow: FC<FollowProps> = (props) => {
    const following = async () => {
      const { error } = await client
        .from('follows')
        .insert({ following: props.following_id, followed: props.followed_id });
      if (error) {
        alert('Failed: Save Profile.');
      }
    };
    return <button onClick={() => following()}>フォローする</button>;
  };

  return (
    <div>
      <Follow following_id={1} followed_id={2} />
      <LangList langs={langs} />
    </div>
  );
};

export default UserPage;
