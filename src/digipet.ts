export interface Digipet {
  happiness: number;
  nutrition: number;
  discipline: number;
}

const initialDigipet: Digipet = {
  happiness: 50,
  nutrition: 50,
  discipline: 50,
};

/**
 * The user's digipet (if they have one).
 *
 * Exported purely to _test_ `setDigipet` (which should be used as an encapsulation over setting this variable directly).
 */
export let _userDigipet: Digipet | undefined;

export function getDigipet(): Digipet | null {
  // spread to avoid mutating
  return _userDigipet ? { ..._userDigipet } : null;
}

export function resetDigipet(): void {
  // spread to avoid mutating initial digipet
  _userDigipet = { ...initialDigipet };
}

export function setDigipet(newDigipet: Digipet): void {
  _userDigipet = newDigipet;
}

/**
 * Makes a bounded update to the user's digipet - increases and decreases up to a maximum of 100 and a minimum of 0
 *
 * @param digipetKey the digipet measure to update
 * @param netUpdate the intended change - e.g. `12` to increase by 12, `-4` to decrease by 4
 */
export function updateDigipetBounded(
  digipetKey: keyof Digipet,
  netUpdate: number
): void {
  if (_userDigipet) {
    const valueToBound = _userDigipet[digipetKey] + netUpdate;
    if (valueToBound > 100) {
      _userDigipet[digipetKey] = 100;
    } else if (valueToBound < 0) {
      _userDigipet[digipetKey] = 0;
    } else {
      _userDigipet[digipetKey] = valueToBound;
    }
  }
}

export function walkDigipet(): void {
  if (_userDigipet) {
    updateDigipetBounded("happiness", 10);
    updateDigipetBounded("nutrition", -5);
  }
}
