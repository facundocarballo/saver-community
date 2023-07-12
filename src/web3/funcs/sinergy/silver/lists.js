import { get_NFT_Of_Advertising_List, get_NFT_Of_Waiting_List, get_NFT_Of_Winner_List } from "./nft";

export const getAdvertisingList = async (ContractMiniGame, ContractSinergy) => {
    const advertising_list_length = await ContractMiniGame.methods.MAX_NFTs_ON_ADVERTISING_LIST().call();
    var nft_list = [];

    for (let i = 0; i < advertising_list_length; i++) {
        const nft_id = await ContractMiniGame.methods.advertising_list(i).call();
        const nft = await get_NFT_Of_Advertising_List(ContractSinergy, ContractMiniGame, nft_id);
        nft.pos = i+1;
        nft_list.push(nft);
    }

    return nft_list;
};

export const getWaitingList = async (ContractMiniGame) => {
    const waiting_list_length = await ContractMiniGame.methods.get_waiting_list_length().call();
    var nft_list = [];

    for (let i = 0; i < waiting_list_length; i++) {
        const nft_id = await ContractMiniGame.methods.waiting_list(i).call();
        // const nft = await get_NFT_Of_Waiting_List(Contract, nft_id, i+1);
        const nft = {
            id: nft_id,
            pos: i+1
        };

        nft_list.push(nft);
    }

    return nft_list;
};

export const getFirstWaitingList = async (ContractMiniGame) => {
    const waiting_list_length = await ContractMiniGame.methods.get_first_waiting_list_length().call();
    var nft_list = [];

    for (let i = 0; i < waiting_list_length; i++) {
        const nft_id = await ContractMiniGame.methods.first_waiting_list(i).call();
        const nft = {
            id: nft_id,
            pos: i+1
        };

        nft_list.push(nft);
    }

    return nft_list;
};

export const getWinnerList = async (ContractMiniGame, ContractSinergy) => {
    const winner_list_length = await ContractMiniGame.methods.get_winner_list_length().call();
    var nft_list = [];

    for (let i = 0; i < winner_list_length; i++) {
        const nft_id = await ContractMiniGame.methods.winner_list(i).call();

        const nft = await get_NFT_Of_Winner_List(ContractSinergy, ContractMiniGame, nft_id);

        nft_list.push(nft);
    }

    return nft_list;
};