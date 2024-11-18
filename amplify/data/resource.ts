import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a.model({
    content: a.string(),
    description: a.string(),
    instructions: a.string(),
    estimatedHours: a.float(),
    deadline: a.string(),
    status: a.string(),
  }).authorization(allow => [allow.owner()]),

  generateTaskDetails: a.generation({
    aiModel: a.ai.model('Claude 3 Haiku'),
    systemPrompt: `You are a helpful assistant that analyzes tasks and provides structured information.
    Always respond with a JSON object containing exactly these fields:
    {
      "description": "a clear, concise description of the task",
      "instructions": "numbered step-by-step instructions",
      "estimatedHours": a realistic number of hours to complete the task
    }`,
  })
  .arguments({
    taskName: a.string(),
  })
  .returns(
    a.customType({
      description: a.string(),
      instructions: a.string(),
      estimatedHours: a.float(),
    })
  )
  .authorization(allow => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes:{
    defaultAuthorizationMode: 'userPool',
  },
});