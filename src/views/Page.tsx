import { useEffect, useState, useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import { NonDeletedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import {
  ExcalidrawImperativeAPI,
  BinaryFiles,
} from "@excalidraw/excalidraw/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { getDrawData, setDrawData } from "@/db/draw";
import { drawDataStore } from "@/stores/drawDataStore";

type PageProps = {
  id: string;
};

export default function Page({ id }: PageProps) {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { theme } = useTheme();

  const { refetch, isFetching } = useQuery({
    queryKey: ["page", id],
    queryFn: () => getDrawData(id),
    enabled: false,
  });

  const mutation = useMutation({
    mutationFn: (data: {
      elements: NonDeletedExcalidrawElement[];
      name: string;
      files?: BinaryFiles;
    }) => setDrawData(id, data.elements, data.name, data.files),
    onSuccess: () => {
      setIsSaving(false);
    },
    onError: (error: Error) => {
      setIsSaving(false);
      toast("An error occurred while saving to the server", {
        description: error.message,
      });
    },
  });

  const { mutate } = mutation;

  // manual fetch data from server
  const fetchDataFromServer = useCallback(async () => {
    try {
      const result = await refetch();
      if (result.data?.data && excalidrawAPI) {
        const pageData = result.data.data[0].page_elements;
        const elements = pageData.elements || [];
        const files = pageData.files || {};

        excalidrawAPI.updateScene({
          elements: elements,
          appState: { theme: theme },
        });

        // Update files if they exist
        if (Object.keys(files).length > 0) {
          excalidrawAPI.addFiles(Object.values(files));
        }

        setName(result.data.data[0].name);

        // 同时更新本地存储
        const updatedAt = new Date().toISOString();
        drawDataStore
          .getState()
          .setPageData(
            id,
            elements,
            updatedAt,
            result.data.data[0].name,
            files,
          );

        toast("Data loaded successfully from server");
      }
      if (result.data?.error) {
        toast("An error occurred", { description: result.data.error.message });
      }
    } catch (error) {
      toast("Failed to fetch data from server");
      console.error("Error fetching data:", error);
    }
  }, [refetch, excalidrawAPI, theme, id]);

  const setSceneData = useCallback(async () => {
    if (excalidrawAPI) {
      const scene = excalidrawAPI.getSceneElements();
      const files = excalidrawAPI.getFiles();
      const updatedAt = new Date().toISOString();

      const existingData = drawDataStore.getState().getPageData(id);

      if (
        JSON.stringify(existingData?.elements) !== JSON.stringify(scene) ||
        JSON.stringify(existingData?.files) !== JSON.stringify(files)
      ) {
        setIsSaving(true);
        // Save locally first
        drawDataStore.getState().setPageData(id, scene, updatedAt, name, files);

        // Then push to API
        mutate(
          {
            elements: scene as NonDeletedExcalidrawElement[],
            name,
            files,
          },
          {
            onSettled() {
              setIsSaving(false);
            },
          },
        );
      }
    }
  }, [excalidrawAPI, id, name, mutate]);

  useEffect(() => {
    // Load data from local storage if available
    const localData = drawDataStore.getState().getPageData(id);
    if (localData && excalidrawAPI) {
      // need to wait for excalidrawAPI to be ready
      setTimeout(() => {
        excalidrawAPI.updateScene({
          elements: localData.elements,
          appState: { theme: theme },
        });
        // Load files if they exist
        if (localData.files && Object.keys(localData.files).length > 0) {
          excalidrawAPI.addFiles(Object.values(localData.files));
        }
      }, 1000);

      setName(localData.name);
    }
  }, [id, excalidrawAPI, theme]);

  return (
    <div className="flex w-full flex-col">
      <div className="h-full w-full">
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          initialData={{ appState: { theme: theme } }}
          renderTopRightUI={() => (
            <div className="flex gap-2">
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="h-9 w-40"
                placeholder="Page Title"
              />
              <Button
                variant="secondary"
                onClick={setSceneData}
                disabled={isSaving}
                size="sm"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={fetchDataFromServer}
                      disabled={isFetching}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Pull latest data from server. This will overwrite any
                      unsaved changes.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          theme={theme === "dark" ? "dark" : "light"}
          autoFocus
        >
          <WelcomeScreen />
        </Excalidraw>
      </div>
    </div>
  );
}
