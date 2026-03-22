"use client";

import Editor from "@/src/appComponents/Editor";
import { ProjectSideBar } from "@/src/appComponents/ProjectSidebar";
import { useProjectDirectory } from "@/src/context/projectDirectoryContext";
import { ProjectTreeInterface } from "@/src/interface/Project.interface";
import { getProjectDirectoryTreeService } from "@/src/services/project.service";
import { draculaTheme } from "@/src/themes/dracula";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projectDirectory, setProjectDirectory, setProjectId } =
    useProjectDirectory();

  const fetchProjectDirectoryTree = async () => {
    if (projectId) {
      try {
        const response = await getProjectDirectoryTreeService(projectId);

        if (response.success) {
          setProjectDirectory(response.data);
        }

        setProjectId(projectId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchProjectDirectoryTree();
  }, [projectId, setProjectDirectory]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-72 border-r bg-white overflow-y-auto p-3">
        {projectDirectory && projectDirectory.length > 0 && (
          <ProjectSideBar projectTree={projectDirectory} />
        )}
      </div>

      <Editor customTheme={draculaTheme} />
    </div>
  );
}

export default page;
