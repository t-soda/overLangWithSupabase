import { Disclosure } from "@headlessui/react";
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

  return (
    <div>
      <p>{lang?.translated_body}</p>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="py-2">
              {open ? "原文を非表示" : "原文を表示"}
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              {lang?.body}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default UserPage;
