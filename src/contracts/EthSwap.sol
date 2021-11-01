pragma solidity ^0.5.0;

// imp smart contract
import "./Token.sol";

contract EthSwap{
    string public name ='EthSwap Exchange';
    Token public token;
    uint public rate =100;


    constructor(Token _token) public{
        token = _token;
    }

    // buy token
    function buyTokens() public payable{
      uint tokenAmount = msg.value * rate;

      token.transfer(msg.sender, tokenAmount);
    }
}