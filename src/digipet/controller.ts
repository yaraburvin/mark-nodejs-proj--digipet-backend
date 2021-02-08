import { updateDigipetBounded } from "./model";

export function feedDigipet(): void {}

export function walkDigipet(): void {
  updateDigipetBounded("happiness", 10);
  updateDigipetBounded("nutrition", -5);
}
