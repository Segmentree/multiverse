const fs = require('fs');
const JSON_FILE = './package.json';
const APP_NAME = process.argv[2];

fs.readFile(JSON_FILE, 'utf8', (e, jsonString) => {
  if (e) {
    console.log('File read failed with error: ' + e);
    return;
  }
  try {
    const jsonObject = JSON.parse(jsonString);
    jsonObject.scripts[APP_NAME] = `yarn workspace ${APP_NAME} quasar dev`;
    fs.writeFile(JSON_FILE, JSON.stringify(jsonObject), (e) => {
      if (e) {
        console.log('File write failed with error: ' + e);
        return;
      }
      console.log('Successfully wrote json file: ' + JSON_FILE);
    });
  } catch (e) {
    console.log('There was an error parsing the JSON string: ' + e);
  }
});
