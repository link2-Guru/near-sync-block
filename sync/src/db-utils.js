const models = require("../models");
const BN = require("bn.js");

const query = async ([query, replacements]) => {
    const sequelize = models.sequelizeLegacySyncBackendReadOnly;
    return await sequelize.query(query, {
        replacements,
        type: models.Sequelize.QueryTypes.SELECT,
    });
};


const querySingleRow = async (args, options) => {
    const result = await query(args, options || {});
    return result[0];
};

const getSyncedGenesis = async (options) => {
    return await querySingleRow(
        [
            `SELECT genesis_time as genesisTime, genesis_height as genesisHeight, chain_id as chainId FROM genesis`,
        ],
        options
    );
};


exports.getSyncedGenesis = getSyncedGenesis;