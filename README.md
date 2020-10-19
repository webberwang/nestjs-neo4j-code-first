# The issue

I'm looking to integrate neo4j with graphql using [neo4j-graphql-js](https://github.com/neo4j-graphql/neo4j-graphql-js) package with the code first approach.

I have a working example which uses a schema first approach by loading a `schema.graphql` file. The goal is to use a code first approach

https://docs.nestjs.com/graphql/quick-start#code-first

so we don't have to create a graph schema file.

# Steps to reproduce

1. Change import to `user-neo4j/user.module` in `app.module.ts`
2. `yarn start:debug`

Then you should see `UnhandledPromiseRejectionWarning: Error: Unknown type "Query"` in terminal

