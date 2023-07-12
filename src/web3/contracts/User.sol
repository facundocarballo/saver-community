contract User is Owners {
    // Cycles
    Clock Cycle = Clock(0xbc4E59AE11A28214f84FCc1c9B0535355D408BBf);
    mapping(address => uint256) public cycleToCheck;

    // Able
    ERC20 Able = ERC20(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    uint256 MIN_POINTS_TO_QUALIFY = 3 ether;
    uint256 PERCENT_TO_INCREASE = 10090;
    uint256 AMOUNT_TO_DIVIDE = 10000;
    mapping(address => mapping(uint256 => uint256)) public points_per_cycle;

    // Video Test
    Test Video = Test(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Sinergy Sale
    SinergySale AbleSale =
        SinergySale(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Rewards
    BaseReward StablecoinValueReward =
        BaseReward(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    BaseReward AbleValueReward =
        BaseReward(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    BaseReward StablecoinConstancyReward =
        BaseReward(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    BaseReward AbleConstancyReward =
        BaseReward(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    BaseReward StablecoinConfidenceReward =
        BaseReward(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    BaseReward AbleConfidenceReward =
        BaseReward(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Sinergy
    Sinergy public SinergyBronze;
    Sinergy public SinergySilver;
    Sinergy public SinergyGold;

    // USDC
    ERC20 USDC = ERC20(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    uint256 public USDC_DECIMALS = 6;

    // USDT
    ERC20 USDT = ERC20(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    uint256 public USDT_DECIMALS = 6;

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
        if (wallet == community_wallet || wallet == development_wallet)
            return true;

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

        if (SinergyBronze != ERC721(address(0))) {
            bronze = SinergyBronze.balanceOf(wallet) > 0;
        }

        if (SinergySilver != ERC721(address(0))) {
            silver = SinergySilver.balanceOf(wallet) > 0;
        }

        if (SinergyGold != ERC721(address(0))) {
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

    function IsQualifiedByIncreasePoints(address wallet)
        public
        view
        returns (bool)
    {
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
        return Video.answer_of(wallet, Cycle.cycle() - 1);
    }

    // Update Functions
    function Update(address wallet) public {
        Cycle.Update();
        Able.UpdateQualifiedPoints(wallet);
        CheckDay(wallet);
        Able.CheckAbleReward(wallet);
        UpdateSinergy(wallet);

        AbleSale.Update();

        UpdateRewards();

        is_updated[wallet][Cycle.cycle()] = true;
        emit UpdateEvent(block.timestamp, wallet);
    }

    function UpdateRewards() public {
        StablecoinConfidenceReward.Update();
        StablecoinConstancyReward.Update();
        StablecoinValueReward.Update();
        AbleConfidenceReward.Update();
        AbleConstancyReward.Update();
        AbleValueReward.Update();
    }

    function UpdateSinergy(address wallet) public {
        if (SinergyBronze != ERC721(address(0))) {
            SinergyBronze.UpdateQualifiedNfts(wallet);
        }

        if (SinergySilver != ERC721(address(0))) {
            SinergySilver.UpdateQualifiedNfts(wallet);
        }

        if (SinergyGold != ERC721(address(0))) {
            SinergyGold.UpdateQualifiedNfts(wallet);
        }
    }

    // Set functions
    function SetClock(address wallet) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the Clock."
        );
        Cycle = Clock(wallet);
    }

    function SetAble(address _address) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the Able contract."
        );
        Able = ERC20(_address);
    }

    function SetTest(address _address) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the Test contract."
        );
        Video = Test(_address);
    }

    function SetSinergySale(address sinergy_sale) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to set Sinergy Sale"
        );
        AbleSale = SinergySale(sinergy_sale);
    }

    function SetStablecoinValueReward(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change the Stablecoin Value Reward contract."
        );

        StablecoinValueReward = BaseReward(_address);
    }

    function SetAbleValueReward(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change the Able Value Reward contract."
        );

        AbleValueReward = BaseReward(_address);
    }

    function SetStablecoinConstancyReward(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change the Stablecoin Constancy Reward contract."
        );

        StablecoinConstancyReward = BaseReward(_address);
    }

    function SetAbleConsntancyReward(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change the Able Constancy Reward contract."
        );

        AbleConstancyReward = BaseReward(_address);
    }

    function SetStablecoinConfidenceReward(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change the Stablecoin Confidence Reward contract."
        );

        StablecoinConfidenceReward = BaseReward(_address);
    }

    function SetAbleConfidenceReward(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change the Able Confidence Reward contract."
        );

        AbleConfidenceReward = BaseReward(_address);
    }

    function SetSinergyBronze(address sinergy) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to set Sinergy Bronze"
        );
        SinergyBronze = Sinergy(sinergy);
    }

    function SetSinergySilver(address sinergy) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to set Sinergy Silver"
        );
        SinergySilver = Sinergy(sinergy);
    }

    function SetSinergyGold(address sinergy) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to set Sinergy Gold"
        );
        SinergyGold = Sinergy(sinergy);
    }

    function SetUSDC(address wallet) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the USDC."
        );
        USDC = ERC20(wallet);
    }

    function SetUSDT(address wallet) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the USDT."
        );
        USDT = ERC20(wallet);
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

    // Set Decimals
    function SetUSDCDecimals(uint256 decimals) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the USDC Decimals."
        );
        USDC_DECIMALS = decimals;
    }

    function SetUSDTDecimals(uint256 decimals) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the USDC Decimals."
        );
        USDT_DECIMALS = decimals;
    }

    // Get functions
    function GetBalanceOfUSDC(address wallet) public view returns (uint256) {
        if (USDC_DECIMALS == 18) {
            return USDC.balanceOf(wallet);
        }
        return USDC.balanceOf(wallet) * 10**(18 - USDC_DECIMALS);
    }

    function GetBalanceOfUSDT(address wallet) public view returns (uint256) {
        if (USDT_DECIMALS == 18) {
            return USDT.balanceOf(wallet);
        }
        return USDT.balanceOf(wallet) * 10**(18 - USDT_DECIMALS);
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
}