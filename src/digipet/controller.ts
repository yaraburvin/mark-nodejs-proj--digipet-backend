/**
 * The actions that your Digipet game supports.
 *
 * These update the underlying digipet by using the functions defined in model.ts
 */

import { updateDigipetBounded } from "./model";

export function feedDigipet(): void {}

export function ignoreDigipet(): void {}

export function trainDigipet(): void {}

export function walkDigipet(): void {
  updateDigipetBounded("happiness", 10);
  updateDigipetBounded("nutrition", -5);
}
