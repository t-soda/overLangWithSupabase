import { Auth } from '@supabase/ui';
import { PostLang } from 'src/components/PostLang';
import { MyLangList } from 'src/components/MyLangList';
import { EveryLangList } from 'src/components/EveryLangList';
import { useState } from 'react';

export type Lang = {
  id: number;
  users_id: string;
  name: string;
  body: string;
  created_at: Date;
};

export type Profiles = {
  user_name: string;
};

const App = () => {
  const { user } = Auth.useUser();
  const [switchLangs, setSwitchLangs] = useState<string>('MyLangs');

  const RenderLangList = () => {
    switch (switchLangs) {
      case 'MyLangs':
        return <MyLangList user={user!} />;
      case 'EveryLangs':
        return <EveryLangList user={user!} />;
      default:
        return <div>エラーが発生しました。</div>;
    }
  };

  return (
    <>
      {user && (
        <>
          <button onClick={() => setSwitchLangs('MyLangs')}>[My]</button>
          <button onClick={() => setSwitchLangs('EveryLangs')}>[Every]</button>
          <PostLang users_id={user.id} />
          {user ? <RenderLangList /> : <div>loading...</div>}
        </>
      )}
    </>
  );
};
export default App;
