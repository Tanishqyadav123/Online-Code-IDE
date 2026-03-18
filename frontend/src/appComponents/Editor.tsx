"use client";
import MonacoEditor, { type Monaco } from "@monaco-editor/react";
import { useSocket } from "../context/socketContext";
import { useFileContext } from "../context/fileContext";
import { useEffect } from "react";

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

  useEffect(() => {}, [currentFileContent, currentFilePath]);

  return (
    <div className="w-full">
      <MonacoEditor
        height="100%"
        width="100%"
        defaultLanguage="css"
        theme="Dracula"
        value={currentFileContent || ""}
        // onChange={(code) => setUserCode(code || "")}
        beforeMount={handleBeforeMount}
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
