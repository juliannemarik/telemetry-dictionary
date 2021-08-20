const { readdirSync: readdir, mkdirSync: mkdir, rmdirSync: rmdir, writeFileSync: write } = require('fs');
const path = require('path');
const { set } = require('lodash');
const { singular } = require('pluralize');
const { ITelemetryCategory } = require('../src/types');

const DICTIONARY_DIRECTORY_PATH = path.resolve(__dirname, '../src/dictionaries')
const ROLLED_DICTIONARY_DIRECTORY_PATH = path.resolve(__dirname, '../src/rollup');

/**
 * 
 */
const dictionaryRollup = () => {
  let output = {};
  const ignore = [ 'base.ts', 'index.ts' ];
  const dictionaryFiles = readdir(DICTIONARY_DIRECTORY_PATH, {}).filter(dictionary => !ignore.includes(dictionary));
  
  rmdir(ROLLED_DICTIONARY_DIRECTORY_PATH, { recursive: true });
  mkdir(ROLLED_DICTIONARY_DIRECTORY_PATH);

  dictionaryFiles.forEach(file => {
    const DICTIONARY_PATH = `${DICTIONARY_DIRECTORY_PATH}/${file}`;
    const ROLLED_DICTIONARY_PATH = `${ROLLED_DICTIONARY_DIRECTORY_PATH}/${file.split('.').shift()}.json`;

    const dictionary = require(DICTIONARY_PATH).default;

    const categories:typeof ITelemetryCategory = Object.entries(dictionary);
    categories.forEach(([ categoryKey, category ]) => {
      output = { ...output, ...rollup(categoryKey, category, set({}, 'category', category.id)) }
    })

    write(ROLLED_DICTIONARY_PATH, JSON.stringify(output, null, 2), 'utf-8');
  });
}

/**
 * 
 * @param key 
 * @param value 
 * @param configAcc 
 * @param rollupAcc 
 * @returns 
 */
const rollup = (key:string, value:any, configAcc:object, rollupAcc:object = {}) => {
  const rollupElements = Object.entries(value).filter(([ key1, value1 ]:any) => {
    return typeof value1 === 'object';
  });

  if (!rollupElements.length) {
    set(rollupAcc, key, { ...configAcc });
  } else {
    rollupElements.forEach(([ key2, value2 ]:any) => {  
      Object.entries(value2).forEach(([ key3, value3 ]:any) => {
        set(configAcc, singular(key2), value3.id);
        rollup([ key, key3 ].join('.'), value3, configAcc, rollupAcc)
      })
    });
  }

  return rollupAcc;
}

dictionaryRollup();