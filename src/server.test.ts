import supertest from "supertest";
import { walkDigipet } from "./digipet/controller";
import { INITIAL_DIGIPET, resetDigipet, setDigipet } from "./digipet/model";
import app from "./server";

// mock all imports from './digipet/controller'
// mocking: https://circleci.com/blog/how-to-test-software-part-i-mocking-stubbing-and-contract-testing/
// mocking in jest: https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options
jest.mock("./digipet/controller");

describe("GET /", () => {
  it("provides a link to instructions in the response body", async () => {
    const response = await supertest(app).get("/");
    expect(response.body.message).toMatch("/instructions");
  });
});

describe("GET /digipet", () => {
  test("if the user has a digipet, it responds with the digipet data and a message about the user's digipet", async () => {
    resetDigipet();
    const response = await supertest(app).get("/digipet");
    expect(response.body.digipet).toStrictEqual(INITIAL_DIGIPET);
    expect(response.body.message).toMatch(/your digipet/i);
  });

  test("if the user has no digipet, it responds with a message about not having a digipet", async () => {
    setDigipet(undefined);
    const response = await supertest(app).get("/digipet");
    expect(response.body.digipet).not.toBeDefined();
    expect(response.body.message).toMatch(/don't have/i);
  });
});

describe("GET /digipet/hatch", () => {
  test("if the user has a digipet, it responds with a message explaining that a digipet can't be hatched whilst the user has another", async () => {
    resetDigipet();
    const response = await supertest(app).get("/digipet/hatch");
    expect(response.body.message).toMatch(/can't hatch/i);
  });

  test("if the user has no digipet, it responds with a message about successfully hatching a digipet, and default digipet data", async () => {
    setDigipet(undefined);
    const response = await supertest(app).get("/digipet/hatch");
    expect(response.body.digipet).toStrictEqual(INITIAL_DIGIPET);
    expect(response.body.message).toMatch(/success/i);
    expect(response.body.message).toMatch(/hatch/i);
  });
});

describe("action routes", () => {
  test("if the user has no digipet, responds with a message suggesting that the user can't do the action until they have hatched a digipet", async () => {
    const routes = [
      // "/digipet/feed",
      // "/digipet/ignore",
      // "/digipet/train",
      "/digipet/walk",
    ];

    for (let route of routes) {
      setDigipet(undefined);
      const response = await supertest(app).get(route);
      expect(response.body.message).toMatch(/you don't have/i);
      expect(response.body.message).toMatch(/try/i);
      // suggest a helpful endpoint
      expect(response.body.message).toMatch("/digipet/hatch");
    }
  });

  describe("GET /digipet/walk", () => {
    test("if the user has a digipet, it calls the walkDigipet controller and responds with a message about the walk", async () => {
      // setup: reset digipet and walkDigipet mock
      resetDigipet();
      if (jest.isMockFunction(walkDigipet)) {
        // type guard
        walkDigipet.mockReset();
      }

      const response = await supertest(app).get("/digipet/walk");

      // walkDigipet has been called once
      expect(walkDigipet).toHaveBeenCalledTimes(1);

      // response includes a message about the walk
      expect(response.body.message).toMatch(/walk/i);

      // response includes digipet data
      expect(response.body.digipet).toHaveProperty("happiness");
      expect(response.body.digipet).toHaveProperty("nutrition");
      expect(response.body.digipet).toHaveProperty("discipline");
    });
  });
});

// neill testing down here
