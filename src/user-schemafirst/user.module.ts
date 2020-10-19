import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import * as fs from 'fs'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => {
        const typeDefs: DocumentNode = gql(fs.readFileSync('./src/user-schemafirst/schema.graphql', 'utf8'))
        const resolvers = {}

        return {
          schema: makeAugmentedSchema({
            typeDefs,
            resolvers,
            resolverValidationOptions: {
              requireResolversForResolveType: false,
            },
          })
        }
      }
    })
  ],
})
export class UserModule{}