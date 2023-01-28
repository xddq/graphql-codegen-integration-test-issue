import request, { Response } from "supertest";
import app from "../../src/webserver";

const expectSuccessfulGraphQLResponse = (response: Response) => {
  expect(response.body.errors).toBeUndefined();
};

describe("Integration testing GraphQL API", () => {
  it("return 'hello GraphQL world' for hello query", async () => {
    const helloQuery = /* GraphQL */ `
      query hello {
        hello
      }
    `;

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

    // TODO: How can I use '@graphql-codegen/x' here to automatically create the
    // correct typeing for my helloQuery?
    type HelloQueryResult = {
      data: {
        hello: string;
      };
    };
    const result = response.body as HelloQueryResult;
    expect(result.data.hello).toBe("hello GraphQL world");
  });
});
