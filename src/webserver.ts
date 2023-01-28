import { QueryResolvers } from "./generated-types";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createHandler } from "graphql-http/lib/use/express";
import express from "express";
import path from "path";
import fs from "fs";

const schemaFile = path.join(__dirname, "/schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf8");

const queryResolvers: QueryResolvers = {
  hello: (_root, _args, _ctx, _info) => {
    return "hello GraphQL world";
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: { Query: queryResolvers },
});

const app = express();
app.route("/graphql").all(createHandler({ schema }));

export default app;
