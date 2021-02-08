import supertest from "supertest";
import { getSignaturesArr } from "../data/signatures";
import app from "./server";

describe("Server initialisation", () => {
  it("initialises in-memory signature database with one signature, from Rick", () => {
    const signaturesArr = getSignaturesArr();
    expect(signaturesArr).toHaveLength(1);
    expect(signaturesArr[0]).toMatchObject({ name: "Rick" });
  });
});

describe("Endpoint testing", () => {
  test("GET /signatures retrieves the first signature", async () => {
    const response = await supertest(app).get("/signatures");
    expect(response.body).toMatchObject({
      status: "success",
      data: {
        signatures: [{ name: "Rick" }],
      },
    });
  });
});
