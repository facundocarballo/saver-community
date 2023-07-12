import { SINERGY_SALE_CONTRACT_ADDRESS, buildTransaciont } from '..';

export const AdminGetSinergySaleInfo = async (SinergySale, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando SinergySale...";

    const stadistic_data = await AdminGetStadisticData(SinergySale.contract, wallet, cycle);
    const set_data = await AdminGetSetData(SinergySale.contract, wallet, cycle);

    SinergySale.admin = {
        stadistic_data,
        set_data
    };

    let end_time = Date.now();
    console.log("Tiempo de carga (SinergySale): ", ((end_time - start_time) / 1000).toString());

    return SinergySale;
};

const AdminGetStadisticData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Estadisticos de SinergySale...";

    const TOTAL_TOKENS_SOLD_wei = await Contract.methods.TOTAL_TOKENS_SOLD().call();
    const TOTAL_TOKENS_SOLD = Number(web3.utils.fromWei(TOTAL_TOKENS_SOLD_wei, 'ether')).toFixed(2);

    const tokens_sold_last_cycle_wei = await Contract.methods.tokens_sold_by_cycle(String(Number(cycle) - 1)).call();
    const tokens_sold_last_cycle = Number(web3.utils.fromWei(tokens_sold_last_cycle_wei, 'ether')).toFixed(2);

    const total_selling_amount_wei = await Contract.methods.total_selling_amount().call();
    const total_selling_amount = Number(web3.utils.fromWei(total_selling_amount_wei, 'ether'));

    const last_wallet_qualified_who_bought = await Contract.methods.last_wallet_qualified_who_bought().call();

    const data = [
        {
            title: "Ables vendidos",
            value: TOTAL_TOKENS_SOLD
        },
        {
            title: `Ables vendidos en el ultimo ciclo (Ciclo ${Number(cycle)-1})`,
            value: tokens_sold_last_cycle
        },
        {
            title: "Ables a la venta",
            value: total_selling_amount
        },
        {
            title: "Ultima billetera calificada que adquirio SinergySale",
            value: last_wallet_qualified_who_bought
        }
    ];

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos estadisticos de SinergySale): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetSetData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Modificables de SinergySale...";

    const limit_post_by_cycle = await AdminGetLimitPostByCycleObj(Contract, wallet);
    const max_amount_to_sell = await AdminGetMaxAmountSellTokenObj(Contract, wallet);
    const min_amount_to_sell = await AdminGetMinAmountSellTokenObj(Contract, wallet);
    const price_token = await AdminGetPriceTokenObj(Contract, wallet);
    const need_be_qualified_to_sell = await AdminGetNeedBeQualifiedToSellObj(Contract, wallet);
    const limit_post_by_wallet = await AdminGetLimitPostByWalletObj(Contract, wallet);
    const min_amount_able_to_sell = await AdminGetMinAmountTokensToSell(Contract, wallet);

    const data = [
        limit_post_by_cycle,
        max_amount_to_sell,
        min_amount_to_sell,
        price_token,
        need_be_qualified_to_sell,
        limit_post_by_wallet,
        min_amount_able_to_sell
    ]

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos Modificables de SinergySale): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetLimitPostByCycleObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetLimitPostByCycle(value).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_SALE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.LIMIT_POST_BY_CYCLE().call();
    const obj = {
        title: "Limite de publicaciones de venta por ciclo",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetMaxAmountSellTokenObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const value_wei = web3.utils.toWei(value, 'ether');
        const data = await Contract.methods.SetMaxAmountSellToken(value_wei).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_SALE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value_wei = await Contract.methods.MAX_AMOUNT_SELL_TOKEN().call();
    const actual_value = web3.utils.fromWei(actual_value_wei, 'ether');

    const obj = {
        title: "Maxima cantidad de Able a la venta por NFT",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetMinAmountSellTokenObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const value_wei = web3.utils.toWei(value, 'ether');
        const data = await Contract.methods.SetMinAmountSellToken(value_wei).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_SALE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value_wei = await Contract.methods.MIN_AMOUNT_SELL_TOKEN().call();
    const actual_value = web3.utils.fromWei(actual_value_wei, 'ether');

    const obj = {
        title: "Minima cantidad de Able a la venta por NFT",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetPriceTokenObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetPriceToken(value).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_SALE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.TOKEN_PRICE().call();

    const obj = {
        title: "Cantidad de Stablecoin por 1 Able",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetNeedBeQualifiedToSellObj = async (Contract, wallet) => {
    const handler = async () => {
        const data = await Contract.methods.SetNeedBeQualifiedToSell().encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_SALE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.need_be_qualified_to_sell().call();

    const obj = {
        title: "Necesita estar calificada la billetera para poder publicar Able a la venta",
        actual_value: actual_value ? "Si" : "No",
        params: false,
        func: handler
    }

    return obj;
};

const AdminGetLimitPostByWalletObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetLimitPostByWallet(value).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_SALE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.LIMIT_POST_BY_WALLET().call();

    const obj = {
        title: "Limite de publicaciones de venta por billetera",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetMinAmountTokensToSell = async (Contract, wallet) => {
    const handler = async (value) => {
        const v = web3.utils.toWei(value, 'ether');
        const data = await Contract.methods.SetMinAmountTokensToSell(v).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_SALE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value_wei = await Contract.methods.MIN_AMOUNT_TOKENS_TO_SELL().call();
    const actual_value = Number(web3.utils.fromWei(actual_value_wei, 'ether')).toFixed(2);

    const obj = {
        title: "Minima cantidad de Able necesarios para publicar en la lista de ventas",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};