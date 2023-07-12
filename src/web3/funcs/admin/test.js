import { TEST_CONTRACT_ADDRESS, buildTransaciont } from '..';

export const AdminGetTestInfo = async (Test, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Test...";

    const stadistic_data = await AdminGetStadisticData(Test.contract, wallet, cycle);
    const set_data = await AdminGetSetData(Test.contract, wallet, cycle);

    const id_actual = await Test.contract.methods.id().call();
    
    Test.id_actual = id_actual;
    Test.admin = {
        stadistic_data,
        set_data
    };

    let end_time = Date.now();
    console.log("Tiempo de carga (Test): ", ((end_time - start_time) / 1000).toString());

    return Test;
};

const AdminGetStadisticData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Estadisticos de Test...";
    
    const data = [];

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos estadisticos de Test): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetSetData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Modificables de Test...";

    const is_sorted = await AdminGetIsSorted(Contract, wallet);
    const first_video_play_list = await AdminGetFirstVideoPlayList(Contract, wallet);
    const last_video_play_list = await AdminGetLastVideoPlayList(Contract, wallet);

    const data = [
        first_video_play_list,
        last_video_play_list,
        is_sorted
    ]

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos Modificables de Test): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetIsSorted = async (Contract, wallet) => {
    const handler = async () => {
        const data = await Contract.methods.UsePlayList().encodeABI();
        const params = await buildTransaciont(wallet, TEST_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.play_list().call();
    const obj = {
        title: "Lista de Reproduccion?",
        actual_value: actual_value ? "Si" : "No",
        params: false,
        func: handler
    }

    return obj;
};

const AdminGetFirstVideoPlayList = async (Contract, wallet) => {
    const handler = async (id) => {
        const data = await Contract.methods.SetFirstVideoOfPlayList(id).encodeABI();
        const params = await buildTransaciont(wallet, TEST_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.play_list_first_video_id().call();

    const obj = {
        title: "ID del primer video de la lista de reproduccion",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetLastVideoPlayList = async (Contract, wallet) => {
    const handler = async (id) => {
        const data = await Contract.methods.SetLastVideoOfPlayList(id).encodeABI();
        const params = await buildTransaciont(wallet, TEST_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.play_list_last_video_id().call();
    
    const obj = {
        title: "ID del ultimo video de la lista de reproduccion",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};
