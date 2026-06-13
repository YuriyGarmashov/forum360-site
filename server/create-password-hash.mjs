import { hashPassword } from "./password.mjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node server/create-password-hash.mjs <password>");
  process.exit(1);
}

console.log(hashPassword(password));
