import { COMMUNITY_WALLET, MIGRATION_SINERGY_BRONZE_CONTRACT_ADDRESS, SINERGY_BRONZE_FIRST_MIGRATION_ADDRESS, SINERGY_BRONZE_MIGRATION_ADDRESS } from "..";

export const getMigrationSinergyData = async (
    ContractMigration,
    wallet,
    MigrationContract
) => {

    const LIMIT = await MigrationContract.methods.AMOUNT_LIMIT_TO_MIGRATE().call();
    const nfts_migrated = await MigrationContract.methods.nfts_migrated(wallet).call();
    const amount = await ContractMigration.methods.balanceOf(wallet).call();
    const amount_of_intents = Math.round(((Number(amount) / Number(LIMIT)) + 0.5));
    const intent_number = amount_of_intents - Math.round(((Number(amount) - Number(nfts_migrated)) / Number(LIMIT)) + 0.5);

    let amount_to_migrate;

    if ((amount - nfts_migrated) > LIMIT) {
        amount_to_migrate = Number(LIMIT);
    } else {
        amount_to_migrate = Number(amount) - Number(nfts_migrated);
    }

    /*
        Agregamos esta diferenciacion para el admin
        porque el admin tenia un problema con la cantidad de NFTs
        entonces de esta manera lo solucionamos.

        Este problema es unicamente para migrar.
    */
    if (String(wallet).toLowerCase() == COMMUNITY_WALLET.toLowerCase()) {
        return {
            amount: 9,
            nfts_migrated: 0,
            amount_to_migrate: 9,
            LIMIT
        };
    }


    return {
        amount,
        nfts_migrated, 
        amount_to_migrate, 
        LIMIT, 
        amount_of_intents, 
        intent_number
    };
};