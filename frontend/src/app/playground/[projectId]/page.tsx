"use client";

import { CustomTerminal } from "@/src/appComponents/CustomTerminal";
import Editor from "@/src/appComponents/Editor";
import { ProjectSideBar } from "@/src/appComponents/ProjectSidebar";
import { useProjectDirectory } from "@/src/context/projectDirectoryContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { draculaTheme } from "@/src/themes/dracula";
import { getProjectDirectoryTreeService } from "@/src/services/project.service";
import { useHostPort } from "@/src/context/portContext";
import Link from "next/link";
import PreviewFrame from "@/src/appComponents/PreviewFrame";

function Page() {
  const { projectId } = useParams<{ projectId: string }>();
  const { hostPortIp, setShowPreview, showPreview } = useHostPort();
  const { projectDirectory, setProjectDirectory, setProjectId } =
    useProjectDirectory();

  // useEffect(() => {}, [hostPortIp?.hostIP]);

  console.log(hostPortIp);
  const fetchProjectDirectoryTree = async () => {
    if (projectId) {
      try {
        const response = await getProjectDirectoryTreeService(projectId);
        if (response.success) {
          setProjectDirectory(response.data);
        }
        setProjectId(projectId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchProjectDirectoryTree();
  }, [projectId]);

  return (
    // 1. Give the container a fixed height (h-screen) and hide overflow
    <div className="h-screen w-full overflow-hidden bg-[#1e1e1e]">
      <Allotment vertical>
        {/* UPPER SECTION: SIDEBAR & EDITOR */}
        <Allotment.Pane preferredSize="70%">
          <Allotment>
            {/* SIDEBAR PANE */}
            <Allotment.Pane preferredSize={280} minSize={200}>
              <div className="h-full border-r border-gray-800 bg-[#1e1e1e] overflow-y-auto">
                {projectDirectory && projectDirectory.length > 0 && (
                  <ProjectSideBar projectTree={projectDirectory} />
                )}
              </div>
            </Allotment.Pane>

            {/* EDITOR PANE */}
            <Allotment.Pane>
              <div className="relative h-full flex">
                <Editor customTheme={draculaTheme} />
                {/* Float the Preview button over the editor or put in a header */}
                {hostPortIp  && (
                  <button
                    onClick={() => setShowPreview(true)}
                    className="absolute right-4 top-4 z-10 bg-blue-600 px-3 py-1 cursor-pointer rounded text-white text-sm"
                  >
                    Show Preview
                  </button>
                )}
              </div>
            </Allotment.Pane>

            <Allotment.Pane>
              {hostPortIp && showPreview && (
                <div className=" h-full w-full">
                  <PreviewFrame
                    port={hostPortIp.hostPort}
                    Ip={hostPortIp.hostIP}
                  />
                </div>
              )}
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>

        {/* LOWER SECTION: TERMINAL */}
        <Allotment.Pane preferredSize="30%" minSize={100}>
          <div className="h-full bg-black">
            <CustomTerminal projectId = {projectId} />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default Page;
