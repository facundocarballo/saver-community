contract ConfidenceReward is BaseReward {
    // Attributes
    uint256 public MIN_AMOUNT_OF_ABLE = 3690 ether;

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
        return (Qualification.IsQualified(wallet) &&
            Able.balanceOf(wallet) >= MIN_AMOUNT_OF_ABLE &&
            !Able.has_transfer(wallet, cycle - 1));
    }

    // Set Functions
    function SetMinAmountOfAble(uint256 value) public {
        require(IsOwner(msg.sender), "Only owners can call to this function.");
        MIN_AMOUNT_OF_ABLE = value;
    }

    // Get Functions
    // function GetUserAmount(
    //     address wallet
    // ) public view virtual override returns (uint256) {
    //     uint256 amount = Able.balanceOf(wallet);
    //     if (amount < MIN_AMOUNT_OF_ABLE) return 0;
    //     return amount;
    // }

    // function GetTotalAmount() public view virtual override returns (uint256) {
    //     return Qualification.amount_of_staking_wallets();
    // }

    // Private Functions
    function CanIncreaseRewards(
        address wallet
    ) public view virtual override returns (bool) {
        if (wallet == address(AbleSale) || wallet == address(SinergyBronze))
            return true;
        return false;
    }

    function SetIsParticipateOnThisReward(address wallet) public override {
        uint256 cycle = Cycle.cycle();
        if (!is_participate_on_this_reward[wallet][cycle] && CanClaim(wallet)) {
            is_participate_on_this_reward[wallet][cycle] = true;
            total_wallets_on_this_reward[cycle]++;
            total_amount_on_this_reward[cycle]++;
            user_amount_on_this_reward[wallet][cycle] = 1;
        }
    }
}