contract SinergyMigration is ERC721, ERC721URIStorage, Ownable {
    // Constants
    uint256 public constant PRICE = 36 ether;
    uint256 public constant REWARD = 3 ether;
    uint256 public constant TO_DEVELOPMENT = 3 ether;

    // NFT GENESIS
    string constant NFT_GENESIS_NAME = "GENESIS";
    string constant NFT_GENESIS_INSCRIPTION = "GENESIS INSCRIPTION";
    string constant NFT_GENESIS_VALUE_PROPOSAL = "GENESIS VALUE PROPOSAL";
    string constant NFT_GENESIS_IMAGE_URL =
        "https://res.cloudinary.com/saver-community/image/upload/v1666380501/jvjbls4lg5mtxsxhlhnf.png";

    // Migration
    Sinergy ContractMigration =
        Sinergy(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);

    // Owners
    Addresses public Wallets =
        Addresses(0xbc4E59AE11A28214f84FCc1c9B0535355D408BBf);

    // ERC20's
    ERC20 CDA = ERC20(0x8e3153a724aF487Fd11fB4C4cDA508984dEDf3c4);
    ERC20 ABLE = ERC20(0xd9B9c7A1B42f1ad78D9C3Dd5C7F0381277ddc9Bb);
    ERC20 STABLECOIN = ERC20(0xB856De7DAFf71A0d7eAFD4CC22A7db6F762179de);

    // Able Sale
    SinergySale public ABLE_SALE =
        SinergySale(0xD8c101aA6b225135b437E3B87988457B23Adb2f0);
    SinergySale public TRIPLE_SALE =
        SinergySale(0xD8c101aA6b225135b437E3B87988457B23Adb2f0);

    // Address
    address public communityWallet = 0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public constant developmentWallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    uint256 public oneDay = 12 minutes;
    uint256 public timeToNextReward;

    // Counters
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Migration
    mapping(address => bool) public isRecover;
    mapping(uint256 => bool) public nftRecover;
    mapping(uint256 => bool) public first_level_references_recover;
    mapping(uint256 => bool) public second_level_references_recover;
    mapping(uint256 => bool) public third_level_references_recover;
    mapping(uint256 => bool) public four_level_references_recover;
    mapping(uint256 => bool) public five_level_references_recover;
    mapping(uint256 => bool) public six_level_references_recover;
    mapping(uint256 => bool) public seven_level_references_recover;
    mapping(uint256 => bool) public eight_level_references_recover;
    mapping(uint256 => bool) public nine_level_references_recover;
    uint256 public starting_nft_id;
    uint256[] public recovered_nfts;
    uint256 public recovered_nfts_amount;

    // Constructor
    constructor(uint256 initial_tokenID) ERC721("Saver Sinergy", "Sinergy") {
        while (_tokenIds.current() < initial_tokenID) {
            _tokenIds.increment();
        }

        timeToNextReward = block.timestamp + oneDay;
        starting_nft_id = initial_tokenID;
    }

    // NFT's
    uint256 public nfts_qualified;
    mapping(address => bool) public is_qualified;
    // mapping(address => uint256) public favourite_nft;
    // mapping(address => uint256[]) public get_my_nfts;
    mapping(uint256 => string) public get_nft_name;
    mapping(uint256 => string) public get_nft_inscription;
    mapping(uint256 => string) public get_nft_value_proposal;
    mapping(uint256 => uint256) public get_nft_timestamp_created;
    mapping(uint256 => string) public get_nft_image_url;

    // mapping(string => uint256[]) public get_nfts_by_keyword; // me queda implementarlo en el crear nft

    // References
    // Esto sabemos que va (Cantidad de NFTs que estan conectados conmigo en el NIVEL x)
    mapping(uint256 => uint256) public get_first_level_amount_reference;
    mapping(uint256 => uint256) public get_second_level_amount_reference;
    mapping(uint256 => uint256) public get_third_level_amount_reference;
    mapping(uint256 => uint256) public get_four_level_amount_reference;
    mapping(uint256 => uint256) public get_five_level_amount_reference;
    mapping(uint256 => uint256) public get_six_level_amount_reference;
    mapping(uint256 => uint256) public get_seven_level_amount_reference;
    mapping(uint256 => uint256) public get_eight_level_amount_reference;
    mapping(uint256 => uint256) public get_nine_level_amount_reference;

    mapping(uint256 => uint256) public get_total_amount_references; // Cantidad de NFTs que estan conectados conmigo en total.

    // Esto puede fallar (NFT ID de cada uno que esta conectado con nosotros en el NIVEL x)
    mapping(uint256 => uint256[]) public get_first_level_references;
    mapping(uint256 => uint256[]) public get_second_level_references;
    mapping(uint256 => uint256[]) public get_third_level_references;
    mapping(uint256 => uint256[]) public get_four_level_references;
    mapping(uint256 => uint256[]) public get_five_level_references;
    mapping(uint256 => uint256[]) public get_six_level_references;
    mapping(uint256 => uint256[]) public get_seven_level_references;
    mapping(uint256 => uint256[]) public get_eight_level_references;
    mapping(uint256 => uint256[]) public get_nine_level_references;

    // NFT al que me conecte
    mapping(uint256 => uint256) public get_nft_reference;

    // Rewards
    mapping(uint256 => uint256) public get_nft_balance_to_claim;
    mapping(uint256 => uint256) public get_nft_rewards_claimed;
    // Passive Rewards
    uint256 public passiveRewardID;
    mapping(uint256 => uint256) public passiveReward;
    mapping(uint256 => uint256) public passiveRewardClaimed;
    mapping(address => uint256) public timestampToClaimPassiveReward;

    // Constancy Rewards (usa el ID de las pasivas)
    mapping(uint256 => uint256) public constancyReward;
    mapping(uint256 => uint256) public constancyRewardClaimed;
    mapping(address => uint256) public timestampToClaimConstancyReward;

    // Resources
    uint256 public resourcesAmount;

    // Stadistics
    mapping(address => uint256) public total_stablecoin_earned;
    mapping(address => uint256) public total_lost_income;
    mapping(address => uint256) public actual_lost_income;

    // Auxs
    mapping(address => uint256) public amount_nfts_considered;

    // Public Functions
    // Migration
    function migrate() public {
        require(!isRecover[msg.sender]);

        if (msg.sender == communityWallet) {
            create_genesis_nfts();
            isRecover[communityWallet] = true;
            return;
        }

        uint256 amountNFTs = ContractMigration.balanceOf(msg.sender);
        uint256[] storage nfts = get_my_nfts[msg.sender];
        uint256[] storage new_nfts_recovered = recovered_nfts;
        uint256 nftID;

        for (uint256 i = 0; i < amountNFTs; i++) {
            nftID = ContractMigration.get_my_nfts(msg.sender, i);
            nfts.push(nftID);
            new_nfts_recovered.push(nftID);
            recovered_nfts_amount++;
            recoverNFT(nftID);
            _safeMint(msg.sender, nftID);
        }

        favourite_nft[msg.sender] = ContractMigration.favourite_nft(msg.sender);
        get_my_nfts[msg.sender] = nfts;
        recovered_nfts = new_nfts_recovered;
        isRecover[msg.sender] = true;
    }

    function recoverNFT(uint256 nftID) private {
        // NFT Basic Info
        get_nft_name[nftID] = ContractMigration.get_nft_name(nftID);
        get_nft_inscription[nftID] = ContractMigration.get_nft_inscription(
            nftID
        );
        get_nft_value_proposal[nftID] = ContractMigration
            .get_nft_value_proposal(nftID);
        get_nft_timestamp_created[nftID] = ContractMigration
            .get_nft_timestamp_created(nftID);
        get_nft_image_url[nftID] = ContractMigration.get_nft_image_url(nftID);
        get_nft_reference[nftID] = ContractMigration.get_nft_reference(nftID);

        // References
        get_first_level_amount_reference[nftID] = ContractMigration
            .get_first_level_amount_reference(nftID);
        get_second_level_amount_reference[nftID] = ContractMigration
            .get_second_level_amount_reference(nftID);
        get_third_level_amount_reference[nftID] = ContractMigration
            .get_third_level_amount_reference(nftID);
        get_four_level_amount_reference[nftID] = ContractMigration
            .get_four_level_amount_reference(nftID);
        get_five_level_amount_reference[nftID] = ContractMigration
            .get_five_level_amount_reference(nftID);
        get_six_level_amount_reference[nftID] = ContractMigration
            .get_six_level_amount_reference(nftID);
        get_seven_level_amount_reference[nftID] = ContractMigration
            .get_seven_level_amount_reference(nftID);
        get_eight_level_amount_reference[nftID] = ContractMigration
            .get_eight_level_amount_reference(nftID);
        get_nine_level_amount_reference[nftID] = ContractMigration
            .get_nine_level_amount_reference(nftID);

        get_total_amount_references[nftID] = ContractMigration
            .get_total_amount_references(nftID);

        nftRecover[nftID] = true;
    }

    function recoverFirstLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !first_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_first_level_references[nftID];
        // uint256 amount = ContractMigration.get_first_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_first_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_first_level_references(nftID, i));
        }

        get_first_level_references[nftID] = nfts;
        first_level_references_recover[nftID] = true;
    }

    function recoverSecondLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !second_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_second_level_references[nftID];
        // uint256 amount = ContractMigration.get_second_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_second_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_second_level_references(nftID, i));
        }

        get_second_level_references[nftID] = nfts;
        second_level_references_recover[nftID] = true;
    }

    function recoverThirdLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !third_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_third_level_references[nftID];
        // uint256 amount = ContractMigration.get_third_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_third_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_third_level_references(nftID, i));
        }

        get_third_level_references[nftID] = nfts;
        third_level_references_recover[nftID] = true;
    }

    function recoverFourLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !four_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_four_level_references[nftID];
        // uint256 amount = ContractMigration.get_four_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_four_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_four_level_references(nftID, i));
        }

        get_four_level_references[nftID] = nfts;
        four_level_references_recover[nftID] = true;
    }

    function recoverFiveLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !five_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_five_level_references[nftID];
        // uint256 amount = ContractMigration.get_five_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_five_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_five_level_references(nftID, i));
        }

        get_five_level_references[nftID] = nfts;
        five_level_references_recover[nftID] = true;
    }

    function recoverSixLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) && !six_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_six_level_references[nftID];
        // uint256 amount = ContractMigration.get_six_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_six_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_six_level_references(nftID, i));
        }

        get_six_level_references[nftID] = nfts;
        six_level_references_recover[nftID] = true;
    }

    function recoverSevenLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !seven_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_seven_level_references[nftID];
        // uint256 amount = ContractMigration.get_seven_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_seven_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_seven_level_references(nftID, i));
        }

        get_seven_level_references[nftID] = nfts;
        seven_level_references_recover[nftID] = true;
    }

    function recoverEightLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !eight_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_eight_level_references[nftID];
        // uint256 amount = ContractMigration.get_eight_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_eight_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_eight_level_references(nftID, i));
        }

        get_eight_level_references[nftID] = nfts;
        eight_level_references_recover[nftID] = true;
    }

    function recoverNineLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !nine_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_nine_level_references[nftID];
        // uint256 amount = ContractMigration.get_nine_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_nine_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_nine_level_references(nftID, i));
        }

        get_nine_level_references[nftID] = nfts;
        nine_level_references_recover[nftID] = true;
    }

    // NFT
    function createNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        string memory _uri,
        string memory _imageURL,
        uint256 _ref,
        uint256 _timestamp
    ) public {
        // Get Reference

        uint256 _reference = favourite_nft[
            ABLE_SALE.last_wallet_qualified_who_bought()
        ];

        if (_ref != 0) {
            _reference = _ref;
        }

        if (_reference == 0) {
            _reference = 8;
        }

        require(_reference < _tokenIds.current());

        STABLECOIN.transferFrom(msg.sender, address(this), PRICE);

        update_qualified_nfts(msg.sender);

        ABLE_SALE.TryToSwap(favourite_nft[msg.sender]);

        // Mint NFT
        uint256 tokenID = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(msg.sender, tokenID);

        // Set URI
        _setTokenURI(tokenID, _uri);

        // Add information to the NFT
        get_nft_name[tokenID] = _name;
        get_nft_inscription[tokenID] = _inscription;
        get_nft_value_proposal[tokenID] = _valueProposal;
        get_nft_reference[tokenID] = _reference;

        get_nft_image_url[tokenID] = _imageURL;
        get_nft_timestamp_created[tokenID] = _timestamp;

        if (favourite_nft[msg.sender] == 0) {
            favourite_nft[msg.sender] = tokenID;
        }

        uint256[] storage myNFTS = get_my_nfts[msg.sender];
        myNFTS.push(tokenID);
        get_my_nfts[msg.sender] = myNFTS;

        // Increase the resources amount
        resourcesAmount += TO_DEVELOPMENT;

        // Increase Passive Rewards
        passiveReward[passiveRewardID] += 6 ether;

        // Distribute STABLECOIN's in 9 generations
        distribute(tokenID, _reference, true);

        update(msg.sender);

        // Emit event
        // emit Mint(tokenID, block.timestamp, _name, _valueProposal, msg.sender);
    }

    function modifyNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        uint256 _tokenID
    ) public {
        require(msg.sender == ownerOf(_tokenID));
        STABLECOIN.transferFrom(msg.sender, address(this), PRICE);

        // Modify the NFT
        get_nft_name[_tokenID] = _name;
        get_nft_inscription[_tokenID] = _inscription;
        get_nft_value_proposal[_tokenID] = _valueProposal;

        // Increase the resources amount
        resourcesAmount += TO_DEVELOPMENT;

        // Increase Passive Rewards
        passiveReward[passiveRewardID] += 6 ether;

        // Distribute STABLECOIN in 9 generations
        distribute(_tokenID, get_nft_reference[_tokenID], false);

        update(msg.sender);
    }

    // Rewards
    function claimReward(uint256 _tokenID) public {
        require(
            msg.sender == ownerOf(_tokenID) &&
                get_nft_balance_to_claim[_tokenID] > 0
        );

        STABLECOIN.transfer(msg.sender, get_nft_balance_to_claim[_tokenID]);

        // // Emit events
        // emit Reward(
        //     _tokenID,
        //     get_nft_balance_to_claim[_tokenID],
        //     msg.sender,
        //     block.timestamp
        // );

        get_nft_rewards_claimed[_tokenID] += get_nft_balance_to_claim[_tokenID];
        get_nft_balance_to_claim[_tokenID] = 0;

        update(msg.sender);
    }

    function viewAmountToClaimPassiveReward(
        address wallet
    ) public view returns (uint256) {
        if (passiveRewardID == 0 || nfts_qualified == 0) return 0;
        if (nfts_qualified < balanceOf(wallet)) return 0;

        uint256 amount_raised = passiveReward[passiveRewardID - 1];
        uint256 amount_claimed = passiveRewardClaimed[passiveRewardID - 1];
        uint256 amount_to_claim = ((balanceOf(wallet) * amount_raised) /
            nfts_qualified);

        if (amount_to_claim > (amount_raised - amount_claimed)) {
            return (amount_raised - amount_claimed);
        }

        return amount_to_claim;
    }

    function viewAmountToClaimConstancyReward(
        address wallet
    ) public view returns (uint256) {}

    function claimPassiveReward() public {}

    function claimConstancyReward() public {}

    function claimResources() public {
        require(msg.sender == developmentWallet);

        STABLECOIN.transfer(msg.sender, resourcesAmount);

        // Emit events
        // emit Resources(block.timestamp, resourcesAmount);

        resourcesAmount = 0;

        update(msg.sender);
    }

    // Read functions
    function getAmountOfNftMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Set Functions
    function setAbleAddress(address _ableAddress) public {
        require(msg.sender == developmentWallet);

        ABLE = ERC20(_ableAddress);
    }

    function setFavouriteNFT(uint256 id) public {
        require(_tokenIds.current() > id);
        favourite_nft[msg.sender] = id;
        update(msg.sender);
    }

    function changeCommunityWallet(address newAddress) public {
        require(msg.sender == communityWallet);

        communityWallet = newAddress;
    }

    // Booleans
    function nft_was_qualified(uint256 tokenID) public pure returns (bool) {
        // This is a Random code just to make compile the interface of the Migration Contract without Warnings.
        return (tokenID == 0);
    }

    // Update Functions
    function update_qualified_nfts(address wallet) private {}

    function update_timestamp() private {
        if (block.timestamp > timeToNextReward) {
            if (
                passiveRewardID > 0 &&
                passiveReward[passiveRewardID - 1] >
                passiveRewardClaimed[passiveRewardID - 1]
            ) {
                passiveReward[passiveRewardID] += (passiveReward[
                    passiveRewardID - 1
                ] - passiveRewardClaimed[passiveRewardID - 1]);
            }

            if (
                passiveRewardID > 0 &&
                constancyReward[passiveRewardID - 1] >
                constancyRewardClaimed[passiveRewardID - 1]
            ) {
                constancyReward[passiveRewardID] += (constancyReward[
                    passiveRewardID - 1
                ] - constancyRewardClaimed[passiveRewardID - 1]);
            }

            passiveRewardID++;
            timeToNextReward = block.timestamp + oneDay;
        }
    }

    function update(address wallet) public {}

    function updateFromAble(address wallet) public {
        update_timestamp();
        update_qualified_nfts(wallet);
    }

    function getAbleBalance(address wallet) public view returns (uint256) {
        return ABLE.balanceOf(wallet);
    }

    // SaleToken Public Functions
    function set_able_sale(SinergySale ableSale) public {
        require(msg.sender == developmentWallet);
        ABLE_SALE = ableSale;
    }

    function set_triple_sale(SinergySale tripleSale) public {
        require(msg.sender == developmentWallet);
        TRIPLE_SALE = tripleSale;
    }

    function set_passive_rewards(uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE)
        );
        passiveReward[passiveRewardID] += amount;
    }

    function set_active_rewards(uint256 tokenID, uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE)
        );
        get_nft_balance_to_claim[tokenID] += amount;
    }

    function set_constancy_reward(uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE)
        );
        constancyReward[passiveRewardID] += amount;
    }

    // Private Functions

    // Distribute 9 generations
    function distribute(
        uint256 tokenID,
        uint256 _reference,
        bool created
    ) private {}

    function create_genesis_nfts() private {
        // Crear 8 NFTs para la billetera destinada a Desarrollo y Mantenimiento
        // Estos NFTs deben estar vinculados entre si
        uint256[] storage myNFTS = get_my_nfts[communityWallet];
        uint256[] storage new_nfts_recovered = recovered_nfts;

        for (uint256 i = 0; i < 9; i++) {
            _safeMint(communityWallet, i);

            recoverNFT(i);

            myNFTS.push(i);
            new_nfts_recovered.push(i);
            recovered_nfts_amount++;

            _setTokenURI(
                i,
                "ipfs://QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U/0.json"
            );
        }

        get_my_nfts[communityWallet] = myNFTS;
        recovered_nfts = new_nfts_recovered;
    }

    function setReferences(uint256 i, uint256 tokenID, uint256 ref) private {
        if (i == 0) {
            get_first_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_first_level_references[ref];
            nftIDs.push(tokenID);
            get_first_level_references[ref] = nftIDs;

            return;
        }

        if (i == 1) {
            get_second_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_second_level_references[ref];
            nftIDs.push(tokenID);
            get_second_level_references[ref] = nftIDs;

            return;
        }

        if (i == 2) {
            get_third_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_third_level_references[ref];
            nftIDs.push(tokenID);
            get_third_level_references[ref] = nftIDs;

            return;
        }

        if (i == 3) {
            get_four_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_four_level_references[ref];
            nftIDs.push(tokenID);
            get_four_level_references[ref] = nftIDs;

            return;
        }

        if (i == 4) {
            get_five_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_five_level_references[ref];
            nftIDs.push(tokenID);
            get_five_level_references[ref] = nftIDs;

            return;
        }

        if (i == 5) {
            get_six_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_six_level_references[ref];
            nftIDs.push(tokenID);
            get_six_level_references[ref] = nftIDs;

            return;
        }

        if (i == 6) {
            get_seven_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_seven_level_references[ref];
            nftIDs.push(tokenID);
            get_seven_level_references[ref] = nftIDs;

            return;
        }

        if (i == 7) {
            get_eight_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_eight_level_references[ref];
            nftIDs.push(tokenID);
            get_eight_level_references[ref] = nftIDs;

            return;
        }

        if (i == 8) {
            get_nine_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_nine_level_references[ref];
            nftIDs.push(tokenID);
            get_nine_level_references[ref] = nftIDs;

            return;
        }
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

contract SinergyNovember is ERC721, ERC721URIStorage, Ownable {
    // Constants
    uint256 public constant PRICE = 36 ether;
    uint256 public constant REWARD = 3 ether;
    uint256 public constant TO_DEVELOPMENT = 3 ether;

    // MSG_FAIL_TRANSFER
    string constant MSG_FAIL_TRANSFER_XBUSD = "BUSD TRANSFER FAILED";
    string constant MSG_FAIL_TRANSFER_BUSD = "BUSD TRANSFER FAILED";
    string constant MSG_FAIL_TRANSFER_CDA = "CDA TRANSFER FAILED";
    string constant MSG_FAIL_TRANSFER_ABLE = "ABLE TRANSFER FAILED";

    string constant MSG_FAIL_OWNER_NFT = "You are not the owner of this NFT";

    // MSG_FAIL_EVENT
    string constant MSG_FAIL_EVENT_ATTENDANCE =
        "You already are in the list of this event";
    string constant MSG_FAIL_EVENT_NOT_EXIST = "This event doesn't exist yet";
    string constant MSG_FAIL_NFT_NOT_EXIST = "This NFT doesn't exist yet";

    // MSG_FAIL_REWARD
    string constant MSG_FAIL_REWARD = "You don't have any reward to claim";
    string constant NFT_GENESIS_NAME = "GENESIS";
    string constant NFT_GENESIS_INSCRIPTION = "GENESIS INSCRIPTION";
    string constant NFT_GENESIS_VALUE_PROPOSAL = "GENESIS VALUE PROPOSAL";
    string constant NFT_GENESIS_IMAGE_URL =
        "https://res.cloudinary.com/saver-community/image/upload/v1666380501/jvjbls4lg5mtxsxhlhnf.png";

    // Migration
    Sinergy ContractMigration =
        Sinergy(0x38e43FCEEE68373e08a30714123010b8d841364d);

    // ERC20's
    ERC20 CDA = ERC20(0x38e43FCEEE68373e08a30714123010b8d841364d);
    ERC20 ABLE = ERC20(0xB13D289830F6512dFf4C6ce97f121F29bD400E39);
    ERC20 BUSD = ERC20(0xd9C7C02dBF4451d89040cd2a576b615327ccF38b);

    // Able Sale
    SinergySale public ABLE_SALE =
        SinergySale(0xd9C7C02dBF4451d89040cd2a576b615327ccF38b);
    SinergySale public TRIPLE_SALE =
        SinergySale(0xd9C7C02dBF4451d89040cd2a576b615327ccF38b);

    // Address
    address public communityWallet = 0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public constant developmentWallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    uint256 public oneDay = 1 days;
    uint256 public timeToNextReward;

    // Counters
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Constructor
    constructor(uint256 initial_tokenID) ERC721("Saver Sinergy", "Sinergy") {
        while (_tokenIds.current() < initial_tokenID) {
            _tokenIds.increment();
        }

        timeToNextReward = block.timestamp + oneDay;
    }

    // Migration
    mapping(address => bool) public isRecover;

    // NFT's
    uint256 public nfts_qualified;
    mapping(address => bool) public is_qualified;
    // mapping(address => uint256) public favourite_nft;
    // mapping(address => uint256[]) public get_my_nfts;
    mapping(uint256 => string) public get_nft_name;
    mapping(uint256 => string) public get_nft_inscription;
    mapping(uint256 => string) public get_nft_value_proposal;
    mapping(uint256 => uint256) public get_nft_timestamp_created;
    mapping(uint256 => string) public get_nft_image_url;

    // mapping(string => uint256[]) public get_nfts_by_keyword; // me queda implementarlo en el crear nft

    // References
    // Esto sabemos que va (Cantidad de NFTs que estan conectados conmigo en el NIVEL x)
    mapping(uint256 => uint256) public get_first_level_amount_reference;
    mapping(uint256 => uint256) public get_second_level_amount_reference;
    mapping(uint256 => uint256) public get_third_level_amount_reference;
    mapping(uint256 => uint256) public get_four_level_amount_reference;
    mapping(uint256 => uint256) public get_five_level_amount_reference;
    mapping(uint256 => uint256) public get_six_level_amount_reference;
    mapping(uint256 => uint256) public get_seven_level_amount_reference;
    mapping(uint256 => uint256) public get_eight_level_amount_reference;
    mapping(uint256 => uint256) public get_nine_level_amount_reference;

    mapping(uint256 => uint256) public get_total_amount_references; // Cantidad de NFTs que estan conectados conmigo en total.

    // Esto puede fallar (NFT ID de cada uno que esta conectado con nosotros en el NIVEL x)
    mapping(uint256 => uint256[]) public get_first_level_references;
    mapping(uint256 => uint256[]) public get_second_level_references;
    mapping(uint256 => uint256[]) public get_third_level_references;
    mapping(uint256 => uint256[]) public get_four_level_references;
    mapping(uint256 => uint256[]) public get_five_level_references;
    mapping(uint256 => uint256[]) public get_six_level_references;
    mapping(uint256 => uint256[]) public get_seven_level_references;
    mapping(uint256 => uint256[]) public get_eight_level_references;
    mapping(uint256 => uint256[]) public get_nine_level_references;

    // NFT al que me conecte
    mapping(uint256 => uint256) public get_nft_reference;

    // Rewards
    mapping(uint256 => uint256) public get_nft_balance_to_claim;
    mapping(uint256 => uint256) public get_nft_rewards_claimed;
    // Passive Rewards
    uint256 public passiveRewardID;
    mapping(uint256 => uint256) public passiveReward;
    mapping(uint256 => uint256) public passiveRewardClaimed;
    mapping(address => uint256) public timestampToClaimPassiveReward;

    // Constancy Rewards (usa el ID de las pasivas)
    mapping(uint256 => uint256) public constancyReward;
    mapping(uint256 => uint256) public constancyRewardClaimed;
    mapping(address => uint256) public timestampToClaimConstancyReward;

    // Resources
    uint256 public resourcesAmount;

    // Stadistics
    mapping(address => uint256) public total_stablecoin_earned;
    mapping(address => uint256) public total_lost_income;
    mapping(address => uint256) public actual_lost_income;

    // Auxs
    mapping(address => uint256) public amount_nfts_considered;

    // Events
    event Mint(
        uint256 id,
        uint256 date,
        string indexed name,
        string indexed valueProposal,
        address indexed wallet
    );

    event PassiveReward(
        uint256 amount,
        address indexed wallet,
        uint256 indexed date
    );

    event Resources(uint256 indexed date, uint256 amount);

    // Public Functions
    // Migration
    function migrate() public {
        require(!isRecover[msg.sender], "You already migrated.");
        uint256 amountNFTs = ContractMigration.balanceOf(msg.sender);
        for (uint256 i = 0; i < amountNFTs; i++) {
            get_my_nfts[msg.sender][i] = ContractMigration.get_my_nfts(
                msg.sender,
                i
            );
            recoverNFT(get_my_nfts[msg.sender][i]);
        }

        isRecover[msg.sender] = true;
    }

    function recoverNFT(uint256 nftID) private {
        // NFT Basic Info
        get_nft_name[nftID] = ContractMigration.get_nft_name(nftID);
        get_nft_inscription[nftID] = ContractMigration.get_nft_inscription(
            nftID
        );
        get_nft_value_proposal[nftID] = ContractMigration
            .get_nft_value_proposal(nftID);
        get_nft_timestamp_created[nftID] = ContractMigration
            .get_nft_timestamp_created(nftID);
        get_nft_image_url[nftID] = ContractMigration.get_nft_image_url(nftID);

        // References
        get_first_level_amount_reference[nftID] = ContractMigration
            .get_first_level_amount_reference(nftID);
        get_second_level_amount_reference[nftID] = ContractMigration
            .get_second_level_amount_reference(nftID);
        get_third_level_amount_reference[nftID] = ContractMigration
            .get_third_level_amount_reference(nftID);
        get_four_level_amount_reference[nftID] = ContractMigration
            .get_four_level_amount_reference(nftID);
        get_five_level_amount_reference[nftID] = ContractMigration
            .get_five_level_amount_reference(nftID);
        get_six_level_amount_reference[nftID] = ContractMigration
            .get_six_level_amount_reference(nftID);
        get_seven_level_amount_reference[nftID] = ContractMigration
            .get_seven_level_amount_reference(nftID);
        get_eight_level_amount_reference[nftID] = ContractMigration
            .get_eight_level_amount_reference(nftID);
        get_nine_level_amount_reference[nftID] = ContractMigration
            .get_nine_level_amount_reference(nftID);
        get_total_amount_references[nftID] = ContractMigration
            .get_total_amount_references(nftID);

        recoverFirstLevelReferences(
            get_first_level_amount_reference[nftID],
            nftID
        );
        recoverSecondLevelReferences(
            get_second_level_amount_reference[nftID],
            nftID
        );
        recoverThirdLevelReferences(
            get_third_level_amount_reference[nftID],
            nftID
        );
        recoverFourLevelReferences(
            get_four_level_amount_reference[nftID],
            nftID
        );
        recoverFiveLevelReferences(
            get_five_level_amount_reference[nftID],
            nftID
        );
        recoverSixLevelReferences(get_six_level_amount_reference[nftID], nftID);
        recoverSevenLevelReferences(
            get_seven_level_amount_reference[nftID],
            nftID
        );
        recoverEightLevelReferences(
            get_eight_level_amount_reference[nftID],
            nftID
        );
        recoverNineLevelReferences(
            get_nine_level_amount_reference[nftID],
            nftID
        );
    }

    function recoverFirstLevelReferences(
        uint256 amount,
        uint256 nftID
    ) private {
        for (uint256 i = 0; i < amount; i++) {
            get_first_level_references[nftID][i] = ContractMigration
                .get_first_level_references(nftID, i);
        }
    }

    function recoverSecondLevelReferences(
        uint256 amount,
        uint256 nftID
    ) private {
        for (uint256 i = 0; i < amount; i++) {
            get_second_level_references[nftID][i] = ContractMigration
                .get_second_level_references(nftID, i);
        }
    }

    function recoverThirdLevelReferences(
        uint256 amount,
        uint256 nftID
    ) private {
        for (uint256 i = 0; i < amount; i++) {
            get_third_level_references[nftID][i] = ContractMigration
                .get_third_level_references(nftID, i);
        }
    }

    function recoverFourLevelReferences(uint256 amount, uint256 nftID) private {
        for (uint256 i = 0; i < amount; i++) {
            get_four_level_references[nftID][i] = ContractMigration
                .get_four_level_references(nftID, i);
        }
    }

    function recoverFiveLevelReferences(uint256 amount, uint256 nftID) private {
        for (uint256 i = 0; i < amount; i++) {
            get_five_level_references[nftID][i] = ContractMigration
                .get_five_level_references(nftID, i);
        }
    }

    function recoverSixLevelReferences(uint256 amount, uint256 nftID) private {
        for (uint256 i = 0; i < amount; i++) {
            get_six_level_references[nftID][i] = ContractMigration
                .get_six_level_references(nftID, i);
        }
    }

    function recoverSevenLevelReferences(
        uint256 amount,
        uint256 nftID
    ) private {
        for (uint256 i = 0; i < amount; i++) {
            get_seven_level_references[nftID][i] = ContractMigration
                .get_seven_level_references(nftID, i);
        }
    }

    function recoverEightLevelReferences(
        uint256 amount,
        uint256 nftID
    ) private {
        for (uint256 i = 0; i < amount; i++) {
            get_eight_level_references[nftID][i] = ContractMigration
                .get_eight_level_references(nftID, i);
        }
    }

    function recoverNineLevelReferences(uint256 amount, uint256 nftID) private {
        for (uint256 i = 0; i < amount; i++) {
            get_nine_level_references[nftID][i] = ContractMigration
                .get_nine_level_references(nftID, i);
        }
    }

    // NFT
    function createNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        string memory _uri,
        string memory _imageURL,
        uint256 _timestamp
    ) public {}

    function modifyNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        uint256 _tokenID
    ) public {
        require(msg.sender == ownerOf(_tokenID), MSG_FAIL_OWNER_NFT);
        require(
            BUSD.transferFrom(msg.sender, address(this), PRICE),
            MSG_FAIL_TRANSFER_BUSD
        );

        // Modify the NFT
        get_nft_name[_tokenID] = _name;
        get_nft_inscription[_tokenID] = _inscription;
        get_nft_value_proposal[_tokenID] = _valueProposal;

        // Increase the resources amount
        resourcesAmount += TO_DEVELOPMENT;

        // Increase Passive Rewards
        passiveReward[passiveRewardID] += 6 ether;

        // Distribute BUSD in 9 generations
        distribute(_tokenID, get_nft_reference[_tokenID], false);

        update(msg.sender);
    }

    // Rewards
    function claimReward(uint256 _tokenID) public {}

    function viewAmountToClaimPassiveReward(
        address wallet
    ) public view returns (uint256) {
        if (passiveRewardID == 0 || nfts_qualified == 0) return 0;
        if (nfts_qualified < balanceOf(wallet)) return 0;

        uint256 amount_raised = passiveReward[passiveRewardID - 1];
        uint256 amount_claimed = passiveRewardClaimed[passiveRewardID - 1];
        uint256 amount_to_claim = ((balanceOf(wallet) * amount_raised) /
            nfts_qualified);

        if (amount_to_claim > (amount_raised - amount_claimed)) {
            return (amount_raised - amount_claimed);
        }

        return amount_to_claim;
    }

    function viewAmountToClaimConstancyReward(
        address wallet
    ) public view returns (uint256) {
        if (wallet == address(0)) return balanceOf(msg.sender);
        return 0;
    }

    function claimPassiveReward() public {}

    function claimConstancyReward() public {}

    function claimResources() public {
        require(
            msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        BUSD.transfer(communityWallet, resourcesAmount);
        CDA.transfer(communityWallet, CDA.balanceOf(address(this)));
        ABLE.transfer(communityWallet, ABLE.balanceOf(address(this)));

        // Emit events
        emit Resources(block.timestamp, resourcesAmount);

        resourcesAmount = 0;

        update(msg.sender);
    }

    // Read functions
    function getAmountOfNftMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Set Functions
    function setAbleAddress(address _ableAddress) public {
        require(
            msg.sender == developmentWallet,
            "You are not qualified to call this function"
        );

        ABLE = ERC20(_ableAddress);
    }

    function setFavouriteNFT(uint256 id) public {
        require(_tokenIds.current() > id, "This NFT doesn't exist yet");
        favourite_nft[msg.sender] = id;
        update(msg.sender);
    }

    function changeCommunityWallet(address newAddress) public {
        require(
            msg.sender == communityWallet,
            "You are not able to call this function"
        );

        communityWallet = newAddress;
    }

    function getDifference(
        uint256 a,
        uint256 b
    ) private pure returns (uint256) {
        if (a > b) {
            return a - b;
        }

        return b - a;
    }

    // Booleans
    function nft_was_qualified(uint256 tokenID) public view returns (bool) {
        if (tokenID == 0) return balanceOf(msg.sender) == 0;
        return true;
    }

    // Update Functions
    function update_qualified_nfts(address wallet) private {}

    function update_timestamp() private {
        if (block.timestamp > timeToNextReward) {
            if (
                passiveRewardID > 0 &&
                passiveReward[passiveRewardID - 1] >
                passiveRewardClaimed[passiveRewardID - 1]
            ) {
                passiveReward[passiveRewardID] += (passiveReward[
                    passiveRewardID - 1
                ] - passiveRewardClaimed[passiveRewardID - 1]);
            }

            if (
                passiveRewardID > 0 &&
                constancyReward[passiveRewardID - 1] >
                constancyRewardClaimed[passiveRewardID - 1]
            ) {
                constancyReward[passiveRewardID] += (constancyReward[
                    passiveRewardID - 1
                ] - constancyRewardClaimed[passiveRewardID - 1]);
            }

            passiveRewardID++;
            timeToNextReward = block.timestamp + oneDay;
        }
    }

    function update(address wallet) public {}

    function updateFromAble(address wallet) public {
        update_timestamp();
        update_qualified_nfts(wallet);
    }

    function getAbleBalance(address wallet) public view returns (uint256) {
        return ABLE.balanceOf(wallet);
    }

    // SaleToken Public Functions
    function set_able_sale(SinergySale ableSale) public {
        require(
            msg.sender == developmentWallet,
            "Only Development Wallet can call to this function."
        );
        ABLE_SALE = ableSale;
    }

    function set_triple_sale(SinergySale tripleSale) public {
        require(
            msg.sender == developmentWallet,
            "Only Development Wallet can call to this function."
        );
        TRIPLE_SALE = tripleSale;
    }

    function set_passive_rewards(uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE),
            "Only ABLE_SALE or TRIPLE_SALE can call to this function"
        );
        passiveReward[passiveRewardID] += amount;
    }

    function set_active_rewards(uint256 tokenID, uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE),
            "Only ABLE_SALE or TRIPLE_SALE can call to this function"
        );
        get_nft_balance_to_claim[tokenID] += amount;
    }

    function set_constancy_reward(uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE),
            "Only ABLE_SALE or TRIPLE_SALE can call to this function"
        );
        constancyReward[passiveRewardID] += amount;
    }

    // Private Functions

    // Distribute 9 generations
    function distribute(
        uint256 tokenID,
        uint256 _reference,
        bool created
    ) private {}

    function setReferences(uint256 i, uint256 tokenID, uint256 ref) private {
        if (i == 0) {
            get_first_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_first_level_references[ref];
            nftIDs.push(tokenID);
            get_first_level_references[ref] = nftIDs;

            return;
        }

        if (i == 1) {
            get_second_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_second_level_references[ref];
            nftIDs.push(tokenID);
            get_second_level_references[ref] = nftIDs;

            return;
        }

        if (i == 2) {
            get_third_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_third_level_references[ref];
            nftIDs.push(tokenID);
            get_third_level_references[ref] = nftIDs;

            return;
        }

        if (i == 3) {
            get_four_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_four_level_references[ref];
            nftIDs.push(tokenID);
            get_four_level_references[ref] = nftIDs;

            return;
        }

        if (i == 4) {
            get_five_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_five_level_references[ref];
            nftIDs.push(tokenID);
            get_five_level_references[ref] = nftIDs;

            return;
        }

        if (i == 5) {
            get_six_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_six_level_references[ref];
            nftIDs.push(tokenID);
            get_six_level_references[ref] = nftIDs;

            return;
        }

        if (i == 6) {
            get_seven_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_seven_level_references[ref];
            nftIDs.push(tokenID);
            get_seven_level_references[ref] = nftIDs;

            return;
        }

        if (i == 7) {
            get_eight_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_eight_level_references[ref];
            nftIDs.push(tokenID);
            get_eight_level_references[ref] = nftIDs;

            return;
        }

        if (i == 8) {
            get_nine_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_nine_level_references[ref];
            nftIDs.push(tokenID);
            get_nine_level_references[ref] = nftIDs;

            return;
        }
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

contract SinergyApril is ERC721, ERC721URIStorage, Ownable {
    // Constants
    uint256 public constant PRICE = 36 ether;
    uint256 public constant ABLE_PRICE = 12 ether;
    uint256 public constant REWARD = 3 ether;
    uint256 public constant TO_DEVELOPMENT = 3 ether;

    // NFT GENESIS
    string constant NFT_GENESIS_NAME = "GENESIS";
    string constant NFT_GENESIS_INSCRIPTION = "GENESIS INSCRIPTION";
    string constant NFT_GENESIS_VALUE_PROPOSAL = "GENESIS VALUE PROPOSAL";
    string constant NFT_GENESIS_IMAGE_URL =
        "https://res.cloudinary.com/saver-community/image/upload/v1666380501/jvjbls4lg5mtxsxhlhnf.png";

    // Migration
    SinergyMigration ContractMigration =
        SinergyMigration(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);

    Migration public MigrationContract =
        Migration(0xfd26B8BE868C0E16A5a54E8D586B0C6D7d6892fA);

    // ERC20's
    ERC20 public ABLE = ERC20(0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5);
    ERC20 public BUSD = ERC20(0x765277EebeCA2e31912C9946eAe1021199B39C61);

    // Able Sale
    SinergySale public ABLE_SALE =
        SinergySale(0x7fa46675165F0d0Ab1A3bd3FD96AA3eD59167B52);

    // Passive Rewards
    Reward public BUSD_PassiveReward =
        Reward(0x4F19668690b3501fa2404039436d4f1C14079dB8);
    Reward public ABLE_PassiveReward =
        Reward(0x72e29bC0cF7E6f2A3FC99890069E857b736F6dE9);

    // Constancy Rewards (usa el ID de las pasivas)
    Reward public BUSD_ConstancyReward =
        Reward(0x2B06dD06Cf7cdAB0f8cC39a6F79FD88b20cb2C5D);
    Reward public ABLE_ConstancyReward =
        Reward(0xc32AfBC61e4A2Be096cBe27Fa1072EA7f25Aa79d);

    // Address
    address public communityWallet = 0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public constant developmentWallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    uint256 public oneDay = 1 days;
    uint256 public timeToNextReward;

    // Counters
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public starting_nft_id;
    uint256 initial_tokenID = 1159;

    // Constructor
    constructor() ERC721("Offer Sinergy", "Sinergy") {
        while (_tokenIds.current() < initial_tokenID) {
            _tokenIds.increment();
        }

        // Mint NFT
        uint256 tokenID = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(developmentWallet, tokenID);
        get_nft_name[tokenID] = NFT_GENESIS_NAME;
        get_nft_inscription[tokenID] = NFT_GENESIS_INSCRIPTION;
        get_nft_value_proposal[tokenID] = NFT_GENESIS_VALUE_PROPOSAL;
        get_nft_image_url[tokenID] = NFT_GENESIS_IMAGE_URL;
        get_nft_timestamp_created[tokenID] = block.timestamp;
        favourite_nft[developmentWallet] = tokenID;

        _setTokenURI(
            tokenID,
            "ipfs://QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U/273.json"
        );

        get_my_nfts[developmentWallet].push(tokenID);

        timeToNextReward = block.timestamp + oneDay;
        starting_nft_id = initial_tokenID;

        total_holders++;

        is_holder[developmentWallet] = true;
    }

    // NFT's
    uint256 public nfts_qualified;
    mapping(address => bool) public is_qualified;
    mapping(uint256 => string) public get_nft_name;
    mapping(uint256 => string) public get_nft_inscription;
    mapping(uint256 => string) public get_nft_value_proposal;
    mapping(uint256 => uint256) public get_nft_timestamp_created;
    mapping(uint256 => string) public get_nft_image_url;

    // References
    // Esto sabemos que va (Cantidad de NFTs que estan conectados conmigo en el NIVEL x)
    mapping(uint256 => uint256) public get_first_level_amount_reference;
    mapping(uint256 => uint256) public get_second_level_amount_reference;
    mapping(uint256 => uint256) public get_third_level_amount_reference;
    mapping(uint256 => uint256) public get_four_level_amount_reference;
    mapping(uint256 => uint256) public get_five_level_amount_reference;
    mapping(uint256 => uint256) public get_six_level_amount_reference;
    mapping(uint256 => uint256) public get_seven_level_amount_reference;
    mapping(uint256 => uint256) public get_eight_level_amount_reference;
    mapping(uint256 => uint256) public get_nine_level_amount_reference;

    mapping(uint256 => uint256) public get_total_amount_references; // Cantidad de NFTs que estan conectados conmigo en total.

    // Esto puede fallar (NFT ID de cada uno que esta conectado con nosotros en el NIVEL x)
    mapping(uint256 => uint256[]) public get_first_level_references;
    mapping(uint256 => uint256[]) public get_second_level_references;
    mapping(uint256 => uint256[]) public get_third_level_references;
    mapping(uint256 => uint256[]) public get_four_level_references;
    mapping(uint256 => uint256[]) public get_five_level_references;
    mapping(uint256 => uint256[]) public get_six_level_references;
    mapping(uint256 => uint256[]) public get_seven_level_references;
    mapping(uint256 => uint256[]) public get_eight_level_references;
    mapping(uint256 => uint256[]) public get_nine_level_references;

    // NFT al que me conecte
    mapping(uint256 => uint256) public get_nft_reference;

    // Rewards
    mapping(uint256 => uint256) public nft_affiliate_rewards_earned;

    // Resources
    uint256 public total_raided_for_admin;

    // Stadistics
    uint256 public total_stablecoin_distributed;
    mapping(address => uint256) public total_stablecoin_earned;
    mapping(address => uint256) public total_lost_income;
    mapping(address => uint256) public actual_lost_income;
    mapping(uint256 => uint256) public nfts_created_by_cycle;

    // Holders
    mapping(address => bool) public is_holder;

    // Auxs
    mapping(address => uint256) public amount_nfts_considered;

    // Events
    event Mint(
        uint256 id,
        uint256 date,
        string indexed name,
        string indexed valueProposal,
        address indexed wallet
    );

    event AffiliateRewardEvent(
        uint256 tokenID,
        uint256 amount,
        address indexed wallet,
        uint256 indexed date
    );

    event ChangeFavourite(
        address indexed wallet,
        uint256 previousFavourite,
        uint256 actualFavourite
    );

    // Public Functions
    // Migration

    function set_migration_contract(Migration _migrationContract) public {
        if (msg.sender != developmentWallet) return;
        MigrationContract = _migrationContract;
    }

    function handleRecover(address wallet, uint256 tokenId) public {
        if (msg.sender != address(MigrationContract)) return;

        recoverNFT(tokenId);
        get_my_nfts[wallet].push(tokenId);
        _safeMint(wallet, tokenId);

        if (favourite_nft[wallet] == 0) {
            favourite_nft[wallet] = tokenId;
        }
    }

    function recoverNFT(uint256 nftID) private {
        // NFT Basic Info
        get_nft_name[nftID] = ContractMigration.get_nft_name(nftID);
        get_nft_inscription[nftID] = ContractMigration.get_nft_inscription(
            nftID
        );
        get_nft_value_proposal[nftID] = ContractMigration
            .get_nft_value_proposal(nftID);
        get_nft_timestamp_created[nftID] = ContractMigration
            .get_nft_timestamp_created(nftID);
        get_nft_image_url[nftID] = ContractMigration.get_nft_image_url(nftID);
        get_nft_reference[nftID] = ContractMigration.get_nft_reference(nftID);

        // References
        get_first_level_amount_reference[nftID] = ContractMigration
            .get_first_level_amount_reference(nftID);
        get_second_level_amount_reference[nftID] = ContractMigration
            .get_second_level_amount_reference(nftID);
        get_third_level_amount_reference[nftID] = ContractMigration
            .get_third_level_amount_reference(nftID);
        get_four_level_amount_reference[nftID] = ContractMigration
            .get_four_level_amount_reference(nftID);
        get_five_level_amount_reference[nftID] = ContractMigration
            .get_five_level_amount_reference(nftID);
        get_six_level_amount_reference[nftID] = ContractMigration
            .get_six_level_amount_reference(nftID);
        get_seven_level_amount_reference[nftID] = ContractMigration
            .get_seven_level_amount_reference(nftID);
        get_eight_level_amount_reference[nftID] = ContractMigration
            .get_eight_level_amount_reference(nftID);
        get_nine_level_amount_reference[nftID] = ContractMigration
            .get_nine_level_amount_reference(nftID);

        get_total_amount_references[nftID] = ContractMigration
            .get_total_amount_references(nftID);
    }

    function handlerRecoverFirstLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_first_level_references[tokenId].push(
            ContractMigration.get_first_level_references(tokenId, index)
        );
    }

    function handlerRecoverSecondLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_second_level_references[tokenId].push(
            ContractMigration.get_second_level_references(tokenId, index)
        );
    }

    function handlerRecoverThirdLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_third_level_references[tokenId].push(
            ContractMigration.get_third_level_references(tokenId, index)
        );
    }

    function handlerRecoverFourLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_four_level_references[tokenId].push(
            ContractMigration.get_four_level_references(tokenId, index)
        );
    }

    function handlerRecoverFiveLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_five_level_references[tokenId].push(
            ContractMigration.get_five_level_references(tokenId, index)
        );
    }

    function handlerRecoverSixLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_six_level_references[tokenId].push(
            ContractMigration.get_six_level_references(tokenId, index)
        );
    }

    function handlerRecoverSevenLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_seven_level_references[tokenId].push(
            ContractMigration.get_seven_level_references(tokenId, index)
        );
    }

    function handlerRecoverEightLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_eight_level_references[tokenId].push(
            ContractMigration.get_eight_level_references(tokenId, index)
        );
    }

    function handlerRecoverNineLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_nine_level_references[tokenId].push(
            ContractMigration.get_nine_level_references(tokenId, index)
        );
    }

    // NFT
    function createNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        string memory _uri,
        string memory _imageURL,
        uint256 _ref,
        uint256 _timestamp
    ) public {}

    function modifyNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        uint256 _tokenID
    ) public {
        require(msg.sender == ownerOf(_tokenID));

        BUSD.transferFrom(msg.sender, address(this), PRICE);
        ABLE.transferFrom(msg.sender, address(this), ABLE_PRICE);

        // Transferimos 3 BUSD para el admin
        BUSD.transfer(communityWallet, TO_DEVELOPMENT);

        // Modify the NFT
        get_nft_name[_tokenID] = _name;
        get_nft_inscription[_tokenID] = _inscription;
        get_nft_value_proposal[_tokenID] = _valueProposal;

        // Increase the resources amount
        total_raided_for_admin += TO_DEVELOPMENT;

        // Increase Rewards
        BUSD_PassiveReward.set_reward(3 ether);
        BUSD.transfer(address(BUSD_PassiveReward), 3 ether);

        ABLE_PassiveReward.set_reward(6 ether);
        ABLE.transfer(address(ABLE_PassiveReward), 6 ether);

        ABLE_ConstancyReward.set_reward(6 ether);
        ABLE.transfer(address(ABLE_ConstancyReward), 6 ether);

        BUSD_ConstancyReward.set_reward(3 ether);
        BUSD.transfer(address(ABLE_ConstancyReward), 3 ether);

        // Distribute BUSD in 9 generations
        distribute(_tokenID, get_nft_reference[_tokenID], false);

        update(msg.sender);
    }

    // Read functions
    function getAmountOfNftMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Set Functions
    function setAbleAddress(address _ableAddress) public {
        require(msg.sender == developmentWallet);

        ABLE = ERC20(_ableAddress);
    }

    function setRewards(
        Reward busd_passive,
        Reward busd_constancy,
        Reward able_passive,
        Reward able_constancy
    ) public {
        require(msg.sender == developmentWallet);
        BUSD_PassiveReward = busd_passive;
        BUSD_ConstancyReward = busd_constancy;
        ABLE_PassiveReward = able_passive;
        ABLE_ConstancyReward = able_constancy;
    }

    function setFavouriteNFT(address wallet, uint256 id) public {
        require(id <= _tokenIds.current());
        require(
            msg.sender == ownerOf(id) ||
                msg.sender == address(MigrationContract),
            "Wallet not qualified to setFavouriteNFT"
        );

        uint256 previousFavourite = favourite_nft[wallet];
        favourite_nft[wallet] = id;

        emit ChangeFavourite(msg.sender, previousFavourite, id);
    }

    function changeCommunityWallet(address newAddress) public {
        require(msg.sender == communityWallet);

        communityWallet = newAddress;
    }

    // Booleans
    function nft_was_qualified(uint256 tokenID) public view returns (bool) {}

    // Update Functions
    function update_qualified_nfts(address wallet) private {}

    function update_timestamp() private {
        if (block.timestamp > timeToNextReward) {
            BUSD_PassiveReward.update();
            ABLE_PassiveReward.update();

            BUSD_ConstancyReward.update();
            ABLE_ConstancyReward.update();

            timeToNextReward = block.timestamp + oneDay;
        }
    }

    function update(address wallet) public {}

    function updateFromAble(address wallet) public {
        update_timestamp();
        update_qualified_nfts(wallet);
    }

    function getAbleBalance(address wallet) public view returns (uint256) {
        return ABLE.balanceOf(wallet);
    }

    // SaleToken Public Functions
    function set_able_sale(SinergySale ableSale) public {
        require(msg.sender == developmentWallet);
        ABLE_SALE = ableSale;
    }

    // Private Functions

    // Distribute 9 generations
    function distribute(
        uint256 tokenID,
        uint256 _reference,
        bool created
    ) private {
        address owner;
        uint256 i = 0;
        while (i < 9) {
            if (created) setReferences(i, tokenID, _reference);

            owner = ownerOf(_reference);

            total_stablecoin_earned[owner] += REWARD;
            nft_affiliate_rewards_earned[_reference] += REWARD;
            total_stablecoin_distributed += REWARD;
            BUSD.transfer(owner, REWARD);

            // Emit events
            emit AffiliateRewardEvent(
                _reference,
                REWARD,
                owner,
                block.timestamp
            );

            _reference = get_nft_reference[_reference];

            i++;
        }
    }

    function create_genesis_nfts() public {
        if (msg.sender != address(MigrationContract)) return;

        // Crear 8 NFTs para la billetera destinada a Desarrollo y Mantenimiento
        // Estos NFTs deben estar vinculados entre si
        uint256 affiliate_rewards;

        for (uint256 i = 0; i < 9; i++) {
            _safeMint(communityWallet, i);

            recoverNFT(i);

            affiliate_rewards += ContractMigration.get_nft_balance_to_claim(i);

            get_my_nfts[communityWallet].push(i);

            _setTokenURI(
                i,
                "ipfs://QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U/0.json"
            );
        }
    }

    function setReferences(uint256 i, uint256 tokenID, uint256 ref) private {
        if (i == 0) {
            get_first_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_first_level_references[ref];
            get_first_level_references[ref].push(tokenID);
            // get_first_level_references[ref] = nftIDs;

            return;
        }

        if (i == 1) {
            get_second_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_second_level_references[ref];
            get_second_level_references[ref].push(tokenID);
            // get_second_level_references[ref] = nftIDs;

            return;
        }

        if (i == 2) {
            get_third_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_third_level_references[ref];
            get_third_level_references[ref].push(tokenID);
            // get_third_level_references[ref] = nftIDs;

            return;
        }

        if (i == 3) {
            get_four_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_four_level_references[ref];
            get_four_level_references[ref].push(tokenID);
            // get_four_level_references[ref] = nftIDs;

            return;
        }

        if (i == 4) {
            get_five_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_five_level_references[ref];
            get_five_level_references[ref].push(tokenID);
            // get_five_level_references[ref] = nftIDs;

            return;
        }

        if (i == 5) {
            get_six_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_six_level_references[ref];
            get_six_level_references[ref].push(tokenID);
            // get_six_level_references[ref] = nftIDs;

            return;
        }

        if (i == 6) {
            get_seven_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_seven_level_references[ref];
            get_seven_level_references[ref].push(tokenID);
            // get_seven_level_references[ref] = nftIDs;

            return;
        }

        if (i == 7) {
            get_eight_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_eight_level_references[ref];
            get_eight_level_references[ref].push(tokenID);
            // get_eight_level_references[ref] = nftIDs;

            return;
        }

        if (i == 8) {
            get_nine_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_nine_level_references[ref];
            get_nine_level_references[ref].push(tokenID);
            // get_nine_level_references[ref] = nftIDs;

            return;
        }
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}