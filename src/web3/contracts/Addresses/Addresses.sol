contract Addresses {
    // Wallets
    address public community_wallet =
        0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public development_wallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;
    address public managment_wallet =
        0xc8895f6f85D870589C42fd6d531c855bddD27B0f;

    // Contracts
    uint256 public contracts_id = 1;
    Clock public Cycle;
    User public Qualification;
    ERC20 public Able;
    Sinergy public SinergyBronze;
    Sinergy public SinergySilver;
    Sinergy public SinergyGold;
    Test public VideoTest;
    SinergySale public AbleSale;
    Migration public MigrationSinergy;
    MigrationSale public MigrationSinergySale;
    BaseReward public StablecoinBaseReward;
    ValueReward public StablecoinValueReward;
    ValueReward public AbleValueReward;
    ConstancyReward public StablecoinConstancyReward;
    ConstancyReward public AbleConstancyReward;
    ConfidenceReward public StablecoinConfidenceReward;
    ConfidenceReward public AbleConfidenceReward;

    SinergyNovember public NovemberSinergyBronzeContract; // Noviembre 2022
    SinergyApril public AprilSinergyBronzeContract; // Abril 2023
    SinergySaleMigration public AprilSinergySaleContract; // Abril 2023
    Migration public AprilMigrationSinergy; // Abril 2023
    ERC20Migration public AprilAbleContract; // April 2023
    ERC20Migration public NovemberAbleContract; // November 2022
    ERC20Migration public TripleMigration; // November 2022

    // ERC20s
    ERC20 public Stablecoin;
    ERC20 public USDC;
    ERC20 public USDT;

    // Decimals
    uint256 public USDC_DECIMALS = 6;
    uint256 public USDT_DECIMALS = 6;

    function RefreshAll() public {
        RefreshCycle();
        RefreshQualification();
        RefreshAble();
        RefreshSinergyBronze();
        RefreshSinergySilver();
        RefreshSinergyGold();
        RefreshVideoTest();
        RefreshAbleSale();
        RefreshMigrationSinergy();
        RefreshMigrationSinergySale();
        RefreshStablecoinBaseReward();
        RefreshAbleConstancyReward();
        RefreshStablecoinValueReward();
        RefreshAbleValueReward();
        RefreshStablecoinConstancyReward();
        RefreshStablecoinConfidenceReward();
        RefreshAbleConfidenceReward();
    }

    function RefreshCycle() public {
        if (address(Cycle) == address(0)) return;
        Cycle.RefreshContracts();
    }

    function RefreshQualification() public {
        if (address(Qualification) == address(0)) return;
        Qualification.RefreshContracts();
    }

    function RefreshAble() public {
        if (address(Able) == address(0)) return;
        Able.RefreshContracts();
    }

    function RefreshSinergyBronze() public {
        if (address(SinergyBronze) == address(0)) return;
        SinergyBronze.RefreshContracts();
    }

    function RefreshSinergySilver() public {
        if (address(SinergySilver) == address(0)) return;
        SinergySilver.RefreshContracts();
    }

    function RefreshSinergyGold() public {
        if (address(SinergyGold) == address(0)) return;
        SinergyGold.RefreshContracts();
    }

    function RefreshVideoTest() public {
        if (address(VideoTest) == address(0)) return;
        VideoTest.RefreshContracts();
    }

    function RefreshAbleSale() public {
        if (address(AbleSale) == address(0)) return;
        AbleSale.RefreshContracts();
    }

    function RefreshMigrationSinergy() public {
        if (address(MigrationSinergy) == address(0)) return;
        MigrationSinergy.RefreshContracts();
    }

    function RefreshMigrationSinergySale() public {
        if (address(MigrationSinergySale) == address(0)) return;
        MigrationSinergySale.RefreshContracts();
    }

    function RefreshStablecoinBaseReward() public {
        if (address(StablecoinBaseReward) == address(0)) return;
        StablecoinBaseReward.RefreshContracts();
    }

    function RefreshAbleConstancyReward() public {
        if (address(AbleConstancyReward) == address(0)) return;
        AbleConstancyReward.RefreshContracts();
    }

    function RefreshStablecoinValueReward() public {
        if (address(StablecoinValueReward) == address(0)) return;
        StablecoinValueReward.RefreshContracts();
    }

    function RefreshAbleValueReward() public {
        if (address(AbleValueReward) == address(0)) return;
        AbleValueReward.RefreshContracts();
    }

    function RefreshStablecoinConstancyReward() public {
        if (address(StablecoinConstancyReward) == address(0)) return;
        StablecoinConstancyReward.RefreshContracts();
    }

    function RefreshStablecoinConfidenceReward() public {
        if (address(StablecoinConfidenceReward) == address(0)) return;
        StablecoinConfidenceReward.RefreshContracts();
    }

    function RefreshAbleConfidenceReward() public {
        if (address(AbleConfidenceReward) == address(0)) return;
        AbleConfidenceReward.RefreshContracts();
    }

    function IsOwner(address wallet) public view returns (bool) {
        return (wallet == community_wallet ||
            wallet == development_wallet ||
            wallet == managment_wallet);
    }

    // Set Functions
    function SetCommunityWallet(address wallet) public {
        require(
            msg.sender == community_wallet,
            "Only community wallet can change the community wallet"
        );
        community_wallet = wallet;
    }

    function SetDevelopmentWallet(address wallet) public {
        require(
            msg.sender == development_wallet,
            "Only development wallet can change the community wallet"
        );
        development_wallet = wallet;
    }

    function SetManagmentWallet(address wallet) public {
        require(
            msg.sender == managment_wallet,
            "Only management wallet can change the community wallet"
        );
        managment_wallet = wallet;
    }

    function SetClock(address wallet) public {
        require(IsOwner(msg.sender), "Only Owner can modify Clock Contract.");
        Cycle = Clock(wallet);
        contracts_id++;
    }

    function SetUser(address wallet) public {
        require(IsOwner(msg.sender), "Only Owner can modify User Contract.");
        Qualification = User(wallet);
        contracts_id++;
    }

    function SetAble(address wallet) public {
        require(IsOwner(msg.sender), "Only Owner can modify Able Contract.");
        Able = ERC20(wallet);
        contracts_id++;
    }

    function SetSinergyBronze(address sinergy) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify Sinergy Bronze Contract"
        );
        SinergyBronze = Sinergy(sinergy);
        contracts_id++;
    }

    function SetSinergySilver(address sinergy) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify Sinergy Silver Contract"
        );
        SinergySilver = Sinergy(sinergy);
        contracts_id++;
    }

    function SetSinergyGold(address sinergy) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify Sinergy Gold Contract"
        );
        SinergyGold = Sinergy(sinergy);
        contracts_id++;
    }

    function SetTest(address wallet) public {
        require(IsOwner(msg.sender), "Only Owner can modify Test Contract.");
        VideoTest = Test(wallet);
        contracts_id++;
    }

    function SetSinergySale(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify SinergySale Contract."
        );
        AbleSale = SinergySale(wallet);
        contracts_id++;
    }

    function SetMigrationSinergy(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify MigrationSinergy Contract."
        );
        MigrationSinergy = Migration(wallet);
        contracts_id++;
    }

    function SetMigrationSinergySale(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify MigrationSinergySale Contract."
        );
        MigrationSinergySale = MigrationSale(wallet);
        contracts_id++;
    }

    function SetStablecoinBaseReward(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify StablecoinBaseReward Contract."
        );
        StablecoinBaseReward = BaseReward(wallet);
        contracts_id++;
    }

    function SetStablecoinValueReward(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify StablecoinValueReward Contract."
        );
        StablecoinValueReward = ValueReward(wallet);
        contracts_id++;
    }

    function SetAbleValueReward(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify AbleValueReward Contract."
        );
        AbleValueReward = ValueReward(wallet);
        contracts_id++;
    }

    function SetStablecoinConstancyReward(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify StablecoinConstancyReward Contract."
        );
        StablecoinConstancyReward = ConstancyReward(wallet);
        contracts_id++;
    }

    function SetAbleConstancyReward(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify AbleConstancyReward Contract."
        );
        AbleConstancyReward = ConstancyReward(wallet);
        contracts_id++;
    }

    function SetStablecoinConfidenceReward(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify StablecoinConfidenceReward Contract."
        );
        StablecoinConfidenceReward = ConfidenceReward(wallet);
        contracts_id++;
    }

    function SetAbleConfidenceReward(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify AbleConfidenceReward Contract."
        );
        AbleConfidenceReward = ConfidenceReward(wallet);
        contracts_id++;
    }

    function SetNovemberSinergyBronzeContract(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify NovemberSinergyBronzeContract Contract."
        );
        NovemberSinergyBronzeContract = SinergyNovember(wallet);
        contracts_id++;
    }

    function SetAprilSinergyBronzeContract(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify AprilSinergyBronzeContract Contract."
        );
        AprilSinergyBronzeContract = SinergyApril(wallet);
        contracts_id++;
    }

    function SetAprilSinergySaleContract(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify AprilSinergySaleContract Contract."
        );
        AprilSinergySaleContract = SinergySaleMigration(wallet);
        contracts_id++;
    }

    function SetAprilAbleContract(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify AprilAble Contract."
        );
        AprilAbleContract = ERC20Migration(wallet);
        contracts_id++;
    }

    function SetAprilMigrationSinergy(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only owner can modify AprilMigrationSinergy"
        );
        AprilMigrationSinergy = Migration(wallet);
    }

    function SetNovemberAbleContract(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify NovemberAble Contract."
        );
        NovemberAbleContract = ERC20Migration(wallet);
        contracts_id++;
    }

    function SetTripleMigrationContract(address wallet) public {
        require(
            IsOwner(msg.sender),
            "Only Owner can modify TripleMigration Contract."
        );
        TripleMigration = ERC20Migration(wallet);
        contracts_id++;
    }

    function SetStablecoin(address wallet) public {
        require(IsOwner(msg.sender), "Only owners can set stablecoin.");
        Stablecoin = ERC20(wallet);
    }

    function SetUSDC(address wallet) public {
        require(IsOwner(msg.sender), "Only owners can set USDC.");
        USDC = ERC20(wallet);
    }

    function SetUSDT(address wallet) public {
        require(IsOwner(msg.sender), "Only owners can set USDT.");
        USDT = ERC20(wallet);
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
}