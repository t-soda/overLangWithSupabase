import { useState } from 'react';
import { client } from 'src/libs/supabase';

type PostLangProps = {
  user_id: number | null;
  getLangList: VoidFunction;
};
export const PostLang = (props: PostLangProps) => {
  const [body, setBody] = useState('');
  const postLang = async (user_id: number | null, body: string) => {
    const { error } = await client
      .from('langs')
      .insert({ user_id: user_id, body: body });
    if (!error) {
      props.getLangList();
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
      <button onClick={() => postLang(props.user_id, body)}>つぶやく</button>
    </div>
  );
};
