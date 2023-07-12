contract PassiveReward is BaseReward {
    // Sinergy
    Sinergy SinergyContract =
        Sinergy(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Able Sale
    SinergySale AbleSale =
        SinergySale(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    constructor(address _token) BaseReward(_token) {}

    // Override Functions
    function CanClaim(
        address wallet
    ) public view virtual override returns (bool) {
        return (!has_claimed[wallet][Cycle.cycle()] &&
            Qualification.IsQualified(wallet));
    }

    function CanIncreaseRewards(
        address wallet
    ) public override view returns (bool) {
        if (wallet == address(SinergyContract) || wallet == address(AbleSale))
            return true;
        return false;
    }

    function GetUserAmount(
        address wallet
    ) public override view returns (uint256) {
        return SinergyContract.balanceOf(wallet);
    }

    function GetTotalAmount() public override view returns (uint256) {
        return SinergyContract.nfts_qualified_by_cycle(Cycle.cycle() - 1);
    }
}