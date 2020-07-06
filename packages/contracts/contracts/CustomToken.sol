pragma solidity 0.6.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
  uint8 private constant DECIMALS = 18;
    string private constant NAME = "Custom Token";
    string private constant SYMBOL = "TTT";

    constructor () ERC20(NAME, SYMBOL) public {
        uint256 initialSupply = 10000 * (10 ** uint256(DECIMALS));
        _mint(msg.sender, initialSupply);
    }
}