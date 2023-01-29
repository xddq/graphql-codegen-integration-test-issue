import { DocumentType, graphql } from "src/gql";
import request, { Response } from "supertest";
import app from "../../src/webserver";
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { HelloQuery } from "src/gql/graphql";

const expectSuccessfulGraphQLResponse = (response: Response) => {
  expect(response.body.errors).toBeUndefined();
};

describe("Integration testing GraphQL API", () => {
  it("return 'hello GraphQL world' for hello query", async () => {
    const helloQuery = /* GraphQL */ graphql(`
      query hello {
        hello
      }
    `);

    //if your query had parameters the type would also be infered here.
    const autoTypedResult = executeQuery(helloQuery, {});
    (await autoTypedResult).hello;

    const createHelloQuery = () => {
      return {
        query: helloQuery,
        variables: {},
      };
    };

    const response = await request(app)
      .post("/graphql")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(createHelloQuery());

    expectSuccessfulGraphQLResponse(response);

    
    type HelloQueryResult = {
      data:  DocumentType<typeof helloQuery>;
    };
    type HelloQueryResult2 = {
      data: HelloQuery
    }
    const result = response.body as HelloQueryResult;
    const result2 = response.body as HelloQueryResult2;
    expect(result.data.hello).toBe("hello GraphQL world");
  });
});


async function executeQuery<
  TQueryDocument extends TypedDocumentNode<any, any>, 
  TResponseType = DocumentType<TQueryDocument>, 
  TVariables = TQueryDocument extends TypedDocumentNode< any, infer TType>  ? TType  : never
>(query: TQueryDocument, variables: TVariables): Promise<TResponseType> {

  const createHelloQuery = () => {
    return {
      query: query,
      variables: variables,
    };
  };

  const response = await request(app)
    .post("/graphql")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send(createHelloQuery());

  expectSuccessfulGraphQLResponse(response);
  return response.body as TResponseType
}