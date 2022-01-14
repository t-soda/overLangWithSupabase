import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Disclosure } from "@headlessui/react";
import axios from "axios";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { Item } from "src/components/Item";
import { LangList } from "src/components/LangList";
import { SortableItem } from "src/components/SortableItem";
import { getLang, getFinished } from "src/libs/supabase";
import { Lang } from "src/pages";
import { client } from "src/libs/supabase";
import { Auth } from "@supabase/ui";

interface RenderWordProps {
  word: string;
  key: number;
}

const UserPage = () => {
  const { user } = Auth.useUser();
  const [items, setItems] = useState<string[]>([]);
  const [translatedLang, setTranslatedLang] = useState<string>("");
  const [lang, setLang] = useState<Lang>();
  const [activeId, setActiveId] = useState(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [finishedDate, setFinishedDate] = useState<string>("");

  const location = useRouter();

  useEffect(() => {
    (async () => {
      const langData = await getLang(location.query.langId);
      const finishedData = await getFinished(user!.id, location.query.langId);
      const translateAPI =
        "https://script.google.com/macros/s/AKfycbxdObsyAVIBl_viwOXd2Pqda_uBcL5edZNWTCz4T0yFIDT8hnJ00hs6uIdmFzl6CbP9/exec";
      const response = await axios.get(
        `${translateAPI}?word=${langData?.body}`
      );
      console.log(response);
      setTranslatedLang(response.data.result);
      setItems(
        shuffleArray(response.data.result.split(" ").map((value: any) => value))
      );
      setLang(langData);
      setFinishedDate(finishedData.created_at);
    })();
  }, [location.isReady]);

  useEffect(() => {
    checkLang();
  }, [items]);

  const shuffleArray = (inputArray: string[]) => {
    return inputArray.sort(() => Math.random() - 0.5);
  };

  const checkLang = () => {
    if (translatedLang == "" || items.join("") == "") return;
    console.log(translatedLang);
    console.log(items.join(""));
    if (translatedLang.replace(/\s+/g, "") === items.join("")) {
      setIsFinished(true);
      if (!finishedDate) {
        postFinished(user!.id, location.query.langId);
      }
    }
  };

  const postFinished = async (
    users_id: string,
    langId: string | string[] | undefined
  ) => {
    const { error } = await client.from("finishes").insert({
      users_id: users_id,
      langs_id: langId,
    });
    if (!error) {
      return;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: any) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  function handleDragOver(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i === active.id);
        const newIndex = items.findIndex((i) => i === over.id);
        console.log(active);
        console.log(over);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div>
      <p>{lang?.body}</p>
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
      {isFinished && <p>OK</p>}
      {finishedDate && <p>クリア済:{finishedDate}</p>}

      {items && (
        <div className="flex">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <SortableContext items={items}>
              {items.map((word: string) => {
                return <SortableItem id={word} key={word} />;
              })}
            </SortableContext>
            <DragOverlay>
              {activeId ? <Item id={activeId} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default UserPage;
