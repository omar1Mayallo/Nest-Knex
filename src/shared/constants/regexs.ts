// PASSWORD_REGEX: Ensures a strong password with at least one digit, one lowercase letter,
// one uppercase letter, one special character, and a length between 8 and 25 characters.
/*
Explanation:
- ^: Start of the string.
- (?=.*[0-9]): Require at least one digit.
- (?=.*[a-z]): Require at least one lowercase letter.
- (?=.*[A-Z]): Require at least one uppercase letter.
- (?=.*[^a-zA-Z0-9]): Require at least one special character.
- .{8,25}: Allow any character and enforce a length between 8 and 25 characters.
- $: End of the string.
*/
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,25}$/;

// USERNAME_REGEX: Allows a mix of Latin and Arabic characters, along with numbers and underscores.
// Enforces a minimum length of 3 characters and a maximum length of 30 characters.
/*
Explanation:
- ^: Start of the string.
- [a-zA-Z0-9_\u0600-\u06FF]: Allow uppercase and lowercase English letters, numbers,
  underscores, and Arabic characters in the Unicode range for Arabic.
- {3,30}: Require a minimum of 3 characters and a maximum of 30.
- $: End of the string.
*/
export const USERNAME_REGEX = /^[a-zA-Z0-9_\u0600-\u06FF]{3,30}$/;
