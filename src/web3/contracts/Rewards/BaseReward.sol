contract ConstancyReward is BaseReward {
    // Attributes
    uint256 public AMOUNT_USERS_NEED_TO_CLAIM = 21;

    constructor(address _token) BaseReward(_token) {}

    // Public Functions
    function SetAmoutUsersNeedToClaim(uint256 amount) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the amount of users needeed to claim."
        );
        AMOUNT_USERS_NEED_TO_CLAIM = amount;
    }

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
            Qualification.IsQualified(wallet) &&
            Able.able_rewards_claimed() >= AMOUNT_USERS_NEED_TO_CLAIM &&
            Able.amount_of_wins_able_reward_of(wallet) > 0);
    }

    // Private Functions
    function CanIncreaseRewards(
        address wallet
    ) public view virtual override returns (bool) {
        if (wallet == address(SinergyBronze) || wallet == address(AbleSale))
            return true;
        return false;
    }

    // Get Functions
    // function GetUserAmount(
    //     address wallet
    // ) public view virtual override returns (uint256) {
    //     return Able.amount_of_wins_able_reward_of(wallet);
    // }

    // function GetTotalAmount() public view virtual override returns (uint256) {
    //     return Able.qualified_able_rewards_claimed();
    // }

    function SetIsParticipateOnThisReward(address wallet) public override {
        uint256 cycle = Cycle.cycle();
        if (!is_participate_on_this_reward[wallet][cycle] && CanClaim(wallet)) {
            is_participate_on_this_reward[wallet][cycle] = true;
            total_wallets_on_this_reward[cycle]++;
            total_amount_on_this_reward[cycle] += Able
                .amount_of_wins_able_reward_of(wallet);
            user_amount_on_this_reward[wallet][cycle] = Able
                .amount_of_wins_able_reward_of(wallet);
        }
    }
}