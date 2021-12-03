import { FC, useCallback, useEffect, useState } from "react";
import { client, getIsFollowed } from "src/libs/supabase";

type FollowProps = {
  followId: string;
  followedId: string;
};

export const Follow: FC<FollowProps> = (props) => {
  const [isFollowed, setIsFollowed] = useState<boolean>();

  const checkIsFollowed = async () => {
    const data = await getIsFollowed(props.followId, props.followedId);
    if (data) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  };

  useEffect(() => {
    checkIsFollowed();
  }, [props]);

  const follow = async () => {
    const { error } = await client.from("follows").insert({
      follow_users_id: props.followId,
      followed_users_id: props.followedId,
    });
    if (error) {
      alert("Failed: follow.");
    }
    checkIsFollowed();
  };

  const unFollow = async () => {
    const { error } = await client.from("follows").delete().match({
      follow_users_id: props.followId,
      followed_users_id: props.followedId,
    });
    if (error) {
      alert("Failed: unfollow.");
    }
    checkIsFollowed();
  };
  if (!props.followId) return <span>loading...</span>;
  return (
    <>
      {!isFollowed ? (
        <button onClick={() => follow()}>follow</button>
      ) : (
        <button onClick={() => unFollow()}>unfollow</button>
      )}
    </>
  );
};
