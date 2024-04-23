import { Api, Config, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);
  const STRIPE_SECRET_KEY = new Config.Secret(stack, "STRIPE_SECRET_KEY");

  //   api is created
  const api = new Api(stack, "Api", {
    defaults: {
      function: { bind: [table, STRIPE_SECRET_KEY] },
      authorizer: "iam",
    },
    routes: {
      "POST /notes": "packages/functions/src/create.main",
      "GET /notes/{id}": "packages/functions/src/get.main",
      "GET /notes": "packages/functions/src/list.main",
      "PUT /notes/{id}": "packages/functions/src/update.main",
      "DELETE /notes/{id}": "packages/functions/src/delete.main",
      "POST /billing": "packages/functions/src/billing.main",
    },
  });

  stack.addOutputs({ ApiEndpoint: api.url });

  return { api };
}

// pnpm dlx aws-api-gateway-cli-test \
// --username='admin@example.com' \
// --password='Passw0rd!' \
// --user-pool-id='us-east-1_9HMwxGa9A' \
// --app-client-id='4v8stclmgj78is2oo44ng321s8' \
// --cognito-region='us-east-1' \
// --identity-pool-id='us-east-1:f7a3944e-1ee9-4630-9af5-fd1b33bd8252' \
// --invoke-url='https://xizh7hjvde.execute-api.us-east-1.amazonaws.com' \
// --api-gateway-region='us-east-1' \
// --path-template='/billing' \
// --method='POST' \
// --body='{"source":"tok_visa","storage":21}'
