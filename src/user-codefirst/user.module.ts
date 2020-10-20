import { Module } from "@nestjs/common";
import { GraphQLFederationModule, GraphQLModule } from "@nestjs/graphql";
import { GraphQLSchema } from "graphql";
import { augmentSchema, makeAugmentedSchema } from 'neo4j-graphql-js'
import { printIntrospectionSchema, printSchema } from 'graphql/utilities'
import { extractResolversFromSchema } from 'neo4j-graphql-js/dist/augment/resolvers'
import { extractSchemaDefinitions } from 'neo4j-graphql-js/dist/augment/augment'
import { mergeSchemas } from "graphql-tools";
import { join } from "path";
import * as util from 'util'
import { UserModule } from "src/user";

export const cLog = (data: any) => {
  console.log(util.inspect(data, false, null, true))
}


@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      include: [UserModule],
      autoSchemaFile: join(process.cwd(), 'src/user-codefirst/schema.graphql'),
      transformSchema: (schema: GraphQLSchema) => {

        cLog(schema)

        /**
         * Get resolvers from Nest.js's code-first approach
         */
        const resolvers = extractResolversFromSchema(schema);
        // cLog(resolvers)

        /**
         * The schema here doesn't have the code-first typeDefs yet
         */
        const typeDefs: string = printSchema(schema)

        // This gives us an AST
        // const typeDefs = extractSchemaDefinitions({ schema })
        // cLog(typeDefs)

        /**
         * Either pass in schema OR typeDefs & resolver.
         */
        const newSchema = makeAugmentedSchema({
          typeDefs,
          resolvers,
          // config: {
          //   isFederated:true
          // }
        })

        console.log(newSchema)

        return newSchema
      },
      transformAutoSchemaFile: true
    })
  ],
  providers: []
})
export class UserGraphqlModule{}