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

async function registerNewTalker(newTalker) {
  try {
    const oldTalkerArray = await readTalkersData();
    const allTalkers = JSON.stringify([...oldTalkerArray, newTalker]);
    await fs.writeFile(resolve(__dirname, TALKER_DATA_PATH), allTalkers);

    return newTalker;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

async function updateTalker(talkerToUpdate, idTalkerToUpdate) {
  try {
    const oldTalkerArray = await readTalkersData();

    // edição do talker

    oldTalkerArray.map((talker) => {
      if (talker.id === idTalkerToUpdate) {
        const updatedTalker = { ...talker, ...talkerToUpdate };
        return updatedTalker;
      } 
      
      throw new Error('deu ruim minina');
    });
  } catch (error) {
    console.error(`Erro na edição do arquivo: ${error}`);
  }
}

module.exports = {
  readTalkersData,
  registerNewTalker,
  updateTalker,
};