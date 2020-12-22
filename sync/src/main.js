const moment = require("moment");
const models = require("../models");
const {
    syncNewNearcoreState,
    syncMissingNearcoreState,
    syncGenesisState,
} = require("./sync");
const { getNearRpc } = require("./near");
const {
    regularSyncNewNearcoreStateInterval,
    regularSyncMissingNearcoreStateInterval
} = require("./config");

const {
    getSyncedGenesis,
} = require("./db-utils");


async function startLegacySync() {
    console.log("Starting NEAR Explorer legacy syncing service...");

    let genesisHeight, genesisTime, genesisChainId;

    const SyncGenesisState = async () => {
        console.log("Starting Genesis state sync...");
        try {
            await syncGenesisState();
        } catch (error) {
            console.warn("Genesis state crashed due to:", error);
        }
    };


    const syncedGenesis = await getSyncedGenesis();
    if (syncedGenesis) {
        genesisHeight = syncedGenesis.genesisHeight;
        genesisTime = syncedGenesis.genesisTime;
        genesisChainId = syncedGenesis.chainId;


    } else {
        console.log('else')
        setTimeout(SyncGenesisState, 0);
    }

    // const regularCheckGenesis = async () => {
    //     console.log("Starting regular Genesis check...");
    //     try {
    //         const genesisConfig = await nearRpc.sendJsonRpc(
    //             "EXPERIMENTAL_genesis_config"
    //         );
    //         const genesisConfigGenesisTime = moment(
    //             genesisConfig.genesis_time
    //         ).valueOf();
    //         if (
    //             (genesisHeight &&
    //                 genesisHeight !== genesisConfig.genesis_height.toString()) ||
    //             (genesisTime && genesisTime !== genesisConfigGenesisTime) ||
    //             (genesisChainId && genesisChainId !== genesisConfig.chain_id)
    //         ) {
    //             console.log(
    //                 `Genesis has changed (height ${genesisHeight} -> ${genesisConfig.genesis_height}; \
    //         time ${genesisTime} -> ${genesisConfigGenesisTime}; chain id ${genesisChainId} -> \
    //         ${genesisConfig.chain_id}). We are resetting the database and shutting down the backend \
    //         to let it auto-start and sync from scratch.`
    //             );
    //             // models.resetDatabase({ saveBackup: backupDbOnReset });
    //             process.exit(0);
    //         }
    //         genesisHeight = genesisConfig.genesis_height.toString();
    //         genesisTime = genesisConfigGenesisTime;
    //         console.log("Regular Genesis check is completed.");
    //     } catch (error) {
    //         console.warn("Regular Genesis check crashed due to:", error);
    //     }
    //     setTimeout(regularCheckGenesis, regularCheckGenesisInterval);
    // };
    // setTimeout(regularCheckGenesis, 0);

    const regularSyncNewNearcoreState = async () => {
        console.log("Starting regular new nearcore state sync...");
        try {
            await syncNewNearcoreState();
            console.log("Regular new nearcore state sync is completed.");
        } catch (error) {
            console.warn("Regular new nearcore state sync crashed due to:", error);
        }
        setTimeout(
            regularSyncNewNearcoreState,
            regularSyncNewNearcoreStateInterval
        );
    };
    setTimeout(regularSyncNewNearcoreState, 0);

    const regularSyncMissingNearcoreState = async () => {
        console.log("Starting regular missing nearcore state sync...");
        try {

            await syncMissingNearcoreState(genesisHeight);
            console.log("Regular missing nearcore state sync is completed.");
        } catch (error) {
            console.warn(
                "Regular missing nearcore state sync crashed due to:",
                error
            );
        }
        setTimeout(
            regularSyncMissingNearcoreState,
            regularSyncMissingNearcoreStateInterval
        );
    };
    setTimeout(
        regularSyncMissingNearcoreState,
        regularSyncMissingNearcoreStateInterval
    );
}




async function main() {
    try {

        console.log("Starting...");
        console.log("config", require("./config"));
        await models.sequelizeLegacySyncBackend.sync();
        await startLegacySync();
    } catch (error) {
        console.error("main error", error);
    }

}

module.exports = main