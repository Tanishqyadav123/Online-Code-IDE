import { useFileContext } from "../context/fileContext";
import { usePopup } from "../context/popContext";
import { useProjectDirectory } from "../context/projectDirectoryContext";
import { useSocket } from "../context/socketContext";
import { getProjectDirectoryTreeService } from "../services/project.service";

export const Popup = ({
  x,
  y,
  filePath,
  isFolder,
}: {
  x: number;
  y: number;
  filePath: string;
  isFolder: boolean;
}) => {
  console.log("Is Folder or not ", isFolder);
  const {
    setCoordinates,
    setShowNewFileFolderInput,
    showNewFileFolderInput,
    coordinates,
  } = usePopup();
  const { setProjectDirectory, projectId, newFileFolder, setNewFileFolder } =
    useProjectDirectory();

  const socket = useSocket();
  const { setCurrentFilePath } = useFileContext();

  const handlePopClose = () => {
    setCoordinates(null);
    setShowNewFileFolderInput(false);
  };

  // Handle Create New File :-
  const handleCreateNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Path need to be updated ", coordinates?.popForFile);

    setNewFileFolder({
      name: e.target.value,
      isDirectory: false,
    });
  };

  const handleFileKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      // Check for patent directory and sibling file :-

      let createFileOnPath = "";
      if (coordinates?.popForFile && coordinates.popForFile.includes(".")) {
        // you are trying to create the sibling of this file :-
        console.log("Prinnt ", coordinates.popForFile.split("\\"));
        const parentPathArr = coordinates.popForFile
          .split("\\")
          .slice(0, coordinates.popForFile.split("\\").length - 1);

        const parentPath = parentPathArr.join("\\");
        createFileOnPath = parentPath + "\\" + newFileFolder?.name;

        // console.log("Parent Path is ");
      } else {
        // you are trying to create a file inside this folder
        createFileOnPath = coordinates?.popForFile + "\\" + newFileFolder?.name;
      }

      console.log("Path is Finally ", createFileOnPath);

      // close the pop up and set the show input field to false :-
      handlePopClose();

      // Emit an event for File / folder creation :-

      socket?.emit("new-file", {
        filePath: createFileOnPath,
      });

      // Listen on the event := "new-file-created" :-
      socket?.on("new-file-created", async () => {
        // Again need to fetch the update state of the project :-

        try {
          const response = await getProjectDirectoryTreeService(projectId!);

          if (response.success) {
            setProjectDirectory(response.data);
            // setCurrentFilePath(createFileOnPath);
          }
        } catch (error) {
          console.error(error);
        }
      });

      console.log("Pressed Enter");
    }
  };

  const handleFileDelete = async () => {
    socket?.emit("delete-file", {
      filePath,
    });

    setCoordinates(null);

    // Again need to fetch the update state of the project :-

    try {
      const response = await getProjectDirectoryTreeService(projectId!);

      if (response.success) {
        setProjectDirectory(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed z-50 bg-white border border-gray-200 shadow-lg rounded-md py-2 w-32"
      style={{ top: y, left: x }}
    >
      <div className="mb-5">
        <button
          onClick={() => handlePopClose()}
          className=" absolute top-0 right-0 w-10 text-xs text-center p-2 hover:bg-red-50 rounded-md text-gray-700"
        >
          X
        </button>
      </div>

      {isFolder &&
        (showNewFileFolderInput ? (
          <input
            type="text"
            onChange={handleCreateNewFile}
            onKeyDown={handleFileKeyDown}
            className="outline-indigo-500 border-gray-400 border-2 w-full px-2 py-1 my-2"
          />
        ) : (
          <button
            onClick={() => setShowNewFileFolderInput(true)}
            className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
          >
            new File...
          </button>
        ))}

      {isFolder && (
        <button
          // onClick={() => console.log("Rename", nodeDetails.path)}
          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
        >
          new Folder...
        </button>
      )}

      <button
        // onClick={() => console.log("Rename", nodeDetails.path)}
        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
      >
        Rename
      </button>

      <button
        onClick={() => handleFileDelete()}
        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
      >
        Delete
      </button>
    </div>
  );
};
