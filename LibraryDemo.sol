pragma solidity ^0.4.0;

library LibraryExample{

    function counter(uint _self) public returns (uint){
        return _self+1;
    }
}


contract LibraryTest{
    using LibraryExample for uint;

    function testIncrement(uint number) public returns (uint){
        return number.counter();
    }
}