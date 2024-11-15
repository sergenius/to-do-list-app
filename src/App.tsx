import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization([
      a.allow.owner()
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // Set userPool as default to require user authentication
    defaultAuthorizationMode: "userPool",
    
    // Remove apiKey since we're using user authentication
    // If you need public access to some operations, you can keep this
    // and add specific public authorization rules to those operations
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    }
  },
});