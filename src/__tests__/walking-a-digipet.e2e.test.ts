import supertest from "supertest";
import { Digipet, INITIAL_DIGIPET, setDigipet } from "../digipet/model";
import app from "../server";

describe("User can walk a digipet repeatedly and its happiness maxes out at 100", () => {
  // setup: give an initial digipet
  const startingDigipet: Digipet = {
    happiness: 75,
    nutrition: 80,
    discipline: 60,
  };
  setDigipet(startingDigipet);

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toStrictEqual(startingDigipet);
  });

  test("1st GET /digipet/walk informs them about the walk and shows increase happiness and decreased nutrition for digipet", async () => {
    const response = await supertest(app).get("/digipet/walk");
    expect(response.body.digipet).toStrictEqual({
      happiness: 85,
      nutrition: 75,
      discipline: startingDigipet.discipline,
    });
  });

  test("2nd GET /digipet/walk shows continued increasing stats", async () => {
    const response = await supertest(app).get("/digipet/walk");
    expect(response.body.digipet).toStrictEqual({
      happiness: 95,
      nutrition: 70,
      discipline: startingDigipet.discipline,
    });
  });

  test("3rd GET /digipet/walk shows happiness hitting a ceiling of 100", async () => {
    const response = await supertest(app).get("/digipet/walk");
    expect(response.body.digipet).toStrictEqual({
      happiness: 100,
      nutrition: 65,
      discipline: startingDigipet.discipline,
    });
  });

  test("4th GET /digipet/walk shows no further increase in happiness but still shows decrease in nutrition", async () => {
    const response = await supertest(app).get("/digipet/walk");
    expect(response.body.digipet).toStrictEqual({
      happiness: 100,
      nutrition: 60,
      discipline: startingDigipet.discipline,
    });
  });
});
