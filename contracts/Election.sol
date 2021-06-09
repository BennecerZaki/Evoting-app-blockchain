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

  // Stores & Fetch Voters 
  mapping(address => bool) public voters;

  // Store Condidates Count
  uint public condidatesCount; // Cuz Makansh size ta3 mapping wla iterate 3lih

  //Constructor 
  constructor () public {
    addCondidate("Karim BENZEMA");
    addCondidate("Saeed ABDELKRIM");
  }
  event votedEvent (
    uint indexed _condidateId
  );

  // Add Condidate Function
  function addCondidate(string memory _name) private {
    condidatesCount++;
    condidates[condidatesCount] = Condidate(condidatesCount, _name, 0);
  }


  function vote(uint _condidateId) public {
    require(!voters[msg.sender]);

    require(_condidateId > 0 && _condidateId <= condidatesCount);
    // Record that voter has voted
    voters[msg.sender] = true;

    // Update Condidate Vote
    condidates[_condidateId].voteCount++;

    // trigger voted event
    emit votedEvent(_condidateId);
  }
}