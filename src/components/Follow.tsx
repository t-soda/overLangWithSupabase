import { FC, useCallback, useEffect, useState } from "react";
import { client, getIsFollowed } from "src/libs/supabase";

type FollowProps = {
  followingId: number;
  followedId: number;
};

export const Follow: FC<FollowProps> = (props) => {
  const [isFollowed, setIsFollowed] = useState<boolean>();

  const checkIsFollowed = async () => {
    const data = await getIsFollowed(props.followingId, props.followedId);
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
    const { error } = await client
      .from("follows")
      .insert({ following: props.followingId, followed: props.followedId });
    if (error) {
      alert("Failed: follow.");
    }
    checkIsFollowed();
  };

  const unFollow = async () => {
    const { error } = await client
      .from("follows")
      .delete()
      .match({ following: props.followingId, followed: props.followedId });
    if (error) {
      alert("Failed: unfollow.");
    }
    checkIsFollowed();
  };
  if (!props.followingId) return <span>loading...</span>;
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
