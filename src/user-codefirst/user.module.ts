import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { GraphQLSchema } from "graphql";
import { UserResolver } from './user.resolvers';
import { augmentSchema, makeAugmentedSchema } from 'neo4j-graphql-js'
import { printIntrospectionSchema, printSchema } from 'graphql/utilities'

@Module({
  imports: [
    UserResolver,
    GraphQLModule.forRoot({
      include: [UserResolver],
      autoSchemaFile: true,
      transformSchema: (schema: GraphQLSchema) => {

        const typeDefs = printIntrospectionSchema(schema)
        console.log(typeDefs)

        /**
         * Either pass in schema OR typeDefs & resolver.
         */
        const newSchema = makeAugmentedSchema({
          schema
        })

        // Throw error here

        return newSchema
      },
      // resolverValidationOptions: {
      //   requireResolversForResolveType: false,
      // },
      transformAutoSchemaFile: true
    })
  ],
  providers: []
})
export class UserModule{}