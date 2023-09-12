const fs = require('fs').promises;
const { resolve } = require('path');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkersData() {
  try {
    const data = await fs.readFile(resolve(__dirname, TALKER_DATA_PATH));
    const fileContent = JSON.parse(data);

    return fileContent;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

async function writeNewTalker(newTalker) {
  try {
    const oldTalkerArray = await readTalkersData();
    const allTalkers = JSON.stringify([...oldTalkerArray, newTalker]);
    await fs.writeFile(resolve(__dirname, TALKER_DATA_PATH), allTalkers);

    return newTalker;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

async function updateTalker(oldTalkerData, newTalkerData) {
  try {
    const updatedTalkerData = { ...oldTalkerData, ...newTalkerData };
    const updatedTalker = await writeNewTalker(updatedTalkerData);

    return updatedTalker;
  } catch (error) {
    console.error(`Erro na edição do arquivo: ${error}`);
  }
}

module.exports = {
  readTalkersData,
  writeNewTalker,
  updateTalker,
};