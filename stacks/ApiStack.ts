import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./MyStorage";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  //   api is c`reated
  const api = new Api(stack, "Api", {
    defaults: {
      function: { bind: [table] },
      authorizer: "iam",
    },
    routes: {
      "POST /notes": "packages/functions/src/create.main",
      "GET /notes/{id}": "packages/functions/src/get.main",
      "GET /notes": "packages/functions/src/list.main",
      "PUT /notes/{id}": "packages/functions/src/update.main",
      "DELETE /notes/{id}": "packages/functions/src/delete.main",
    },
  });

  stack.addOutputs({ ApiEndpoint: api.url });

  return { api };
}
