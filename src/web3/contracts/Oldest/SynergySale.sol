contract SinergySaleMigration {
    // Constants
    uint256 public constant TIME_OF_CYCLE = 1 days;

    uint256 public MAX_AMOUNT_SELL_TOKEN = 90 ether;
    uint256 public MIN_AMOUNT_SELL_TOKEN = 9 ether;
    uint256 public TOKEN_PRICE = 3;
    uint256 public LIMIT_POST_BY_CYCLE = 1;

    // Global Variables
    uint256 public TOTAL_TOKENS_SOLD;
    mapping(uint256 => uint256) public tokens_sold_by_cycle;

    // ERC20 Contracts
    ERC20Migration public ABLE =
        ERC20Migration(0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5);
    ERC20 public TOKEN = ERC20(0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5);
    ERC20 public BUSD = ERC20(0x765277EebeCA2e31912C9946eAe1021199B39C61);

    // ERC721 Contract
    SinergyMigration public SinergyContract =
        SinergyMigration(0xaeFDeD1Efb9f370F3663493755a1Da0A4E6F17E6);

    // Wallets
    address payable public communityWallet =
        payable(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    address public dev_wallet = 0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    // Sell List
    uint256[] public sell_list;
    mapping(uint256 => bool) public is_in_sell_list;
    mapping(address => uint256) public timestamp_last_post_sell;
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
    mapping(address => uint256) public post_count_of;

    // User Data
    mapping(address => uint256) public amount_sold_of;

    // Events
    event SellList(uint256 indexed nft_id, bool comeIn, bool driven);

    event SellToken(
        uint256 indexed nft_id,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    event SwapList(uint256 indexed nft_id);

    event BackToQueue(uint256 indexed nft_id, uint256 posAnt, uint256 posAct);

    // Constructor
    constructor() {}

    // Public Methods
    function sell(uint256 _amount, uint256 _tokenID) public {
        require(
            _amount >= MIN_AMOUNT_SELL_TOKEN,
            "The amount to sell have to be more or equal than 9 and less or equal than 90."
        );
        require(
            (selling_amount_of[_tokenID] + _amount) <= MAX_AMOUNT_SELL_TOKEN,
            "The amount to sell have to be more or equal than 9 and less or equal than 90."
        );
        require(
            SinergyContract.ownerOf(_tokenID) == msg.sender,
            "You are not the owner of this NFT."
        );
        require(
            !is_selling(_tokenID),
            "You are already selling tokens on SinergySell"
        );
        require(
            TOKEN.transferFrom(msg.sender, address(this), _amount),
            "Transfer fails."
        );
        require(
            block.timestamp > timestamp_last_post_sell[msg.sender],
            "You have to wait to post another sell."
        );

        selling_amount_of[_tokenID] += _amount;
        total_selling_amount += _amount;
        timestamp_last_post_sell[msg.sender] = block.timestamp + TIME_OF_CYCLE;

        if (can_be_in_driven_list(msg.sender)) {
            set_nft_to_driven_list(_tokenID);
            turns_in_driven_list_of[msg.sender]++;
        } else {
            set_nft_to_sell_list(_tokenID);
        }
    }

    function buy(uint256 _amount, bool incrementBDD) public {
        require(_amount <= total_selling_amount);
        // Transferimos los BUSD a este contrato
        BUSD.transferFrom(msg.sender, address(this), _amount * TOKEN_PRICE);

        // El 33% que va para el vendedor de los tokens, se envian directamente a la billetera del vendedor.
        // Esto se hace en la funcion sell_able_from_list

        // Transferimos 33% para el Admin
        BUSD.transfer(communityWallet, ((_amount * TOKEN_PRICE) / 3));

        // Transferimos 33% para Able, para que lo otorgue en el regalo diario de Able.
        BUSD.transfer(address(ABLE), ((_amount * TOKEN_PRICE) / 3));

        // Transferimos los TOKEN al usuario
        TOKEN.transfer(msg.sender, _amount);

        // Buscamos los vendedores
        uint256 nfts_to_remove_sell;
        uint256 nfts_to_remove_driven;

        (nfts_to_remove_sell, nfts_to_remove_driven) = find_sellers(
            _amount,
            msg.sender
        );

        // Eliminamos de la lista, los vendedores que vendieron el total de su capital.
        for (uint256 i = 0; i < nfts_to_remove_sell; i++) {
            remove_first_nft_from_sell_list();
        }

        for (uint256 i = 0; i < nfts_to_remove_driven; i++) {
            remove_first_nft_from_driven_list();
        }

        // Aumentamos el BDD de esta billetera en ABLE
        if (incrementBDD)
            ABLE.incrementDonationBalance(_amount * TOKEN_PRICE, msg.sender);

        // Aumentamos la cantidad de tokens vendidos.
        TOTAL_TOKENS_SOLD += _amount;
        tokens_sold_by_cycle[ABLE.cycle()] += _amount;
    }

    function quit_sell(uint256 tokenID) public {
        require(is_selling(tokenID));
        require(SinergyContract.ownerOf(tokenID) == msg.sender);
        require(selling_amount_of[tokenID] > 0);
        require(total_selling_amount >= selling_amount_of[tokenID]);
        require(TOKEN.transfer(msg.sender, selling_amount_of[tokenID]));

        // Descontamos el monto que se saca de la venta
        total_selling_amount -= selling_amount_of[tokenID];
        selling_amount_of[tokenID] = 0;

        // Sacamos al NFT de la Lista de Venta TOKEN
        if (is_in_sell_list[tokenID]) {
            remove_nft_from_sell_list(get_index_of_nft_from_sell_list(tokenID));
        } else {
            remove_nft_from_driven_list(
                get_index_of_nft_from_driven_list(tokenID)
            );
        }
    }

    // Check Methods
    function check_sell_list() public {
        // Chequeamos si algun NFT de la Lista de Venta de Able esta descalificado.
        for (uint256 i = 0; i < sell_list.length; i++) {
            uint256 nft_id = sell_list[i];
            if (!SinergyContract.nft_was_qualified(nft_id)) {
                // Traemos todos los NFTs que habia detras una posicion mas adelante
                for (uint256 j = i; j < sell_list.length - 1; j++) {
                    sell_list[j] = sell_list[j + 1];
                }

                // Posicionamos al NFT sancionado en el ultimo lugar de la cola
                sell_list[sell_list.length - 1] = nft_id;

                emit BackToQueue(nft_id, i, sell_list.length - 1);
            }
        }
    }

    function check_driven_list() public {
        // Chequeamos si algun NFT de la Lista de Venta de Able esta descalificado.
        for (uint256 i = 0; i < driven_list.length; i++) {
            uint256 nft_id = driven_list[i];
            if (!SinergyContract.nft_was_qualified(nft_id)) {
                // Traemos todos los NFTs que habia detras una posicion mas adelante
                for (uint256 j = i; j < driven_list.length - 1; j++) {
                    driven_list[j] = sell_list[j + 1];
                }

                // Posicionamos al NFT sancionado en el ultimo lugar de la cola
                driven_list[driven_list.length - 1] = nft_id;

                emit BackToQueue(nft_id, i, driven_list.length - 1);
            }
        }
    }

    // Get Methods
    function get_sell_list_length() public view returns (uint256) {
        return sell_list.length;
    }

    function get_driven_list_length() public view returns (uint256) {
        return driven_list.length;
    }

    // Communication
    function try_to_swap(uint256 _tokenID) public {
        require(
            msg.sender == address(SinergyContract),
            "Only SinergyContract can call to this function."
        );

        if (
            is_selling(_tokenID) &&
            is_in_sell_list[_tokenID] &&
            (get_index_of_nft_from_sell_list(_tokenID) > driven_list.length)
        ) {
            remove_nft_from_sell_list(
                get_index_of_nft_from_sell_list(_tokenID)
            );
            set_nft_to_driven_list(_tokenID);

            emit SwapList(_tokenID);
        }
    }

    function set_sinergy(address _sinergyContract) public {
        require(
            msg.sender == dev_wallet,
            "You are not qualified to call this function."
        );
        SinergyContract = SinergyMigration(_sinergyContract);
    }

    function set_limit_post_by_cycle(uint256 new_limit) public {
        require(
            msg.sender == communityWallet || msg.sender == dev_wallet,
            "You are not qualified to call this function."
        );
        LIMIT_POST_BY_CYCLE = new_limit;
    }

    function set_values_of_sale(
        uint256 max_amount,
        uint256 min_amount,
        uint256 price
    ) public {
        /*
            Ninguno de los parametros tienen que estar en WEI.
            Tienen que estar directamente en Ether.
        */
        require(
            msg.sender == dev_wallet || msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        MAX_AMOUNT_SELL_TOKEN = max_amount * 1 ether;
        MIN_AMOUNT_SELL_TOKEN = min_amount * 1 ether;
        TOKEN_PRICE = price;
    }

    // Helpers
    function is_selling(uint256 _tokenID) public view returns (bool) {
        return is_in_sell_list[_tokenID] || is_in_driven_list[_tokenID];
    }

    // Sell Helpers
    function is_sell_turn() public view returns (bool) {
        return (turn == 2);
    }

    function sell_list_is_empty() public view returns (bool) {
        return sell_list.length == 0;
    }

    function can_use_sell() public view returns (bool) {
        return (!sell_list_is_empty() &&
            (is_sell_turn() || driven_list_is_empty()));
    }

    // Driven Helpers
    function can_be_in_driven_list(address wallet) public view returns (bool) {
        return
            ABLE.winSaverReward(wallet) &&
            ABLE.winsSaverRewardOf(wallet) > turns_in_driven_list_of[wallet];
    }

    function is_driven_turn() public view returns (bool) {
        return turn == 0 || turn == 1;
    }

    function driven_list_is_empty() public view returns (bool) {
        return driven_list.length == 0;
    }

    function can_use_driven() public view returns (bool) {
        return (!driven_list_is_empty() &&
            (is_driven_turn() || sell_list_is_empty()));
    }

    // Private Methods
    function set_nft_to_sell_list(uint256 _tokenID) private {
        sell_list.push(_tokenID);
        is_in_sell_list[_tokenID] = true;

        emit SellList(_tokenID, true, false);
    }

    function set_nft_to_driven_list(uint256 _tokenID) private {
        driven_list.push(_tokenID);
        is_in_driven_list[_tokenID] = true;

        emit SellList(_tokenID, true, true);
    }

    function remove_first_nft_from_sell_list() private {
        require(sell_list.length > 0);

        uint256 nft_id = sell_list[0];

        for (uint256 i = 0; i < sell_list.length - 1; i++) {
            sell_list[i] = sell_list[i + 1];
        }

        sell_list.pop();

        is_in_sell_list[nft_id] = false;

        emit SellList(nft_id, false, false);
    }

    function remove_first_nft_from_driven_list() private {
        require(driven_list.length > 0);

        uint256 nft_id = driven_list[0];

        for (uint256 i = 0; i < driven_list.length - 1; i++) {
            driven_list[i] = driven_list[i + 1];
        }

        driven_list.pop();

        is_in_driven_list[nft_id] = false;

        emit SellList(nft_id, false, true);
    }

    function remove_nft_from_sell_list(uint256 idx) private {
        require(sell_list.length > idx);

        uint256 nft_id = sell_list[idx];

        for (uint256 i = idx; i < sell_list.length - 1; i++) {
            sell_list[i] = sell_list[i + 1];
        }

        sell_list.pop();

        is_in_sell_list[nft_id] = false;

        emit SellList(nft_id, false, false);
    }

    function remove_nft_from_driven_list(uint256 idx) private {
        require(driven_list.length > idx);

        uint256 nft_id = driven_list[idx];

        for (uint256 i = idx; i < driven_list.length - 1; i++) {
            driven_list[i] = driven_list[i + 1];
        }

        driven_list.pop();

        is_in_driven_list[nft_id] = false;

        emit SellList(nft_id, false, true);
    }

    function can_sell(address wallet) private returns (bool) {
        if (block.timestamp > timestamp_last_post_sell[wallet]) {
            post_count_of[wallet] = 0;
            return true;
        }

        if (post_count_of[wallet] < LIMIT_POST_BY_CYCLE) {
            post_count_of[wallet]++;
            return true;
        }

        return false;
    }

    function get_index_of_nft_from_sell_list(
        uint256 tokenID
    ) private view returns (uint256) {
        for (uint256 i = 0; i < sell_list.length; i++) {
            if (sell_list[i] == tokenID) {
                return i;
            }
        }

        return sell_list.length + 1;
    }

    function get_index_of_nft_from_driven_list(
        uint256 tokenID
    ) private view returns (uint256) {
        for (uint256 i = 0; i < driven_list.length; i++) {
            if (driven_list[i] == tokenID) {
                return i;
            }
        }

        return driven_list.length + 1;
    }

    function sell_able_from_list(
        uint256 _amount,
        uint256 _tokenID,
        address buyer
    ) private {
        address owner = SinergyContract.ownerOf(_tokenID);

        selling_amount_of[_tokenID] -= _amount;
        total_selling_amount -= _amount;

        // 33% van directo al usuario
        BUSD.transfer(owner, ((_amount * TOKEN_PRICE) / 3));
        amount_sold_of[owner] += ((_amount * TOKEN_PRICE) / 3);

        emit SellToken(_tokenID, buyer, owner, _amount);
    }

    // Turn Helper
    function increment_turn() private {
        if (turn == 2) {
            turn = 0;
        } else {
            turn++;
        }
    }

    function find_sellers(
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
                can_use_driven() && idx_driven < driven_list.length && !sell_all
            ) {
                nft_id = driven_list[idx_driven];

                if (_amount <= selling_amount_of[nft_id]) {
                    // Este NFT me da lo que necesito.
                    if (_amount == selling_amount_of[nft_id]) {
                        nfts_to_remove_driven++;
                    }

                    sell_able_from_list(_amount, nft_id, buyer);
                    sell_all = true;
                } else {
                    // Este NFT me ayuda a alcanzar lo que necesito. No me es suficiente lo que me da.
                    _amount -= selling_amount_of[nft_id];
                    sell_able_from_list(
                        selling_amount_of[nft_id],
                        nft_id,
                        buyer
                    );
                    nfts_to_remove_driven++;
                }

                idx_driven++;
                increment_turn();
            }

            // Sell List
            while (can_use_sell() && idx_sell < sell_list.length && !sell_all) {
                nft_id = sell_list[idx_sell];

                if (_amount <= selling_amount_of[nft_id]) {
                    // Este NFT me da lo que necesito.
                    if (_amount == selling_amount_of[nft_id]) {
                        nfts_to_remove_sell++;
                    }

                    sell_able_from_list(_amount, nft_id, buyer);
                    sell_all = true;
                } else {
                    // Este NFT me ayuda a alcanzar lo que necesito. No me es suficiente lo que me da.
                    _amount -= selling_amount_of[nft_id];
                    sell_able_from_list(
                        selling_amount_of[nft_id],
                        nft_id,
                        buyer
                    );
                    nfts_to_remove_sell++;
                }

                idx_sell++;
                increment_turn();
            }
        }

        return (nfts_to_remove_sell, nfts_to_remove_driven);
    }
}