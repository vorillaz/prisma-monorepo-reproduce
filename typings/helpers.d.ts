interface CustomError extends Error {
  message?: string;
  details: {
    [key: string]: any;
  };
  response: Response;
  status: number;
}

interface HTTPError extends Error {
  code?: string;
  msg?: string;
}

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
type JsonObject = { [Key in string]?: JsonValue };

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
interface JsonArray extends Array<JsonValue> {}

/**
 * Same as JsonObject, but allows undefined
 */
type InputJsonObject = { [Key in string]?: JsonValue };
interface InputJsonArray extends Array<JsonValue> {}
type InputJsonValue =
  | string
  | number
  | boolean
  | InputJsonObject
  | InputJsonArray;

type Awaitable<T> = T | PromiseLike<T>;
