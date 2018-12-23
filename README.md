# Serverless Sandbox

Here, I experiment with using [serverless](https://serverless.com/) and attempt to learn how to setup back-ends with tools like app-sync and lambda

## Goals

Obviously, the long-term goal would be to get comfortable with the current meta for deploying onto the back-end, but the incremental road plan will go here

### Scaffold AppSync HelloWorld

I want to use GraphQL on the back-end and [AWS app-sync](https://aws.amazon.com/appsync/) provides this functionality. The goal here is to get a feel for this

- [x] Document progress in the `packages/journal/*`
  - [journal entry](./packages/journal/18-12-19-app-sync-hello-world.md)
- [x] Use serverless to scaffold a new package under `packages/*`
- [x] Confirm that deployment works
- [x] Roll in app-sync plugin
- [ ] Deploy app-sync lambda and try to confirm it works
- [ ] Support `query` and `mutation`
- [ ] Support `subscription`


### Persist To Backend With Dynamo

TODO

### AppSync in ReasonML

TODO

### Cognito User Pools 

Where we tackle things like OPENID and other such sources of authentication

# References

- [lerna](https://github.com/lerna/lerna)
