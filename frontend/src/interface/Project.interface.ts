export interface ProjectTreeInterface {
  path: string;
  name: string;
  type: "file" | "folder";
  children: [];
}
