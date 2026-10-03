import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  name: "plum-tree-tours",
  title: "Plum Tree Tours",
  projectId: projectId || "placeholder",
  dataset,
  schema,
  plugins: [structureTool()]
});
