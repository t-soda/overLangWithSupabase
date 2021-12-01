import { useCallback, useEffect, useState } from "react";
import { getAnyLangs } from "src/libs/supabase";
import { Lang } from "src/pages/index";
import Link from "next/link";

type LangListProps = {
  langs: Lang[];
};

export const LangList = (props: LangListProps) => {
  return (
    <ul>
      {props.langs.map((lang, key) => (
        <li key={key}>
          <Link href={`/${lang.user_name}`} passHref>
            <a>{lang.user_name}</a>
          </Link>
          :{" "}
          <Link href={`/l/${lang.id}`} passHref>
            <a> {lang.body}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
