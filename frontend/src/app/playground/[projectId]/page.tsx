"use client";

import Editor from "@/src/appComponents/Editor";
import { ProjectSideBar } from "@/src/appComponents/ProjectSidebar";
import { ProjectTreeInterface } from "@/src/interface/Project.interface";
import { getProjectDirectoryTreeService } from "@/src/services/project.service";
import { draculaTheme } from "@/src/themes/dracula";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectDirectoryTree, setProjectDirectoryTree] = useState<
    ProjectTreeInterface[]
  >([]);

  const fetchProjectDirectoryTree = async () => {
    if (projectId) {
      try {
        const response = await getProjectDirectoryTreeService(projectId);

        if (response.success) {
          setProjectDirectoryTree(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchProjectDirectoryTree();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-72 border-r bg-white overflow-y-auto p-3">
        {projectDirectoryTree && projectDirectoryTree.length > 0 && (
          <ProjectSideBar projectTree={projectDirectoryTree} />
        )}
      </div>

      <Editor customTheme={draculaTheme} />
    </div>
  );
}

export default page;
