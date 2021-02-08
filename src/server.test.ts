import supertest from "supertest";
import { INITIAL_DIGIPET, resetDigipet, setDigipet } from "./digipet";
import app from "./server";

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
    const response = await supertest(app).get("/digipet");
    expect(response.body.digipet).toStrictEqual(INITIAL_DIGIPET);
    expect(response.body.message).toMatch(/success/i);
    expect(response.body.message).toMatch(/hatch/i);
  });
});

// neill testing down here
