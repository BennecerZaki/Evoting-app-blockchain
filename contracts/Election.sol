pragma solidity >=0.4.22 <0.8.0;

contract Election {
  // Store & Read Condidate 
  string public condidate;
  //Constructor 
  constructor () public {
    condidate = "Condidate 01";
  }
}