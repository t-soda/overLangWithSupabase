import { useState } from 'react';
import { client } from 'src/libs/supabase';

type PostLangProps = {
  users_id: string;
};
export const PostLang = (props: PostLangProps) => {
  const [body, setBody] = useState('');
  const postLang = async (users_id: string, body: string) => {
    const { error } = await client
      .from('langs')
      .insert({ users_id: users_id, body: body });
    if (!error) {
      setBody('');
      return;
    }
  };

  return (
    <div>
      <input
        value={body}
        type="text"
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button onClick={() => postLang(props.users_id, body)}>Langs!</button>
    </div>
  );
};
