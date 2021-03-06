
module.exports = {
    nearRpcUrl: process.env.NEAR_RPC_URL || "http://localhost:3030",
    legacySyncDatabase: {
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        dialect: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        logging: process.env.DATABASE_DEBUG === '1' ? true : false
    },
    genesisRecordsUrl: process.env.GENESIS_RECORDS_URL,
    regularSyncNewNearcoreStateInterval: parseInt(process.env.NEAR_REGULAR_SYNC_NEW_NEARCORE_STATE_INTERVAL) || 5000,
    regularSyncMissingNearcoreStateInterval: parseInt(process.env.NEAR_REGULAR_SYNC_MISSING_NEARCORE_STATE_INTERVAL) || 60000,
    syncNewBlocksHorizon: parseInt(process.env.NEAR_SYNC_NEW_BLOCKS_HORIZON) || 100,
    syncFetchQueueSize :parseInt(process.env.NEAR_SYNC_FETCH_QUEUE_SIZE) || 3,
    syncSaveQueueSize :parseInt(process.env.NEAR_SYNC_SAVE_QUEUE_SIZE) || 10,
    bulkDbUpdateSize : parseInt(process.env.NEAR_SYNC_BULK_DB_UPDATE_SIZE) || 10,

};
