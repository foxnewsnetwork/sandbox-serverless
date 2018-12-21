import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'xxx Go Serverless Webpack (Typescript) v1.0! Your function executed successfully! xxx',
      input: event,
    }),
  };

  cb(null, response);
}

type User = {
  name: string,
  handle: string,
  location: string,
  description: string
};

const DATABASE = {
  alice: {
    name: "alice",
    handle: "@alice",
    location: "Oustside Event Horizon",
    description: "Short for A"
  },
  bob: {
    name: "bob",
    handle: "@bob",
    location: "Falling into the black hole",
    description: "Not going to make it"
  },
  charlie: {
    name: "charlie",
    handle: "@charlie",
    location: "Already inside black-hole",
    description: "ER=EPR"
  }
}

async function meInfo(username: string, key: string, secret: string): Promise<User> {
  const user = DATABASE[username];

  if (user) {
    return user;
  } else {
    throw new Error(`Unable to find "${username}"`);
  }
}

type MeInfoRequestEvent = APIGatewayEvent & {
  arguments: {
    consumerKey: string,
    consumerSecret: string
  },
  handle: string
}

export const graphqlHandler: Handler = (event: MeInfoRequestEvent, context: Context, cb: Callback) => {
  const consumerKey = event.arguments.consumerKey;
  const consumerSecret = event.arguments.consumerSecret;
  const myHandle = event.handle;

  meInfo(myHandle, consumerKey, consumerSecret)
    .then(result => {
      cb(null, result);
    })
    .catch(error => cb(error, null));
}
