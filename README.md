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
- [x] Deploy app-sync lambda and try to confirm it works

### AppSync Local GraphQL Playground

- [ ] Develop locally w/out actual deployment
TODO

### Setup Graph / Diagram Software in Lambda

I'm trying to learn how to do ai / machine, but reading papers and following text is an awful way to learn since this prevents me from leveraging my power visual cortex. The idea here would be eventually create an education blogging platform that focuses on visualizations like diagrams, graphs, and animations instead of words.

But before we can get there, I will need some sort of back-end that can transform mark-up into pictures and graphs... then I plan to connect it into discord and slack for some $$ gains.

- [ ] Investigate appropriate AWS service to run arbitrary back-ends
- [ ] Hook it up and connect to next journal

[start here](./packages/journal/19-01-21-graph-rendering-backend.md)


### Designing an Animated Graph Language

Consider the "redux" diagram that very intuitively explains how redux works:

![redux animated gif](https://camo.githubusercontent.com/9de527b9432cc9244dc600875b46b43311918b59/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343739302f415243482d5265647578322d657874656e6465642d7265616c2d6465636c657261746976652e676966)

How would I describe this in a graph language?

Perhaps something like:

```text
Actions -> Middlewares
Middlewares -> Reducer
Middlewares -> API
API -> Middlewares
Reducer -> State
State -> Reducer
State -> View
View -> Actions

Group Dispatcher {
  Middlewares
}

Group Store {
  Dispatcher
  Reducer
  State
}
```

But now what about animations? I think we can take a page from the rust people and use the idea of "lifetimes" to describe this

```text
View(t0) -> Action(t1) : event
Action(t1) -> Dispatcher(t2) : action
Middlewares(t2) -> API(t3) : req
API(tN) -> Middleware(tN+1) : res
State(t2) -> Reducer(t3) : state
Dispatcher(t2) -> Reducer(t3) : action
Reducer(t3) -> State(t4) : state
State(t4) -> View(t5) : state
Dispatcher(tN+1) -> Reducer(tN+2) : action
State(tN+1) -> Reducer(tN+2) : state
Reducer(tN+2) -> State(tN+3) : state
State(tN+3) -> View(tN+4) : state

time {
  t0
  -> t1
  -> t2
  -> t3
  -> t4
  -> t5
  -> tN
  -> tN+1
  -> tN+2
  -> tN+3
  -> tN+4
}
```

Next, I will need to go through the source code of something like [flowchart.js](https://github.com/adrai/flowchart.js) or [mermaid.js](https://github.com/knsv/mermaid) and see what I can do to extend them with this desired functionality.

### Persist To Backend With Dynamo

- [ ] Support `query` and `mutation`
- [ ] Support `subscription`

TODO

### AppSync in ReasonML

TODO

### Authentication Techniques

- Cognito User Pools 
- OpenID

Where we tackle things like OPENID and other such sources of authentication

# References

- [lerna](https://github.com/lerna/lerna)
