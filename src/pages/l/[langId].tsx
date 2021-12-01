import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { LangList } from "src/components/LangList";
import { getLang } from "src/libs/supabase";
import { Lang } from "src/pages";

const UserPage = () => {
  const [lang, setLang] = useState<Lang>();
  const location = useRouter();
  const getLangList = async () => {
    const data = await getLang(location.query.langId);
    setLang(data);
  };

  useEffect(() => {
    getLangList();
  }, [location.isReady]);

  return <div>{lang?.body}</div>;
};

export default UserPage;
