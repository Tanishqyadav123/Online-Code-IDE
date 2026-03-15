import { useState } from "react";
import { ProjectTreeInterface } from "../interface/Project.interface";
import { ProjectSideBar } from "./ProjectSidebar";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiFolder, FiFile } from "react-icons/fi";

export const TreeNode = ({
  nodeDetails,
}: {
  nodeDetails: ProjectTreeInterface;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full text-sm text-gray-800">
      {nodeDetails.type === "file" ? (
        <div className="flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-gray-200 rounded-md">
          <FiFile className="text-gray-600" />
          <span>{nodeDetails.name}</span>
        </div>
      ) : (
        nodeDetails.children && (
          <div className="w-full">
            <div
              className="flex items-center gap-1 px-4 py-1 cursor-pointer hover:bg-gray-200 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RiArrowRightSLine
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />

              <FiFolder className="text-yellow-500" />

              <span className="font-medium">{nodeDetails.name}</span>
            </div>

            {isOpen && (
              <div className="ml-4 border-l border-gray-300 pl-2">
                <ProjectSideBar projectTree={nodeDetails.children} />
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
