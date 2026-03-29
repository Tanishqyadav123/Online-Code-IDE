import { Terminal } from "@xterm/xterm";
import xtermCSS from "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { io, Socket } from "socket.io-client";
import { useHostPort } from "../context/portContext";
export const CustomTerminal = ({ projectId }: { projectId: string }) => {
  // use useEffect for setting the xterm Terminal :-
  const terminalRef = useRef(null);
  const terminalSocketRef = useRef<Socket | null>(null);
  const { hostPortIp, setHostPortIp } = useHostPort();

  useEffect(() => {
    const initTerminal = () => {

      if (!projectId) {
         return;
      }
      terminalSocketRef.current = io(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/terminal`,
        {
          transports: ["websocket"],
          query: {
            projectId,
          },
        },
      );

      if (!terminalSocketRef.current) {
        return;
      }

      // Listen for the Host Port :-
      terminalSocketRef.current.on(
        "host-port-ip",
        ({ port, IPAddress }: { port: string; IPAddress: string }) => {
          if (port && !isNaN(parseInt(port))) {
            setHostPortIp({ hostPort: parseInt(port), hostIP: IPAddress });
          }
        },
      );

      const terminal = new Terminal({
        fontSize: 14,
        cursorBlink: true,
        cursorStyle: "bar",
        theme: {
          background: "#1e1e2e",
          foreground: "#cdd6f4",
        },
      });
      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      terminalRef.current && terminal.open(terminalRef.current);
      fitAddon.fit();

      terminal.onData((data) => {
        // console.log("data is ", data);
      });

      terminal.onKey((ev) => {
        if (ev.domEvent.key == "Enter") {
          terminalSocketRef.current?.emit("terminal-input", "\r\n");
          //Send cmd to backend here!
        } else if (ev.domEvent.key == "Backspace") {
          terminalSocketRef.current?.emit("terminal-input", "\b \b");
        } else {
          terminalSocketRef.current?.emit("terminal-input", ev.key);
        }
      });

      terminalSocketRef.current.on("terminal-output", (outputChunk) => {
        console.log("Is Getting Called");
        terminal.write(outputChunk);
      });

      () => {
        terminal.dispose();
      };
    };

    console.log("line 79 " , projectId)
   initTerminal();
  }, [projectId]);

  return <div className="w-full h-full" ref={terminalRef}></div>;
};
