"use client";

import { Button } from "@/components/ui/button";
import { TemplateTypeEnum } from "@/src/entity/template.entity";
import { createNewProjectService } from "@/src/services/project.service";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  // let token: string | null = null;

  async function getUserToken() {
    console.log(isSignedIn, user);
    if (isSignedIn && user) {
      console.log({ isSignedIn, user, isLoaded });

      const token = await getToken();
      return token;
    }
  }

  const handleCreateProject = async (e) => {
    console.log("Hello Its clicking");
    try {
      const token = await getUserToken();

      console.log("Token at line 29 ", token);
      const response = await createNewProjectService(
        "MyFirstProject",
        TemplateTypeEnum.REACT_JS,
        token!,
      );

      if (response.success) {
        router.push(`/playground/${response.data.projectId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <Button
        className="cursor-pointer"
        onClick={(e) => handleCreateProject(e)}
      >
        Go To Playground
      </Button>
    </div>
  );
}

export default page;
