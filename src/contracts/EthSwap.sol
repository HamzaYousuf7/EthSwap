pragma solidity ^0.5.0;

// imp smart contract
import "./Token.sol";

contract EthSwap{
    string public name ='EthSwap Exchange';
    Token public token;
    uint public rate =100;
    // events
    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public{
        token = _token;
    }

    // buy token
    function buyTokens() public payable{
        // calcaultion
        uint tokenAmount = msg.value * rate;

        // type of validation
        require(token.balanceOf(address(this)) >= tokenAmount);
        
        // transfer
        token.transfer(msg.sender, tokenAmount);

        // event emit
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public{

       uint ethereAmount = _amount / rate;

       //perform sale
       token.transferFrom(msg.sender, address(this), ethereAmount);

       msg.sender.transfer(ethereAmount);

    }
}