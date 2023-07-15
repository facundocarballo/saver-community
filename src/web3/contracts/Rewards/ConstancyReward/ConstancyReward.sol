contract ConstancyReward is BaseReward {
    // Sinergy
    Sinergy SinergyContract =
        Sinergy(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Able Sale
    SinergySale AbleSale =
        SinergySale(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Attributes
    uint256 AMOUNT_USERS_NEED_TO_CLAIM = 21;

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
    function CanClaim(
        address wallet
    ) public view virtual override returns (bool) {
        return (!has_claimed[wallet][Cycle.cycle()] &&
            Qualification.IsQualified(wallet) &&
            Able.able_rewards_claimed() >= AMOUNT_USERS_NEED_TO_CLAIM &&
            Able.amount_of_wins_able_reward_of(wallet) > 0
        );
    }

    // Private Functions
    function CanIncreaseRewards(
        address wallet
    ) public view virtual override returns (bool) {
        if (wallet == address(SinergyContract) || wallet == address(AbleSale))
            return true;
        return false;
    }

    function GetUserAmount(
        address wallet
    ) public view virtual override returns (uint256) {
        return Able.amount_of_wins_able_reward_of(wallet);
    }

    function GetTotalAmount() public view virtual override returns (uint256) {
        return Able.able_rewards_claimed_by_cycle(Cycle.cycle() - 1);
    }
}