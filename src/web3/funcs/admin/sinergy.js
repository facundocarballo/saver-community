import { SINERGY_BRONZE_CONTRACT_ADDRESS, buildTransaciont } from "..";

export const AdminGetSinergyInfo = async (Sinergy, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Sinergy...";

    const stadistic_data = await AdminGetStadisticData(Sinergy.contract, wallet);
    const set_data = await AdminGetSetData(Sinergy.contract, wallet);

    Sinergy.admin = {
        stadistic_data,
        set_data
    };

    let end_time = Date.now();
    console.log("Tiempo de carga (Sinergy): ", ((end_time - start_time) / 1000).toString());

    return Sinergy;
};

const AdminGetStadisticData = async (Contract, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Estadisticos de Sinergy...";

    const stadistic_data = await SinergyGetStadisticData(Contract);

    const data = [
        {
            title: "NFTs Calificados",
            value: stadistic_data.nfts_qualified
        },
        {
            title: "Stablecoin distribuidas entre la comunidad",
            value: stadistic_data.total_stablecoin_distributed
        },
        {
            title: "Holders",
            value: stadistic_data.total_holders
        },
    ];

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos estadisticos de Sinergy): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const SinergyGetStadisticData = async (Contract) => {
    const nfts_qualified = await Contract.methods.nfts_qualified().call();
    const total_stablecoin_distributed_wei = await Contract.methods.total_stablecoin_distributed().call();
    const total_stablecoin_distributed = Number(web3.utils.fromWei(total_stablecoin_distributed_wei, 'ether')).toFixed(2);
    const total_holders = await Contract.methods.total_holders().call();

    return {
        nfts_qualified,
        total_stablecoin_distributed,
        total_holders
    };
};

const AdminGetSetData = async (Contract, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Modificables de Sinergy...";

    const stablecoin_price = await AdminGetStablecoinPriceObj(Contract, wallet);
    const able_price = await AdminGetAblePriceObj(Contract, wallet);
    const min_amount_first_level_connections = await AdminGetMinAmountFirstLevelConnectionsObj(Contract, wallet);

    const data = [
        stablecoin_price,
        able_price,
        min_amount_first_level_connections
    ]

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos Modificables de Sinergy): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetStablecoinPriceObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetStablecoinPrice(value).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_BRONZE_CONTRACT_ADDRESS, data);

        return params;
    };

    const actual_value_wei = await Contract.methods.PRICE().call();
    const actual_value = web3.utils.fromWei(actual_value_wei, 'ether');

    const obj = {
        title: "Precio en Stablecoin del NFT",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetAblePriceObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetAblePrice(value).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_BRONZE_CONTRACT_ADDRESS, data);

        return params;
    };

    const actual_value_wei = await Contract.methods.ABLE_PRICE().call();
    const actual_value = web3.utils.fromWei(actual_value_wei, 'ether');

    const obj = {
        title: "Precio en Able del NFT",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetMinAmountFirstLevelConnectionsObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetMinAmountFirstLevelConnections(value).encodeABI();
        const params = await buildTransaciont(wallet, SINERGY_BRONZE_CONTRACT_ADDRESS, data);

        return params;
    };

    const actual_value = await Contract.methods.MIN_AMOUNT_FIRST_LEVEL_CONNECTIONS().call();
    const obj = {
        title: "Cantidad minima de NFTs conectados en el primer nivel para poder recibir recompensas de afiliacion",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

