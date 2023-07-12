import { STABLE_COIN_FORMAT } from "..";

export const getLimitsSavings = async (addressAccount, ContractST) => {
    // const cdaWEI = await ContractST.methods.lastAmountUSDT(addressAccount).call();
    // const cda = web3.utils.fromWei(cdaWEI, STABLE_COIN_FORMAT);

    const usdcWEI = await ContractST.methods.lastAmountUSDC(addressAccount).call();
    const usdc = web3.utils.fromWei(usdcWEI, STABLE_COIN_FORMAT); // Because the USDC is a token of 6 decimals

    const limit = (Number(usdc)) * 1.00369;

    return limit.toFixed(2);
}

export const getSavingData = async (addressAccount, Contract, cycle) => {
    // La grafica deberia mostrar los ahorros segun los ciclos y no segun los dias
    // Mostrar siemrpe 7 barras, no mas.
    const INCREMENT = 1.009;
    let data = [];
    let totalAmount = 0;

    if (cycle <= 7) 
    {
        for (var i = 0; i < cycle; i++) {

            const donationBalance_WEI = await Contract.methods.points_per_cycle(addressAccount, i).call();
            const donationBalance = web3.utils.fromWei(donationBalance_WEI, 'ether');

            const limit = totalAmount * INCREMENT;
    
            totalAmount = Number(donationBalance);
    
            data.push({
                day: i,
                limit: limit,
                donationBalance: Number(totalAmount)
            });
    
    
        }
    }else 
    {
        const tripleInt_wei = await Contract.methods.points_per_cycle(addressAccount, cycle-8).call();
        const tripleInt = web3.utils.fromWei(tripleInt_wei, 'ether');
        totalAmount = Number(tripleInt);

        for (var i = (cycle-7); i < cycle; i++) {

            const donationBalance_WEI = await Contract.methods.points_per_cycle(addressAccount, i).call();
            const donationBalance = web3.utils.fromWei(donationBalance_WEI, 'ether');
    
            const limit = totalAmount * INCREMENT;
    
            totalAmount = Number(donationBalance);
    
            data.push({
                day: i,
                limit: limit,
                donationBalance: Number(totalAmount)
            });
    
    
        }
    }

    return data;
}

export const getSavingsRecords = async (addressAccount, ContractST, cycle) => {
    let usdcRecord = [];
    let cdaRecord = [];
    let totalRecord = [];

    if (cycle <= 7)
    {
        for (var i = 0; i < cycle; i++) {
            const usdcWEI = await ContractST.methods.usdcRecord(addressAccount, i).call();
            // const cdaWEI = await ContractST.methods.cdaRecord(addressAccount, i).call();
    
            const usdc = web3.utils.fromWei(usdcWEI, STABLE_COIN_FORMAT);
            // const cda = web3.utils.fromWei(cdaWEI, STABLE_COIN_FORMAT);
    
            usdcRecord.push(Number(usdc).toFixed(2));
            // cdaRecord.push(Number(cda).toFixed(2));
            totalRecord.push(Number(usdc).toFixed(2));
        }
    }else
    {
        for (var i = (cycle-7); i < cycle; i++) {
            const usdcWEI = await ContractST.methods.usdcRecord(addressAccount, i).call();
            // const cdaWEI = await ContractST.methods.cdaRecord(addressAccount, i).call();
    
            const usdc = web3.utils.fromWei(usdcWEI, STABLE_COIN_FORMAT);
            // const cda = web3.utils.fromWei(cdaWEI, STABLE_COIN_FORMAT);
    
            usdcRecord.push(Number(usdc).toFixed(2));
            // cdaRecord.push(Number(cda).toFixed(2));
            totalRecord.push(Number(usdc).toFixed(2));
        }
    }

    return { usdcRecord, totalRecord };
}