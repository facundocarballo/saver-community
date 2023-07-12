contract Clock is Owners {
    uint256 public TIME_OF_CYCLE = 6 minutes;
    uint256 public cycle = 1;
    uint256 public timestamp_to_next_cycle;

    ERC20 Able = ERC20(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    Sinergy SinergyContract =
        Sinergy(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    constructor() {
        timestamp_to_next_cycle = block.timestamp + TIME_OF_CYCLE;
    }

    event CycleChange(uint256 indexed date, uint256 indexed cycle);

    function Update() public {
        if (block.timestamp > timestamp_to_next_cycle) {
            Able.CloseCycle();
            SinergyContract.CloseCycle();
            cycle++;
            emit CycleChange(block.timestamp, cycle);
        }
    }

    // Set Functions
    function SetTimeOfCycle(uint256 new_time) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the time of the cycle."
        );
        TIME_OF_CYCLE = new_time;
    }

    function SetAble(address able) public {
        require(IsOwner(msg.sender), "You are not qualified to set Able.");
        Able = ERC20(able);
    }

    function SetSinergy(address sinergy) public {
        require(IsOwner(msg.sender), "You are not qualified to set Sinergy.");
        SinergyContract = Sinergy(sinergy);
    }
}