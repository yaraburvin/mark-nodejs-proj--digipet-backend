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

// neill testing down here
