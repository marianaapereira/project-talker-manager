const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkersData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
    const fileContent = JSON.parse(data);

    return fileContent;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

module.exports = {
  readTalkersData,
};