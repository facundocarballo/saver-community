contract BaseReward is Owners {
    // Cycle
    Clock public Cycle = Clock(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // User
    User public Qualification = User(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Able
    ERC20 public Able = ERC20(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Token
    ERC20 public Token = ERC20(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);

    // Attributes
    uint256 public total_distributed;
    mapping(uint256 => uint256) public raised_amount;
    mapping(uint256 => uint256) public claimed_amount;
    mapping(address => mapping(uint256 => bool)) public has_claimed;
    mapping(address => uint256) public amount_earned;

    // Events
    event RewardClaimed(uint256 amount, address indexed wallet);

    constructor(address _token) {
        Token = ERC20(_token);
    }

    // Public Functions
    function IncreaseReward(uint256 amount) public {
        require(
            CanIncreaseRewards(msg.sender),
            "You are not qualified to increase the Reward (Able Gift)"
        );
        raised_amount[Cycle.cycle()] += amount;
    }

    function Claim() public {
        require(Qualification.is_updated(msg.sender, Cycle.cycle()), "You have to update first.");
        require(
            CanClaim(msg.sender),
            "You are not qualified to claim the Reward."
        );
        uint256 amount = ViewAmountToClaim(msg.sender);
        Token.transfer(msg.sender, amount);
        has_claimed[msg.sender][Cycle.cycle()] = true;

        emit RewardClaimed(amount, msg.sender);
    }

    function Update() public {
        require(
            CanUpdate(msg.sender),
            "You are not qualified to update the Reward."
        );
        uint256 cycle = Cycle.cycle();
        if (raised_amount[cycle - 1] > claimed_amount[cycle - 1]) {
            raised_amount[cycle] += (raised_amount[cycle - 1] -
                claimed_amount[cycle - 1]);
        }
    }

    function ViewAmountToClaim(address wallet) public view returns (uint256) {
        uint256 cycle = Cycle.cycle();
        if (has_claimed[wallet][cycle]) return 0;

        uint256 user_amount = GetUserAmount(wallet);
        uint256 total_amount = GetTotalAmount();

        uint256 amount_to_claim = (user_amount * raised_amount[cycle - 1]) /
            total_amount;

        if (
            amount_to_claim >
            (raised_amount[cycle - 1] - claimed_amount[cycle - 1])
        ) {
            return (raised_amount[cycle - 1] - claimed_amount[cycle - 1]) / 9; // Entregamos 1/9 del bote a ese usuario.
        }

        return amount_to_claim;
    }

    // Virtual Functions
    function CanClaim(address wallet) public view virtual returns (bool) {
        return (!has_claimed[wallet][Cycle.cycle()] &&
            Qualification.IsQualified(wallet));
    }

    function CanIncreaseRewards(address wallet) public virtual view returns (bool) {
        if (wallet == address(Able) || IsOwner(wallet)) return true;
        return false;
    }

    function CanUpdate(address wallet) private view returns (bool) {
        if (wallet == address(Cycle)) return true;
        return false;
    }

    function GetUserAmount(address wallet) public virtual view returns (uint256) {
        return Able.points_of(wallet);
    }

    function GetTotalAmount() public virtual view returns (uint256) {
        return Able.qualified_points_by_cycle(Cycle.cycle() - 1);
    }
}