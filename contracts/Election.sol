pragma solidity >=0.4.22 <0.8.0;

contract Election {
  // Model a Condidate
  struct Condidate {
    uint id;
    string name;
    uint voteCount;
  }

  // Store & Fetch Condidates
  mapping(uint => Condidate) public condidates;

  // Store Condidates Count
  uint public condidatesCount; // Cuz Makansh size ta3 mapping wla iterate 3lih

  //Constructor 
  constructor () public {
    addCondidate("Karim BENZEMA");
    addCondidate("Saeed ABDELKRIM");
  }

  // Add Condidate Function
  function addCondidate(string memory _name) private {
    condidatesCount++;
    condidates[condidatesCount] = Condidate(condidatesCount, _name, 0);
  }
}