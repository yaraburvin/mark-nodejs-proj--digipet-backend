import {
  Signature,
  SignatureCollection,
  TimestampedSignature,
  _signatures,
} from "./data";

export function getSignatures(): SignatureCollection {
  return _signatures;
}

/**
 * Read all signatures and return as an array - should be chronological
 */
export function getSignaturesArr(): TimestampedSignature[] {
  return Object.values(getSignatures());
}

export function addSignature(signature: Signature): void {
  const newTimestamp = new Date().getTime();
  _signatures[newTimestamp] = {
    ...signature,
    epochTimestamp: newTimestamp,
  };
}

export function deleteSignatureByTimestamp(timestamp: string): void {
  delete _signatures[timestamp];
}

export function updateSignatureByTimestamp(
  epochTimestamp: number,
  updatedSignature: Signature
) {
  _signatures[epochTimestamp] = {
    ...updatedSignature,
    epochTimestamp,
  };
}

export default _signatures;
