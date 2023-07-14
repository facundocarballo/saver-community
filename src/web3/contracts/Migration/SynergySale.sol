contract MigrationSale is Router {
    bool public is_migrated;

    // Helpers
    function IsOwner(address wallet) public view returns (bool) {
        return Wallets.IsOwner(wallet);
    }

    // Before to call this function, we have to send enought Able to the
    // new Sinergy Sale Contract.
    function Migrate() public {
        require(IsOwner(msg.sender), "Only owners can migrate the Sale List.");
        require(!is_migrated, "The Sale List are already migrated.");
        _MigrateSellList();
        _MigrateDrivenList();
        is_migrated = true;
    }

    function _MigrateSellList() private {
        uint256 amount = AprilSinergySaleContract.get_sell_list_length();
        for (uint256 i = 0; i < amount; i++) {
            uint256 token_id = AprilSinergySaleContract.sell_list(i);
            uint256 selling_amount = AprilSinergySaleContract.selling_amount_of(
                token_id
            );
            AbleSale.Migrate_Send_Sell_List(token_id, selling_amount);
        }
    }

    function _MigrateDrivenList() private {
        uint256 amount = AprilSinergySaleContract.get_driven_list_length();
        for (uint256 i = 0; i < amount; i++) {
            uint256 token_id = AprilSinergySaleContract.driven_list(i);
            uint256 selling_amount = AprilSinergySaleContract.selling_amount_of(
                token_id
            );
            AbleSale.Migrate_Send_Driven_List(token_id, selling_amount);
        }
    }
}