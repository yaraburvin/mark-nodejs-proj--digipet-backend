import supertest from "supertest";
import { Digipet, setDigipet } from "../digipet/model";
import app from "../server";

/**
 * This file has integration tests for feeding a digipet.
 *
 * It is intended to test two behaviours:
 *  1. if all the scores above 10 - decrease all of them by 10 as they are ignoring them
 *  2. if all the scores are below 10 - decrease all of them by 10 and make sure they are not below 0
 */

describe("When a user ignores a digipet repeatedly everythign decreases by 10", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 30,
      nutrition: 67,
      discipline: 50,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet/ignore informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toEqual({
        happiness: 20,
        nutrition: 57,
        discipline: 40,
      });
  });

  test("1st GET /digipet/ignore informs them about the feed and shows increased nutrition for digipet", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toEqual({
        happiness: 10,
        nutrition: 47,
        discipline: 30,
      });
    });
  test("2nd GET /digipet/feed shows continued stats change", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toEqual({
        happiness: 0,
        nutrition: 37,
        discipline: 20,
      });
    });
  test("3rd GET /digipet/feed shows nutrition hitting a ceiling of 100", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toEqual({
        happiness: 0,
        nutrition: 27,
        discipline: 10,
      });
    });
  test("4th GET /digipet/feed shows no further increase in nutrition", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toEqual({
        happiness: 0,
        nutrition: 17,
        discipline: 0,
      });
});
});


describe("When a digipet is low on happiness it is still possible to lower nutrition and discipline", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 0,
      nutrition: 20,
      discipline: 5,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet/ignore informs them that they are ignoring their pet", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("nutrition", 10);
    expect(response.body.digipet).toHaveProperty("discipline", 0);
    expect(response.body.digipet).toHaveProperty("happiness", 0);
  });

})
