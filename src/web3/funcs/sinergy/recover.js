export const getRecoverInfo = async (Contract, MigrationContract) => {
    let not_recovered_nfts = [];
    let recovered_nfts = [];

    // Cargamos la lista de NFTs no recuperados
    const starting_nft_id = await Contract.methods.starting_nft_id().call();

    for (let i = 0; i < starting_nft_id; i++) {
        not_recovered_nfts.push(i);
    }

    // Eliminamos de esa lista a los NFTs que han sido recuperados
    // y Agregamos los NFTs recuperados a la lista correspondiente.
    const recovered_nfts_amount = await MigrationContract.methods.recovered_nfts_amount().call();
    for(let i = 0; i < recovered_nfts_amount; i++) {
        const nft_id = await MigrationContract.methods.recovered_nfts(i).call();
        recovered_nfts.push(nft_id);
        const idx = not_recovered_nfts.indexOf(nft_id);
        if (idx >= 0) {
            not_recovered_nfts.slice(idx, 1);
        }
    }

    return {
        recovered_nfts,
        not_recovered_nfts
    }
};