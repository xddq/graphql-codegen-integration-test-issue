# Quickstart

- install packages: `yarn`
- generate types based on graphql schema: `yarn generate-types`
- build project: `yarn build`
- run integration tests: `yarn test`

# PROBLEM

- Currently inside `./\_\_tests\_\_/integration/index.ts` I have to define the type of
  the GraphQL response for my given query 'helloQuery' myself. I would like this
  return type to be **auto generated**, but I have no clue how.
