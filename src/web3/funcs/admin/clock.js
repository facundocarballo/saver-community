import { CLOCK_CONTRACT_ADDRESS, buildTransaciont } from '..';
import { getTimestampToNextReward } from '../able/reward';
import { getHoursToNextCycle, getActualTimestamp } from '../auxs/time';

export const AdminGetClockInfo = async (Clock, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Clock...";

    const stadistic_data = await AdminGetStadisticData(Clock.contract, wallet);
    const set_data = await AdminGetSetData(Clock.contract, wallet);

    Clock.admin = {
        stadistic_data,
        set_data
    };

    let end_time = Date.now();
    console.log("Tiempo de carga (Clock): ", ((end_time - start_time) / 1000).toString());

    return Clock;
};

const AdminGetStadisticData = async (Contract, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Estadisticos de Clock...";

    const cycle = await Contract.methods.cycle().call();
    const timestamp_to_next_cycle = await Contract.methods.timestamp_to_next_cycle().call();
    const actual_timestamp = await getActualTimestamp();
    const time_to_next_reward = getHoursToNextCycle(actual_timestamp, timestamp_to_next_cycle);

    const data = [
        {
            title: "Ciclo",
            value: cycle
        },
        {
            title: "Tiempo para el proximo Ciclo",
            value: time_to_next_reward
        },
    ];

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos estadisticos de Clock): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetSetData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Modificables de Clock...";

    const potencial_able = await AdminGetPotencialClockObj(Contract, wallet);

    const data = [
        potencial_able,
    ]

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos Modificables de Clock): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetPotencialClockObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetTimeOfCycle(value).encodeABI();
        const params = await buildTransaciont(wallet, CLOCK_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.TIME_OF_CYCLE().call();

    const obj = {
        title: "Duracion del Ciclo (En segundos)",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};