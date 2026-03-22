"use client";
import MonacoEditor, { type Monaco } from "@monaco-editor/react";
import { useSocket } from "../context/socketContext";
import { useFileContext } from "../context/fileContext";
import { useEffect, useState } from "react";
import path from "path";
import { ExtToFileType } from "../utils/getFileTypeForExt";
import { editor } from "monaco-editor";
import { useDebounce } from "../hooks/useDebounce";

function Editor({ customTheme }: { customTheme: any }) {
  const socket = useSocket();
  const {
    setCurrentFilePath,
    currentFileContent,
    currentFilePath,
    setCurrentFileContent,
  } = useFileContext();
  const handleBeforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("Dracula", customTheme);
  };
  const [fileCode, setFileCode] = useState<string | undefined | null>(
    currentFileContent,
  );

  useEffect(() => {}, [currentFileContent, currentFilePath]);

  // If the user types something need to hit the edit-file event :-
  const debouncedValue = useDebounce(fileCode, 100);
  const handleCodeChange = (
    value: string | undefined,
    _editor: editor.IModelContentChangedEvent,
  ) => {
    // need to use the debouncing :-
    setFileCode(value);
  };

  useEffect(() => {
    // Emit the edit-file event :-
    if (debouncedValue) {
      socket?.emit("edit-file", {
        filePath: currentFilePath,
        content: debouncedValue,
      });
    }
  }, [debouncedValue, socket]);

  return (
    <div className="w-full">
      <MonacoEditor
        height="100%"
        width="100%"
        defaultLanguage={""}
        language={
          (currentFilePath && ExtToFileType[path.extname(currentFilePath!)]) ||
          ""
        }
        theme="Dracula"
        value={currentFileContent || ""}
        // onChange={(code) => setUserCode(code || "")}
        beforeMount={handleBeforeMount}
        onChange={(value, ev) => handleCodeChange(value, ev)}
        saveViewState
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}

export default Editor;
