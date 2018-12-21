# Getting Started with App Sync Serverless

Here, I will attempt the following:

- [Scaffold an aws app](#aws-setup)
- [Test driven development](#test-driven-development)
- [Add in app-sync](#app-sync-plugin)
- [Mapping templates](#mapping-templates)
- [Deployment](#deployment)

For references, all the code will live in the [sandbox-appsync](../sandbox-appsync) directory

## AWS Setup

I followed the [aws guide][r1] to setup the framework:

```zsh
cd packages
serverless create -t aws-typescript-nodejs -path sandbox-appsync
cd sandbox-appsync
```

This dumps the [contents of the nodejs template][r3] with our chosen name.

Going in and running:

```zsh
yarn
```

complets the first step of the setup process by creating the `node_modules` and `yarn.lock`

## Test Driven Development

>We'll do it live!

Although it will cost us a non-zero amount to actually deploy and test, the value this provides is nothing to scoff at. Let's deploy! As usual, I'm following the [guide on serverless][r4]

In the future, I'll need to write up a section on how to setup AWS for deployments and such, but for now, it's as simple as:

```zsh
serverless deploy -v
```

We can invoke the function with logs

```zsh
serverless invoke -f hello -l
```

![invocation-success](./assets/18-12-19/invocation-success.png)

Next, I setup [insomnia rest client][r5] and attempt the same thing while streaming the logs in console (to ensure everything works lol)

```zsh
serverless logs -f hello -t
```

You can install insomnia via the following on MacOS:

```zsh
brew cask install insomnia
```

Recall that my endpoint was at `https://7fmkaeuerg.execute-api.us-east-1.amazonaws.com/dev/hello`, I paste that directly into insomnia while tailing my logs.

![insomnia invoke](./assets/18-12-19/insomnia-invoke.png)

Note that because AWS bills for usage, it's in my best interest to clean up after I'm done experimenting to not rack up charges while I'm not using

```zsh
serverless remove
```

(It's probaby a good idea to `remove` after every session)

Upon trying to remove, however, I encountered the `cloudformation:DeleteStack` error:

![cant delete error](./assets/18-12-19/delete-error.png)

This is solved by going into the AWS console and adding `cloudformation:DeleteStack` permission to my user group under `iam > groups > YOUR_GROUP`

For reference, I have a permission group that looks like:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1449904348000",
      "Effect": "Allow",
      "Action": [
        "cloudformation:CreateStack",
        "cloudformation:CreateChangeSet",
        "cloudformation:ListStacks",
        "cloudformation:UpdateStack",
        "cloudformation:DescribeChangeSet",
        "cloudformation:ExecuteChangeSet",
        "cloudformation:DescribeStacks",
        "cloudformation:DescribeStackEvents",
        "cloudformation:DescribeStackResource",
        "cloudformation:ValidateTemplate",
        "cloudformation:DeleteStack"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

After adding the `"cloudformation:DeleteStack"` to my permissions, I now successfully remove

## App Sync Plugin

The idea here is to roll the [app-sync plugin][r6] into our system, following their [installation guide][r7], I first add the dependency:

```zsh
yarn add serverless-appsync-plugin
```

Then add the `serverless-appsync-plugin` into my `plugins` section in [serverless.yml](../sandbox-appsync/serverless.yml)

```yaml
plugins:
  - serverless-webpack
  - serverless-appsync-plugin
```

Next, we dump a massive `custom` section to our `serverless.yml`; it's instructively to look at the [example section][r11]

Since I have no idea what's going on, I copied over the content of the [serverless app-sync example][r13] and will now try to get it working for me (to get rid of noise, I'm currently only supporting the `meInfo` query)

```yaml
custom:
  accountId: 1234xxxxxxxx # replace this with your accountId
```

First off, [accountId][r12] appears to be something I can get from my console

@TODOs

- [ ] attempt to deploy what I have
- [ ] triage what went wrong
- [ ] document what I did in `handler.ts`, `mapping-templates/*`, and `serverless.yml`

## Mapping Templates

VTL is a beast in its own right, so off the bat, it's a good idea to read through and constantly reference the guides

## Deployment

# Appendix

## Appendix A - Q and A

Q: Why AppSync?

A: Because Lambda+GraphQL doesn't allow subscriptions

# References

The reference section will log every (relevant) source I had to consult in order to get all this sh*t together. (I make a big reference list here because I'm in the habit of minimizing the number of tabs I have open)

- [r0]: <https://stackoverflow.com/questions/11948245/markdown-to-create-pages-and-table-of-contents> "creating a table of contents in markdown"
- [r1]: <https://serverless.com/framework/docs/providers/aws/guide/quick-start/> "serverless aws quick-start"
- [r2]: <https://daringfireball.net/projects/markdown/syntax> "markdown syntax guide"
- [r3]: <https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs-typescript> "aws nodejs typescript template"
- [r4]: <https://serverless.com/framework/docs/providers/aws/guide/quick-start#deploy-test-and-diagnose-your-service> "deploying a lambda"
- [r5]: <https://insomnia.rest/> "Insomnia REST client"
- [r6]: <https://github.com/sid88in/serverless-appsync-plugin> "Serverless AppSync Plugin"
- [r7]: <https://github.com/sid88in/serverless-appsync-plugin#-installation> "AppSync Plugin Installation Guide"
- [r8]: <https://hackernoon.com/running-a-scalable-reliable-graphql-endpoint-with-serverless-24c3bb5acb43> "AppSync GraphQL backend guide"
- [r9]: <https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-programming-guide.html> "VTL programming guide"
- [r10]: <https://docs.aws.amazon.com/appsync/latest/devguide/resolver-context-reference.html> "AWS AppSync context reference"
- [r11]: <https://github.com/sid88in/serverless-appsync-plugin/blob/master/example/serverless.yml#L17> "Example AppSync Serverless Custom Config"
- [r12]: <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html> "AWS Docs on Account ID"
- [r13]: <https://github.com/serverless/serverless-graphql/blob/c8a2ea36923a1cd393946494c01533603705d7d5/app-backend/appsync/lambda/serverless.yml#L16> "Serverless GraphQL AppSync Lambda Backend Serverless YAML ref"
