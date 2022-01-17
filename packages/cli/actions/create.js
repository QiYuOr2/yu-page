const fs = require('fs');

/**
 * @param {import('yargs').ArgumentsCamelCase<{}>} argv
 */
function create(argv) {
  console.log(argv.name);
}

module.exports = { create };
