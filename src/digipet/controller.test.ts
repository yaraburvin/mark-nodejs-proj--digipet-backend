import { feedDigipet, walkDigipet } from "./controller";
import { getDigipet, resetDigipet } from "./model";

describe.skip("feedDigipet", () => {
  it("increases digipet nutrition by 10 and decreases discipline by 5", () => {
    // setup
    resetDigipet();
    expect(getDigipet()).toStrictEqual({
      happiness: 50,
      nutrition: 50,
      discipline: 50,
    });

    // act
    feedDigipet();

    // assert
    expect(getDigipet()).toStrictEqual({
      happiness: 50,
      nutrition: 60,
      discipline: 45,
    });
  });
});

describe("walkDigipet", () => {
  it("increases digipet happiness by 10 and decreases nutrition by 5 (to represent need for sustenance)", () => {
    // setup
    resetDigipet();
    expect(getDigipet()).toStrictEqual({
      happiness: 50,
      nutrition: 50,
      discipline: 50,
    });

    // act
    walkDigipet();

    // assert
    expect(getDigipet()).toStrictEqual({
      happiness: 60,
      nutrition: 45,
      discipline: 50,
    });
  });
});
