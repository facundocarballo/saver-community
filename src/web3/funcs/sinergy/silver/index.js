import { getResources } from "../resources";
import { getMyNFTs, getNFT } from "./nft";
import { getRewardInfo } from "../reward";
import { getNextNFT } from "./nft";
import { getAdvertisingList, getFirstWaitingList, getWaitingList, getWinnerList } from './lists';
import { getAccount } from "../..";
import { getQualifiedBasic } from "../../user/qualified";

// EL NFT de plata tiene estos adicionales al de Bronce:
// - Cantidad de CLPs
// - Condicion del NFT
// - Fuera del MiniJuego
// - En Lista de Espera
// - En Lista Publicitaria
// Los NFTs de la Lista Publicitaria:
// - Nombre
// - ID
// - Conexiones hechas
// - Tiempo que le queda
// Los NFTs de la Lista de Espera:
// - Nombre
// - ID
// - Fecha en la que entro a la lista

export const getSinergySilverData_AfterModifyNFT = async (addressAccount, Sinergy, ContractAbleSale) => {
    const favouriteNFT_ID = await Sinergy.contract.methods.favourite_nft(addressAccount).call();
    const favouriteNFT = await getNFT(
        Sinergy.contract, 
        Sinergy.mini_game.contract,
        favouriteNFT_ID, 
        ContractAbleSale
    );

    Sinergy.favouriteNFT = favouriteNFT;

    return Sinergy;
}

export const getSinergySilverData_AfterBuyNFT = async (addressAccount, Sinergy) => {
    const amount = await Sinergy.contract.methods.balanceOf(addressAccount).call();
    const nextNFT = getNextNFT();
    const myNFTs = await getMyNFTs(
        Sinergy.contract, 
        Sinergy.mini_game, 
        addressAccount, 
        amount
    );

    Sinergy.amount = amount;
    Sinergy.nextNFT = nextNFT;
    Sinergy.myNFTs = myNFTs;

    return Sinergy;
};

export const getSinergySilverData_AfterChooseFavouriteNFT = async (addressAccount, Sinergy, ContractAbleSale) => {
    const favouriteNFT_ID = await Sinergy.contract.methods.favourite_nft(addressAccount).call();
    console.log("Nos llega este nuevo ID: ", favouriteNFT_ID);
    const rewards = await getRewardInfo(Sinergy.contract, addressAccount, favouriteNFT_ID);


    let favouriteNFT = {
        id: 0
    };

    if (favouriteNFT_ID != 0 && addressAccount != "0xc8895f6f85D870589C42fd6d531c855bddD27B0f") {
        console.log("Entramos...")
        favouriteNFT = await getNFT(
            Sinergy.contract, 
            Sinergy.mini_game, 
            favouriteNFT_ID, 
            ContractAbleSale
        );
    }

    Sinergy.favouriteNFT = favouriteNFT;
    Sinergy.rewards = rewards;

    return Sinergy;
};

export const getSinergySilverData_AfterReward = async (addressAccount, Sinergy, nft_id) => {
    const rewards = await getRewardInfo(Sinergy.contract, addressAccount, nft_id);

    Sinergy.rewards = rewards;

    return Sinergy;
};

export const getSinergySilverData_AfterCLS = async (Sinergy, nft_id, addressAccount, ContractAbleSale) => {
    
    const can_claim_passive_rewards = await Sinergy.contract.methods.qualified_to_claim_passive_rewards(addressAccount).call();
    const favouriteNFT = await getNFT(
        Sinergy.contract,
        Sinergy.mini_game, 
        nft_id, ContractAbleSale
    );

    // MINI GAME
    const advertising_list = await getAdvertisingList(Sinergy.mini_game, Sinergy.contract);
    const waiting_list = await getWaitingList(Sinergy.mini_game);
    const cls_total = await Sinergy.mini_game.methods.total_clps().call();
    const waiting_list_state = await Sinergy.mini_game.methods.waiting_list_state().call();

    Sinergy.advertising_list = advertising_list;
    Sinergy.waiting_list = waiting_list;
    Sinergy.favouriteNFT = favouriteNFT;

    Sinergy.cls_total = cls_total;
    Sinergy.waiting_list_state = waiting_list_state;

    Sinergy.can_claim_passive_rewards = can_claim_passive_rewards;

    return Sinergy;
};

export const getSinergySilverData = async (
    wallet, ContractSinergy, ContractCDA,
    ContractAble, Qualified, ContractAbleSale,
    ContractMiniGame
) => {

    if (Qualified == null) {
        Qualified = await getQualifiedBasic(ContractAble, wallet);
    }

    const amount = await ContractSinergy.methods.balanceOf(wallet).call();

    window.document.getElementById('loading').innerHTML = "Cargando Sinergy Silver...";

    const resources = await getResources(ContractSinergy, ContractCDA, ContractAble);
    const amountMinted = await ContractSinergy.methods.getAmountOfNftMinted().call();

    window.document.getElementById('loading').innerHTML = "Cargando NFTs...";

    const myNFTs = await getMyNFTs(ContractSinergy, ContractMiniGame, wallet, amount);
    // console.log("Obtuvimos mis NFTs.");
    const favouriteNFT_ID = await ContractSinergy.methods.favourite_nft(wallet).call();
    let favouriteNFT = {
        id: 0
    };

    window.document.getElementById('loading').innerHTML = "Cargando NFT Favorito...";
    favouriteNFT = await getNFT(ContractSinergy, ContractMiniGame, favouriteNFT_ID, ContractAbleSale);
    // console.log("Obtuvimos al NFT favorito");

    window.document.getElementById('loading').innerHTML = "Cargando Recompensas...";

    const rewards = await getRewardInfo(ContractSinergy, wallet, favouriteNFT_ID);
    // console.log("Obtuvimos informacion de la recompensa");
    const nextNFT = getNextNFT();
    // console.log("Obtuvimos al seguiente NFT");

    const can_claim_passive_rewards = await ContractSinergy.methods.qualified_to_claim_passive_rewards(wallet).call();

    // MINI GAME
    window.document.getElementById('loading').innerHTML = "Cargando Lista de Propuestas...";

    const advertising_list = await getAdvertisingList(ContractMiniGame, ContractSinergy);
    // console.log("Obtuvimos la Lista Publicitaria");

    window.document.getElementById('loading').innerHTML = "Cargando Lista de Espera...";

    const waiting_list = await getWaitingList(ContractMiniGame);
    // console.log("Obtuvimos la Lista de Espera");

    const first_waiting_list = await getFirstWaitingList(ContractMiniGame);

    window.document.getElementById('loading').innerHTML = "Cargando Lista de Ganadores...";

    const winner_list = await getWinnerList(ContractMiniGame, ContractSinergy);
    // console.log("Obtuvimos la Lista de Ganadores");

    const cls_price_wei = await ContractMiniGame.methods.CLPs_PRICE().call();
    const cls_price = web3.utils.fromWei(cls_price_wei, 'ether');

    const cls_range_max_value = await ContractMiniGame.methods.CLPs_RANGE_MAX_VALUE().call();
    const cls_range_min_value = await ContractMiniGame.methods.CLPs_RANGE_MIN_VALUE().call();
    const cls_total = await ContractMiniGame.methods.total_clps().call();
    const waiting_list_state = await ContractMiniGame.methods.waiting_list_state().call();

    


    return {
        contract: ContractSinergy,
        mini_game: ContractMiniGame,
        amount: amount,
        resources: resources,
        rewards: rewards,
        nextNFT: nextNFT,
        amountMinted: amountMinted,
        myNFTs: myNFTs,
        favouriteNFT: favouriteNFT,
        advertising_list,
        first_waiting_list,
        waiting_list,
        winner_list,
        cls_price,
        cls_range_max_value,
        cls_range_min_value,
        cls_total,
        waiting_list_state,
        can_claim_passive_rewards
    };


};