import React from "react";
import { useHostPort } from "../context/portContext";

function PreviewFrame({ port, Ip }: { port: number; Ip: string }) {
  return (
    <div>
      <iframe src={`http://127.0.0.1:${port}`} height="100%" width={"100%"} />
    </div>
  );
}

export default PreviewFrame;
