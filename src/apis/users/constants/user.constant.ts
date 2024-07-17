export const USER_NAME_LENGTH = {
  MIN: 1,
  MAX: 20,
} as const;

export const USER_PASSWORD_LENGTH = {
  MIN: 8,
  MAX: 20,
};

export const phoneRegex = new RegExp(
  /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
);
