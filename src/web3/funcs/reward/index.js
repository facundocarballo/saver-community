export const RewardGetData = async (Reward, wallet, cycle) => {
    const total_distributed_wei = await Reward.contract.methods.total_distributed().call();
    const total_distributed = web3.utils.fromWei(total_distributed_wei, 'ether');

    const POTENCIAL = await Reward.contract.methods.POTENCIAL().call();

    const actual = await RewardGetActual(
        Reward.contract,
        wallet, 
        (Number(cycle) - 1).toString()
    );

    const future = await RewardGetFuture(
        Reward.contract,
        wallet, 
        cycle
    );

    const amount_earned_wei = await Reward.contract.methods.amount_earned(wallet).call();
    const amount_earned = web3.utils.fromWei(amount_earned_wei, 'ether');

    const can_claim = await Reward.contract.methods.CanClaim(wallet).call();

    Reward.total_distributed = total_distributed;
    Reward.actual = actual;
    Reward.future = future;
    Reward.amount_earned = amount_earned;
    Reward.can_claim = can_claim;
    Reward.POTENCIAL = POTENCIAL;

    return Reward;
};

export const RewardGetActual = async (Contract, wallet, cycle) => {
    const raised_amount_wei = await Contract.methods.raised_amount(cycle).call();
    const raised_amount = Number(web3.utils.fromWei(raised_amount_wei, 'ether')).toFixed(2);

    const claimed_amount_wei = await Contract.methods.claimed_amount(cycle).call();
    const claimed_amount = Number(web3.utils.fromWei(claimed_amount_wei, 'ether')).toFixed(2);

    const actual_amount = Number(raised_amount) - Number(claimed_amount);

    const has_claimed = await Contract.methods.has_claimed(wallet, cycle).call();

    const amount_to_claim = await RewardGetAmountToClaim(Contract, wallet);

    // Cantidad por la que divide la formula del bote.
    const total_amount_wei = await Contract.methods.GetTotalAmount().call();
    const total_amount = Number(web3.utils.fromWei(total_amount_wei, 'ether')).toFixed(2);

    const user_amount_wei = await Contract.methods.GetUserAmount(wallet).call();
    const user_amount = Number(web3.utils.fromWei(user_amount_wei, 'ether')).toFixed(2);

    const can_claim = await Contract.methods.CanClaim(wallet).call();

    const is_participate_on_this_reward = await Contract.methods.is_participate_on_this_reward(wallet, cycle - 1).call();

    return {
        raised_amount,
        claimed_amount,
        actual_amount,
        has_claimed,
        amount_to_claim,
        contract: Contract,
        total_amount: Number(total_amount) > 0 ? total_amount : total_amount_wei,
        user_amount: Number(user_amount) > 0 ? user_amount : user_amount_wei,
        can_claim,
        is_participate_on_this_reward
    }
};

export const RewardGetFuture = async (Contract, wallet, cycle) => {
    const raised_amount_wei = await Contract.methods.raised_amount(cycle).call();
    const raised_amount = web3.utils.fromWei(raised_amount_wei, 'ether');

    const claimed_amount_wei = await Contract.methods.claimed_amount(cycle).call();
    const claimed_amount = web3.utils.fromWei(claimed_amount_wei, 'ether');

    const actual_amount = Number(raised_amount) - Number(claimed_amount);

    const has_claimed = await Contract.methods.has_claimed(wallet, cycle).call();

    const amount_to_claim = await RewardGetFutureAmountToClaim(Contract, wallet, raised_amount);

    return {
        raised_amount,
        claimed_amount,
        actual_amount,
        has_claimed,
        amount_to_claim
    }
};

export const RewardGetAmountToClaim = async (Contract, wallet) => {
    let amount = "0";
    const total_amount = await Contract.methods.GetTotalAmount().call();
    if (Number(total_amount) > 0) {
        const amount_wei = await Contract.methods.ViewAmountToClaim(wallet).call();
        amount = web3.utils.fromWei(amount_wei, 'ether');
    }
    return Number(amount).toFixed(2);
};

export const RewardGetFutureAmountToClaim = async (Contract, wallet, raised) => {
    const user_amount_wei = await Contract.methods.GetUserAmount(wallet).call();
    const user_amount = web3.utils.fromWei(user_amount_wei, 'ether');

    const total_amount_wei = await Contract.methods.GetTotalAmount().call();
    const total_amount = web3.utils.fromWei(total_amount_wei, 'ether');

    return (Number(user_amount) * Number(raised)) / Number(total_amount);
};