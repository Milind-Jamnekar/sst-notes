import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/MyStorage";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack);
  },
} satisfies SSTConfig;
