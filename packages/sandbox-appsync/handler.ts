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
