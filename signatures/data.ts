export interface Signature {
  /** The person signing a signature */
  name: string;
  /** Optional signature message */
  message?: string;
}

export interface TimestampedSignature extends Signature {
  /**
   * The timestamp of the signature, represented through the number of milliseconds since the UNIX epoch
   *
   * (Uses JS Date.prototype.getTime(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
   */
  epochTimestamp: number;
}

/**
 * A key-value store of signatures
 * Intended to be indexed on 'timestamp'
 */
export type SignatureCollection = Record<string, TimestampedSignature>;

const initialSignature: TimestampedSignature = {
  epochTimestamp: new Date().getTime(),
  name: "Rick",
  message: "wubba lubba dub dub!!",
};

/**
 * A private variable - an object that is the data store for our signatures.
 *
 * We use an object rather than an array for convenience and efficiency of reading/writing a specific signature (as opposed to having to iterate through an array and check each one).
 *
 * Signatures are intended to be indexed by a timestamp.
 */
export const _signatures: SignatureCollection = {
  // included to start off with a signature
  // and also indicate intended usage
  [initialSignature.epochTimestamp]: initialSignature,
};
