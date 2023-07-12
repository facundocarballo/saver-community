contract A {
    uint256 public valor;
    function a() public {
        _b();
    }

    function sub_a() public {
        a();
    }

    function _b() public {
        require(msg.sender == address(this), "Only this contract can call to this function.");
        valor++;
    }
}