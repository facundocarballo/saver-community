contract ERC20 is Context, IERC20, IERC20Metadata, Owners {
    // Migration Saver
    mapping(address => bool) public isRecover;

    // ERC20 Standard
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    // Cycle
    Clock Cycle = Clock(0xbc4E59AE11A28214f84FCc1c9B0535355D408BBf);

    // Able
    uint256 public initial_supply = 369000000 * 10**18;
    uint256 public develpoment_supply = 1845000 * 10**18;

    // Contract Migration
    ERC20Migration public AbleMigration =
        ERC20Migration(0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5); // April 2023

    ERC20Migration public FirstAbleMigration =
        ERC20Migration(0xB13D289830F6512dFf4C6ce97f121F29bD400E39); // November 2022
    ERC20 public TripleMigration =
        ERC20(0x38e43FCEEE68373e08a30714123010b8d841364d);

    SinergyMigration ContractMigration =
        SinergyMigration(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);

    // ERC721
    ERC721 public SinergyBronze;
    ERC721 public SinergySilver;
    ERC721 public SinergyGold;

    // Sell List
    SinergySale public AbleSale;

    // User
    User public Qualification =
        User(0xb48E4bbE89bD0276343726b0f8A162be1BCB411c);

    // Reward
    BaseReward public StablecoinReward =
        BaseReward(0xB13D289830F6512dFf4C6ce97f121F29bD400E39);
    ConfidenceReward public StablecoinConfidenceReward =
        ConfidenceReward(0xB13D289830F6512dFf4C6ce97f121F29bD400E39);

    // Holders
    uint256 public total_holders;
    uint256 public qualified_holders;
    mapping(address => bool) public is_holder;
    mapping(address => string) public personal_purpose;
    mapping(address => string) public community_purpose;

    // Saver Reward
    uint256 public POTENCIAL_ABLE = 1;
    uint256 public CYCLES_FOR_ABLE_REWARD = 21;
    mapping(address => bool) public is_listed_to_claim_able;
    mapping(address => uint256) public amount_of_wins_able_reward_of;
    mapping(address => bool) public won_able_reward;
    mapping(address => uint256) public total_able_earned_of;
    mapping(address => uint256) public cycle_to_able_reward;
    mapping(address => uint256) public stablecoin_earned_by_able_reward;
    uint256 public able_rewards_claimed;
    uint256 public qualified_able_rewards_claimed;
    uint256 public total_able_distributed;
    address[] public wallet_winners;

    // Points
    uint256 public total_points;
    uint256 public amount_of_wallets_with_points;
    mapping(address => uint256) public points_of;
    address public last_wallet_who_bought_able;

    // Qualified Points
    mapping(uint256 => uint256) public qualified_points_by_cycle;
    uint256 public qualified_points;
    uint256 public total_qualified_wallets;
    mapping(address => bool) public is_qualified;

    // Informacion
    string public management_info;

    // Events
    event ClaimAbleEvent(
        uint256 indexed date,
        uint256 amount,
        address indexed wallet
    );

    // Nuevos eventos
    event AbleRewardQualification(
        uint256 indexed date,
        address indexed wallet,
        bool status
    ); // true => te has enlistado para el premio able || false => te has descalificado del premio able

    event Points(
        address indexed wallet,
        uint256 cycle,
        uint256 amount,
        bool increase
    );

    event AbleQualification(
        uint256 indexed date,
        address indexed wallet,
        bool status
    );

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;

        // Se mintea el 0.1% del totalSupply (369.000.000 ABLE)
        _mint(community_wallet, initial_supply - develpoment_supply);
        _mint(development_wallet, develpoment_supply);

        is_holder[community_wallet] = true;
        is_holder[development_wallet] = true;

        total_holders = 2;
        qualified_holders = 2;
        total_qualified_wallets = 2;
    }

    // Recover Saver
    function GetAbleToRecover(address wallet, ERC20Migration Able, bool triple) public view returns (uint256) {
        bool was_active = Able.canReclaim(wallet);
        uint256 _cycle = Able.cycle();
        uint256 i;
        uint256 default_amount = Able.balanceOf(wallet);
        if (triple) {
            default_amount += TripleMigration.balanceOf(wallet);
        }

        while (!was_active && i < 69) {
            was_active = Able.qualifiedHistory(wallet, _cycle - i);
            i++;
        }
        if (was_active) {
            return (default_amount + Able.donationBalance(wallet));
        }

        return default_amount;
    }

    function Migrate() public {
        require(!isRecover[msg.sender]);

        if (AbleMigration.isRecover(msg.sender)) {
            _MigrateAble(msg.sender, AbleMigration, false);
        } else {
            _MigrateAble(msg.sender, FirstAbleMigration, true);
        }

    }

    // Points
    function BurnPoints(uint256 amount) public {
        require(
            points_of[msg.sender] >= amount,
            "You dont have this amount of points to burn it."
        );
        DecreasePoints(msg.sender, amount);
    }

    // Esta nueva funcion la tiene que llamar SinergySale cada vez que alguien compra ABLE
    function IncreasePoints(uint256 amount_spended, address wallet) public {
        require(
            msg.sender == address(AbleSale),
            "Only Sinergy Sale can increase points."
        );

        if (amount_spended > 0 && points_of[wallet] == 0) {
            amount_of_wallets_with_points++;
        }

        if (is_qualified[wallet]) {
            qualified_points -= points_of[wallet];
            is_qualified[wallet] = false;
            total_qualified_wallets--;
            qualified_holders--;
            if (amount_of_wins_able_reward_of[wallet] > 0) {
                qualified_able_rewards_claimed -= amount_of_wins_able_reward_of[
                    wallet
                ];
            }
        }

        points_of[wallet] += amount_spended;
        total_points += amount_spended;

        Qualification.Update(wallet);

        if (Qualification.IsQualified(wallet)) {
            qualified_points += points_of[wallet];
            is_qualified[wallet] = true;
            total_qualified_wallets++;
            qualified_holders++;
            last_wallet_who_bought_able = msg.sender;
            if (amount_of_wins_able_reward_of[wallet] > 0) {
                qualified_able_rewards_claimed -= amount_of_wins_able_reward_of[
                    wallet
                ];
            }
        }

        StablecoinReward.IncreaseReward(amount_spended / 3);

        // Emit Event
        emit Points(wallet, Cycle.cycle(), amount_spended, true);
    }

    function DecreasePoints(address wallet, uint256 amount) public {
        require(
            _CanDecreasePoints(wallet),
            "You are not qualified to try to Decrease Points."
        );
        require(
            amount <= points_of[wallet],
            "You dont have that amount of points to decrease it."
        );
        bool previousStatus = is_qualified[wallet];

        if (is_qualified[wallet]) {
            qualified_points -= points_of[wallet];
            is_qualified[wallet] = false;
            total_qualified_wallets--;
            qualified_holders--;
            if (amount_of_wins_able_reward_of[wallet] > 0) {
                qualified_able_rewards_claimed -= amount_of_wins_able_reward_of[
                    wallet
                ];
            }
        }

        points_of[wallet] -= amount;
        total_points -= amount;

        // We asked for amount != 0, because the user can reduce zero points having zero points.
        if (points_of[wallet] == 0 && amount != 0) {
            amount_of_wallets_with_points--;
        }

        Qualification.Update(wallet);

        if (Qualification.IsQualified(wallet)) {
            qualified_points += points_of[wallet];
            is_qualified[wallet] = true;
            total_qualified_wallets++;
            qualified_holders++;
            if (amount_of_wins_able_reward_of[wallet] > 0) {
                qualified_able_rewards_claimed += amount_of_wins_able_reward_of[
                    wallet
                ];
            }
        }

        if (previousStatus != is_qualified[wallet]) {
            emit AbleQualification(block.timestamp, wallet, !previousStatus);
        }

        // Emit Event
        emit Points(wallet, Cycle.cycle(), amount, false);
    }

    function CloseCycle() public {
        require(
            msg.sender == address(Cycle),
            "Only the Clock can Set Qualified Points"
        );
        qualified_points_by_cycle[Cycle.cycle()] = qualified_points;
    }

    // Able Reward
    function ClaimAble() public {
        require(
            Qualification.is_updated(msg.sender, Cycle.cycle()),
            "You have to update first."
        );
        require(
            CanClaimAble(msg.sender),
            "You are not qualified to claim Able."
        );
        require(
            cycle_to_able_reward[msg.sender] < Cycle.cycle(),
            "You have to wait 30 days to claim your Able."
        );

        // Emit events
        emit ClaimAbleEvent(block.timestamp, points_of[msg.sender], msg.sender);

        _mint(msg.sender, points_of[msg.sender] * POTENCIAL_ABLE);

        is_listed_to_claim_able[msg.sender] = false;

        if (!won_able_reward[msg.sender]) {
            address[] storage winners = wallet_winners;
            winners.push(msg.sender);
            wallet_winners = winners;
        }

        won_able_reward[msg.sender] = true;

        amount_of_wins_able_reward_of[msg.sender]++;
        able_rewards_claimed++;
        qualified_able_rewards_claimed++;

        total_able_distributed += points_of[msg.sender];
        total_able_earned_of[msg.sender] += points_of[msg.sender];

        stablecoin_earned_by_able_reward[msg.sender] = 0;
    }

    function CanClaimAble(address wallet) public view returns (bool) {
        return (Qualification.IsQualified(wallet) &&
            is_listed_to_claim_able[wallet]);
    }

    // Update
    function UpdateQualifiedPoints(address wallet) public {
        bool previousStatus = is_qualified[wallet];

        if (is_qualified[wallet]) {
            qualified_points -= points_of[wallet];
            is_qualified[wallet] = false;
            total_qualified_wallets--;
            qualified_holders--;
            if (amount_of_wins_able_reward_of[wallet] > 0) {
                qualified_able_rewards_claimed -= amount_of_wins_able_reward_of[
                    wallet
                ];
            }
        }

        Qualification.Update(wallet);

        if (Qualification.IsQualified(wallet)) {
            qualified_points += points_of[wallet];
            is_qualified[wallet] = true;
            total_qualified_wallets++;
            qualified_holders++;
            if (amount_of_wins_able_reward_of[wallet] > 0) {
                qualified_able_rewards_claimed += amount_of_wins_able_reward_of[
                    wallet
                ];
            }
        }

        if (previousStatus != is_qualified[wallet]) {
            emit AbleQualification(block.timestamp, wallet, !previousStatus);
        }
    }

    function CheckAbleReward(address wallet) public {
        if (
            !Qualification.IsQualified(wallet) &&
            is_listed_to_claim_able[wallet]
        ) {
            is_listed_to_claim_able[wallet] = false;
            emit AbleRewardQualification(block.timestamp, wallet, false);
            return;
        }

        if (
            Qualification.IsQualified(wallet) &&
            !is_listed_to_claim_able[wallet]
        ) {
            is_listed_to_claim_able[wallet] = true;
            cycle_to_able_reward[wallet] =
                Cycle.cycle() +
                CYCLES_FOR_ABLE_REWARD;
            emit AbleRewardQualification(block.timestamp, wallet, true);
            return;
        }
    }

    // Get Functions
    function GetWalletWinnersLength() public view returns(uint256) {
        return wallet_winners.length;
    }

    // Set Functions
    function SetClock(address _address) public {
        require(IsOwner(msg.sender), "Only owner can change Clock contract.");
        Cycle = Clock(_address);
    }

    function SetAbleMigration(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change Able Migration contract."
        );
        AbleMigration = ERC20Migration(_address);
    }

    function SetTripleMigration(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change Triple Migration contract."
        );
        TripleMigration = ERC20(_address);
    }

    function SetSinergyMigration(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change Sinergy Migration contract."
        );
        ContractMigration = SinergyMigration(_address);
    }

    function SetSinergyBronze(address _sinergyBronze) public {
        require(
            msg.sender == development_wallet,
            "You are not qualified to set Sinergy Bronze"
        );

        SinergyBronze = ERC721(_sinergyBronze);
    }

    function SetSinergySilver(address _sinergySilver) public {
        require(
            msg.sender == development_wallet,
            "You are not qualified to set Sinergy Silver"
        );

        SinergySilver = ERC721(_sinergySilver);
    }

    function SetSinergyGold(address _sinergyGold) public {
        require(
            msg.sender == development_wallet,
            "You are not qualified to set Sinergy Gold"
        );

        SinergyGold = ERC721(_sinergyGold);
    }

    function SetSinergySale(SinergySale _ableSale) public {
        require(
            msg.sender == development_wallet,
            "You are not qualified to set Sinergy Sale"
        );
        AbleSale = _ableSale;
    }

    function SetUser(address _address) public {
        require(IsOwner(msg.sender), "Only owner can change User contract.");
        Qualification = User(_address);
    }

    function SetStablecoinReward(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change Stablecoin Reward contract."
        );
        StablecoinReward = BaseReward(_address);
    }

    function SetStablecoinConfidenceReward(address _address) public {
        require(
            IsOwner(msg.sender),
            "Only owner can change Stablecoin Confidence Reward contract."
        );
        StablecoinConfidenceReward = ConfidenceReward(_address);
    }

    function SetPersonalPurpose(string memory _str) public {
        personal_purpose[msg.sender] = _str;
    }

    function SetCommunityPurpose(string memory _str) public {
        community_purpose[msg.sender] = _str;
    }

    function SetPotencialAble(uint256 potencial) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the able reward potencial."
        );
        POTENCIAL_ABLE = potencial;
    }

    function SetCyclesForAbleReward(uint256 cycles) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the cycles for able reward."
        );
        CYCLES_FOR_ABLE_REWARD = cycles;
    }

    // Private Functions
    function _MigrateAble(address wallet, ERC20Migration Able, bool triple) private {
        uint256 last_points_of = points_of[wallet];
        // Recover Donation Balance
        points_of[wallet] += Able.donationBalance(wallet);
        total_points += points_of[wallet];

        // Recover Purposes
        personal_purpose[wallet] = Able.personalPurpose(
            wallet
        );
        community_purpose[wallet] = Able.communityPurpose(
            wallet
        );

        // Recover SAVF (Last Saver Fast)
        _mint(wallet, GetAbleToRecover(wallet, Able, triple));

        if (Able.balanceOf(wallet) > 0 && !is_holder[wallet]) {
            total_holders++;
            is_holder[wallet] = true;
        }

        Qualification.Update(wallet);
        bool qualification_is_qualified = Qualification.IsQualified(wallet);
        // Recover Qualified Donation Balance
        if (qualification_is_qualified && !is_qualified[wallet]) {
            qualified_points += points_of[wallet];
            is_qualified[wallet] = true;
            total_qualified_wallets++;
            qualified_holders++;
        } else if (qualification_is_qualified && is_qualified[wallet]) {
            qualified_points += points_of[wallet] - last_points_of;
        }

        if (points_of[wallet] > 0 && last_points_of == 0) {
            amount_of_wallets_with_points++;
        }

        isRecover[wallet] = true;
    }

    function _CanDecreasePoints(address wallet) private view returns (bool) {
        if (wallet == address(this) || wallet == address(Qualification))
            return true;
        return false;
    }

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

    function balanceOf(address account)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _balances[account];
    }

    function transfer(address to, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(address owner, address spender)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
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

    function increaseAllowance(address spender, uint256 addedValue)
        public
        virtual
        returns (bool)
    {
        address owner = _msgSender();
        _approve(owner, spender, _allowances[owner][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        virtual
        returns (bool)
    {
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

        if (!is_holder[to] && amount > 0) {
            total_holders++;
            is_holder[to] = true;
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
            total_holders--;
            is_holder[from] = false;
        }

        if (to != address(AbleSale)) {
            StablecoinConfidenceReward.SetAmountSoldInPeriod(from, amount);
        }

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