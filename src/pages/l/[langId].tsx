import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { LangList } from "src/components/LangList";
import { SortableItem } from "src/components/SortableItem";
import { getLang } from "src/libs/supabase";
import { Lang } from "src/pages";

interface RenderWordProps {
  word: string;
  key: number;
}

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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

      {lang && (
        <div className="flex">
          <DndContext sensors={sensors}>
            <SortableContext
              items={lang?.translated_body.split(" ").map((word) => word)}
            >
              {lang?.translated_body
                .split(" ")
                .map((word: string, key: number) => {
                  return <SortableItem value={word} key={key} />;
                })}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default UserPage;
