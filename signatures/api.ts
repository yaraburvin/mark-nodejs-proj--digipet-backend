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

export function addSignature(signature: Signature): TimestampedSignature {
  console.log("adding signature", signature);

  const newTimestamp = new Date().getTime();
  const newSignature = {
    ...signature,
    epochTimestamp: newTimestamp,
  };
  _signatures[newTimestamp] = newSignature;
  return newSignature;
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
