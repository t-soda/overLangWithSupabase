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
import Link from "next/link";
import router, { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { Item } from "src/components/Item";
import { LangList } from "src/components/LangList";
import { SortableItem } from "src/components/SortableItem";
import { getLang } from "src/libs/supabase";
import { Lang } from "src/pages";

interface RenderWordProps {
  word: string;
  key: number;
}

const UserPage = () => {
  const [items, setItems] = useState<string[]>([]);
  const [lang, setLang] = useState<Lang>();
  const [activeId, setActiveId] = useState(null);

  const location = useRouter();
  const getLangList = async () => {
    const data = await getLang(location.query.langId);
    setLang(data);
  };

  useEffect(() => {
    getLangList();
    if (lang) {
      setItems(lang?.translated_body.split(" ").map((value) => value));
    }
  }, [location.isReady, lang]);
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragEnd}
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
