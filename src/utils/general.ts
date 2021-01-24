import { createHash } from "crypto";

export const makeHash = (plain: string): string => {
  return createHash("sha256").update(plain).digest('base64') 
};
