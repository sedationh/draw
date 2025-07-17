import { NonDeletedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { BinaryFiles } from "@excalidraw/excalidraw/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";

export type DrawData = {
  [page_id: string]: {
    elements: readonly NonDeletedExcalidrawElement[];
    updatedAt: string;
    name: string;
    files?: BinaryFiles;
  };
};

type DrawDataStore = {
  data: DrawData;
  setPageData: (
    page_id: string,
    elements: readonly NonDeletedExcalidrawElement[],
    updatedAt: string,
    name: string,
    files?: BinaryFiles
  ) => void;
  getPageData: (page_id: string) => DrawData[string] | undefined;
};

// ✅ Configure persist to use localForage (IndexedDB)
const drawDataStore = create<DrawDataStore>()(
  persist(
    (set, get) => ({
      data: {},
      setPageData: (page_id, elements, updatedAt, name, files) =>
        set((state) => {
          const currentData = state.data[page_id];
          if (
            !currentData ||
            new Date(updatedAt) > new Date(currentData.updatedAt)
          ) {
            return {
              data: {
                ...state.data,
                [page_id]: { elements, updatedAt, name, files },
              },
            };
          }
          return state;
        }),
      getPageData: (page_id) => get().data[page_id],
    }),
    {
      name: "draw-data-store",
      storage: {
        getItem: async (name) => {
          const value = await localforage.getItem(name);
          return value ? JSON.parse(value as string) : null;
        },
        setItem: async (name, value) => {
          await localforage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await localforage.removeItem(name);
        },
      },
    }
  )
);

export { drawDataStore };
