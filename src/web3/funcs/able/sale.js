
export const getSinergySaleData_AfterBuyAble = async (AbleSale) => {
    const total_able_selling_WEI = await AbleSale.contract.methods.total_selling_amount().call();
    const total_able_selling = web3.utils.fromWei(total_able_selling_WEI, 'ether');

    AbleSale.total_able_selling = total_able_selling;

    return AbleSale;
};

export const getSinergySaleData = async (Contract, ContractAddress, full, wallet, cycle) => {
    window.document.getElementById('loading').innerHTML = "Cargando Sinergy Sale...";
    const sell_list_length = await Contract.methods.GetSellListLength().call();
    const driven_list_length = await Contract.methods.GetDrivenListLength().call();
    const total_able_selling_WEI = await Contract.methods.total_selling_amount().call();
    const total_able_selling = web3.utils.fromWei(total_able_selling_WEI, 'ether');

    const points_increased_in_this_cycle = 
        await Contract.methods.amount_bought_by_cycle_of(wallet, cycle).call(); 

    const turn = await Contract.methods.turn().call();

    const MAX_AMOUNT_SELL_TOKEN_wei = await Contract.methods.MAX_AMOUNT_SELL_TOKEN().call();
    const MAX_AMOUNT_SELL_TOKEN = Number(web3.utils.fromWei(MAX_AMOUNT_SELL_TOKEN_wei, 'ether'));

    const MIN_AMOUNT_SELL_TOKEN_wei = await Contract.methods.MIN_AMOUNT_SELL_TOKEN().call();
    const MIN_AMOUNT_SELL_TOKEN = Number(web3.utils.fromWei(MIN_AMOUNT_SELL_TOKEN_wei, 'ether'));

    const TOKEN_PRICE = await Contract.methods.TOKEN_PRICE().call();
    const LIMIT_POST_BY_CYCLE = await Contract.methods.LIMIT_POST_BY_CYCLE().call();

    const can_sell = await Contract.methods.CanSell(wallet).call();

    const min_amount_able_to_sell_wei = await Contract.methods.MIN_AMOUNT_TOKENS_TO_SELL().call();
    const min_amount_able_to_sell = Number(web3.utils.fromWei(min_amount_able_to_sell_wei, 'ether'));

    var sell_list = [];
    var driven_list = [];

    if (full) {
        for (let i = 0; i < sell_list_length; i++) {
            const nft_id = await Contract.methods.sell_list(i).call();
            const selling_amount_of_wei = await Contract.methods.selling_amount_of(nft_id).call();
            const selling_amount_of = web3.utils.fromWei(selling_amount_of_wei, 'ether');

            const nft = {
                id: nft_id,
                pos: i + 1,
                sale: Number(selling_amount_of).toFixed(2)
            };

            sell_list.push(nft);
        }

        for (let i = 0; i < driven_list_length; i++) {
            const nft_id = await Contract.methods.driven_list(i).call();
            const selling_amount_of_wei = await Contract.methods.selling_amount_of(nft_id).call();
            const selling_amount_of = web3.utils.fromWei(selling_amount_of_wei, 'ether');

            const nft = {
                id: nft_id,
                pos: i + 1,
                sale: Number(selling_amount_of).toFixed(2)
            };

            driven_list.push(nft);
        }
    }


    return {
        contract: Contract,
        contractAddress: ContractAddress,
        sell_list,
        driven_list,
        total_able_selling,
        turn,
        MAX_AMOUNT_SELL_TOKEN,
        MIN_AMOUNT_SELL_TOKEN,
        TOKEN_PRICE,
        LIMIT_POST_BY_CYCLE,
        points_increased_in_this_cycle,
        can_sell,
        min_amount_able_to_sell
    }
};