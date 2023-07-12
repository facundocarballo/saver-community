import { getMigrationAbleData } from "./able";
import { getMigrationSinergyData } from "./sinergy";

export const getMigrationData = async (
    // Able
    ContractAble,
    ContractFirstAbleMigration,
    ContractAbleMigration,

    // Sinergy
    MigrationContract,
    ContractSinergyMigration,

    ContractTriple,
    wallet,
) => {
    window.document.getElementById('loading').innerHTML = "Cargando Migracion Able...";
    const able = await getMigrationAbleData(
        ContractAble,
        ContractFirstAbleMigration,
        ContractAbleMigration,
        ContractTriple,
        wallet
    );
    window.document.getElementById('loading').innerHTML = "Cargando Migracion Sinergy...";
    const sinergy = await getMigrationSinergyData(
        ContractSinergyMigration,
        wallet,
        MigrationContract
    );

    return {
        able,
        sinergy
    }
};