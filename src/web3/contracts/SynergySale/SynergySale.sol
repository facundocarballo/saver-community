contract SinergySale is Router {
    // Constants
    uint256 public MAX_AMOUNT_SELL_TOKEN = 90 ether;
    uint256 public MIN_AMOUNT_SELL_TOKEN = 9 ether;
    uint256 public MIN_AMOUNT_TOKENS_TO_SELL;
    uint256 public TOKEN_PRICE = 3; // 1 Able = 3 Stablecoin
    uint256 public LIMIT_POST_BY_CYCLE = 1;
    uint256 public PENALIZATION_PLACES = 3;
    uint256 public LIMIT_POST_BY_WALLET = 9;

    // Global Variables
    bool public need_be_qualified_to_sell;
    uint256 public TOTAL_TOKENS_SOLD;
    mapping(uint256 => uint256) public tokens_sold_by_cycle;

    // Sell List
    uint256[] public sell_list;
    mapping(uint256 => bool) public is_in_sell_list;
    mapping(address => uint256) public amount_of_post_of;

    // Driven List
    uint256[] public driven_list;
    mapping(uint256 => bool) public is_in_driven_list;
    mapping(address => uint256) public turns_in_driven_list_of;

    // Turn of pick
    uint256 public turn; // 0 y 1 => Driven List ||| 2 => Sell List

    // Amount on Sell
    uint256 public total_selling_amount;
    mapping(uint256 => uint256) public selling_amount_of;

    // User Data
    mapping(address => mapping(uint256 => uint256)) public post_by_cycle;
    mapping(address => uint256) public amount_sold_of;
    mapping(address => uint256) public post_amount_of;
    mapping(address => mapping(uint256 => uint256))
        public amount_bought_by_cycle_of;
    address public last_wallet_qualified_who_bought;

    // Events
    event SellList(uint256 indexed nft_id, bool comeIn, bool driven);

    event SellToken(
        uint256 indexed nft_id,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    event SellTokenPenalization(
        uint256 indexed nft_id,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    event SwapList(uint256 indexed nft_id);

    // Constructor
    constructor() {}

    // Migrate Functions
    function Migrate_Send_Sell_List(
        uint256 token_id,
        uint256 selling_amount
    ) public {
        require(
            msg.sender == address(MigrationSinergySale),
            "Only Migration Contract can migrate sell list."
        );
        selling_amount_of[token_id] = selling_amount;
        total_selling_amount += selling_amount;

        _SetNftToSellList(token_id);
    }

    function Migrate_Send_Driven_List(
        uint256 token_id,
        uint256 selling_amount
    ) public {
        require(
            msg.sender == address(MigrationSinergySale),
            "Only Migration Contract can migrate driven list."
        );
        selling_amount_of[token_id] = selling_amount;
        total_selling_amount += selling_amount;

        _SetNftToDrivenList(token_id);
    }

    // Public Methods
    function Sell(uint256 _amount, uint256 _tokenID) public {
        uint256 cycle = Cycle.cycle();
        require(
            Qualification.is_updated(msg.sender, cycle),
            "You have to update first."
        );
        require(
            _amount >= MIN_AMOUNT_SELL_TOKEN,
            "The amount to sell is too low."
        );
        require(
            (selling_amount_of[_tokenID] + _amount) <= MAX_AMOUNT_SELL_TOKEN,
            "The amount to sell is too high."
        );
        require(
            SinergyBronze.ownerOf(_tokenID) == msg.sender,
            "You are not the owner of this NFT."
        );
        require(
            !IsSelling(_tokenID),
            "This NFT is already selling tokens on Sinergy Sale"
        );
        require(
            CanSell(msg.sender),
            "You already get the limit of post by cycle."
        );
        require(
            amount_of_post_of[msg.sender] < LIMIT_POST_BY_WALLET,
            "This wallet cannot post more sells on the list."
        );
        if (need_be_qualified_to_sell) {
            require(
                Qualification.IsQualified(msg.sender),
                "You have to be qualified to sell"
            );
        }

        Able.transferFrom(msg.sender, address(this), _amount);

        selling_amount_of[_tokenID] += _amount;
        total_selling_amount += _amount;
        post_by_cycle[msg.sender][cycle]++;

        if (CanBeInDrivenList(msg.sender)) {
            _SetNftToDrivenList(_tokenID);
            turns_in_driven_list_of[msg.sender]++;
        } else {
            _SetNftToSellList(_tokenID);
        }
    }

    function Buy(uint256 _amount, bool incrementBDD) public {
        require(
            Qualification.is_updated(msg.sender, Cycle.cycle()),
            "You have to update first."
        );
        require(
            _amount <= total_selling_amount,
            "Sinergy Sale doesn't have enought Able to sell that amount."
        );

        // Transferimos los Stablecoin a este contrato
        Stablecoin.transferFrom(
            msg.sender,
            address(this),
            _amount * TOKEN_PRICE
        );

        // El 33% que va para el vendedor de los tokens, se envian directamente a la billetera del vendedor.
        // Esto se hace en la funcion _SellAbleFromList

        // Transferimos 33% para el Admin
        Stablecoin.transfer(
            Wallets.managment_wallet(),
            ((_amount * TOKEN_PRICE) / 3)
        );

        // Transferimos 33% para el Bote del Regalo Diario de Able
        Stablecoin.transfer(
            address(StablecoinBaseReward),
            ((_amount * TOKEN_PRICE) / 3)
        );

        // Transferimos los Able al usuario
        Able.transfer(msg.sender, _amount);

        // Buscamos los vendedores
        uint256 nfts_to_remove_sell;
        uint256 nfts_to_remove_driven;

        (nfts_to_remove_sell, nfts_to_remove_driven) = _FindSellers(
            _amount,
            msg.sender
        );

        // Eliminamos de la lista, los vendedores que vendieron el total de su capital.
        for (uint256 i = 0; i < nfts_to_remove_sell; i++) {
            _RemoveFirstNftFromSellList();
        }

        for (uint256 i = 0; i < nfts_to_remove_driven; i++) {
            _RemoveFirstNftFromDrivenList();
        }

        // Aumentamos el BDD de esta billetera en Able
        if (incrementBDD)
            Able.IncreasePoints(_amount * TOKEN_PRICE, msg.sender);

        // Aumentamos la cantidad de tokens vendidos.
        TOTAL_TOKENS_SOLD += _amount;
        tokens_sold_by_cycle[Cycle.cycle()] += _amount;

        // Aumentamos la cantidad de tokens comprados por ciclo.
        amount_bought_by_cycle_of[msg.sender][Cycle.cycle()] +=
            _amount *
            TOKEN_PRICE;

        if (Qualification.IsQualified(msg.sender)) {
            last_wallet_qualified_who_bought = msg.sender;
        }
    }

    function QuitSell(uint256 tokenID) public {
        require(
            Qualification.is_updated(msg.sender, Cycle.cycle()),
            "You have to update first."
        );
        require(IsSelling(tokenID), "This NFT is not selling.");
        require(
            SinergyBronze.ownerOf(tokenID) == msg.sender,
            "You are not the owner of this NFT."
        );
        require(
            selling_amount_of[tokenID] > 0,
            "Your NFT doesnt have anything to sell in the list."
        );
        require(
            total_selling_amount >= selling_amount_of[tokenID],
            "The amount that you are selling is greater than all the other sells. :("
        );

        Able.transfer(msg.sender, selling_amount_of[tokenID]);
        // Descontamos el monto que se saca de la venta
        total_selling_amount -= selling_amount_of[tokenID];
        selling_amount_of[tokenID] = 0;

        // Sacamos al NFT de la Lista de Venta Able
        if (is_in_sell_list[tokenID]) {
            _RemoveNftFromSellList(_GetIndexOfNftFromSellList(tokenID));
        } else {
            _RemoveNftFromDrivenList(_GetIndexOfNftFromDrivenList(tokenID));
        }
    }

    // Helpers
    function IsOwner(address wallet) public view returns (bool) {
        return Wallets.IsOwner(wallet);
    }

    // Get Methods
    function GetSellListLength() public view returns (uint256) {
        return sell_list.length;
    }

    function GetDrivenListLength() public view returns (uint256) {
        return driven_list.length;
    }

    // Set Functions
    function SetMinAmountTokensToSell(uint256 amount) public {
        require(
            IsOwner(msg.sender),
            "Only owner can modify the MIN_AMOUNT_TOKENS_TO_SELL."
        );
        MIN_AMOUNT_TOKENS_TO_SELL = amount;
    }

    function SetLimitPostByCycle(uint256 new_limit) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to call this function."
        );
        LIMIT_POST_BY_CYCLE = new_limit;
    }

    function SetMaxAmountSellToken(uint256 amount) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to call this function"
        );

        MAX_AMOUNT_SELL_TOKEN = amount;
    }

    function SetMinAmountSellToken(uint256 amount) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to call this function"
        );

        MIN_AMOUNT_SELL_TOKEN = amount;
    }

    function SetPriceToken(uint256 amount) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to call this function"
        );

        TOKEN_PRICE = amount * (1 ether);
    }

    function SetPenalizePlaces(uint256 places) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to set the penalize places."
        );
        PENALIZATION_PLACES = places;
    }

    function SetNeedBeQualifiedToSell() public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to set the need be qualified to sell."
        );
        need_be_qualified_to_sell = !need_be_qualified_to_sell;
    }

    function SetLimitPostByWallet(uint256 limit) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to set the need be qualified to sell."
        );
        LIMIT_POST_BY_WALLET = limit;
    }

    // Communication
    function TryToSwap(uint256 _tokenID) public {
        require(
            msg.sender == address(SinergyBronze),
            "Only SinergyContract can call to this function."
        );

        if (
            IsSelling(_tokenID) &&
            is_in_sell_list[_tokenID] &&
            (_GetIndexOfNftFromSellList(_tokenID) > driven_list.length)
        ) {
            _RemoveNftFromSellList(_GetIndexOfNftFromSellList(_tokenID));
            _SetNftToDrivenList(_tokenID);

            emit SwapList(_tokenID);
        }
    }

    // Helpers
    function IsSelling(uint256 _tokenID) public view returns (bool) {
        return is_in_sell_list[_tokenID] || is_in_driven_list[_tokenID];
    }

    // If the owner of the NFT was not qualified in the previous
    // cycle, the NFT will be penalized.
    function IsNftPenalized(uint256 tokenID) public view returns (bool) {
        address wallet = SinergyBronze.ownerOf(tokenID);
        return
            !Qualification.qualified_history(wallet, Cycle.cycle() - 1) ||
            (Able.balanceOf(wallet) < MIN_AMOUNT_TOKENS_TO_SELL);
    }

    // Sell Helpers
    function IsSellTurn() public view returns (bool) {
        return (turn == 2);
    }

    function SellListIsEmpty() public view returns (bool) {
        return sell_list.length == 0;
    }

    function CanUseSell() public view returns (bool) {
        return (!SellListIsEmpty() && (IsSellTurn() || DrivenListIsEmpty()));
    }

    function CanSell(address wallet) public view returns (bool) {
        if (
            post_by_cycle[wallet][Cycle.cycle()] < LIMIT_POST_BY_CYCLE &&
            Able.balanceOf(wallet) >= MIN_AMOUNT_TOKENS_TO_SELL
        ) {
            return true;
        }
        return false;
    }

    // Driven Helpers
    function CanBeInDrivenList(address wallet) public view returns (bool) {
        return
            Able.won_able_reward(wallet) &&
            Able.amount_of_wins_able_reward_of(wallet) >
            turns_in_driven_list_of[wallet];
    }

    function IsDrivenTurn() public view returns (bool) {
        return turn == 0 || turn == 1;
    }

    function DrivenListIsEmpty() public view returns (bool) {
        return driven_list.length == 0;
    }

    function CanUseDriven() public view returns (bool) {
        return (!DrivenListIsEmpty() && (IsDrivenTurn() || SellListIsEmpty()));
    }

    // Private Methods

    function _SetNftToSellList(uint256 _tokenID) private {
        sell_list.push(_tokenID);
        is_in_sell_list[_tokenID] = true;

        emit SellList(_tokenID, true, false);
    }

    function _SetNftToDrivenList(uint256 _tokenID) private {
        driven_list.push(_tokenID);
        is_in_driven_list[_tokenID] = true;

        emit SellList(_tokenID, true, true);
    }

    function _RemoveFirstNftFromSellList() private {
        require(sell_list.length > 0);

        uint256 nft_id = sell_list[0];

        for (uint256 i = 0; i < sell_list.length - 1; i++) {
            sell_list[i] = sell_list[i + 1];
        }

        sell_list.pop();

        is_in_sell_list[nft_id] = false;

        emit SellList(nft_id, false, false);
    }

    function _RemoveFirstNftFromDrivenList() private {
        require(driven_list.length > 0);

        uint256 nft_id = driven_list[0];

        for (uint256 i = 0; i < driven_list.length - 1; i++) {
            driven_list[i] = driven_list[i + 1];
        }

        driven_list.pop();

        is_in_driven_list[nft_id] = false;

        emit SellList(nft_id, false, true);
    }

    function _RemoveNftFromSellList(uint256 idx) private {
        require(sell_list.length > idx);

        uint256 nft_id = sell_list[idx];

        for (uint256 i = idx; i < sell_list.length - 1; i++) {
            sell_list[i] = sell_list[i + 1];
        }

        sell_list.pop();

        is_in_sell_list[nft_id] = false;

        emit SellList(nft_id, false, false);
    }

    function _RemoveNftFromDrivenList(uint256 idx) private {
        require(driven_list.length > idx);

        uint256 nft_id = driven_list[idx];

        for (uint256 i = idx; i < driven_list.length - 1; i++) {
            driven_list[i] = driven_list[i + 1];
        }

        driven_list.pop();

        is_in_driven_list[nft_id] = false;

        emit SellList(nft_id, false, true);
    }

    function _GetIndexOfNftFromSellList(
        uint256 tokenID
    ) private view returns (uint256) {
        for (uint256 i = 0; i < sell_list.length; i++) {
            if (sell_list[i] == tokenID) {
                return i;
            }
        }

        return sell_list.length + 1;
    }

    function _GetIndexOfNftFromDrivenList(
        uint256 tokenID
    ) private view returns (uint256) {
        for (uint256 i = 0; i < driven_list.length; i++) {
            if (driven_list[i] == tokenID) {
                return i;
            }
        }

        return driven_list.length + 1;
    }

    function _SellAbleFromList(
        uint256 _amount,
        uint256 _tokenID,
        address buyer
    ) private {
        address owner = SinergyBronze.ownerOf(_tokenID);

        selling_amount_of[_tokenID] -= _amount;
        total_selling_amount -= _amount;

        // 33% van directo al usuario
        Stablecoin.transfer(owner, ((_amount * TOKEN_PRICE) / 3));
        amount_sold_of[owner] += ((_amount * TOKEN_PRICE) / 3);

        emit SellToken(_tokenID, buyer, owner, _amount);
    }

    function _SellAbleFromListPenalize(
        uint256 _amount,
        uint256 _tokenID,
        address buyer
    ) private {
        address owner = SinergyBronze.ownerOf(_tokenID);

        selling_amount_of[_tokenID] -= _amount;
        total_selling_amount -= _amount;

        // 16.5% van directo al usuario
        Stablecoin.transfer(owner, ((_amount * TOKEN_PRICE) / 6));
        amount_sold_of[owner] += ((_amount * TOKEN_PRICE) / 6);

        // 16.5% van directo al regalo diario de Able
        Stablecoin.transfer(
            address(StablecoinBaseReward),
            ((_amount * TOKEN_PRICE) / 6)
        );

        emit SellTokenPenalization(_tokenID, buyer, owner, _amount);
    }

    // Turn Helper
    function _IncrementTurn() private {
        if (turn == 2) {
            turn = 0;
        } else {
            turn++;
        }
    }

    function _FindSellers(
        uint256 _amount,
        address buyer
    ) private returns (uint256, uint256) {
        bool sell_all = false;
        uint256 nft_id;

        uint256 idx_sell = 0;
        uint256 nfts_to_remove_sell;

        uint256 idx_driven = 0;
        uint256 nfts_to_remove_driven;

        while (!sell_all) {
            // Driven List
            while (
                CanUseDriven() && idx_driven < driven_list.length && !sell_all
            ) {
                nft_id = driven_list[idx_driven];

                if (_amount <= selling_amount_of[nft_id]) {
                    // Este NFT me da lo que necesito.
                    if (_amount == selling_amount_of[nft_id]) {
                        nfts_to_remove_driven++;
                    }

                    if (IsNftPenalized(nft_id)) {
                        _SellAbleFromListPenalize(_amount, nft_id, buyer);
                    } else {
                        _SellAbleFromList(_amount, nft_id, buyer);
                    }

                    sell_all = true;
                } else {
                    // Este NFT me ayuda a alcanzar lo que necesito. No me es suficiente lo que me da.
                    _amount -= selling_amount_of[nft_id];

                    if (IsNftPenalized(nft_id)) {
                        _SellAbleFromListPenalize(
                            selling_amount_of[nft_id],
                            nft_id,
                            buyer
                        );
                    } else {
                        _SellAbleFromList(
                            selling_amount_of[nft_id],
                            nft_id,
                            buyer
                        );
                    }

                    nfts_to_remove_driven++;
                }

                idx_driven++;

                _IncrementTurn();
            }

            // Sell List
            while (CanUseSell() && idx_sell < sell_list.length && !sell_all) {
                nft_id = sell_list[idx_sell];

                if (_amount <= selling_amount_of[nft_id]) {
                    // Este NFT me da lo que necesito.
                    if (_amount == selling_amount_of[nft_id]) {
                        nfts_to_remove_sell++;
                    }

                    if (IsNftPenalized(nft_id)) {
                        _SellAbleFromListPenalize(_amount, nft_id, buyer);
                    } else {
                        _SellAbleFromList(_amount, nft_id, buyer);
                    }

                    sell_all = true;
                } else {
                    // Este NFT me ayuda a alcanzar lo que necesito. No me es suficiente lo que me da.
                    _amount -= selling_amount_of[nft_id];

                    if (IsNftPenalized(nft_id)) {
                        _SellAbleFromListPenalize(
                            selling_amount_of[nft_id],
                            nft_id,
                            buyer
                        );
                    } else {
                        _SellAbleFromList(
                            selling_amount_of[nft_id],
                            nft_id,
                            buyer
                        );
                    }

                    nfts_to_remove_sell++;
                }

                idx_sell++;

                _IncrementTurn();
            }
        }

        return (nfts_to_remove_sell, nfts_to_remove_driven);
    }
}