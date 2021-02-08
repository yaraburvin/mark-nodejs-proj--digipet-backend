interface Digipet {
  happiness: number;
  nutrition: number;
  discipline: number;
}

const initialDigipet: Digipet = {
  happiness: 50,
  nutrition: 50,
  discipline: 50,
};

let userDigipet: Digipet | undefined;

/**
 * Makes a bounded update to the user's digipet - increases and decreases up to a maximum of 100 and a minimum of 0
 *
 * @param digipetKey the digipet measure to update
 * @param netUpdate the intended change - e.g. `12` to increase by 12, `-4` to decrease by 4
 */
function makeBoundedDigipetUpdate(
  digipetKey: keyof Digipet,
  netUpdate: number
): void {
  if (userDigipet) {
    const valueToBound = userDigipet[digipetKey] + netUpdate;
    if (valueToBound > 100) {
      userDigipet[digipetKey] = 100;
    } else if (valueToBound < 0) {
      userDigipet[digipetKey] = 0;
    } else {
      userDigipet[digipetKey] = valueToBound;
    }
  }
}

export function getDigipet(): Digipet | undefined {
  return userDigipet;
}

export function walkDigipet(): void {
  if (userDigipet) {
    makeBoundedDigipetUpdate("happiness", 10);
    makeBoundedDigipetUpdate("nutrition", -5);
  }
}

export function resetDigipet(): void {
  // spread to avoid mutating initial digipet
  userDigipet = { ...initialDigipet };
}
