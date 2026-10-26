import { defineCliConfig } from "sanity/cli";

// Tells the Sanity command-line tool which project to talk to.
// The project ID and dataset are public identifiers, not secrets.
export default defineCliConfig({
  api: {
    projectId: "y0xpamyg",
    dataset: "production"
  }
});
