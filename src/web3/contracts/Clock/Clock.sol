contract Clock is Router {
    uint256 public TIME_OF_CYCLE = 6 minutes;
    uint256 public cycle = 1;
    uint256 public timestamp_to_next_cycle;

    constructor() {
        timestamp_to_next_cycle = block.timestamp + TIME_OF_CYCLE;
    }

    event CycleChange(uint256 indexed date, uint256 indexed cycle);

    function Update() public {
        if (block.timestamp > timestamp_to_next_cycle) {
            timestamp_to_next_cycle = block.timestamp + TIME_OF_CYCLE;
            Able.CloseCycle();
            SinergyBronze.CloseCycle();
            cycle++;
            UpdateRewards();
            emit CycleChange(block.timestamp, cycle);
        }
    }

    function UpdateRewards() public {
        StablecoinBaseReward.Update();
        StablecoinConfidenceReward.Update();
        StablecoinConstancyReward.Update();
        StablecoinValueReward.Update();
        AbleConfidenceReward.Update();
        AbleConstancyReward.Update();
        AbleValueReward.Update();
    }

    // Helpers
    function IsOwner(address wallet) public view returns (bool) {
        return Wallets.IsOwner(wallet);
    }

    // Set Functions
    function SetTimeOfCycle(uint256 new_time) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the time of the cycle."
        );
        TIME_OF_CYCLE = new_time;
    }
}