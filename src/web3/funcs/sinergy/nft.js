import { NFT_PRIVATE_IMAGES } from '../../../nftPrivateImages';
import { INITIAL_AMOUNT_NFTS, unixToDate } from '..';

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
const BASE_URL_NFT_IMAGES = "https://ipfs.io/ipfs";
const CID_NFT_JSON = "QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U";

export const getAutoReference = async (ContractAble, ContractSinergy, addressAccount) => {
    let autoReferenceID = '8';

    const addressOfLastDonation = await ContractAble.methods.last_wallet_who_bought_able().call();
    if (addressOfLastDonation != NULL_ADDRESS) {
        autoReferenceID = await ContractSinergy.methods.favourite_nft(addressAccount).call();
    }

    return autoReferenceID;
}

export const getNextNFT = () => {

    const img_number = Math.trunc(Math.random() * NFT_PRIVATE_IMAGES.length);

    const img_url = NFT_PRIVATE_IMAGES[img_number];
    const json_url = `ipfs://${CID_NFT_JSON}/${img_number}.json`;

    console.log("IMAGE URL: ", img_url);
    console.log("JSON URL: ", json_url);

    return {
        border: "border",
        base: "base",
        center: "center",
        imageURL: img_url,
        jsonURL: json_url
    }
}

export const getMyNFTs = async (
    ContractNFT, 
    accountAddress, 
    nftAmount, 
    ContractNFTMigration, 
    MigrationContract
) => {
    var myNftIDs = [];
    var myNFTs = [];

    // Get the tokenIDs that the user owns.
    if (accountAddress == "0xc8895f6f85d870589c42fd6d531c855bddd27b0f") {
        myNftIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    } else {
        for (var i = 0; i < nftAmount; i++) {
            const nftID = await ContractNFT.methods.get_my_nfts(accountAddress, i).call();
            myNftIDs.push(nftID);
        }

    }

    // Get the struct of these NFTs.
    for (var i = 0; i < myNftIDs.length; i++) {
        const nft = await getBasicNFT(
            ContractNFT, 
            myNftIDs[i], 
            ContractNFTMigration,
            MigrationContract
        );
        myNFTs.push(nft);
    }

    return myNFTs;
};

export const getBasicNFT = async (Contract, tokenID, ContractMigration, MigrationContract) => {
    let ownerAddress = null;
    try {
        ownerAddress = await Contract.methods.ownerOf(tokenID).call();
    } catch (err) {
        console.log("ERROR: ", err);
        ownerAddress = NULL_ADDRESS;
    }

    const isRecover = await MigrationContract.methods.isRecover(ownerAddress).call();

    let data = null;

    if (isRecover || tokenID > INITIAL_AMOUNT_NFTS) {
        // Obtenemos la informacion del contrato actual.
        data = await getNFTBasicInfo(Contract, tokenID);
        const activeRewardsClaimedWEI = await Contract.methods.nft_affiliate_rewards_earned(tokenID).call();
        const activeRewardsClaimed = web3.utils.fromWei(activeRewardsClaimedWEI, 'ether');
        data.activeRewardsClaimed = activeRewardsClaimed;
    } else {
        data = await getNFTBasicInfo(ContractMigration, tokenID);
    }

    data.ownerAddress = ownerAddress;
    data.isRecover = isRecover;

    return data;
}

export const getBasicReferences = async (ContractNFT, tokenID, MigrationContract) => {
    const totalAmountReferences = await ContractNFT.methods.get_total_amount_references(tokenID).call();

    // First Level
    const firstLevelAmount = await ContractNFT.methods.get_first_level_amount_reference(tokenID).call();
    const firstLevelReferences = null;
    const first_level_references_recover = await MigrationContract.methods.first_level_references_recover(tokenID).call();

    // Second Level
    const secondLevelAmount = await ContractNFT.methods.get_second_level_amount_reference(tokenID).call();
    const seocndLevelReferences = null;
    const second_level_references_recover = await MigrationContract.methods.second_level_references_recover(tokenID).call();


    // Third Level
    const thirdLevelAmount = await ContractNFT.methods.get_third_level_amount_reference(tokenID).call();
    const thirdLevelReferences = null;
    const third_level_references_recover = await MigrationContract.methods.third_level_references_recover(tokenID).call();


    // Four Level
    const fourLevelAmount = await ContractNFT.methods.get_four_level_amount_reference(tokenID).call();
    const fourLevelReferences = null;
    const four_level_references_recover = await MigrationContract.methods.four_level_references_recover(tokenID).call();


    // Five Level
    const fiveLevelAmount = await ContractNFT.methods.get_five_level_amount_reference(tokenID).call();
    const fiveLevelReferences = null;
    const five_level_references_recover = await MigrationContract.methods.five_level_references_recover(tokenID).call();


    // Six Level
    const sixLevelAmount = await ContractNFT.methods.get_six_level_amount_reference(tokenID).call();
    const sixLevelReferences = null;
    const six_level_references_recover = await MigrationContract.methods.six_level_references_recover(tokenID).call();


    // Seven Level
    const sevenLevelAmount = await ContractNFT.methods.get_seven_level_amount_reference(tokenID).call();
    const sevenLevelReferences = null;
    const seven_level_references_recover = await MigrationContract.methods.seven_level_references_recover(tokenID).call();


    // Eight Level
    const eightLevelAmount = await ContractNFT.methods.get_eight_level_amount_reference(tokenID).call();
    const eightLevelReferences = null;
    const eight_level_references_recover = await MigrationContract.methods.eight_level_references_recover(tokenID).call();


    // Nine Level
    const nineLevelAmount = await ContractNFT.methods.get_nine_level_amount_reference(tokenID).call();
    const nineLevelReferences = null;
    const nine_level_references_recover = await MigrationContract.methods.nine_level_references_recover(tokenID).call();


    const references = {
        firstLevel: {
            amount: firstLevelAmount,
            nfts: firstLevelReferences,
            recover: first_level_references_recover
        },
        secondLevel: {
            amount: secondLevelAmount,
            nfts: seocndLevelReferences,
            recover: second_level_references_recover
        },
        thirdLevel: {
            amount: thirdLevelAmount,
            nfts: thirdLevelReferences,
            recover: third_level_references_recover
        },
        fourLevel: {
            amount: fourLevelAmount,
            nfts: fourLevelReferences,
            recover: four_level_references_recover
        },
        fiveLevel: {
            amount: fiveLevelAmount,
            nfts: fiveLevelReferences,
            recover: five_level_references_recover
        },
        sixLevel: {
            amount: sixLevelAmount,
            nfts: sixLevelReferences,
            recover: six_level_references_recover
        },
        sevenLevel: {
            amount: sevenLevelAmount,
            nfts: sevenLevelReferences,
            recover: seven_level_references_recover
        },
        eightLevel: {
            amount: eightLevelAmount,
            nfts: eightLevelReferences,
            recover: eight_level_references_recover
        },
        nineLevel: {
            amount: nineLevelAmount,
            nfts: nineLevelReferences,
            recover: nine_level_references_recover
        },
        total: totalAmountReferences
    };


    return references;
}

export const getReferences = async (ContractNFT, tokenID) => {
    const totalAmountReferences = await ContractNFT.methods.get_total_amount_references(tokenID).call();

    // First Level
    const firstLevelAmount = await ContractNFT.methods.get_first_level_amount_reference(tokenID).call();
    const firstLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, firstLevelAmount, 1);

    // Second Level
    const secondLevelAmount = await ContractNFT.methods.get_second_level_amount_reference(tokenID).call();
    const seocndLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, secondLevelAmount, 2);

    // Third Level
    const thirdLevelAmount = await ContractNFT.methods.get_third_level_amount_reference(tokenID).call();
    const thirdLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, thirdLevelAmount, 3);

    // Four Level
    const fourLevelAmount = await ContractNFT.methods.get_four_level_amount_reference(tokenID).call();
    const fourLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, fourLevelAmount, 4);

    // Five Level
    const fiveLevelAmount = await ContractNFT.methods.get_five_level_amount_reference(tokenID).call();
    const fiveLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, fiveLevelAmount, 5);

    // Six Level
    const sixLevelAmount = await ContractNFT.methods.get_six_level_amount_reference(tokenID).call();
    const sixLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, sixLevelAmount, 6);

    // Seven Level
    const sevenLevelAmount = await ContractNFT.methods.get_seven_level_amount_reference(tokenID).call();
    const sevenLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, sevenLevelAmount, 7);

    // Eight Level
    const eightLevelAmount = await ContractNFT.methods.get_eight_level_amount_reference(tokenID).call();
    const eightLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, eightLevelAmount, 8);

    // Nine Level
    const nineLevelAmount = await ContractNFT.methods.get_nine_level_amount_reference(tokenID).call();
    const nineLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, nineLevelAmount, 9);

    const references = {
        firstLevel: {
            amount: firstLevelAmount,
            nfts: firstLevelReferences
        },
        secondLevel: {
            amount: secondLevelAmount,
            nfts: seocndLevelReferences
        },
        thirdLevel: {
            amount: thirdLevelAmount,
            nfts: thirdLevelReferences
        },
        fourLevel: {
            amount: fourLevelAmount,
            nfts: fourLevelReferences
        },
        fiveLevel: {
            amount: fiveLevelAmount,
            nfts: fiveLevelReferences
        },
        sixLevel: {
            amount: sixLevelAmount,
            nfts: sixLevelReferences
        },
        sevenLevel: {
            amount: sevenLevelAmount,
            nfts: sevenLevelReferences
        },
        eightLevel: {
            amount: eightLevelAmount,
            nfts: eightLevelReferences
        },
        nineLevel: {
            amount: nineLevelAmount,
            nfts: nineLevelReferences
        },
        total: totalAmountReferences
    };


    return references;
}

export const getNFTReferencesAtLevel = async (Contract, tokenID, amountOfReferences, level) => {
    let nftReferences = [];

    // const total_amount_references = await Contract.methods.get_total_amount_references(tokenID).call();
    // const imageURL = await Contract.methods.get_nft_image_url(tokenID).call();
    // const timestampCreated = await Contract.methods.get_nft_timestamp_created(tokenID).call();
    // const dateCreated = unixToDate(timestampCreated);

    if (level == 1) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_first_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }

    if (level == 2) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_second_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }

    if (level == 3) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_third_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }

    if (level == 4) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_four_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }

    if (level == 5) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_five_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }

    if (level == 6) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_six_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }

    if (level == 7) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_seven_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }

    if (level == 8) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_eight_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }

    if (level == 9) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_nine_level_references(tokenID, i).call();

            const ref = null; // await Contract.methods.get_nft_reference(nftID).call();
            const valueProposal = null // await Contract.methods.get_nft_value_proposal(nftID).call();
            const total_amount_references = null; // await Contract.methods.get_total_amount_references(nftID).call();
            const imageURL = null; // await Contract.methods.get_nft_image_url(nftID).call();
            const name = null; // await Contract.methods.get_nft_name(nftID).call();
            const inscription = null; // await Contract.methods.get_nft_inscription(nftID).call();
            const timestampCreated = null; // await Contract.methods.get_nft_timestamp_created(nftID).call();
            const dateCreated = null; // unixToDate(timestampCreated);

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref,
                name: name,
                inscription: inscription,
                valueProposal: valueProposal
            })
        }

        return nftReferences;
    }


    return null;
}


export const getSinergyBronze_AfterSell = async (SinergyBronze, ContractAbleSale) => {
    const ownerAddress = await SinergyBronze.contract.methods.ownerOf(SinergyBronze.favouriteNFT.id).call();

    const able_sellingWEI = await ContractAbleSale.methods.selling_amount_of(SinergyBronze.favouriteNFT.id).call();
    const able_selling = web3.utils.fromWei(able_sellingWEI, 'ether');

    const can_selling_by_time = await ContractAbleSale.methods.CanSell(ownerAddress).call();

    const selling = {
        able: Number(able_selling).toFixed(2),
        triple: 0,
        can_selling_by_time
    };

    SinergyBronze.favouriteNFT.selling = selling;

    return SinergyBronze;
};

export const getNFT = async (
    ContractNFT,
    tokenID,
    ContractAbleSale,
    MigrationContract
) => {
    const name = await ContractNFT.methods.get_nft_name(tokenID).call();
    const inscription = await ContractNFT.methods.get_nft_inscription(tokenID).call();
    const valueProposal = await ContractNFT.methods.get_nft_value_proposal(tokenID).call();
    const imageURL = await ContractNFT.methods.get_nft_image_url(tokenID).call();
    // TODO: Obtener nueva ABI 06-04-2023
    const activeRewardsClaimedWEI = await ContractNFT.methods.nft_affiliate_rewards_earned(tokenID).call();
    const activeRewardsClaimed = web3.utils.fromWei(activeRewardsClaimedWEI, 'ether');
    const directReferenceNFT = await ContractNFT.methods.get_nft_reference(tokenID).call();
    let ownerAddress = null;
    try {
        ownerAddress = await ContractNFT.methods.ownerOf(tokenID).call();
    } catch (err) {
        console.log("ERROR: ", err);
        ownerAddress = NULL_ADDRESS;
    }

    const able_sellingWEI = await ContractAbleSale.methods.selling_amount_of(tokenID).call();
    const able_selling = web3.utils.fromWei(able_sellingWEI, 'ether');

    const stable_coin_earned_by_able_sale_wei = await ContractAbleSale.methods.amount_sold_of(ownerAddress).call();
    const stable_coin_earned_by_able_sale = web3.utils.fromWei(stable_coin_earned_by_able_sale_wei, 'ether');

    const can_selling_by_time = await ContractAbleSale.methods.CanSell(ownerAddress).call();

    const selling = {
        able: Number(able_selling).toFixed(2),
        triple: 0,
        can_selling_by_time
    };

    const references = await getBasicReferences(ContractNFT, tokenID, MigrationContract);
    const timestampCreated = await ContractNFT.methods.get_nft_timestamp_created(tokenID).call();
    const dateCreated = unixToDate(timestampCreated);
    return {
        name: name,
        inscription: inscription,
        valueProposal: valueProposal,
        imageURL: imageURL,
        ownerAddress: ownerAddress,
        reference: directReferenceNFT,
        activeRewardsClaimed: activeRewardsClaimed,
        references: references,
        dateCreated: dateCreated,
        id: tokenID,
        selling,
        stable_coin_earned_by_able_sale
    };
};

const getNFTBasicInfo = async (Contract, tokenID) => {
    const name = await Contract.methods.get_nft_name(tokenID).call();
    const inscription = await Contract.methods.get_nft_inscription(tokenID).call();
    const valueProposal = await Contract.methods.get_nft_value_proposal(tokenID).call();
    const imageURL = await Contract.methods.get_nft_image_url(tokenID).call();
    const reference = await Contract.methods.get_nft_reference(tokenID).call();
    const totalAmountReferences = await Contract.methods.get_total_amount_references(tokenID).call();
    const timestampCreated = await Contract.methods.get_nft_timestamp_created(tokenID).call();
    const dateCreated = unixToDate(timestampCreated);

    return {
        id: tokenID,
        name,
        inscription,
        valueProposal,
        imageURL,
        references: {
            total: totalAmountReferences
        },
        reference,
        dateCreated: dateCreated,
        selling: {
            able: 0,
            triple: 0
        }
    }
};

export const getOwnerOfNFT = async (Contract, tokenID) => {
    const address = await Contract.methods.ownerOf(tokenID).call();

    return address;
}