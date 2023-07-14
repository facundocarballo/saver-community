contract Router {
    // Addresses
    Addresses Wallets = Addresses(0x98ded051014551057Db47Ea39bc8c36d8890Ef38);
    // Contracts
    uint256 public contracts_id = 1;
    Clock Cycle;
    User Qualification;
    ERC20 Able;
    Sinergy public SinergyBronze;
    Sinergy SinergySilver;
    Sinergy SinergyGold;
    Test VideoTest;
    SinergySale AbleSale;
    Migration public MigrationSinergy;
    MigrationSale MigrationSinergySale;
    BaseReward StablecoinBaseReward;
    ValueReward StablecoinValueReward;
    ValueReward AbleValueReward;
    ConstancyReward StablecoinConstancyReward;
    ConstancyReward AbleConstancyReward;
    ConfidenceReward StablecoinConfidenceReward;
    ConfidenceReward AbleConfidenceReward;
    SinergyNovember NovemberSinergyBronzeContract; // Noviembre 2022
    SinergyApril AprilSinergyBronzeContract; // Abril 2023
    SinergySaleMigration AprilSinergySaleContract; // Abril 2023
    Migration AprilMigrationSinergy; // Abril 2023
    ERC20Migration AprilAbleContract; // April 2023
    ERC20Migration NovemberAbleContract; // November 2022
    ERC20Migration TripleMigration; // November 2022

    // ERC20s
    ERC20 public Stablecoin;
    ERC20 public USDC;
    ERC20 public USDT;

    function RefreshContracts() public {
        uint256 w_contracts_id = Wallets.contracts_id();
        if (contracts_id == w_contracts_id) return;
        contracts_id = w_contracts_id;
        Cycle = Clock(Wallets.Cycle());
        Qualification = User(Wallets.Qualification());
        Able = ERC20(Wallets.Able());
        SinergyBronze = Sinergy(Wallets.SinergyBronze());
        SinergySilver = Sinergy(Wallets.SinergySilver());
        SinergyGold = Sinergy(Wallets.SinergyGold());
        VideoTest = Test(Wallets.VideoTest());
        AbleSale = SinergySale(Wallets.AbleSale());
        MigrationSinergy = Migration(Wallets.MigrationSinergy());
        MigrationSinergySale = MigrationSale(Wallets.MigrationSinergySale());
        StablecoinBaseReward = BaseReward(Wallets.StablecoinBaseReward());
        StablecoinValueReward = ValueReward(Wallets.StablecoinValueReward());
        AbleValueReward = ValueReward(Wallets.AbleValueReward());
        StablecoinConstancyReward = ConstancyReward(
            Wallets.StablecoinConstancyReward()
        );
        AbleConstancyReward = ConstancyReward(Wallets.AbleConstancyReward());
        StablecoinConfidenceReward = ConfidenceReward(
            Wallets.StablecoinConfidenceReward()
        );
        AbleConfidenceReward = ConfidenceReward(Wallets.AbleConfidenceReward());
        NovemberSinergyBronzeContract = SinergyNovember(
            Wallets.NovemberSinergyBronzeContract()
        );
        AprilSinergyBronzeContract = SinergyApril(
            Wallets.AprilSinergyBronzeContract()
        );
        AprilSinergySaleContract = SinergySaleMigration(
            Wallets.AprilSinergySaleContract()
        );

        AprilMigrationSinergy = Migration(Wallets.AprilMigrationSinergy());
        AprilAbleContract = ERC20Migration(Wallets.AprilAbleContract());
        NovemberAbleContract = ERC20Migration(Wallets.NovemberAbleContract());
        TripleMigration = ERC20Migration(Wallets.TripleMigration());

        Stablecoin = ERC20(Wallets.Stablecoin());
        USDC = ERC20(Wallets.USDC());
        USDT = ERC20(Wallets.USDT());
    }

    function SetAddresses(address wallet) public {
        require(Wallets.IsOwner(msg.sender), "Only owner can set Addresses.");
        Wallets = Addresses(wallet);
    }
}