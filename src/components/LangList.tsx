import { useCallback, useEffect, useState } from 'react';
import { Lang } from 'src/pages/index';
import Link from 'next/link';

type LangListProps = {
  langs: Lang[];
};

export const LangList = (props: LangListProps) => {
  return (
    <ul>
      {props.langs.map((lang) => (
        <li key={lang.id}>
          <Link href={`/${lang.name}`} passHref>
            <a>{lang.name}</a>
          </Link>
          :{' '}
          <Link href={`/l/${lang.id}`} passHref>
            <a> {lang.body}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
