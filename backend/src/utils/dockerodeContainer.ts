import { Container } from "dockerode";
import Dockerode from "dockerode";
import path from "node:path";
import { Socket } from "socket.io";

const docker = new Dockerode();
// Creating the function for listing the containers :-
export async function listAllContainer() {
  const allContainers = await docker.listContainers();

  return allContainers;
}

export async function createContainer({
  projectId,
  socket,
}: {
  projectId: string;
  socket: Socket;
}) {
  try {
    const projectPath = path.join(process.cwd(), "Projects", projectId);
    console.log(projectPath, " here is the project path ");

    const allContainers = await listAllContainer();

    // Check if the container with this project Id / Name already exist , and if does remove it :-
    const conflictingContainer = allContainers.filter((containerDetails) => {
      console.log(containerDetails.Names);
      return containerDetails.Names.includes("/" + projectId);
    });

    console.log({ "conflictingContainer.length": conflictingContainer.length });
    if (conflictingContainer.length) {
      // remove the containers :-
      //   await Promise.all(
      //     conflictingContainer.map(async (containerDetails) => {
      //       const singleContainer = docker.getContainer(containerDetails.Id);

      //       console.log("Removed Container : ", singleContainer.id);
      //     }),
      //   );
      const singleContainer = docker.getContainer(conflictingContainer[0].Id);
      await singleContainer.remove({ force: true });
    }

    // Creating a new container :-
    const container = await docker.createContainer({
      Image: "blueprint",
      User: "coder",
      //   Cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      OpenStdin: true,
      StdinOnce: false,
      name: projectId,
      Tty: true,
      ExposedPorts: {
        [`5173/tcp`]: {},
      },
      HostConfig: {
        Binds: [`${projectPath}:/home/coder/app`],
        PortBindings: {
          "5173/tcp": [{ HostPort: "0" }],
        },
      },
    });

    if (container.id) {
      // So container have created successfully :-
      await container.start();

      // Once the container is being started :-
      // Sent its host port to the frontend :-
      container.inspect((error, inspectData) => {
        if (error) {
          throw error;
        }

        console.log(
          "hen ",
          inspectData,
        );
        if (
          inspectData?.NetworkSettings?.Ports["5173/tcp"][0].HostPort &&
          inspectData?.NetworkSettings.Networks.bridge.IPAddress
        ) {
          let port =
            inspectData?.NetworkSettings?.Ports["5173/tcp"][0].HostPort;
          let IPAddress = inspectData?.NetworkSettings.Networks.bridge.IPAddress;
          console.log("Pirt is ", port, IPAddress);
          socket.emit("host-port-ip", { port, IPAddress });
        }
      });
      console.log("container start with Id ", container.id);
    }

    return container;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Handling the exec into Container thing :-
// export async function handleExecContainer({
//   containerId,
//   socket,
// }: {
//   containerId: string;
//   socket: Socket;
// }) {
//   try {
//     const containerDetails = docker.getContainer(containerId);
//     const exec = await containerDetails.exec({
//       AttachStderr: true,
//       AttachStdin: true,
//       AttachStdout: true,
//       Cmd: ["/bin/bash"],
//       Tty: true,
//       User: "coder",
//     });

//     console.log("Exec into the containwer ");
//     const dockerStream = await exec.start({ hijack: true, stdin: true });

//     // dockerStream.resume();
//     // docker.modem.demuxStream(dockerStream, process.stdout, process.stderr);
//     dockerStream.on("data", (chunk) => {
//       console.log("data 9is ", chunk);
//       socket.emit("terminal-output", chunk.toString());
//     });

//     socket.on("terminal-input", (inputData) => {
//       console.log(
//         "dockerStream && dockerStream.writable ",
//         dockerStream,
//         dockerStream.writable,
//         inputData,
//       );

//       if (dockerStream && dockerStream.writable) {
//         dockerStream.write(inputData, "utf-8", (error) => {
//           if (error) {
//             console.log(error.message);
//             throw error;
//           }
//         });
//       }
//     });

//     dockerStream.on("error", (error) => {
//       console.log("Getting this ", error);
//       return;
//     });

//     dockerStream.end(() => {
//       socket.emit("stream-ended", "Terminal Stream Session Ended");
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function handleExecContainer({
  containerId,
  socket,
}: {
  containerId: string;
  socket: Socket;
}) {
  try {
    const container = docker.getContainer(containerId);

    // 1. Create the exec instance
    const exec = await container.exec({
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ["/bin/bash"],
      User: "coder",
    });

    // 2. Start the stream
    const dockerStream = await exec.start({ hijack: true, stdin: true });

    dockerStream.on("data", (chunk) => {
      socket.emit("terminal-output", chunk.toString("utf-8"));
    });

    // 4. Handle Input (Frontend -> Docker)
    socket.on("terminal-input", (inputData) => {
      if (dockerStream.writable) {
        dockerStream.write(inputData);
      }
    });

    // 5. Handle Resize (Essential for a working terminal)
    // socket.on("terminal-resize", ({ cols, rows }) => {
    //   exec.resize({ h: rows, w: cols }, () => {});
    // });

    // 6. Cleanup
    dockerStream.on("end", () => {
      socket.emit("stream-ended");
    });

    socket.on("disconnect", () => {
      dockerStream.end();
    });
  } catch (error) {
    console.error("Exec Error:", error);
  }
}
// Handling the exec into Container thing :-

// export async function handleExecContainer({
//   containerId,

//   socket,
// }: {
//   containerId: string;

//   socket: Socket;
// }) {
//   try {
//     const containerDetails = docker.getContainer(containerId);

//     const exec = containerDetails.exec(
//       {
//         AttachStderr: true,

//         AttachStdin: true,

//         AttachStdout: true,

//         Cmd: ["/bin/bash"],

//         Tty: true,

//         User: "coder",
//       },

//       (err, execOpt) => {
//         if (err) {
//           console.log("error on line 98", err);

//           throw err;
//         }

//         execOpt?.start({ hijack: true, stdin: true }, (error, stream) => {
//           if (error) {
//             console.log("Getting error on line 103", error);

//             throw error;
//           }

//           if (!stream) {
//             console.log("Stream is ", stream);

//             return;
//           }

//           stream.on("data", (chunk) => {
//             socket.emit("terminal-output", chunk.toString());
//           });

//           socket.on("terminal-input", (inputData) => {
//             stream.write(inputData, "utf-8", (error) => {
//               if (error) {
//                 console.log(error.message);

//                 throw error;
//               }
//             });
//           });

//           stream.end(() => {
//             socket.emit("stream-ended", "Terminal Stream Session Ended");
//           });
//         });
//       },
//     );
//   } catch (error) {
//     console.log(error);

//     throw error;
//   }
// }
