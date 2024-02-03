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

// UNIQUE_VIOLATION_REGEX: Extracts field name and value from PostgreSQL unique constraint violation messages.
/*
Explanation:
- Key \(([^)]+)\): This part matches the field name enclosed in parentheses after the word 'Key'.
  - The pattern `([^)]+)` captures any sequence of characters except the closing parenthesis `)`.
- =\(([^)]+)\): This part matches the field value enclosed in parentheses after the equals sign `=`.
  - Similarly, `([^)]+)` captures any sequence of characters except the closing parenthesis `)`.
- already exists: Matches the exact text 'already exists' which is part of the PostgreSQL unique violation error message.
- The entire expression is used to parse error messages like "Key (field)=(value) already exists" and 
  extracts 'field' and 'value' for use in custom error messages.
*/
export const UNIQUE_VIOLATION_REGEX =
  /Key \(([^)]+)\)=\(([^)]+)\) already exists/;

// FILTERING_DATE_FORMAT_REGEX: Matches dates in the format "YYYY-MM-DDTHH:mm:ss.sssZ."
/*
Explanation:
- ^: Start of the string.
- \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z: Matches a date in the format "YYYY-MM-DDTHH:mm:ss.sssZ."
  - \d{4}: Matches the year (four digits).
  - -\d{2}: Matches a hyphen followed by the month (two digits).
  - -\d{2}T: Matches a hyphen followed by the day (two digits) and the letter 'T'.
  - \d{2}:\d{2}:\d{2}\.\d{3}: Matches the time in HH:mm:ss.sss format.
    - \d{2}: Matches hours (two digits).
    - :\: Matches a colon.
    - \d{2}: Matches minutes (two digits).
    - :\: Matches another colon.
    - \d{2}: Matches seconds (two digits).
    - \.\d{3}: Matches milliseconds (three digits).
  - Z: Matches the 'Z' character that represents UTC time.
- $: End of the string.
*/
export const LONG_FILTERING_DATE_FORMAT_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

// SHORT_FILTERING_DATE_FORMAT_REGEX: Matches dates in the format "YYYY-MM-DD."
/*
Explanation:
- ^: Start of the string.
- \d{4}: Matches the year (four digits).
- -: Matches a hyphen.
- \d{2}: Matches the month (two digits).
- -: Matches another hyphen.
- \d{2}: Matches the day (two digits).
- $: End of the string.
*/
export const SHORT_FILTERING_DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;
