const fs = require('fs');

/**
 * Validate entries defined in `data.json` and exit with an error if the file
 * contains invalid data.
 * @returns {void}
 */
function main() {
  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  } catch (err) {
    console.error('Failed to read data.json:', err.message);
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error('data.json must contain an array');
    process.exit(1);
  }

  let valid = true;
  data.forEach(
    /**
     * Validate a single entry to ensure all required fields are populated.
     * @param {Object} item - Data item to validate.
     * @param {number} index - Index of the item in the array.
     */
    (item, index) => {
      const required = ['id', 'organisation', 'description', 'url'];
      for (const field of required) {
        if (!item[field] || typeof item[field] !== 'string' || item[field].trim() === '') {
          console.error(`Entry ${index} is missing or has empty field: ${field}`);
          valid = false;
        }
      }
    }
  );

  if (!valid) {
    process.exit(1);
  }
}

main();
