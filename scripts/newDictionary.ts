const { writeFileSync: write, copyFileSync: copy, appendFileSync: append } = require('fs');
const path = require('path');
const replace = require('replace-in-file');

const [,, name ] = process.argv;

const NEW_DICTIONARY_FIXTURE_DIRECTORY_PATH = path.resolve(__dirname, '../fixtures/newDictionary.ts');
const NEW_DICTIONARY_DIRECTORY_PATH = path.resolve(__dirname, `../src/dictionaries/${name}.ts`)
const NEW_ROLLED_DICTIONARY_DIRECTORY_PATH = path.resolve(__dirname, `../src/rollup/${name}.json`);
const DICTIONARY_INDEX_DIRECTORY_PATH = path.resolve(__dirname, '../src/dictionaries/index.ts');

const initNewDictionary = async () => {
  copy(NEW_DICTIONARY_FIXTURE_DIRECTORY_PATH, NEW_DICTIONARY_DIRECTORY_PATH);

  await replace({
    files: NEW_DICTIONARY_DIRECTORY_PATH,
    from: [/\/\/\s/g, /UPPER_CASE_REPLACE/g, /REPLACE/g],
    to: ['', name[0].toUpperCase() + name.slice(1), name],
  });
}

const exportDictionary = async () => {
  const dictionaryExport = `\n// export { ${name}TelemetryDictionary } from './${name}';`
  append(DICTIONARY_INDEX_DIRECTORY_PATH, dictionaryExport);

  await replace({
    files: DICTIONARY_INDEX_DIRECTORY_PATH,
    from: /\/\/\s/g,
    to: '',
  });
}

const initNewRollup = () => {
  write(NEW_ROLLED_DICTIONARY_DIRECTORY_PATH, JSON.stringify({}), 'utf-8');
}

if (name) {
  console.log(`New Dictionary, ${name}TelemetryDictionary, is being created`)
  
  initNewDictionary();
  exportDictionary();
  initNewRollup();
}

export {};