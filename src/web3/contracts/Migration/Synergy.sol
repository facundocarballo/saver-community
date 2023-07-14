contract Migration is Router {
    // Constants
    uint256 public constant AMOUNT_LIMIT_TO_MIGRATE = 21;

    // Migration
    mapping(address => bool) public isRecover;
    mapping(uint256 => bool) public nftRecover;

    mapping(uint256 => bool) public first_level_references_recover;
    mapping(uint256 => uint256) public first_level_references_recover_amount;

    mapping(uint256 => bool) public second_level_references_recover;
    mapping(uint256 => uint256) public second_level_references_recover_amount;

    mapping(uint256 => bool) public third_level_references_recover;
    mapping(uint256 => uint256) public third_level_references_recover_amount;

    mapping(uint256 => bool) public four_level_references_recover;
    mapping(uint256 => uint256) public four_level_references_recover_amount;

    mapping(uint256 => bool) public five_level_references_recover;
    mapping(uint256 => uint256) public five_level_references_recover_amount;

    mapping(uint256 => bool) public six_level_references_recover;
    mapping(uint256 => uint256) public six_level_references_recover_amount;

    mapping(uint256 => bool) public seven_level_references_recover;
    mapping(uint256 => uint256) public seven_level_references_recover_amount;

    mapping(uint256 => bool) public eight_level_references_recover;
    mapping(uint256 => uint256) public eight_level_references_recover_amount;

    mapping(uint256 => bool) public nine_level_references_recover;
    mapping(uint256 => uint256) public nine_level_references_recover_amount;

    mapping(address => uint256) public nfts_migrated;

    mapping(address => address) public migration_contract_of;

    uint256 public starting_nft_id;
    uint256[] public recovered_nfts;
    uint256 public recovered_nfts_amount;

    constructor() {
        isRecover[Wallets.development_wallet()] = true;
    }

    // Main recover

    function Migrate() public {
        address community_wallet = Wallets.community_wallet();
        address development_wallet = Wallets.development_wallet();

        // Add msg.sender == development_wallet to migrate the community_wallet faster
        require(
            !isRecover[msg.sender] || msg.sender == development_wallet,
            "Your wallet is recover."
        );

        if (
            (msg.sender == community_wallet ||
                msg.sender == development_wallet) &&
            !isRecover[community_wallet]
        ) {
            SinergyBronze.CreateGenesisNfts();
            isRecover[community_wallet] = true;
            HandleRecoverNftsAmountForAdmin();
            return;
        }

        if (msg.sender == development_wallet) return;

        if (AprilMigrationSinergy.isRecover(msg.sender)) {
            // Migrar del ultimo contrato
            _MigrateApril(AprilSinergyBronzeContract, msg.sender);
            migration_contract_of[msg.sender] = address(
                AprilSinergyBronzeContract
            );
        } else {
            // Migrar del primer contrato
            _MigrateNovember(NovemberSinergyBronzeContract, msg.sender);
            migration_contract_of[msg.sender] = address(
                NovemberSinergyBronzeContract
            );
        }
    }

    // Recover by level
    function RecoverFirstLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !first_level_references_recover[nftID]
        );
        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_first_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            first_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverFirstLevel(
                nftID,
                first_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            first_level_references_recover_amount[nftID]++;
        }

        if (first_level_references_recover_amount[nftID] == amount) {
            first_level_references_recover[nftID] = true;
        }
    }

    function RecoverSecondLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !second_level_references_recover[nftID]
        );

        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_second_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            second_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverSecondLevel(
                nftID,
                second_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            second_level_references_recover_amount[nftID]++;
        }

        if (second_level_references_recover_amount[nftID] == amount) {
            second_level_references_recover[nftID] = true;
        }
    }

    function RecoverThirdLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !third_level_references_recover[nftID]
        );

        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_third_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            third_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverThirdLevel(
                nftID,
                third_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            third_level_references_recover_amount[nftID]++;
        }

        if (third_level_references_recover_amount[nftID] == amount) {
            third_level_references_recover[nftID] = true;
        }
    }

    function RecoverFourLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !four_level_references_recover[nftID]
        );

        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_four_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            four_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverFourLevel(
                nftID,
                four_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            four_level_references_recover_amount[nftID]++;
        }

        if (four_level_references_recover_amount[nftID] == amount) {
            four_level_references_recover[nftID] = true;
        }
    }

    function RecoverFiveLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !five_level_references_recover[nftID]
        );

        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_five_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            five_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverFiveLevel(
                nftID,
                five_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            five_level_references_recover_amount[nftID]++;
        }

        if (five_level_references_recover_amount[nftID] == amount) {
            five_level_references_recover[nftID] = true;
        }
    }

    function RecoverSixLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !six_level_references_recover[nftID]
        );

        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_six_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            six_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverSixLevel(
                nftID,
                six_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            six_level_references_recover_amount[nftID]++;
        }

        if (six_level_references_recover_amount[nftID] == amount) {
            six_level_references_recover[nftID] = true;
        }
    }

    function RecoverSevenLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !seven_level_references_recover[nftID]
        );
        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_seven_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            seven_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverSevenLevel(
                nftID,
                seven_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            seven_level_references_recover_amount[nftID]++;
        }

        if (seven_level_references_recover_amount[nftID] == amount) {
            seven_level_references_recover[nftID] = true;
        }
    }

    function RecoverEightLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !eight_level_references_recover[nftID]
        );

        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_eight_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            eight_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverEightLevel(
                nftID,
                eight_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            eight_level_references_recover_amount[nftID]++;
        }

        if (eight_level_references_recover_amount[nftID] == amount) {
            eight_level_references_recover[nftID] = true;
        }
    }

    function RecoverNineLevelReferences(uint256 nftID) public {
        require(
            msg.sender == SinergyBronze.ownerOf(nftID) &&
                !nine_level_references_recover[nftID]
        );

        SinergyMigration ContractMigration = SinergyMigration(
            migration_contract_of[msg.sender]
        );
        uint256 migrated;
        uint256 amount = ContractMigration.get_nine_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            nine_level_references_recover_amount[nftID] < amount
        ) {
            SinergyBronze.HandlerRecoverNineLevel(
                nftID,
                nine_level_references_recover_amount[nftID],
                migration_contract_of[msg.sender]
            );
            migrated++;
            nine_level_references_recover_amount[nftID]++;
        }

        if (nine_level_references_recover_amount[nftID] == amount) {
            nine_level_references_recover[nftID] = true;
        }
    }

    // Helpers
    function HandleRecoverNftsAmountForAdmin() private {
        for (uint8 i = 0; i < 9; i++) {
            recovered_nfts.push(i);
            recovered_nfts_amount++;
        }
    }

    function IsOwner(address wallet) public view returns (bool) {
        return Wallets.IsOwner(wallet);
    }

    // Private Functions
    function _MigrateApril(
        SinergyApril ContractMigration,
        address wallet
    ) private {
        uint256 affiliate_rewards;
        uint256 amount = ContractMigration.balanceOf(wallet);
        uint256 migrated;
        uint256 nftID;

        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE && nfts_migrated[wallet] < amount
        ) {
            nftID = ContractMigration.get_my_nfts(
                wallet,
                nfts_migrated[wallet]
            );
            recovered_nfts.push(nftID);

            SinergyBronze.HandleRecover(
                wallet,
                nftID,
                address(ContractMigration),
                4
            );
            nftRecover[nftID] = true;

            recovered_nfts_amount++;

            // nft_affiliate_rewards_earned[nftID] += ContractMigration.nft_affiliate_rewards_earned(nftID);

            nfts_migrated[wallet]++;
            migrated++;
        }

        if (nfts_migrated[wallet] == amount) {
            Able.transfer(wallet, affiliate_rewards);
            isRecover[wallet] = true;
        }
    }

    function _MigrateNovember(
        SinergyNovember ContractMigration,
        address wallet
    ) private {
        uint256 affiliate_rewards;
        uint256 amount = ContractMigration.balanceOf(wallet);
        uint256 migrated;
        uint256 nftID;

        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE && nfts_migrated[wallet] < amount
        ) {
            nftID = ContractMigration.get_my_nfts(
                wallet,
                nfts_migrated[wallet]
            );
            recovered_nfts.push(nftID);

            SinergyBronze.HandleRecover(
                wallet,
                nftID,
                address(ContractMigration),
                11
            );
            nftRecover[nftID] = true;

            recovered_nfts_amount++;
            affiliate_rewards += ContractMigration.get_nft_balance_to_claim(
                nftID
            );

            nfts_migrated[wallet]++;
            migrated++;
        }

        if (nfts_migrated[wallet] == amount) {
            Able.transfer(wallet, affiliate_rewards);
            isRecover[wallet] = true;
        }
    }
}