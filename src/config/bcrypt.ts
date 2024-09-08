import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const bcrypt = {
  hashed: (password: string) => {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },

  compare: (password: string, hash: string) => {
    return compareSync(password, hash);
  },
};
