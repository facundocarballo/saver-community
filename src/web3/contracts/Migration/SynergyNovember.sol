contract MigrationApril {
    // Constants
    uint256 public constant AMOUNT_LIMIT_TO_MIGRATE = 21;

    // Contracts
    SinergyMigration ContractMigration =
        SinergyMigration(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);
    SinergyMigration Contract =
        SinergyMigration(0xaeFDeD1Efb9f370F3663493755a1Da0A4E6F17E6);

    // ERC20
    ERC20 public ABLE = ERC20(0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5);

    // Addresses
    address public communityWallet = 0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public constant developmentWallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

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
    uint256 public starting_nft_id;
    uint256[] public recovered_nfts;
    uint256 public recovered_nfts_amount;

    constructor() {
        isRecover[developmentWallet] = true;
    }

    // Main recover
    function migrate() public {}

    // Recover by level
    function recoverFirstLevelReferences(uint256 nftID) public {}

    function recoverSecondLevelReferences(uint256 nftID) public {}

    function recoverThirdLevelReferences(uint256 nftID) public {}

    function recoverFourLevelReferences(uint256 nftID) public {}

    function recoverFiveLevelReferences(uint256 nftID) public {}

    function recoverSixLevelReferences(uint256 nftID) public {}

    function recoverSevenLevelReferences(uint256 nftID) public {}

    function recoverEightLevelReferences(uint256 nftID) public {}

    function recoverNineLevelReferences(uint256 nftID) public {}

    // Helpers
    function handle_recover_nfts_amount_for_admin() private {
        for (uint8 i = 0; i < 9; i++) {
            recovered_nfts.push(i);
            recovered_nfts_amount++;
        }
    }

    // Set Contracts
    function set_sinergy(Sinergy _sinergyAddress) public {}

    function set_able(ERC20 _able) public {
        if (msg.sender != developmentWallet) return;
        ABLE = ERC20(_able);
    }
}