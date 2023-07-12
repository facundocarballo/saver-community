import { NFT_SILVER_PRIVATE_IMAGES } from "../../../../nftPrivateImages";
import { getReferences } from "../nft";
import { unixToDate } from "../..";
import { getSinergySilverEvents } from '../../events/sinergy/silver';

const CID_NFT_JSON = "Qmey2Jwj4kjKHocfT7igrhuBz3PcMnaKq8NewKyBd5XYF4";

export const getNextNFT = () => {

    console.log("NFT Length: ", NFT_SILVER_PRIVATE_IMAGES.length);
    const img_number = Math.trunc(Math.random() * NFT_SILVER_PRIVATE_IMAGES.length);

    const img_url = NFT_SILVER_PRIVATE_IMAGES[img_number];
    const json_url = `ipfs://${CID_NFT_JSON}/${img_number}.json`;

    console.log("img_url: ", img_url);
    console.log(json_url);

    return {
        border: "border",
        base: "base",
        center: "center",
        imageURL: img_url,
        jsonURL: json_url
    }
}

export const getMyNFTs = async (ContractNFT, ContractMiniGame, accountAddress, nftAmount) => {
    var myNftIDs = [];
    var myNFTs = [];

    // Get the tokenIDs that the user owns.
    for (var i = 0; i < nftAmount; i++) {
        const nftID = await ContractNFT.methods.get_my_nfts(accountAddress, i).call();
        myNftIDs.push(nftID);
    }

    // Get the struct of these NFTs.
    for (var i = 0; i < myNftIDs.length; i++) {
        const nft = await getMyNFTS_Info(ContractNFT, ContractMiniGame, myNftIDs[i]);
        
        myNFTs.push(nft);
    }

    return myNFTs;
};

// Para misNFTs podriamos utilizar una funcion mas simple, que solo obtenga los datos que mostramos por pantalla
// Estos datos son:
//  - Nombre
//  - Cantidad de CLS
export const getMyNFTS_Info = async (Contract, ContractMiniGame, tokenID) => {
    const name = await Contract.methods.get_nft_name(tokenID).call();
    const clps_amount = await ContractMiniGame.methods.clps_of(tokenID).call();

    return {
        id: tokenID,
        name,
        clps_amount
    };
};


const get_time_to_end_advertising_list = async (ContractMiniGame, tokenID) => {
    const timestamp_now = Date.now();
    const advertising_list_end_time = await ContractMiniGame.methods.timestamp_to_end_advertising_list(tokenID).call();
    
    // console.log("Tiempo Lista de Sorteo (Que dice el contrato): ", advertising_list_end_time);

    const time_to_end_advertising_list = advertising_list_end_time > 0 ?
        (Number(advertising_list_end_time) * 1000) > timestamp_now ?
            (((Number(advertising_list_end_time) * 1000) - timestamp_now) / 1000) : 0
        : 86400;

    // console.log("Tiempo que le queda Lista de Sorteo (Que decimos nosotros): ", time_to_end_advertising_list);

    return time_to_end_advertising_list;
};


// Para los NFTs de la Lista de Sorteo, utilizar una funcion simple que solo obtenga los datos que mostramos en pantalla
// Estos datos son:
//  - Imagen
//  - ID
//  - Nombre
//  - Conexiones en la Lista de Sorteo
//  - Tiempo que le queda en la Lista de Sorteo
//  - Owner Address (para obtener los eventos)
export const get_NFT_Of_Advertising_List = async (Contract, ContractMiniGame, tokenID) => {
    const name = await Contract.methods.get_nft_name(tokenID).call();
    const imageURL = await Contract.methods.get_nft_image_url(tokenID).call();
    const ownerAddress = await Contract.methods.ownerOf(tokenID).call();
    const value_proposal = await Contract.methods.get_nft_value_proposal(tokenID).call();
    const description = await Contract.methods.get_nft_inscription(tokenID).call();

    // MINI GAME
    const connections_in_advertising_list = await ContractMiniGame.methods.advertising_list_connections(tokenID).call();
    const time_to_end_advertising_list = await get_time_to_end_advertising_list(ContractMiniGame, tokenID);
    
    var last_ids_connections = [];

    for (let i = 0; i < connections_in_advertising_list; i++) {
        const id = await ContractMiniGame.methods.advertising_list_connections_ids(tokenID, i).call();
        last_ids_connections.push(id);
    }
    
    const first_level_connections = await Contract.methods.get_first_level_amount_reference(tokenID).call();
    var all_ids_connections = [];

    for (let i = 0; i < first_level_connections; i++) {
        const id = await Contract.methods.get_first_level_references(tokenID, i).call();
        all_ids_connections.push(id);
    }


    return {
        imageURL,
        id: tokenID,
        description,
        name,
        connections_in_advertising_list,
        time_to_end_advertising_list,
        ownerAddress,
        value_proposal,
        all_ids_connections,
        last_ids_connections
    };
};


const get_time_waiting_in_waiting_list = async (Contract, tokenID) => {
    const timestamp_now = Date.now();
    
    const timestamp_come_to_waiting_list = await Contract.methods.timestamp_come_to_waiting_list(tokenID).call();

    console.log("Marca de tiempo en la que arribo a la lista de espera: ", timestamp_come_to_waiting_list);
    
    const timestamp_come_waiting_list = timestamp_come_to_waiting_list > 0 ? ((timestamp_now - (Number(timestamp_come_to_waiting_list) * 1000)) / 1000) : 86400;

    console.log("Tiempo que decimos nosotros que esta esperando en la Lista de Espera: ", timestamp_come_waiting_list)

    return timestamp_come_waiting_list;
};

// Para los NFTs de la Lista de Espera, utilizar una funcion simple que solo obtenga los datos que mostramos en pantalla
// Estos datos son:
//  - Imagen
//  - ID
//  - Nombre
//  - Conexiones totales
//  - Tiempo en Lista de Espera
export const get_NFT_Of_Waiting_List = async (Contract, ContractMiniGame, tokenID, pos) => {
    const imageURL = await Contract.methods.get_nft_image_url(tokenID).call();
    const name = await Contract.methods.get_nft_name(tokenID).call();
    const totalAmountReferences = await Contract.methods.get_total_amount_references(tokenID).call();
    const time_waiting = await get_time_waiting_in_waiting_list(ContractMiniGame, tokenID);

    return {
        imageURL,
        id: tokenID,
        name,
        totalAmountReferences,
        time_waiting,
        pos
    };
};

// Para los NFTs de la Lista de Ganadores, utilizar una funcion simple que solo obtenga los datos que mostramos en pantalla
// Estos datos son:
//  - ID
//  - Imagen
//  - Tiempo que paso en la Lista de Sorteo
//  - Conexiones que obtuvo en la Lista de Sorteo
export const get_NFT_Of_Winner_List = async (Contract, ContractMiniGame, tokenID) => {
    const imageURL = await Contract.methods.get_nft_image_url(tokenID).call();
    const name = await Contract.methods.get_nft_name(tokenID).call();
    const connections_in_advertising_list = await ContractMiniGame.methods.winner_list_connections_of(tokenID).call();
    const time_wasted_in_advertising_list = await ContractMiniGame.methods.time_wasted_in_advertising_list(tokenID).call();
    
    var last_ids_connections = [];

    for (let i = 0; i < connections_in_advertising_list; i++) {
        const id = await ContractMiniGame.methods.advertising_list_connections_ids(tokenID, i).call();
        last_ids_connections.push(id);
    }

    const first_level_connections = await Contract.methods.get_first_level_amount_reference(tokenID).call();
    var all_ids_connections = [];

    for (let i = 0; i < first_level_connections; i++) {
        const id = await Contract.methods.get_first_level_references(tokenID, i).call();
        all_ids_connections.push(id);
    }


    return {
        name,
        id: tokenID,
        imageURL,
        time_wasted_in_advertising_list,
        connections_in_advertising_list,
        last_ids_connections,
        all_ids_connections
    }
};

// Utilizar esta funcion para obtener "misNFTs", reemplaza la funcion de "getBasicNFT" de los de bronce.
// Los NFTs de las Listas se obtendran con esta funcion.
// Las busquedas de los NFTs tambien.
export const getBasicSilverNFT = async (Contract, ContractMiniGame, tokenID) => {
    const timestamp_now = Date.now();
    const name = await Contract.methods.get_nft_name(tokenID).call();
    const imageURL = await Contract.methods.get_nft_image_url(tokenID).call();
    const ownerAddress = await Contract.methods.ownerOf(tokenID).call();
    const activeRewardsClaimedWEI = await Contract.methods.get_nft_rewards_claimed(tokenID).call();
    const activeRewardsClaimed = web3.utils.fromWei(activeRewardsClaimedWEI, 'ether');
    const totalAmountReferences = await Contract.methods.get_total_amount_references(tokenID).call();

    // MINI GAME
    const connections_in_advertising_list = await ContractMiniGame.methods.advertising_list_connections(tokenID).call();
    const advertising_list_end_time = await ContractMiniGame.methods.timestamp_to_end_advertising_list(tokenID).call();
    const time_to_end_advertising_list = advertising_list_end_time > 0 ?
        (Number(advertising_list_end_time) * 1000) > timestamp_now ?
            (((Number(advertising_list_end_time) * 1000) - timestamp_now) / 1000) : 0
        : 86400;


    const timestamp_come_to_waiting_list = await ContractMiniGame.methods.timestamp_come_to_waiting_list(tokenID).call();

    const timestamp_come_waiting_list = timestamp_come_to_waiting_list > 0 ? ((timestamp_now - (Number(timestamp_come_to_waiting_list) * 1000)) / 1000) : 86400;
    // 86400 son 24 horas en segundos

    const timestamp_come_to_first_waiting_list = await ContractMiniGame.methods.timestamp_come_to_first_waiting_list(tokenID).call();
    const timestamp_come_first_waiting_list = timestamp_come_to_first_waiting_list > 0 ? ((timestamp_now - Number(timestamp_come_to_first_waiting_list) * 1000) / 1000) : 86400;

    const clps_amount = await ContractMiniGame.methods.clps_of(tokenID).call();
    const is_in_first_waiting_list = await ContractMiniGame.methods.is_in_first_waiting_list(tokenID).call();
    const is_in_waiting_list = await ContractMiniGame.methods.is_in_waiting_list(tokenID).call();
    const is_in_advertising_list = await ContractMiniGame.methods.is_in_advertising_list(tokenID).call();

    const time_wasted_in_advertising_list = await ContractMiniGame.methods.time_wasted_in_advertising_list(tokenID).call();

    const events = null; //await getSinergySilverEvents(Contract, tokenID, fromBlock, currentBlock, ownerAddress);

    const is_full = await ContractMiniGame.methods.is_full(tokenID).call();

    return {
        name,
        id: tokenID,
        connections_in_advertising_list,
        time_to_end_advertising_list,
        timestamp_come_waiting_list,
        time_wasted_advertisig_list: Number(time_wasted_in_advertising_list) * 1000,
        imageURL,
        ownerAddress,
        activeRewardsClaimed,
        references: {
            total: totalAmountReferences
        },
        clps_amount,
        is_in_advertising_list,
        is_in_waiting_list,
        events,
        timestamp_come_first_waiting_list,
        is_in_first_waiting_list,
        is_full
    };

};


export const getNFT = async (ContractNFT, ContractMiniGame, tokenID, ContractAbleSale) => {
    const name = await ContractNFT.methods.get_nft_name(tokenID).call();
    const inscription = await ContractNFT.methods.get_nft_inscription(tokenID).call();
    const valueProposal = await ContractNFT.methods.get_nft_value_proposal(tokenID).call();

    const imageURL = await ContractNFT.methods.get_nft_image_url(tokenID).call();

    const activeRewardsClaimedWEI = await ContractNFT.methods.get_nft_rewards_claimed(tokenID).call();
    const activeRewardsClaimed = web3.utils.fromWei(activeRewardsClaimedWEI, 'ether');

    const directReferenceNFT = await ContractNFT.methods.get_nft_reference(tokenID).call(); // NFT al que me conecte
    const ownerAddress = await ContractNFT.methods.ownerOf(tokenID).call();

    const references = await getReferences(ContractNFT, tokenID);

    const timestampCreated = await ContractNFT.methods.get_nft_timestamp_created(tokenID).call();
    const dateCreated = unixToDate(timestampCreated);
    
    const timestamp_now = Date.now();
    
    // MINI GAME
    const connections_in_advertising_list = await ContractMiniGame.methods.advertising_list_connections(tokenID).call();

    const advertising_list_end_time = await ContractMiniGame.methods.timestamp_to_end_advertising_list(tokenID).call();
    const time_to_end_advertising_list = timestamp_now - (Number(advertising_list_end_time) * 1000);

    const timestamp_come_to_waiting_list = await ContractMiniGame.methods.timestamp_come_to_waiting_list(tokenID).call();
    const timestamp_come_waiting_list = timestamp_now - (Number(timestamp_come_to_waiting_list) * 1000);

    const clps_amount = await ContractMiniGame.methods.clps_of(tokenID).call();
    const is_in_waiting_list = await ContractMiniGame.methods.is_in_waiting_list(tokenID).call();
    const is_in_advertising_list = await ContractMiniGame.methods.is_in_advertising_list(tokenID).call();

    const events = null; //await getSinergySilverEvents(ContractNFT, tokenID, fromBlock, currentBlock, ownerAddress);

    const is_in_able_sale = await ContractAbleSale.methods.is_in_sell_list(tokenID).call();

    return {
        name: name,
        inscription: inscription,
        valueProposal: valueProposal,
        imageURL: imageURL,
        ownerAddress: ownerAddress,
        directReferenceNFT: directReferenceNFT,
        activeRewardsClaimed: activeRewardsClaimed,
        references: references,
        dateCreated: dateCreated,
        id: tokenID,
        connections_in_advertising_list,
        time_to_end_advertising_list,
        timestamp_come_waiting_list,
        clps_amount,
        is_in_advertising_list,
        is_in_waiting_list,
        events,
        is_in_able_sale
    };
};