- npx tsc --init --rootDir src --outDir dist

---

TS node is fine for development use but it is not recommended for production setups. For production we should compile all our TypeScript into JavaScript and run the application from ./dist

Rimraf is a cross-platform equivalent for rm -rf

---

all our packages using the --save-dev flag. In production, if we use
`npm install --production` these packages will be skipped.
