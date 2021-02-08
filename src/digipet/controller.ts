import { getDigipet, updateDigipetBounded } from "./model";

export function walkDigipet(): void {
  if (getDigipet()) {
    updateDigipetBounded("happiness", 10);
    updateDigipetBounded("nutrition", -5);
  }
}
