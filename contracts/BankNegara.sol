pragma solidity ^0.4.17;

contract BankNegara {


    address  public bank = msg.sender;
    address public owner;
    uint256 limit = 100;

    //detail of any money laundering account account
    struct Info {
        address owner;
        uint amount;

    }
    //each account that withdraw/deposit more than limit will put here
    Info[] public infos;

     constructor () public{
        bank = msg.sender;
    }

         modifier onlyBank()
    {
        require(
            msg.sender == bank,
            "Only Bank."
        );
        _;
    }


    //only banknegara can set limit of moeny to be deposit/withdraw in the smart contract
    function setLimit(uint _limit) public onlyBank(){
        limit = _limit;
    }


    function getLimit()public view returns(uint){
        return limit;
    }


    function deposit(uint256 _amount) public payable {
        //send money to the smart contract
       require(msg.value>=_amount);


       //function for any possible money laundering
       if(_amount >=limit){
            Info memory newInfo = Info({
            owner: msg.sender,
            amount: _amount
        });
        infos.push(newInfo);
       }

    }


    function withdraw(uint256 _amount) public payable {

        //withdraw the money to who out the money
       msg.sender.transfer(_amount);

       //function for any miss dangeroius contract
       if(_amount >=limit){
            Info memory newInfo = Info({
            owner: msg.sender,
            amount: _amount
        });
        infos.push(newInfo);
       }

    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

}
