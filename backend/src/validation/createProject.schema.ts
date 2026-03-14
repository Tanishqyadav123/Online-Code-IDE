import z from "zod";
import { TemplateTypeEnum } from "../entity/template.enum.js";

export const createNewProjectSchema = z.object({
  name: z.string(),
  templateType: z.enum(TemplateTypeEnum),
});
