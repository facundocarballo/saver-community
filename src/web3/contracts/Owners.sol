// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Owners {
    // Wallets
    address public community_wallet =
        0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public development_wallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    function IsOwner(address wallet) public view returns (bool) {
        if (wallet == community_wallet || wallet == development_wallet)
            return true;
        return false;
    }
}