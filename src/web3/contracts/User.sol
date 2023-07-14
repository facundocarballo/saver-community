contract User is Router {
    uint256 public MIN_POINTS_TO_QUALIFY = 3 ether;
    uint256 public PERCENT_TO_INCREASE = 10090;
    uint256 public AMOUNT_TO_DIVIDE = 10000;
    mapping(address => mapping(uint256 => uint256)) public points_per_cycle;
    mapping(address => uint256) public stablecoin_earned_on_able_reward;

    mapping(address => uint256) public cycleToCheck;

    // User
    mapping(address => mapping(uint256 => bool)) public is_updated;

    // Savings
    mapping(address => mapping(uint256 => uint256)) public usdcRecord;
    mapping(address => uint256) public lastAmountUSDC;

    mapping(address => mapping(uint256 => uint256)) public usdtRecord;
    mapping(address => uint256) public lastAmountUSDT;

    // Qualification
    mapping(address => mapping(uint256 => bool)) public qualified_sinergy; // At least 1 NFT of Sinergy
    mapping(address => mapping(uint256 => bool)) public qualified_able; // More Able than Points
    mapping(address => mapping(uint256 => bool)) public qualified_usdc; // More USDC than Points
    mapping(address => mapping(uint256 => bool)) public qualified_usdt; // More USDT than Points
    mapping(address => mapping(uint256 => bool)) public qualified_min_points; // More Points than 3
    mapping(address => mapping(uint256 => bool))
        public qualified_increase_points; // Increase Points by cycle
    mapping(address => mapping(uint256 => bool)) public qualified_video; // Answer correctly the video
    mapping(address => mapping(uint256 => bool)) public qualified_history; // History of Qualification cycle by cycle

    // Confidence Reward Data
    mapping(address => bool) public is_staking;
    uint256 public amount_of_staking_wallets;

    // Events
    event CloseCycle(
        address indexed wallet,
        uint256 cycle,
        bool qualifiedSinergy,
        bool qualifiedUSDT,
        bool qualifiedUSDC,
        bool qualifiedSaver,
        bool qualifiedBDD,
        bool qualifiedDonatedPerDay,
        bool qualifiedVideo
    );

    event UpdateEvent(uint256 indexed date, address indexed wallet);

    constructor() {}

    function IsQualified(address wallet) public view returns (bool) {
        if (IsOwner(wallet)) return true;

        uint256 cycle = Cycle.cycle();

        return (qualified_sinergy[wallet][cycle - 1] &&
            qualified_able[wallet][cycle - 1] &&
            qualified_usdc[wallet][cycle - 1] &&
            qualified_usdt[wallet][cycle - 1] &&
            qualified_min_points[wallet][cycle - 1] &&
            qualified_increase_points[wallet][cycle - 1] &&
            qualified_video[wallet][cycle - 1]);
    }

    function CheckDay(address wallet) public {
        uint256 cycle = Cycle.cycle();
        if (cycle >= cycleToCheck[wallet]) {
            cycleToCheck[wallet] = cycle + 1;
            _SetSavingsRecord(wallet, cycle);
            _CloseCycle(wallet, cycle - 1);
        }
    }

    function IsQualifiedBySinergy(address wallet) public view returns (bool) {
        bool bronze = false;
        bool silver = false;
        bool gold = false;

        if (address(SinergyBronze) != address(0)) {
            bronze = SinergyBronze.balanceOf(wallet) > 0;
        }

        if (address(SinergySilver) != address(0)) {
            silver = SinergySilver.balanceOf(wallet) > 0;
        }

        if (address(SinergyGold) != address(0)) {
            gold = SinergyGold.balanceOf(wallet) > 0;
        }

        return (bronze || silver || gold);
    }

    function IsQualifiedByAble(address wallet) public view returns (bool) {
        return (Able.balanceOf(wallet) > Able.points_of(wallet));
    }

    function IsQualifiedByUSDC(address wallet) public view returns (bool) {
        return (GetBalanceOfUSDC(wallet) > Able.points_of(wallet));
    }

    function IsQualifiedByUSDT(address wallet) public view returns (bool) {
        return (GetBalanceOfUSDT(wallet) > Able.points_of(wallet));
    }

    function IsQualifiedByPoints(address wallet) public view returns (bool) {
        return (Able.points_of(wallet) > MIN_POINTS_TO_QUALIFY);
    }

    function IsQualifiedByIncreasePoints(
        address wallet
    ) public view returns (bool) {
        uint256 points = Able.points_of(wallet);
        if (points == 0) return false;

        uint256 cycle = Cycle.cycle();
        if (cycle > 1) {
            return (points_per_cycle[wallet][cycle - 1] >=
                GetPointsToIncrease(points_per_cycle[wallet][cycle - 2]));
        }

        return false;
    }

    function IsQualifiedByVideo(address wallet) public view returns (bool) {
        return VideoTest.answer_of(wallet, Cycle.cycle() - 1);
    }

    // Helpers
    function IsOwner(address wallet) public view returns (bool) {
        return Wallets.IsOwner(wallet);
    }

    // Update Functions
    function Update(address wallet) public {
        Cycle.Update();
        Able.UpdateQualifiedPoints(wallet);
        CheckDay(wallet);
        Able.CheckAbleReward(wallet);
        UpdateSinergy(wallet);
        UpdateRewards(wallet);
        is_updated[wallet][Cycle.cycle()] = true;
        emit UpdateEvent(block.timestamp, wallet);
    }

    function UpdateSinergy(address wallet) public {
        if (address(SinergyBronze) != address(0)) {
            SinergyBronze.UpdateQualifiedNfts(wallet);
        }

        if (address(SinergySilver) != address(0)) {
            SinergySilver.UpdateQualifiedNfts(wallet);
        }

        if (address(SinergyGold) != address(0)) {
            SinergyGold.UpdateQualifiedNfts(wallet);
        }
    }

    function UpdateRewards(address wallet) public {
        StablecoinBaseReward.SetIsParticipateOnThisReward(wallet);

        StablecoinValueReward.SetIsParticipateOnThisReward(wallet);
        StablecoinConstancyReward.SetIsParticipateOnThisReward(wallet);
        StablecoinConfidenceReward.SetIsParticipateOnThisReward(wallet);

        AbleValueReward.SetIsParticipateOnThisReward(wallet);
        AbleConstancyReward.SetIsParticipateOnThisReward(wallet);
        AbleConfidenceReward.SetIsParticipateOnThisReward(wallet);
    }

    // Set functions
    function ResetStablecoinEarnedOnAbleReward(address wallet) public {
        require(
            msg.sender == address(Able),
            "Only Able can reset stablecoin earned on Able reward."
        );
        stablecoin_earned_on_able_reward[wallet] = 0;
    }

    function IncreaseStablecoinEarnedOnAbleReward(
        address wallet,
        uint256 amount
    ) public {
        require(
            msg.sender == address(StablecoinBaseReward),
            "Only Stablecoin Base Reward contract can increase stablecoin earned on Able reward."
        );
        stablecoin_earned_on_able_reward[wallet] += amount;
    }

    function SetPercentToIncrease(uint256 amount) public {
        require(
            IsOwner(msg.sender),
            "You cant modify the percent of points to increase."
        );
        PERCENT_TO_INCREASE = amount;
    }

    function SetAmountToDivide(uint256 amount) public {
        require(IsOwner(msg.sender), "You cant modify the amount to divide.");
        AMOUNT_TO_DIVIDE = amount;
    }

    function SetMinAmountOfPointsToQualify(uint256 amount) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the minimum amount of points to qualify."
        );
        MIN_POINTS_TO_QUALIFY = amount;
    }

    // Get functions
    function GetBalanceOfUSDC(address wallet) public view returns (uint256) {
        uint256 USDC_DECIMALS = Wallets.USDC_DECIMALS();
        uint256 balance = USDC.balanceOf(wallet);
        if (USDC_DECIMALS == 18) {
            return balance;
        }
        return balance * 10 ** (18 - USDC_DECIMALS);
    }

    function GetBalanceOfUSDT(address wallet) public view returns (uint256) {
        uint256 USDT_DECIMALS = Wallets.USDT_DECIMALS();
        uint256 balance = USDT.balanceOf(wallet);
        if (USDT_DECIMALS == 18) {
            return balance;
        }
        return balance * 10 ** (18 - USDT_DECIMALS);
    }

    function GetPointsToIncrease(uint256 amount) public view returns (uint256) {
        return (amount * PERCENT_TO_INCREASE) / AMOUNT_TO_DIVIDE;
    }

    // Private functions
    function _SetSavingsRecord(address wallet, uint256 cycle) private {
        lastAmountUSDC[wallet] = GetBalanceOfUSDC(wallet);
        lastAmountUSDT[wallet] = GetBalanceOfUSDT(wallet);

        usdcRecord[wallet][cycle] = lastAmountUSDC[wallet];
        usdtRecord[wallet][cycle] = lastAmountUSDT[wallet];
    }

    function _CloseCycle(address wallet, uint256 cycle) private {
        points_per_cycle[wallet][cycle] = Able.points_of(wallet);
        qualified_sinergy[wallet][cycle] = IsQualifiedBySinergy(wallet);
        qualified_able[wallet][cycle] = IsQualifiedByAble(wallet);
        qualified_usdt[wallet][cycle] = IsQualifiedByUSDT(wallet);
        qualified_usdc[wallet][cycle] = IsQualifiedByUSDC(wallet);
        qualified_min_points[wallet][cycle] = IsQualifiedByPoints(wallet);
        qualified_increase_points[wallet][cycle] = IsQualifiedByIncreasePoints(
            wallet
        );
        qualified_video[wallet][cycle] = IsQualifiedByVideo(wallet);
        qualified_history[wallet][cycle] = IsQualified(wallet);

        if (!qualified_history[wallet][cycle]) {
            _ResetStablecoinEarnedOnAbleReward(wallet);
        }

        uint256 able_amount = Able.balanceOf(wallet);

        if (is_staking[wallet]) {
            is_staking[wallet] = false;
            amount_of_staking_wallets--;
        }

        if (able_amount >= StablecoinConfidenceReward.MIN_AMOUNT_OF_ABLE()) {
            is_staking[wallet] = true;
            amount_of_staking_wallets++;
        }

        emit CloseCycle(
            wallet,
            cycle,
            qualified_sinergy[wallet][cycle],
            qualified_usdt[wallet][cycle],
            qualified_usdc[wallet][cycle],
            qualified_able[wallet][cycle],
            qualified_min_points[wallet][cycle],
            qualified_increase_points[wallet][cycle],
            qualified_video[wallet][cycle]
        );
    }

    function _ResetStablecoinEarnedOnAbleReward(address wallet) private {
        stablecoin_earned_on_able_reward[wallet] = 0;
    }
}