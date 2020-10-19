# The issue

I'm looking to integrate neo4j with graphql using [neo4j-graphql-js](https://github.com/neo4j-graphql/neo4j-graphql-js) package with the code first approach.

I have a working example which


# Steps to reproduce

1. Change import to `user-neo4j/user.module` in `app.module.ts`
2. `yarn start:debug`

Then you should see `UnhandledPromiseRejectionWarning: Error: Unknown type "Query"` in terminal

