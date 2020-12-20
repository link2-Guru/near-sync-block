
module.exports = {
    nearRpcUrl: process.env.NEAR_RPC_URL || "http://localhost:3030",
    legacySyncDatabase: {
        dialect: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        debug: Boolean(process.env.DATABASE_DEBUG)
    },
    genesisRecordsUrl: process.env.GENESIS_RECORDS_URL,
    regularSyncNewNearcoreStateInterval: parseInt(process.env.NEAR_REGULAR_SYNC_NEW_NEARCORE_STATE_INTERVAL) || 5000,
    regularSyncMissingNearcoreStateInterval: parseInt(process.env.NEAR_REGULAR_SYNC_MISSING_NEARCORE_STATE_INTERVAL) || 60000
};
