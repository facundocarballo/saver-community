contract ValueReward is BaseReward {
    constructor(address _token) BaseReward(_token) {}

    // Override Functions
    function Claim() public virtual override {
        uint256 cycle = Cycle.cycle();
        require(
            Qualification.is_updated(msg.sender, cycle),
            "You have to update first."
        );
        require(
            CanClaim(msg.sender),
            "You are not qualified to claim the Reward."
        );
        require(
            is_participate_on_this_reward[msg.sender][cycle - 1],
            "You dont participate on this reward."
        );
        uint256 amount = ViewAmountToClaim(msg.sender);
        Token.transfer(msg.sender, amount);
        has_claimed[msg.sender][cycle] = true;
        amount_earned[msg.sender] += amount;
        emit RewardClaimed(amount, msg.sender);
    }

    function CanClaim(
        address wallet
    ) public view virtual override returns (bool) {
        uint256 cycle = Cycle.cycle();
        return (!has_claimed[wallet][cycle] &&
            Qualification.IsQualified(wallet));
    }

    function CanIncreaseRewards(
        address wallet
    ) public view override returns (bool) {
        if (wallet == address(SinergyBronze) || wallet == address(AbleSale))
            return true;
        return false;
    }

    // Get Functions
    // function GetUserAmount(
    //     address wallet
    // ) public view override returns (uint256) {
    //     return SinergyBronze.balanceOf(wallet);
    // }

    // function GetTotalAmount() public view override returns (uint256) {
    //     return SinergyBronze.nfts_qualified_by_cycle(Cycle.cycle() - 1);
    // }

    function SetIsParticipateOnThisReward(address wallet) public override {
        uint256 cycle = Cycle.cycle();
        if (!is_participate_on_this_reward[wallet][cycle] && CanClaim(wallet)) {
            is_participate_on_this_reward[wallet][cycle] = true;
            total_wallets_on_this_reward[cycle]++;
            total_amount_on_this_reward[cycle] += SinergyBronze.balanceOf(
                wallet
            );
            user_amount_on_this_reward[wallet][cycle] = SinergyBronze.balanceOf(
                wallet
            );
        }
    }
}