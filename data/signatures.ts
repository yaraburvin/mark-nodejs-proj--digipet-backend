interface Signature {
  name: string;
  message?: string;
}

interface TimestampedSignature extends Signature {
  timestamp: string;
}

/**
 * A key-value store of signatures
 * Intended to be indexed on 'timestamp'
 */
type SignatureCollection = Record<string, TimestampedSignature>;

const initialSignature: TimestampedSignature = {
  timestamp: new Date().toUTCString(),
  name: "Rick",
  message: "wubba lubba dub dub!!",
};

const _signatures: SignatureCollection = {
  // included to start off with a signature
  // and also indicate intended usage
  [initialSignature.timestamp]: initialSignature,
};

export function getSignatures(): SignatureCollection {
  return _signatures;
}

export function getSignaturesArr(): TimestampedSignature[] {
  return Object.values(getSignatures());
}

export function addSignature(signature: Signature): void {
  const newTimestamp = new Date().toUTCString();
  _signatures[newTimestamp] = {
    ...signature,
    timestamp: newTimestamp,
  };
}

export function deleteSignatureByTimestamp(timestamp: string): void {
  delete _signatures[timestamp];
}

export function updateSignatureByTimestamp(
  timestamp: string,
  updatedSignature: Signature
) {
  _signatures[timestamp] = {
    ...updatedSignature,
    timestamp,
  };
}

export default _signatures;
