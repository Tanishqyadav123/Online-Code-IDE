import prisma from "../db/config/prisma.client.js";
import { TemplateTypeEnum } from "../entity/template.enum.js";

export const isValidTemplate = async (templateName: string) => {
  return await prisma.templates.findUnique({
    where: {
      templateName: templateName as TemplateTypeEnum,
    },
  });
};
