import bcrypt from "bcryptjs";

console.log(
  await bcrypt.compare(
    "123",
    "$2a$10$1DbpX274trWZgtQCmvrTMOPcBtgsNeEmwo60kqmy9.ZVZT7d3zetO"
  )
);
