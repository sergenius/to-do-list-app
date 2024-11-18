import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a.model({
    content: a.string(),
    description: a.string(),
    instructions: a.string(),
    estimatedHours: a.float(),
    deadline: a.string(),
    status: a.string()
  }).authorization(allow => [allow.owner()]),

  generateTaskDetails: a.generation({
    aiModel: a.ai.model('Claude 3 Haiku'),
    systemPrompt: 'You are a helpful assistant that analyzes tasks. Format your response as a JSON with description, instructions, and estimatedHours fields'
  })
  .arguments({
    taskName: a.string()
  })
  .returns(
    a.customType({
      description: a.string(),
      instructions: a.string(),
      estimatedHours: a.float()
    })
  )
  .authorization(allow => allow.authenticated())
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});