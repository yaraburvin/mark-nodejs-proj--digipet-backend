import supertest from "supertest";
import { getSignaturesArr } from "../signatures/api";
import app from "./server";

describe("Server initialisation", () => {
  it("initialises in-memory signature database with one signature, from Rick", () => {
    const signaturesArr = getSignaturesArr();
    expect(signaturesArr).toHaveLength(1);
    expect(signaturesArr[0]).toMatchObject({ name: "Rick" });
  });
});

describe("Endpoint testing", () => {
  test("GET /signatures retrieves the initial signature", async () => {
    const response = await supertest(app).get("/signatures");

    // check that it's a 200 response
    expect(response.status).toBe(200);

    // check the overall structure of the response
    expect(response.body).toMatchObject({
      status: "success",
      data: {
        signatures: [{ name: "Rick" }],
      },
    });

    // check that it comes back with only one signature
    expect(response.body.data.signatures).toHaveLength(1);

    // check that the signature has a number epochTimestamp
    // (we don't know what it will be at test writing)
    expect(typeof response.body.data.signatures[0].epochTimestamp).toBe(
      "number"
    );
  });

  test("POST /signatures adds a signature", async () => {
    const response = await supertest(app).post("/signatures").send({
      name: "Morty",
      message: "ah, geez",
    });

    // check that it's a 201 response
    expect(response.status).toBe(201);

    // check the overall structure of the response includes the created resource
    expect(response.body).toMatchObject({
      status: "success",
      data: {
        signature: { name: "Morty", message: "ah, geez" },
      },
    });

    // check that it has added a number timestamp
    expect(typeof response.body.data.signature.epochTimestamp).toBe("number");
  });
});
