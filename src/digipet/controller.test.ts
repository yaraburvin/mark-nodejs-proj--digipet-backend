import {
  feedDigipet,
  ignoreDigipet,
  trainDigipet,
  walkDigipet,
} from "./controller";
import { getDigipet, INITIAL_DIGIPET, resetDigipet, setDigipet } from "./model";

describe.skip("feedDigipet", () => {
  it("increases digipet nutrition by 10 and decreases discipline by 5", () => {
    // setup
    resetDigipet();
    expect(getDigipet()).toStrictEqual(INITIAL_DIGIPET);

    // act
    feedDigipet();

    // assert
    expect(getDigipet()).toStrictEqual({
      happiness: INITIAL_DIGIPET.happiness,
      nutrition: INITIAL_DIGIPET.nutrition + 10,
      discipline: INITIAL_DIGIPET.discipline - 5,
    });
  });

  it("cannot increase nutrition past 100", () => {
    // setup
    setDigipet({ happiness: 50, nutrition: 95, discipline: 50 });

    // act
    feedDigipet();

    // assert
    expect(getDigipet()).toHaveProperty("nutrition", 100);
  });

  it("cannot decrease discipline below 0", () => {
    // setup
    setDigipet({ happiness: 50, nutrition: 50, discipline: 0 });

    // act
    feedDigipet();

    // assert
    expect(getDigipet()).toHaveProperty("discipline", 0);
  });
});

describe.skip("trainDigipet", () => {
  it("increases digipet discipline by 10 and decreases happiness by 5", () => {
    // setup
    resetDigipet();
    expect(getDigipet()).toStrictEqual(INITIAL_DIGIPET);

    // act
    trainDigipet();

    // assert
    expect(getDigipet()).toStrictEqual({
      happiness: INITIAL_DIGIPET.happiness - 5,
      nutrition: INITIAL_DIGIPET.nutrition,
      discipline: INITIAL_DIGIPET.discipline + 10,
    });
  });

  it("cannot increase discipline past 100", () => {
    // setup
    setDigipet({ happiness: 50, nutrition: 50, discipline: 95 });

    // act
    trainDigipet();

    // assert
    expect(getDigipet()).toHaveProperty("discipline", 100);
  });

  it("cannot decrease happiness below 0", () => {
    // setup
    setDigipet({ happiness: 0, nutrition: 50, discipline: 50 });

    // act
    trainDigipet();

    // assert
    expect(getDigipet()).toHaveProperty("happiness", 0);
  });
});

describe("walkDigipet", () => {
  it("increases digipet happiness by 10 and decreases nutrition by 5 (to represent need for sustenance)", () => {
    // setup
    resetDigipet();
    expect(getDigipet()).toStrictEqual(INITIAL_DIGIPET);

    // act
    walkDigipet();

    // assert
    expect(getDigipet()).toStrictEqual({
      happiness: INITIAL_DIGIPET.happiness + 10,
      nutrition: INITIAL_DIGIPET.nutrition - 5,
      discipline: INITIAL_DIGIPET.discipline,
    });
  });

  it("cannot increase happiness past 100", () => {
    // setup
    setDigipet({ happiness: 95, nutrition: 50, discipline: 50 });

    // act
    walkDigipet();

    // assert
    expect(getDigipet()).toHaveProperty("happiness", 100);
  });

  it("cannot decrease nutrition below 0", () => {
    // setup
    setDigipet({ happiness: 50, nutrition: 0, discipline: 50 });

    // act
    walkDigipet();

    // assert
    expect(getDigipet()).toHaveProperty("nutrition", 0);
  });
});
