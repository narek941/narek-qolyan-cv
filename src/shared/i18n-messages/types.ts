import type enMessages from "./en.json";

export type Messages = typeof enMessages;

/** Dot-notation paths to leaf string values in locale files. */
export type TranslationKey = NestedKeyOf<Messages>;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];
