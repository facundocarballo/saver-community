import { ABLE_FIRST_MIGRATION_CONTRACT_ADDRESS, ABLE_MIGRATION_CONTRACT_ADDRESS } from "..";

export const getMigrationAbleData = async (
    Contract,
    ContractFirstMigration,
    ContractMigration,
    ContractTriple,
    wallet
) => {
    const is_recover = await ContractMigration.methods.isRecover(wallet).call();
    const able_to_recover = is_recover ? ABLE_MIGRATION_CONTRACT_ADDRESS : ABLE_FIRST_MIGRATION_CONTRACT_ADDRESS;
    // Total Able to receive
    // No funciona la migracion de Able en esta version porque este contrato no llego al minimo de 69 Ciclos.
    const able_total_wei = "0"; //await Contract.methods.GetAbleToRecover(wallet, able_to_recover, !is_recover).call();
    const able_total = web3.utils.fromWei(able_total_wei, 'ether');
    // Able
    const able_wei = is_recover ? 
        await ContractMigration.methods.balanceOf(wallet).call() : 
        await ContractFirstMigration.methods.balanceOf(wallet).call();
    const able = web3.utils.fromWei(able_wei, 'ether');
    // Triple EXT.
    const triple_wei = is_recover ? 
        "0" :
        await ContractTriple.methods.balanceOf(wallet).call();
    const triple_ext = web3.utils.fromWei(triple_wei, 'ether');
    // Triple INT.
    const triple_int_wei = is_recover ?
        await ContractMigration.methods.donationBalance(wallet).call() :
        await ContractFirstMigration.methods.donationBalance(wallet).call();
    const triple_int = web3.utils.fromWei(triple_int_wei, 'ether');
    // Bono Premio Able
    let bono = "0.00";

    if (can_receive_bono(able_total, able, triple_ext, triple_int)) {
        bono = triple_int;
    }
    return {
        triple_int,
        triple_ext,
        able,
        able_total,
        bono
    }
};


/*
* Esta funcion indica si el usuario recibira el bono de migracion
* Para eso compara la cantidad total de ABLE a recibir con
* la sumatoria de las otras tres compensaciones.
* Si la diferencia entre estos es menor a 1, entonces quiere decir que
* esta cuenta recibira el bono. De lo contrario, no lo recibira.
* ---------------------------------------------------------------------
* Nos damos cuenta con el (< 1) porque en teoria tendria que ser iguales
* la cantidad total con la sumatoria, pero cuando hacemos la comparacion
* nunca da igual por los decimales. Entonces lo hacemos asi
*/
const can_receive_bono = (able_total, able, triple_ext, triple_int) => {
    const dif = Number(able_total) - (Number(able) + Number(triple_ext) + Number(triple_int));
    return (dif < 1);
} 