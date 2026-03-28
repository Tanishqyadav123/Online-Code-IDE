import { Terminal } from "@xterm/xterm";
import xtermCSS from "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { io, Socket } from "socket.io-client";
export const CustomTerminal = () => {
  // use useEffect for setting the xterm Terminal :-
  const terminalRef = useRef(null);
  const terminalSocketRef = useRef<Socket | null>(null);
  useEffect(() => {
    const initTerminal = () => {
      terminalSocketRef.current = io(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/terminal`,
        {
          transports: ["websocket"],
        },
      );

      if (!terminalSocketRef.current) {
        return;
      }

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
          terminalSocketRef.current?.emit("terminal-input", {
            cmd: "\r\n",
          });
          //Send cmd to backend here!
        } else if (ev.domEvent.key == "Backspace") {
          terminalSocketRef.current?.emit("terminal-input", {
            cmd: "\b \b",
          });
        } else {
          terminalSocketRef.current?.emit("terminal-input", {
            cmd: ev.key,
          });
        }
      });

      terminalSocketRef.current.on("terminal-output", (data) => {
        terminal.write(data.cmd);
      });

      () => {
        terminal.dispose();
      };
    };

    initTerminal();
  }, []);

  return <div className="w-full h-[40%]" ref={terminalRef}></div>;
};
