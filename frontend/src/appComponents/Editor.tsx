"use client";
import MonacoEditor, { type Monaco } from "@monaco-editor/react";

function Editor({ customTheme }: { customTheme: any }) {
  const handleBeforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("Dracula", customTheme);
  };

  return (
    <div className="w-full">
      <MonacoEditor
        height="100%"
        width="100%"
        defaultLanguage="css"
        theme="Dracula"
        // value={problemDetails?.boilerPlateCode || ""}
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
