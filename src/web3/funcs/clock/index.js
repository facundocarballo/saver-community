import { getActualTimestamp, getHoursToNextCycle } from '../auxs/time';

export const ClockGetInfo = async (Clock) => {
    let start_time = Date.now();
    // window.document.getElementById('loading').innerHTML = "Cargando Clock...";

    const cycle = await Clock.contract.methods.cycle().call();
    const timestamp_to_next_cycle = await Clock.contract.methods.timestamp_to_next_cycle().call();
    const timestampNow = await getActualTimestamp();
    const timer = getHoursToNextCycle(timestampNow, Number(timestamp_to_next_cycle));

    Clock.cycle = cycle;
    Clock.timer = timer;
    
    let end_time = Date.now();
    console.log("Tiempo de carga (Clock): ", ((end_time - start_time) / 1000).toString())

    return Clock;
};