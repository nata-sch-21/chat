const fs = require('fs');

const env = `
REACT_APP_GOOGLE_CLIENT_ID=${process.env.REACT_APP_GOOGLE_CLIENT_ID}
NODE_VERSION=${process.env.NODE_VERSION}
`;

fs.appendFile('.env', env, (e) => {
  if (e) {
    console.error(e)
  }
});
