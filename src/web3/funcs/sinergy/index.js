import { SINERGY_BRONZE_CONTRACT_ADDRESS } from "..";
import { getAutoReference, getNextNFT, getMyNFTs, getNFT, getNFTReferencesAtLevel, getBasicReferences } from "./nft";
import { getResources } from "./resources";
import { getRewardInfo } from "./reward";

export const getSinergyBronzeData_AfterModifyNFT = async (
    addressAccount,
    Sinergy,
    ContractAbleSale,
    MigrationContract
) => {
    const favouriteNFT_ID = await Sinergy.contract.methods.favourite_nft(addressAccount).call();
    const favouriteNFT = await getNFT(
        Sinergy.contract,
        favouriteNFT_ID,
        ContractAbleSale,
        MigrationContract
    );

    Sinergy.favouriteNFT = favouriteNFT;

    return Sinergy;
};

export const getSinergyBronzeData_AfterBuyNFT = async (
    addressAccount,
    Sinergy,
    Able,
    SinergyBronzeMigrationContract,
    MigrationContract
) => {
    const amount = await Sinergy.contract.methods.balanceOf(addressAccount).call();
    const isQualified = Number(amount) > 0;
    const autoReferenceID = await getAutoReference(Able.contract, Sinergy.contract, addressAccount);
    const nextNFT = getNextNFT();
    const myNFTs = await getMyNFTs(
        Sinergy.contract,
        addressAccount,
        amount,
        SinergyBronzeMigrationContract,
        MigrationContract
    );

    Sinergy.amount = amount;
    Sinergy.isQualified = isQualified;
    Sinergy.autoReferenceID = autoReferenceID;
    Sinergy.nextNFT = nextNFT;
    Sinergy.myNFTs = myNFTs;

    return Sinergy;
};

export const getSinergyBronzeData_AfterChooseFavouriteNFT = async (
    addressAccount,
    Sinergy,
    ContractAbleSale,
    MigrationContract,
) => {
    const favouriteNFT_ID = await Sinergy.contract.methods.favourite_nft(addressAccount).call();

    const favouriteNFT = await getNFT(
        Sinergy.contract,
        favouriteNFT_ID,
        ContractAbleSale,
        MigrationContract
    );

    Sinergy.favouriteNFT = favouriteNFT;

    return Sinergy;
};

export const getSinergyBronzeData_AfterMigrateLevel = async (
    Sinergy,
    level
) => {
    let amount_references;
    switch (level) {
        case "Primera":
            amount_references = await MigrationContract.methods.first_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.firstLevel.recover = amount_references;
            break;
        case "Segunda":
            amount_references = await MigrationContract.methods.second_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.secondLevel.recover = amount_references;
            break;
        case "Tercera":
            amount_references = await MigrationContract.methods.third_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.thirdLevel.recover = amount_references;
            break;
        case "Cuarta":
            amount_references = await MigrationContract.methods.four_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.fourLevel.recover = amount_references;
            break;
        case "Quinta":
            amount_references = await MigrationContract.methods.five_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.fiveLevel.recover = amount_references;
            break;
        case "Sexta":
            amount_references = await MigrationContract.methods.six_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.sixLevel.recover = amount_references;
            break;
        case "Septima":
            amount_references = await MigrationContract.methods.seven_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.sevenLevel.recover = amount_references;
            break;
        case "Octava":
            amount_references = await MigrationContract.methods.eight_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.eightLevel.recover = amount_references;
            break;
        case "Novena":
            amount_references = await MigrationContract.methods.nine_level_references_recover(Sinergy.favouriteNFT.id).call();
            Sinergy.favouriteNFT.references.nineLevel.recover = amount_references;
            break;
    }

    return Sinergy;

}

export const getSinergyBronzeData_AfterReward = async (
    addressAccount,
    Sinergy,
    nft_id,
    Rewards
) => {
    const rewards = await getRewardInfo(Sinergy.contract, Rewards, addressAccount, nft_id);

    Sinergy.rewards = rewards;

    return Sinergy;
};

export const getSinergyBronzeData_AfterMigrate = async (addressAccount, Sinergy, MigrationContract) => {
    const isRecover = await MigrationContract.methods.isRecover(addressAccount).call();

    Sinergy.haveToRecover = !isRecover;

    return Sinergy;
};

export const getSinergyBronzeData = async (
    addressAccount,
    ContractSinergy,
    ContractST,
    ContractAbleSale,
    MigrationContract,
    ContractSinergyMigration
) => {

    const amount = await ContractSinergy.methods.balanceOf(addressAccount).call();
    window.document.getElementById('loading').innerHTML = "Cargando Sinergy Bronze...";
    const isQualified = Number(amount) > 0;
    const resources = null;
    const amountMinted = await ContractSinergy.methods.GetAmountOfNftMinted().call();
    window.document.getElementById('loading').innerHTML = "Cargando NFTs de Bronze..";
    const myNFTs = await getMyNFTs(
        ContractSinergy, 
        addressAccount, 
        amount, 
        ContractSinergyMigration, 
        MigrationContract
    );
    const favouriteNFT_ID = await ContractSinergy.methods.favourite_nft(addressAccount).call();
    let favouriteNFT = {
        id: 0
    };

    window.document.getElementById('loading').innerHTML = "Cargando NFT Favorito...";

    favouriteNFT = await getNFT(
        ContractSinergy,
        favouriteNFT_ID,
        ContractAbleSale,
        MigrationContract
    );


    window.document.getElementById('loading').innerHTML = "Cargando Recompensas...";
    let start_time = Date.now();
    const rewards = null;
    let end_time = Date.now();
    console.log("Tiempo de carga (Sinergy Rewards): ", ((end_time - start_time) / 1000).toString())

    window.document.getElementById('loading').innerHTML = "Cargando Recompensas...";
    const autoReferenceID = await getAutoReference(ContractST, ContractSinergy, addressAccount);
    const nextNFT = getNextNFT();

    const isRecover = await MigrationContract.methods.isRecover(addressAccount).call();

    const nfts_qualified = await ContractSinergy.methods.nfts_qualified().call();

    const dai_price_wei = await ContractSinergy.methods.PRICE().call();
    const able_price_wei = await ContractSinergy.methods.ABLE_PRICE().call();

    const dai_price = web3.utils.fromWei(dai_price_wei, 'ether');
    const able_price = web3.utils.fromWei(able_price_wei, 'ether');

    return {
        contract: ContractSinergy,
        amount: amount,
        resources: resources,
        rewards: rewards,
        nextNFT: nextNFT,
        isQualified: isQualified,
        autoReferenceID: autoReferenceID,
        amountMinted: amountMinted,
        myNFTs: myNFTs,
        favouriteNFT: favouriteNFT,
        haveToRecover: !isRecover,
        nfts_qualified,
        able_price,
        dai_price
    };
}

export const getSinergyBronzeData_ForAble = async (addressAccount, ContractSinergy, MigrationContract) => {
    const amount = await ContractSinergy.methods.balanceOf(addressAccount).call();

    const isRecover = await MigrationContract.methods.isRecover(addressAccount).call();

    return {
        contract: ContractSinergy,
        amount: amount,
        isQualified: amount > 0,
        address: SINERGY_BRONZE_CONTRACT_ADDRESS,
        haveToRecover: !isRecover
    }
};

export const getSinergyBronzeData_FirstReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.firstLevel.amount,
        1
    );

    Sinergy.favouriteNFT.references.firstLevel.nfts = level_references;

    return Sinergy;
};

export const getSinergyBronzeData_SecondReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.secondLevel.amount,
        2
    );

    Sinergy.favouriteNFT.references.secondLevel.nfts = level_references;

    return Sinergy;
};

export const getSinergyBronzeData_ThirdReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.thirdLevel.amount,
        3
    );

    Sinergy.favouriteNFT.references.thirdLevel.nfts = level_references;

    return Sinergy;
};

export const getSinergyBronzeData_FourReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.fourLevel.amount,
        4
    );

    Sinergy.favouriteNFT.references.fourLevel.nfts = level_references;

    return Sinergy;
};

export const getSinergyBronzeData_FiveReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.fiveLevel.amount,
        5
    );

    Sinergy.favouriteNFT.references.fiveLevel.nfts = level_references;

    return Sinergy;
};

export const getSinergyBronzeData_SixReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.sixLevel.amount,
        6
    );

    Sinergy.favouriteNFT.references.sixLevel.nfts = level_references;

    return Sinergy;
};

export const getSinergyBronzeData_SevenReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.sevenLevel.amount,
        7
    );

    Sinergy.favouriteNFT.references.sevenLevel.nfts = level_references;

    return Sinergy;
};

export const getSinergyBronzeData_EightReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.eightLevel.amount,
        8
    );

    Sinergy.favouriteNFT.references.eightLevel.nfts = level_references;

    return Sinergy;
};

export const getSinergyBronzeData_NineReference = async (Sinergy) => {

    const level_references = await getNFTReferencesAtLevel(
        Sinergy.contract,
        Sinergy.favouriteNFT.id,
        Sinergy.favouriteNFT.references.nineLevel.amount,
        9
    );

    Sinergy.favouriteNFT.references.nineLevel.nfts = level_references;

    return Sinergy;
};

// ----------------------------------------------------------------------------
// Capaz no hace falta, puedo usar la version anterior.
export const SinergyBronzeGetData = async (Sinergy, wallet, cycle) => {
    const prices = await SinergyBronzeGetPrices(Sinergy.contract);
    const MIN_AMOUNT_FIRST_LEVEL_CONNECTIONS = await Sinergy.contract.methods.
        MIN_AMOUNT_FIRST_LEVEL_CONNECTIONS().call();
    
};

export const SinergyBronzeGetPrices = async (Contract) => {
    const STABLECOIN_PRICE_WEI = await Contract.methods.PRICE().call();
    const STABLECOIN_PRICE = web3.utils.fromWei(STABLECOIN_PRICE_WEI, 'ether');
    
    const ABLE_PRICE_WEI = await Contract.methods.ABLE_PRICE().call();
    const ABLE_PRICE = web3.utils.fromWei(ABLE_PRICE_WEI, 'ether');

    return {
        STABLECOIN_PRICE, ABLE_PRICE
    }
};

export const SinergyBronzeGetNftsInfo = async (
    Contract, 
    wallet, 
    cycle, 
    ContractSinergyBronzeMigration, 
    ContractMigrationSinergyBronze,
    ContractSinergySale
) => {
    window.document.getElementById('loading').innerHTML = "Cargando Sinergy Bronze...";
    const amount = await Contract.methods.balanceOf(wallet).call();
    const amount_minted = await Contract.methods.GetAmountOfNftMinted().call();

    window.document.getElementById('loading').innerHTML = "Cargando NFTs de Bronze..";
    const nfts = await getMyNFTs(
        Contract, 
        wallet, 
        amount, 
        ContractSinergyBronzeMigration, 
        ContractMigrationSinergyBronze
    );

    window.document.getElementById('loading').innerHTML = "Cargando NFT Favorito...";
    const favourite_nft_id = await ContractSinergy.methods.favourite_nft(addressAccount).call();
    let favouriteNFT = {
        id: 0
    };
    favouriteNFT = getNFT(
        Contract,
        favourite_nft_id,
        ContractSinergySale,
        ContractMigrationSinergyBronze
    );

    window.document.getElementById('loading').innerHTML = "Cargando Recompensas...";
    let start_time = Date.now();
    const rewards = null;//await getRewardInfo(ContractSinergy, Rewards, addressAccount, favouriteNFT_ID);
    let end_time = Date.now();
    console.log("Tiempo de carga (Sinergy Rewards): ", ((end_time - start_time) / 1000).toString())


};

