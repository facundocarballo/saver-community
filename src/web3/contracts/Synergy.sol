contract Sinergy is ERC721, ERC721URIStorage, Ownable, Router {
    // Prices
    uint256 public PRICE = 36 ether;
    uint256 public ABLE_PRICE = 12 ether;

    // Amounts to transfer
    uint256 public PERCENT_REWARD = 1;
    uint256 public PERCENT_DIVIDE_REWARD = 12;

    uint256 public PERCENT_STABLECOIN_VALUE_REWARD = 1;
    uint256 public PERCENT_DIVIDE_STABLECOIN_VALUE_REWARD = 12;

    uint256 public PERCENT_STABLECOIN_CONSTANCY_REWARD = 1;
    uint256 public PERCENT_DIVIDE_STABLECOIN_CONSTANCY_REWARD = 12;

    uint256 public PERCENT_STABLECOIN_CONFIDENCE_REWARD = 1;
    uint256 public PERCENT_DIVIDE_STABLECOIN_CONFIDENCE_REWARD = 12;

    uint256 public PERCENT_ABLE_VALUE_REWARD = 1;
    uint256 public PERCENT_DIVIDE_ABLE_VALUE_REWARD = 3;

    uint256 public PERCENT_ABLE_CONSTANCY_REWARD = 1;
    uint256 public PERCENT_DIVIDE_ABLE_CONSTANCY_REWARD = 3;

    uint256 public PERCENT_ABLE_CONFIDENCE_REWARD = 1;
    uint256 public PERCENT_DIVIDE_ABLE_CONFIDENCE_REWARD = 3;

    // NFT GENESIS
    string constant NFT_GENESIS_NAME = "GENESIS";
    string constant NFT_GENESIS_INSCRIPTION = "GENESIS INSCRIPTION";
    string constant NFT_GENESIS_VALUE_PROPOSAL = "GENESIS VALUE PROPOSAL";
    string constant NFT_GENESIS_IMAGE_URL =
        "https://res.cloudinary.com/saver-community/image/upload/v1666380501/jvjbls4lg5mtxsxhlhnf.png";

    // Requirements to earn affiliate rewards
    uint256 public MIN_AMOUNT_FIRST_LEVEL_CONNECTIONS = 3;

    // Counters
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public starting_nft_id;
    uint256 public initial_tokenID = 1301;

    // Constructor
    constructor() ERC721("Offer Sinergy", "Sinergy") {
        while (_tokenIds.current() < initial_tokenID) {
            _tokenIds.increment();
        }

        address development_wallet = Wallets.development_wallet();

        // Mint NFT
        uint256 tokenID = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(development_wallet, tokenID);
        get_nft_name[tokenID] = NFT_GENESIS_NAME;
        get_nft_inscription[tokenID] = NFT_GENESIS_INSCRIPTION;
        get_nft_value_proposal[tokenID] = NFT_GENESIS_VALUE_PROPOSAL;
        get_nft_image_url[tokenID] = NFT_GENESIS_IMAGE_URL;
        get_nft_timestamp_created[tokenID] = block.timestamp;
        favourite_nft[development_wallet] = tokenID;

        _setTokenURI(
            tokenID,
            "ipfs://QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U/273.json"
        );

        get_my_nfts[development_wallet].push(tokenID);

        starting_nft_id = initial_tokenID;

        total_holders++;

        is_holder[development_wallet] = true;
    }

    // NFT's
    mapping(uint256 => uint256) public nfts_qualified_by_cycle;
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

    function HandleRecover(
        address wallet,
        uint256 tokenId,
        address migration_contract,
        uint256 month_contract
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        _RecoverNFT(tokenId, migration_contract, month_contract);

        get_my_nfts[wallet].push(tokenId);
        if (balanceOf(wallet) == 0) {
            total_holders++;
        }
        _safeMint(wallet, tokenId);

        if (favourite_nft[wallet] == 0) {
            favourite_nft[wallet] = tokenId;
        }

        if (IsQualified(wallet)) {
            nfts_qualified++;
        }
    }

    function HandlerRecoverFirstLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_first_level_references[tokenId].push(
            ContractMigration.get_first_level_references(tokenId, index)
        );
    }

    function HandlerRecoverSecondLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_second_level_references[tokenId].push(
            ContractMigration.get_second_level_references(tokenId, index)
        );
    }

    function HandlerRecoverThirdLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_third_level_references[tokenId].push(
            ContractMigration.get_third_level_references(tokenId, index)
        );
    }

    function HandlerRecoverFourLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_four_level_references[tokenId].push(
            ContractMigration.get_four_level_references(tokenId, index)
        );
    }

    function HandlerRecoverFiveLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_five_level_references[tokenId].push(
            ContractMigration.get_five_level_references(tokenId, index)
        );
    }

    function HandlerRecoverSixLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_six_level_references[tokenId].push(
            ContractMigration.get_six_level_references(tokenId, index)
        );
    }

    function HandlerRecoverSevenLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_seven_level_references[tokenId].push(
            ContractMigration.get_seven_level_references(tokenId, index)
        );
    }

    function HandlerRecoverEightLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_eight_level_references[tokenId].push(
            ContractMigration.get_eight_level_references(tokenId, index)
        );
    }

    function HandlerRecoverNineLevel(
        uint256 tokenId,
        uint256 index,
        address contract_migration
    ) public {
        if (msg.sender != address(MigrationSinergy)) return;

        SinergyMigration ContractMigration = SinergyMigration(
            contract_migration
        );

        get_nine_level_references[tokenId].push(
            ContractMigration.get_nine_level_references(tokenId, index)
        );
    }

    // NFT
    function CreateNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        string memory _uri,
        string memory _imageURL,
        uint256 _ref,
        uint256 _timestamp
    ) public {
        if (!IsUpdated(msg.sender)) return;

        // Get Reference
        uint256 _reference = favourite_nft[
            AbleSale.last_wallet_qualified_who_bought()
        ];

        if (_ref != 0) {
            _reference = _ref;
        }

        if (_reference == 0) {
            _reference = 8;
        }

        require(_reference < _tokenIds.current());

        Stablecoin.transferFrom(msg.sender, address(this), PRICE);
        Able.transferFrom(msg.sender, address(this), ABLE_PRICE);

        UpdateQualifiedNfts(msg.sender);

        if (balanceOf(msg.sender) > 0) {
            AbleSale.TryToSwap(favourite_nft[msg.sender]);
        }

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

        get_my_nfts[msg.sender].push(tokenID);

        // Transfer to Rewards
        _TransferValueRewards();
        _TransferConstancyRewards();
        _TransferConfidenceRewards();

        // Distribute Stablecoin's in 9 generations
        _Distribute(tokenID, _reference, true);

        // Qualification.Update(msg.sender);

        // Aumentamos la cantidad de NFTs creados en este ciclo
        nfts_created_by_cycle[GetCycle()]++;

        // Holders
        if (!is_holder[msg.sender]) {
            is_holder[msg.sender] = true;
            total_holders++;
        }

        // Emit event
        emit Mint(tokenID, block.timestamp, _name, _valueProposal, msg.sender);
    }

    function ModifyNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        uint256 _tokenID
    ) public {
        if (!IsUpdated(msg.sender) || msg.sender != ownerOf(_tokenID)) return;

        Stablecoin.transferFrom(msg.sender, address(this), PRICE);
        Able.transferFrom(msg.sender, address(this), ABLE_PRICE);

        // Modify the NFT
        get_nft_name[_tokenID] = _name;
        get_nft_inscription[_tokenID] = _inscription;
        get_nft_value_proposal[_tokenID] = _valueProposal;

        // Transfer to Rewards
        _TransferValueRewards();
        _TransferConstancyRewards();
        _TransferConfidenceRewards();

        // Distribute Stablecoin in 9 generations
        _Distribute(_tokenID, get_nft_reference[_tokenID], false);

        // Qualification.Update(msg.sender);
    }

    function NftWasQualified(uint256 tokenID) public view returns (bool) {
        return
            IsQualified(ownerOf(tokenID)) ||
            Qualification.qualified_history(ownerOf(tokenID), GetCycle() - 1);
    }

    function CreateGenesisNfts() public {
        if (msg.sender != address(MigrationSinergy)) return;

        // Crear 8 NFTs para la billetera destinada a Desarrollo y Mantenimiento
        // Estos NFTs deben estar vinculados entre si
        address community_wallet = Wallets.community_wallet();
        for (uint256 i = 0; i < 9; i++) {
            _safeMint(community_wallet, i);
            _setTokenURI(
                i,
                "ipfs://QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U/0.json"
            );

            _RecoverNFT(i, address(AprilSinergyBronzeContract), 4);

            get_my_nfts[community_wallet].push(i);
            nft_affiliate_rewards_earned[i] = AprilSinergyBronzeContract
                .nft_affiliate_rewards_earned(i);
        }
    }

    function CloseCycle() public {
        if (msg.sender != address(Cycle)) return;
        nfts_qualified_by_cycle[GetCycle()] = nfts_qualified;
    }

    function UpdateQualifiedNfts(address wallet) public {
        if (is_qualified[wallet]) {
            nfts_qualified -= amount_nfts_considered[wallet];
            amount_nfts_considered[wallet] = 0;
            is_qualified[wallet] = false;
        }

        if (IsQualified(wallet)) {
            nfts_qualified += balanceOf(wallet);
            amount_nfts_considered[wallet] = balanceOf(wallet);
            is_qualified[wallet] = true;
        }
    }

    // Helpers
    function IsOwner(address wallet) public view returns (bool) {
        return Wallets.IsOwner(wallet);
    }

    function IsUpdated(address wallet) public view returns (bool) {
        return Qualification.is_updated(wallet, GetCycle());
    }

    function IsQualified(address wallet) public view returns (bool) {
        return Qualification.IsQualified(wallet);
    }

    // Get Functions
    function GetAbleBalance(address wallet) public view returns (uint256) {
        return Able.balanceOf(wallet);
    }

    function GetCycle() public view returns (uint256) {
        return Cycle.cycle();
    }

    function GetAmountOfNftMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    function GetAbleToValueReward() public view returns (uint256) {
        return
            (ABLE_PRICE * PERCENT_ABLE_VALUE_REWARD) /
            PERCENT_DIVIDE_ABLE_VALUE_REWARD;
    }

    function GetAbleToConstancyReward() public view returns (uint256) {
        return
            (ABLE_PRICE * PERCENT_ABLE_CONSTANCY_REWARD) /
            PERCENT_DIVIDE_ABLE_CONSTANCY_REWARD;
    }

    function GetAbleToConfidenceReward() public view returns (uint256) {
        return
            (ABLE_PRICE * PERCENT_ABLE_CONFIDENCE_REWARD) /
            PERCENT_DIVIDE_ABLE_CONFIDENCE_REWARD;
    }

    function GetStablecoinToPassiveReward() public view returns (uint256) {
        return
            (PRICE * PERCENT_STABLECOIN_VALUE_REWARD) /
            PERCENT_DIVIDE_STABLECOIN_VALUE_REWARD;
    }

    function GetStablecoinToConstancyReward() public view returns (uint256) {
        return
            (PRICE * PERCENT_STABLECOIN_CONSTANCY_REWARD) /
            PERCENT_DIVIDE_STABLECOIN_CONSTANCY_REWARD;
    }

    function GetStablecoinToConfidenceReward() public view returns (uint256) {
        return
            (PRICE * PERCENT_STABLECOIN_CONFIDENCE_REWARD) /
            PERCENT_DIVIDE_STABLECOIN_CONFIDENCE_REWARD;
    }

    function GetStablecoinToReward() public view returns (uint256) {
        return (PRICE * PERCENT_REWARD) / PERCENT_DIVIDE_REWARD;
    }

    // Set Functions
    function SetFavouriteNFT(address wallet, uint256 id) public {
        if (id > _tokenIds.current()) return;
        if (
            msg.sender != ownerOf(id) && msg.sender != address(MigrationSinergy)
        ) return;

        uint256 previousFavourite = favourite_nft[wallet];
        favourite_nft[wallet] = id;

        emit ChangeFavourite(msg.sender, previousFavourite, id);
    }

    // Percentages
    // Able Value Reward
    function SetAbleValueRewardPercent(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_ABLE_VALUE_REWARD = amount;
    }

    function SetAbleValueRewardPercentDivide(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;

        PERCENT_DIVIDE_ABLE_VALUE_REWARD = amount;
    }

    // Able Constancy Reward
    function SetAbleConstancyRewardPercent(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;

        PERCENT_ABLE_CONSTANCY_REWARD = amount;
    }

    function SetAbleConstancyRewardPercentDivide(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;

        PERCENT_DIVIDE_ABLE_CONSTANCY_REWARD = amount;
    }

    // Able Confidence Reward
    function SetAbleConfidenceRewardPercent(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;

        PERCENT_ABLE_CONSTANCY_REWARD = amount;
    }

    function SetAbleConfidenceRewardPercentDivide(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;

        PERCENT_DIVIDE_ABLE_CONFIDENCE_REWARD = amount;
    }

    // Stablecoin Value Reward
    function SetStablecoinValueRewardPercent(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_STABLECOIN_VALUE_REWARD = amount;
    }

    function SetStablecoinValueRewardPercentDivide(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_DIVIDE_STABLECOIN_VALUE_REWARD = amount;
    }

    // Stablecoin Constancy Reward
    function SetStablecoinConstancyRewardPercent(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_STABLECOIN_CONSTANCY_REWARD = amount;
    }

    function SetStablecoinConstancyRewardPercentDivide(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_DIVIDE_STABLECOIN_CONSTANCY_REWARD = amount;
    }

    // Stablecoin Confidence Reward
    function SetStablecoinConfidenceRewardPercent(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_STABLECOIN_CONFIDENCE_REWARD = amount;
    }

    function SetStablecoinConfidenceRewardPercentDivide(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_DIVIDE_STABLECOIN_CONFIDENCE_REWARD = amount;
    }

    // Affiliative Rewards
    function SetStablecoinPercentReward(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_REWARD = amount;
    }

    function SetStablecoinPercentRewardDivide(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PERCENT_DIVIDE_REWARD = amount;
    }

    // Prices
    function SetStablecoinPrice(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        PRICE = amount * (1 ether);
    }

    function SetAblePrice(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        ABLE_PRICE = amount * (1 ether);
    }

    function SetMinAmountFirstLevelConnections(uint256 amount) public {
        if (!IsOwner(msg.sender)) return;
        MIN_AMOUNT_FIRST_LEVEL_CONNECTIONS = amount;
    }

    // Private Functions
    function _TransferValueRewards() private {
        Able.transfer(address(AbleValueReward), GetAbleToValueReward());

        Stablecoin.transfer(
            address(StablecoinValueReward),
            GetStablecoinToPassiveReward()
        );
    }

    function _TransferConstancyRewards() private {
        Able.transfer(address(AbleConstancyReward), GetAbleToConstancyReward());

        Stablecoin.transfer(
            address(StablecoinConstancyReward),
            GetStablecoinToConstancyReward()
        );
    }

    function _TransferConfidenceRewards() private {
        Able.transfer(
            address(AbleConfidenceReward),
            GetAbleToConfidenceReward()
        );

        Stablecoin.transfer(
            address(StablecoinConfidenceReward),
            GetStablecoinToConfidenceReward()
        );
    }

    // Distribute 9 generations
    function _Distribute(
        uint256 tokenID,
        uint256 _reference,
        bool created
    ) private {
        address owner;
        uint256 i = 0;
        uint256 reward_amount = GetStablecoinToReward();
        uint256 commission_reference = _reference;
        while (i < 9) {
            if (created) _SetReferences(i, tokenID, _reference);

            owner = ownerOf(commission_reference);

            commission_reference = _TrnasferStablecoin(
                owner,
                commission_reference,
                reward_amount
            );

            _reference = get_nft_reference[_reference];

            i++;
        }
    }

    /*
        This function transfer the stablecoin to those NFTs that have the rights to receive it.
        And also returns the NFT father of the NFT that receive the transaction.
    */
    function _TrnasferStablecoin(
        address owner,
        uint256 token_id,
        uint256 reward_amount
    ) public returns (uint256) {
        while (
            get_first_level_amount_reference[token_id] <
            MIN_AMOUNT_FIRST_LEVEL_CONNECTIONS &&
            token_id != 0
        ) {
            token_id = get_nft_reference[token_id];
            owner = ownerOf(token_id);
        }

        Stablecoin.transfer(owner, reward_amount);

        total_stablecoin_earned[owner] += reward_amount;
        nft_affiliate_rewards_earned[token_id] += reward_amount;
        total_stablecoin_distributed += reward_amount;

        // Emit events
        emit AffiliateRewardEvent(
            token_id,
            reward_amount,
            owner,
            block.timestamp
        );

        return get_nft_reference[token_id];
    }

    function _SetReferences(uint256 i, uint256 tokenID, uint256 ref) private {
        if (i == 0) {
            get_first_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_first_level_references[ref].push(tokenID);

            return;
        }

        if (i == 1) {
            get_second_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_second_level_references[ref].push(tokenID);

            return;
        }

        if (i == 2) {
            get_third_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_third_level_references[ref].push(tokenID);

            return;
        }

        if (i == 3) {
            get_four_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_four_level_references[ref].push(tokenID);

            return;
        }

        if (i == 4) {
            get_five_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_five_level_references[ref].push(tokenID);

            return;
        }

        if (i == 5) {
            get_six_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_six_level_references[ref].push(tokenID);

            return;
        }

        if (i == 6) {
            get_seven_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_seven_level_references[ref].push(tokenID);

            return;
        }

        if (i == 7) {
            get_eight_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_eight_level_references[ref].push(tokenID);

            return;
        }

        if (i == 8) {
            get_nine_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            get_nine_level_references[ref].push(tokenID);

            return;
        }
    }

    function _RecoverNFT(
        uint256 nftID,
        address contract_migration,
        uint256 month
    ) private {
        SinergyApril ContractMigration = SinergyApril(contract_migration);
        SinergyNovember ContractMigrationNovember = SinergyNovember(
            contract_migration
        );

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

        if (month == 4) {
            nft_affiliate_rewards_earned[nftID] += ContractMigration
                .nft_affiliate_rewards_earned(nftID);
        } else if (month == 11) {
            nft_affiliate_rewards_earned[nftID] += ContractMigrationNovember
                .get_nft_rewards_claimed(nftID);
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