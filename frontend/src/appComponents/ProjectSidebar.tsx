import { ProjectTreeInterface } from "../interface/Project.interface";
import { TreeNode } from "./TreeNode";

export const ProjectSideBar = ({
  projectTree,
}: {
  projectTree: ProjectTreeInterface[];
}) => {
  return (
    <div className="w-64 bg-transparent rounded-lg shadow-sm p-2 text-white">
      {projectTree.map((nodeDetails, index) => {
        return <TreeNode key={index} nodeDetails={nodeDetails} />;
      })}
    </div>
  );
};
