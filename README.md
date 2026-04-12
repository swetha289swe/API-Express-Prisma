# API-Express-Prisma

npm init -y
npm i express
npm i nodemon --save-dev
change "type" in package.json as "module" from "commonjs". So you can use import in js files

using one of the best orms --> Prisma
Prisma Client - is gonna help with auto completion whenever working with diff tables
npx prisma init
npm install prisma --save-dev
npm install @prisma/client
npm i dotenv

//migrate tables from schema.prisma
npx prisma migrate dev --name add_users_table
npx prisma migrate dev --name added_other_tables
npx prisma generate

npx prisma migrate dev --name added_constraint

openssl rand -base64 32  ---> creates a random guidID



