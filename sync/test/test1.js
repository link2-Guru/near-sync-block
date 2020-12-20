


require("dotenv").config();

const {
    getSyncedGenesis,
} = require("../src/db-utils");


async function test(){
    const syncedGenesis = await getSyncedGenesis();
   
    console.log('syncedGenesis',syncedGenesis.genesistime)
}

const test2 = async () => {
    console.log("Starting Genesis state sync...");
    try {
        const syncedGenesis = await getSyncedGenesis();
   
        console.log('syncedGenesis',syncedGenesis.genesistime)
    } catch (error) {
        console.warn("Genesis state crashed due to:", error);
    }
};


test2()