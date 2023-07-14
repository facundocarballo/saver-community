contract ERC20Migration is Context, IERC20, IERC20Metadata {
    // Migration Saver
    uint256 timestampToCloseMigration;
    mapping(address => bool) public isRecover;

    // ERC20 Standard
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    uint256 public POTENCIAL = 9;

    uint256 public timeStableCoinReward = 1 days;

    // Saver
    uint256 public maxSupply = 369000000000 * 10 ** 18;
    uint256 public initialSupply = 369000000 * 10 ** 18;
    uint256 public devSupply = 1845000 * 10 ** 18;

    // Addresses
    address payable public communityWallet =
        payable(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    address public managementWallet =
        0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public managementWallet2 =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;
    address public devWallet = 0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    // Saver Reward
    mapping(address => bool) public isListedToClaimSaver;
    mapping(address => uint256) public cyclesOf;

    // ERC20's
    // Stable Coin
    ERC20 public USDC = ERC20(0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b); // USDC (6 decimals)
    uint256 public USDC_DECIMALS = 6;

    ERC20 public USDT = ERC20(0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73); // USDT (6 decimals)
    uint256 public USDT_DECIMALS = 6;

    ERC20 public STABLECOIN = ERC20(0x765277EebeCA2e31912C9946eAe1021199B39C61); // STABLECOIN (18 decimals)
    uint256 public BUSD_DECIMALS = 18;

    // Contract Migration
    ERC20Migration public AbleMigration =
        ERC20Migration(0xB13D289830F6512dFf4C6ce97f121F29bD400E39);
    ERC20 public TripleMigration =
        ERC20(0x38e43FCEEE68373e08a30714123010b8d841364d);
    SinergyMigration ContractMigration =
        SinergyMigration(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);

    // ERC721
    ERC721 public SinergyBronze;
    ERC721 public SinergySilver;
    ERC721 public SinergyGold;

    // Sell List
    SinergySale public ABLE_SALE;

    // Cycles
    uint256 public cycle = 1;
    mapping(address => uint256) public cycleToCheck;
    mapping(address => uint256) public cycleToSaverReward;
    uint256 public CYCLES_FOR_ABLE_REWARD = 21;

    // Saver Reward
    mapping(address => uint256) public balanceOfWins_SaverReward;
    mapping(address => bool) public winSaverReward;
    mapping(address => uint256) public winsSaverRewardOf;
    mapping(address => uint256) public total_saver_earned_of;
    uint256 public totalWinsSaverReward;
    uint256 public total_saver_distributed;
    address[] public wallet_winners;

    // Stable Coin Reward
    uint256 public minAmountToQualify = 3 * 10 ** 18;
    uint256 public rewardID = 1;
    uint256 public rewardIDonClaim;
    uint256 public totalStableCoinDistribute;

    mapping(uint256 => uint256) public rewardAmount; // rewardAmount[rewardID] => Amount Raised
    mapping(uint256 => uint256) public rewardAmountClaimed; // rewardAmount[rewardID] => Amount Claimed

    mapping(uint256 => uint256) public timeOpenClaimReward; // timeOpenClaimReward[rewardID] => timestamp

    mapping(address => mapping(uint256 => bool)) public holderClaimed; // holderClaimed[wallet][rewardID] => bool

    mapping(address => uint256) public stableCoinEarned;
    mapping(address => uint256) public stableCoinEarnedByAbleReward;

    mapping(address => bool) public isQualified; // isQualified[wallet] => bool

    mapping(address => uint256) public claimFrom;

    // Donations
    uint256 public totalDonationBalance;
    uint256 public qualifiedDonationBalance;
    uint256 public totalDonations;
    uint256 public wallets_with_donation_balance;
    uint256 public total_qualified_wallets;
    mapping(address => uint256) public donationBalance;
    mapping(address => uint256) public allDonatesOf;
    uint256 public lastDonationTimestamp;
    address public lastDonationFrom;

    // Donations per day
    mapping(address => mapping(uint256 => uint256)) public donatedByDayOf; // donatedByDayOf[wallet][cycle] => amount donated
    mapping(address => mapping(uint256 => uint256))
        public donationBalancePerCycle;

    // Savings
    mapping(address => mapping(uint256 => uint256)) public usdcRecord;
    mapping(address => uint256) public lastAmountUSDC;

    mapping(address => mapping(uint256 => uint256)) public usdtRecord;
    mapping(address => uint256) public lastAmountUSDT;

    // Holders
    uint256 public totalHolders;
    uint256 public qualifiedHolders;
    mapping(address => bool) public isHolder;
    mapping(address => string) public personalPurpose;
    mapping(address => string) public communityPurpose;

    // Resources for Admin
    uint256 public total_raised_for_admin; // Total amount raised for admin

    // Videos
    bool public sort; // true => sorted | false => not sorted
    uint256 public videoID;
    mapping(uint256 => string) public youtubeID;

    mapping(uint256 => string) public firstQuestion;
    mapping(uint256 => string) public secondQuestion;
    mapping(uint256 => string) public thirdQuestion;

    mapping(uint256 => string) public firstRealAnswer;
    mapping(uint256 => string) public secondRealAnswer;
    mapping(uint256 => string) public thirdRealAnswer;

    mapping(uint256 => string) public firstFakeAnswer1;
    mapping(uint256 => string) public secondFakeAnswer1;
    mapping(uint256 => string) public thirdFakeAnswer1;

    mapping(uint256 => string) public firstFakeAnswer2;
    mapping(uint256 => string) public secondFakeAnswer2;
    mapping(uint256 => string) public thirdFakeAnswer2;

    mapping(address => mapping(uint256 => bool)) public videoAnswerOf; // answerOf[wallet][cycle] => true

    // Qualified
    // qualified[wallet][cycle] => bool
    mapping(address => mapping(uint256 => bool)) public qualifiedSinergy;
    mapping(address => mapping(uint256 => bool)) public qualifiedSaver;
    mapping(address => mapping(uint256 => bool)) public qualifiedUSDC;
    mapping(address => mapping(uint256 => bool)) public qualifiedUSDT;
    mapping(address => mapping(uint256 => bool)) public qualifiedBDD;
    mapping(address => mapping(uint256 => bool)) public qualifiedDonatedPerDay;
    mapping(address => mapping(uint256 => bool)) public qualifiedVideo;
    mapping(address => mapping(uint256 => bool)) public qualifiedHistory;

    // Informacion
    string public managementInfo;

    // Events
    event ClaimBUSD(
        uint256 indexed date,
        uint256 amount,
        address indexed wallet
    );

    event ClaimAble(
        uint256 indexed date,
        uint256 amount,
        address indexed wallet
    );

    event AnswerVideo(uint256 indexed date, bool res, address indexed wallet);

    event Update(uint256 indexed date, address indexed wallet);

    // Nuevos eventos
    event AbleRewardQualification(
        uint256 indexed date,
        address indexed wallet,
        bool status
    ); // true => te has enlistado para el premio able || false => te has descalificado del premio able

    event UserQualification(
        uint256 indexed date,
        address indexed wallet,
        bool status
    );

    event CycleChange(uint256 indexed date, uint256 indexed cycle);

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

    event Points(
        address indexed wallet,
        uint256 cycle,
        uint256 amount,
        bool increase
    );

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;

        timeOpenClaimReward[rewardID] = block.timestamp + timeStableCoinReward;

        timestampToCloseMigration = block.timestamp + 30 days;

        // Se mintea el 0.1% del totalSupply (369.000.000 ABLE)
        _mint(communityWallet, initialSupply - devSupply);
        _mint(devWallet, devSupply);

        isHolder[communityWallet] = true;
        isHolder[devWallet] = true;

        totalHolders = 2;
        qualifiedHolders = 2;
        total_qualified_wallets = 2;
    }

    // Recover Saver
    function get_able_to_recover(address wallet) public view returns (uint256) {
        bool was_active = AbleMigration.canReclaim(wallet);
        uint256 _cycle = AbleMigration.cycle();
        uint256 i;
        uint256 default_amount = AbleMigration.balanceOf(wallet) +
            TripleMigration.balanceOf(wallet);

        while (!was_active && i < 69) {
            was_active = AbleMigration.qualifiedHistory(wallet, _cycle - i);
            i++;
        }
        if (was_active) {
            return (default_amount + AbleMigration.donationBalance(wallet));
        }

        return default_amount;
    }

    function migrate() public {
        require(block.timestamp < timestampToCloseMigration);
        require(!isRecover[msg.sender]);

        // Recover Donation Balance
        donationBalance[msg.sender] += AbleMigration.donationBalance(
            msg.sender
        );
        totalDonationBalance += donationBalance[msg.sender];
        allDonatesOf[msg.sender] += AbleMigration.allDonatesOf(msg.sender);

        // Recover Purposes
        personalPurpose[msg.sender] = AbleMigration.personalPurpose(msg.sender);
        communityPurpose[msg.sender] = AbleMigration.communityPurpose(
            msg.sender
        );

        // Recover SAVF (Last Saver Fast)
        _mint(msg.sender, get_able_to_recover(msg.sender));

        if (AbleMigration.balanceOf(msg.sender) > 0 && !isHolder[msg.sender]) {
            totalHolders++;
            isHolder[msg.sender] = true;
        }

        // Recover Qualified Donation Balance
        if (canReclaim(msg.sender) && !isQualified[msg.sender]) {
            qualifiedDonationBalance += donationBalance[msg.sender];
            isQualified[msg.sender] = true;
            qualifiedHolders++;
            emit UserQualification(block.timestamp, msg.sender, true);
        }

        isRecover[msg.sender] = true;
    }

    function burn_bdd(uint256 amount) public {
        require(donationBalance[msg.sender] >= amount);

        reduceDonationBalance(msg.sender, amount);
    }

    function claim() public {
        uint256 amountRaised = rewardAmount[rewardIDonClaim];
        uint256 amountClaimed = rewardAmountClaimed[rewardIDonClaim];

        require(!holderClaimed[msg.sender][rewardIDonClaim]);

        require(rewardIDonClaim >= claimFrom[msg.sender]);
        require(canReclaim(msg.sender));

        uint256 stableCoinToClaim = viewClaimStableCoin(msg.sender);

        require(stableCoinToClaim > 0);

        require(amountRaised >= (amountClaimed + stableCoinToClaim));

        require(donationBalance[msg.sender] >= (stableCoinToClaim / POTENCIAL));

        require(STABLECOIN.transfer(msg.sender, stableCoinToClaim));

        reduceDonationBalance(msg.sender, stableCoinToClaim / POTENCIAL);

        rewardAmountClaimed[rewardIDonClaim] += stableCoinToClaim;
        holderClaimed[msg.sender][rewardIDonClaim] = true;
        totalStableCoinDistribute += stableCoinToClaim;
        stableCoinEarned[msg.sender] += stableCoinToClaim;
        stableCoinEarnedByAbleReward[msg.sender] += stableCoinToClaim;

        _updateALL(msg.sender);

        // Emit events
        emit ClaimBUSD(block.timestamp, stableCoinToClaim, msg.sender);
    }

    function claimSaver() public {
        _updateALL(msg.sender);
        require((_totalSupply + donationBalance[msg.sender]) < maxSupply);
        require(
            canReclaimSaver(msg.sender),
            "You are not qualified to claim SAVER."
        );

        // Nueva version
        require(
            cycleToSaverReward[msg.sender] < cycle,
            "You have to wait 30 days to claim your SAVER."
        );

        // Emit events
        emit ClaimAble(
            block.timestamp,
            donationBalance[msg.sender],
            msg.sender
        );

        _mint(msg.sender, donationBalance[msg.sender]);

        isListedToClaimSaver[msg.sender] = false;

        if (!winSaverReward[msg.sender]) {
            address[] storage winners = wallet_winners;
            winners.push(msg.sender);
            wallet_winners = winners;
        }

        winSaverReward[msg.sender] = true;

        winsSaverRewardOf[msg.sender]++;
        totalWinsSaverReward++;

        balanceOfWins_SaverReward[msg.sender]++;

        total_saver_distributed += donationBalance[msg.sender];
        total_saver_earned_of[msg.sender] += donationBalance[msg.sender];

        stableCoinEarnedByAbleReward[msg.sender] = 0;

        updateTimestampRewards();
    }

    // Video

    function uploadVideoAndFirstQuestion(
        string memory _youtubeID,
        string memory _firstQuestion,
        string memory _firstRealAnswer,
        string memory _firstFakeAnswer1,
        string memory _firstFakeAnswer2
    ) public {
        require(
            msg.sender == managementWallet ||
                msg.sender == managementWallet2 ||
                msg.sender == communityWallet,
            "You are not qualified to call this function"
        );
        youtubeID[videoID] = _youtubeID;

        firstQuestion[videoID] = _firstQuestion;

        firstRealAnswer[videoID] = _firstRealAnswer;

        firstFakeAnswer1[videoID] = _firstFakeAnswer1;

        firstFakeAnswer2[videoID] = _firstFakeAnswer2;

        videoID++;
    }

    function uploadSecondQuestion(
        string memory _secondQuestion,
        string memory _secondRealAnswer,
        string memory _secondFakeAnswer1,
        string memory _secondFakeAnswer2
    ) public {
        require(
            msg.sender == managementWallet ||
                msg.sender == managementWallet2 ||
                msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        secondQuestion[videoID - 1] = _secondQuestion;

        secondRealAnswer[videoID - 1] = _secondRealAnswer;

        secondFakeAnswer1[videoID - 1] = _secondFakeAnswer1;

        secondFakeAnswer2[videoID - 1] = _secondFakeAnswer2;
    }

    function uploadThirdQuestion(
        string memory _thirdQuestion,
        string memory _thirdRealAnswer,
        string memory _thirdFakeAnswer1,
        string memory _thirdFakeAnswer2
    ) public {
        require(
            msg.sender == managementWallet ||
                msg.sender == managementWallet2 ||
                msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        thirdQuestion[videoID - 1] = _thirdQuestion;

        thirdRealAnswer[videoID - 1] = _thirdRealAnswer;

        thirdFakeAnswer1[videoID - 1] = _thirdFakeAnswer1;

        thirdFakeAnswer2[videoID - 1] = _thirdFakeAnswer2;
    }

    function answerVideo(
        string memory answer1,
        string memory answer2,
        string memory answer3,
        uint256 _videoID
    ) public {
        bool first = (keccak256(abi.encodePacked((answer1))) ==
            keccak256(abi.encodePacked((firstRealAnswer[_videoID]))));
        bool second = (keccak256(abi.encodePacked((answer2))) ==
            keccak256(abi.encodePacked((secondRealAnswer[_videoID]))));
        bool third = (keccak256(abi.encodePacked((answer3))) ==
            keccak256(abi.encodePacked((thirdRealAnswer[_videoID]))));

        videoAnswerOf[msg.sender][cycle] = first && second && third;

        emit AnswerVideo(block.timestamp, first && second && third, msg.sender);

        _updateALL(msg.sender);
    }

    function changeSorted() public {
        require(
            msg.sender == communityWallet ||
                msg.sender == managementWallet ||
                msg.sender == managementWallet2,
            "You are not qualified to call this function"
        );
        sort = !sort;
    }

    function changeUSDC(address _newCoin, uint256 _decimals) public {
        require(
            msg.sender == communityWallet || msg.sender == devWallet,
            "You are not able to call this function"
        );
        USDC = ERC20(_newCoin);
        USDC_DECIMALS = _decimals;
    }

    function changeUSDT(address _newCoin, uint256 _decimals) public {
        require(
            msg.sender == communityWallet || msg.sender == devWallet,
            "You are not able to call this function"
        );
        USDT = ERC20(_newCoin);
        USDT_DECIMALS = _decimals;
    }

    function changeBUSD(address _newCoin, uint256 _decimals) public {
        require(
            msg.sender == communityWallet || msg.sender == devWallet,
            "You are not able to call this function"
        );
        STABLECOIN = ERC20(_newCoin);
        BUSD_DECIMALS = _decimals;
    }

    function changeCommunityWallet(address newAddress) public {
        require(
            msg.sender == communityWallet,
            "You are not qualified to call this function."
        );

        communityWallet = payable(newAddress);
    }

    function viewClaimStableCoin(address wallet) public view returns (uint256) {
        if (qualifiedDonationBalance == 0 || !canReclaim(wallet)) return 0;

        uint256 amount = ((rewardAmount[rewardIDonClaim] *
            donationBalance[wallet]) / qualifiedDonationBalance);
        uint256 amountClaimed = rewardAmountClaimed[rewardIDonClaim];
        uint256 amountRaised = rewardAmount[rewardIDonClaim];

        if (amountRaised < (amountClaimed + amount)) {
            amount = (amountRaised - amountClaimed);
        }

        if (amount > (donationBalance[wallet] * POTENCIAL))
            return donationBalance[wallet] * POTENCIAL;

        return amount;
    }

    function qualifiedForBDD(address wallet) public view returns (bool) {
        return (donationBalance[wallet] >= minAmountToQualify);
    }

    function qualifiedForSAVER(address wallet) public view returns (bool) {
        return (_balances[wallet] > donationBalance[wallet]);
    }

    function qualifiedForUSDT(address wallet) public view returns (bool) {
        return (getBalanceOfUSDT(wallet) > donationBalance[wallet]);
    }

    function qualifiedForUSDC(address wallet) public view returns (bool) {
        return (getBalanceOfUSDC(wallet) > donationBalance[wallet]);
    }

    function qualifiedForDonatePerDay(
        address wallet
    ) public view returns (bool) {
        if (donationBalance[wallet] == 0) return false;

        if (cycle > 1) {
            return (donationBalancePerCycle[wallet][cycle - 1] >=
                getZeroPointNinePercent(
                    donationBalancePerCycle[wallet][cycle - 2]
                ));
        }

        return true;
    }

    function getSavingsLimit(address wallet) public view returns (uint256) {
        return ((usdcRecord[wallet][cycle - 1] * 100369) / 100000);
    }

    function getZeroPointNinePercent(
        uint256 amount
    ) public pure returns (uint256) {
        return (amount * 1009) / 1000;
    }

    function qualifiedForVideo(address wallet) public view returns (bool) {
        return videoAnswerOf[wallet][cycle - 1];
    }

    function getMinAmountToDonate(
        address wallet
    ) public view returns (uint256) {
        if (
            getZeroPointNinePercent(
                donationBalancePerCycle[wallet][cycle - 1]
            ) > donationBalance[wallet]
        ) {
            return
                getZeroPointNinePercent(
                    donationBalancePerCycle[wallet][cycle - 1]
                ) - donationBalance[wallet];
        }

        return 0;
    }

    function qualifiedForSinergy(address wallet) public view returns (bool) {
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

    function canReclaim(address wallet) public view returns (bool) {
        if (wallet == communityWallet || wallet == devWallet) return true;

        return (qualifiedSinergy[wallet][cycle - 1] &&
            qualifiedUSDT[wallet][cycle - 1] &&
            qualifiedUSDC[wallet][cycle - 1] &&
            qualifiedSaver[wallet][cycle - 1] &&
            qualifiedBDD[wallet][cycle - 1] &&
            qualifiedDonatedPerDay[wallet][cycle - 1] &&
            qualifiedVideo[wallet][cycle - 1]);
    }

    function canReclaimSaver(address wallet) public view returns (bool) {
        return (canReclaim(wallet) && isListedToClaimSaver[wallet]);
    }

    // Esta funcion la agregamos porque fallaba el premio able (28-10-2022)
    // Pero luego nos dimos cuenta que estaba bien
    function canReclaimAble(address wallet) public view returns (bool) {
        bool res = true;

        if (cycle < CYCLES_FOR_ABLE_REWARD) return false;

        for (uint256 i = cycle - CYCLES_FOR_ABLE_REWARD; i < cycle; i++) {
            res = res && qualifiedHistory[wallet][i];
        }

        return res;
    }

    /*
        Si los decimales son distintos a 18, entonces para tratar a todos los tokens con 18 decimales retornamos
        el balance que dice el contrato del token multiplicado por 10 elevado a la diferencia de 18 y los decimales
        de ese token.
        Por ejemplo: USDC (6 Decimales)
        Como sus decimales son distintos a 18, hara lo siguiente. El balance que retorne el contrato de USDC en
        6 decimales le agregara 12 decimales mas. (18 - DECIMALS).
        Para asi finalmente tratarlo como un token de 18 decimales.
    */

    function getBalanceOfUSDC(address wallet) public view returns (uint256) {
        if (USDC_DECIMALS == 18) {
            return USDC.balanceOf(wallet);
        }
        return USDC.balanceOf(wallet) * 10 ** (18 - USDC_DECIMALS);
    }

    function getBalanceOfUSDT(address wallet) public view returns (uint256) {
        if (USDT_DECIMALS == 18) {
            return USDT.balanceOf(wallet);
        }
        return USDT.balanceOf(wallet) * 10 ** (18 - USDT_DECIMALS);
    }

    function getBalanceOfBUSD(address wallet) public view returns (uint256) {
        if (BUSD_DECIMALS == 18) {
            return STABLECOIN.balanceOf(wallet);
        }
        return STABLECOIN.balanceOf(wallet) * 10 ** (18 - BUSD_DECIMALS);
    }

    function updateTimestampRewards() public {
        if (block.timestamp > timeOpenClaimReward[rewardID]) {
            // If someone forgot to claim, this reward will appear on the next reward
            rewardAmount[rewardID] += (rewardAmount[rewardIDonClaim] -
                rewardAmountClaimed[rewardIDonClaim]);

            cycle++;
            emit CycleChange(block.timestamp, cycle);

            rewardIDonClaim = rewardID;
            rewardID++;

            // Update times to claim
            timeOpenClaimReward[rewardID] =
                block.timestamp +
                timeStableCoinReward;
        }
    }

    function updateALL(address wallet) public {
        updateTimestampRewards();
        updateSavings(wallet);
        updateQualifiedDonationBalance(wallet);
        checkDay(wallet);
        checkSaverReward(wallet);

        if (SinergyBronze != ERC721(address(0))) {
            SinergyBronze.updateFromAble();
        }

        if (SinergySilver != ERC721(address(0))) {
            SinergySilver.updateFromAble();
        }

        if (SinergyGold != ERC721(address(0))) {
            SinergyGold.updateFromAble();
        }

        emit Update(block.timestamp, wallet);
    }

    function _updateALL(address wallet) private {
        updateTimestampRewards();
        updateSavings(wallet);
        updateQualifiedDonationBalance(wallet);
        checkDay(wallet);
        checkSaverReward(wallet);

        if (SinergyBronze != ERC721(address(0))) {
            SinergyBronze.updateFromAble();
        }

        if (SinergySilver != ERC721(address(0))) {
            SinergySilver.updateFromAble();
        }

        if (SinergyGold != ERC721(address(0))) {
            SinergyGold.updateFromAble();
        }
    }

    function updateFromSinergy(address wallet) public {
        updateTimestampRewards();
        updateSavings(wallet);
        updateQualifiedDonationBalance(wallet);
        checkDay(wallet);
        checkSaverReward(wallet);
    }

    function setPersonalPurpose(string memory _str) public {
        personalPurpose[msg.sender] = _str;
    }

    function setCommunityPurpose(string memory _str) public {
        communityPurpose[msg.sender] = _str;
    }

    function withdrawAllFunds() public {
        require(
            (block.timestamp - lastDonationTimestamp) > 1 days,
            "The contract is still working"
        );
        require(
            msg.sender == communityWallet,
            "You are not qualified to call to this function"
        );

        require(
            STABLECOIN.transfer(msg.sender, address(this).balance),
            "Cannot pay StableCoin"
        );
    }

    function setManagementInfo(string memory info) public {
        require(
            msg.sender == managementWallet || msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        managementInfo = info;
    }

    function changeManagementWallet(address _managementWallet) public {
        require(
            msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        managementWallet = _managementWallet;
    }

    function changeManagementWallet2(address _managementWallet) public {
        require(
            msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        managementWallet2 = _managementWallet;
    }

    function set_potencial(uint256 _potencial) public {
        require(
            msg.sender == communityWallet || msg.sender == devWallet,
            "You are not qualified to call this function."
        );
        POTENCIAL = _potencial;
    }

    function setSinergyBronze(address _sinergyBronze) public {
        require(
            msg.sender == devWallet,
            "You are not qualified to call this function"
        );

        SinergyBronze = ERC721(_sinergyBronze);
    }

    function setSinergySilver(address _sinergySilver) public {
        require(
            msg.sender == devWallet,
            "You are not qualified to call this function"
        );

        SinergySilver = ERC721(_sinergySilver);
    }

    function setSinergyGold(address _sinergyGold) public {
        require(
            msg.sender == devWallet,
            "You are not qualified to call this function"
        );

        SinergyGold = ERC721(_sinergyGold);
    }

    function setSinergySell(SinergySale _ableSale) public {
        require(msg.sender == devWallet);
        ABLE_SALE = _ableSale;
    }

    // Private funcs
    function updateQualifiedDonationBalanceAfterDonate(
        address wallet,
        uint256 amount
    ) private {
        bool previousStatus = isQualified[wallet];

        if (isQualified[wallet]) {
            qualifiedDonationBalance -= donationBalance[wallet];
            isQualified[wallet] = false;
            total_qualified_wallets--;
            qualifiedHolders--;
        }

        if (donationBalance[wallet] == 0) {
            wallets_with_donation_balance++;
        }

        donationBalance[wallet] += amount;
        totalDonationBalance += amount;

        if (canReclaim(wallet)) {
            qualifiedDonationBalance += donationBalance[wallet];
            isQualified[wallet] = true;
            total_qualified_wallets++;
            qualifiedHolders++;
        }

        if (previousStatus != isQualified[wallet]) {
            emit UserQualification(block.timestamp, wallet, !previousStatus);
        }
    }

    function updateQualifiedDonationBalance(address wallet) private {
        bool previousStatus = isQualified[wallet];

        if (isQualified[wallet]) {
            qualifiedDonationBalance -= donationBalance[wallet];
            isQualified[wallet] = false;
            total_qualified_wallets--;
            qualifiedHolders--;
        }

        if (canReclaim(wallet)) {
            qualifiedDonationBalance += donationBalance[wallet];
            isQualified[wallet] = true;
            total_qualified_wallets++;
            qualifiedHolders++;
        }

        if (previousStatus != isQualified[wallet]) {
            emit UserQualification(block.timestamp, wallet, !previousStatus);
        }
    }

    function updateSavings(address wallet) private {
        uint256 last_saving_amount = lastAmountUSDC[wallet] +
            lastAmountUSDT[wallet];
        uint256 actual_saving_amount = getBalanceOfUSDC(wallet) +
            getBalanceOfUSDT(wallet);

        if (actual_saving_amount < last_saving_amount) {
            uint256 dif = last_saving_amount - actual_saving_amount;

            if (dif > donationBalance[wallet]) {
                reduceDonationBalance(wallet, donationBalance[wallet]);
            } else {
                reduceDonationBalance(wallet, dif);
            }
        }
    }

    function checkSaverReward(address wallet) private {
        if (!canReclaim(wallet) && isListedToClaimSaver[wallet]) {
            isListedToClaimSaver[wallet] = false;
            emit AbleRewardQualification(block.timestamp, wallet, false);
            return;
        }

        if (canReclaim(wallet) && !isListedToClaimSaver[wallet]) {
            isListedToClaimSaver[wallet] = true;
            cycleToSaverReward[wallet] = cycle + CYCLES_FOR_ABLE_REWARD;
            emit AbleRewardQualification(block.timestamp, wallet, true);
            return;
        }
    }

    // antes llamada checkDonatedByDay
    function checkDay(address wallet) private {
        if (cycle >= cycleToCheck[wallet]) {
            cycleToCheck[wallet] = cycle + 1;

            lastAmountUSDC[wallet] = getBalanceOfUSDC(wallet);
            lastAmountUSDT[wallet] = getBalanceOfUSDT(wallet);

            usdcRecord[wallet][cycle] = lastAmountUSDC[wallet];
            usdtRecord[wallet][cycle] = lastAmountUSDT[wallet];

            donationBalancePerCycle[wallet][cycle - 1] = donationBalance[
                msg.sender
            ];
            qualifiedSinergy[wallet][cycle - 1] = qualifiedForSinergy(wallet);
            qualifiedSaver[wallet][cycle - 1] = qualifiedForSAVER(wallet);
            qualifiedUSDT[wallet][cycle - 1] = qualifiedForUSDT(wallet);
            qualifiedUSDC[wallet][cycle - 1] = qualifiedForUSDC(wallet);
            qualifiedBDD[wallet][cycle - 1] = qualifiedForBDD(wallet);
            qualifiedDonatedPerDay[wallet][
                cycle - 1
            ] = qualifiedForDonatePerDay(wallet);
            qualifiedVideo[wallet][cycle - 1] = qualifiedForVideo(wallet);

            qualifiedHistory[wallet][cycle - 1] = canReclaim(wallet);

            emit CloseCycle(
                wallet,
                cycle - 1,
                qualifiedSinergy[wallet][cycle - 1],
                qualifiedUSDT[wallet][cycle - 1],
                qualifiedUSDC[wallet][cycle - 1],
                qualifiedSaver[wallet][cycle - 1],
                qualifiedBDD[wallet][cycle - 1],
                qualifiedDonatedPerDay[wallet][cycle - 1],
                qualifiedVideo[wallet][cycle - 1]
            );
        }
    }

    // Esta nueva funcion la tiene que llamar SinergySale cada vez que alguien compra ABLE
    function incrementDonationBalance(
        uint256 amount_spended,
        address wallet
    ) public {
        require(msg.sender == address(ABLE_SALE));
        updateQualifiedDonationBalanceAfterDonate(wallet, amount_spended);
        _updateALL(wallet);
        if (canReclaim(wallet)) {
            lastDonationFrom = msg.sender;
        }
        rewardAmount[rewardID] += (amount_spended / 3);
        allDonatesOf[wallet] += amount_spended;
        donatedByDayOf[wallet][cycle] += amount_spended;
        claimFrom[wallet] = rewardID;
        totalDonations++;

        total_raised_for_admin += (amount_spended / 3);

        lastDonationTimestamp = block.timestamp;

        // Emit Event
        emit Points(wallet, cycle, amount_spended, true);
    }

    function reduceDonationBalance(address wallet, uint256 amount) private {
        bool previousStatus = isQualified[wallet];

        if (isQualified[wallet]) {
            qualifiedDonationBalance -= donationBalance[wallet];
            isQualified[wallet] = false;
            total_qualified_wallets--;
            qualifiedHolders--;
        }

        donationBalance[wallet] -= amount;
        totalDonationBalance -= amount;

        if (donationBalance[wallet] == 0) {
            wallets_with_donation_balance--;
        }

        if (canReclaim(wallet)) {
            qualifiedDonationBalance += donationBalance[wallet];
            isQualified[wallet] = true;
            total_qualified_wallets++;
            qualifiedHolders++;
        }

        if (previousStatus != isQualified[wallet]) {
            emit UserQualification(block.timestamp, wallet, !previousStatus);
        }

        // Emit Event
        emit Points(wallet, cycle, amount, false);
    }

    // Funcs Private view

    // Funcs IERC20

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(
        address account
    ) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(
        address owner,
        address spender
    ) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(
        address spender,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, _allowances[owner][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = _allowances[owner][spender];
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        if (!isHolder[to]) {
            totalHolders++;
            isHolder[to] = true;
        }

        uint256 fromBalance = _balances[from];
        require(
            fromBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;

        if (_balances[from] == 0) {
            totalHolders--;
            isHolder[from] = false;
        }

        _updateALL(from);
        _updateALL(to);

        updateQualifiedDonationBalance(from);
        updateQualifiedDonationBalance(to);

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(
                currentAllowance >= amount,
                "ERC20: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}