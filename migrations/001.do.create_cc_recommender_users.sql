Create Table users(
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  email TEXT NOT NULL,
  hashedPassword TEXT NOT NULL,
  userCards TEXT NOT NULL,
  msg TEXT
)