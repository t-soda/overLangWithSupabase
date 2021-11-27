import { useState } from 'react';
import { client } from 'src/libs/supabase';

type PostLangProps = {
  uuid: string;
  getLangList: VoidFunction;
};
export const PostLang = (props: PostLangProps) => {
  const [body, setBody] = useState('');
  const postLang = async (uuid: string, body: string) => {
    const { error } = await client
      .from('langs')
      .insert({ user_id: uuid, body: body });
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
      <button onClick={() => postLang(props.uuid, body)}>つぶやく</button>
    </div>
  );
};
