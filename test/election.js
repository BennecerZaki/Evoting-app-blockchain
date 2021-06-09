let Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {
  let electionInstance;

  it("Initializes with two condidates", () =>
    Election.deployed()
      .then((instance) => instance.condidatesCount())
      .then((count) => {
        assert.equal(count, 2);
      }));

  it("Initilizes the condidates with the correct values", () =>
    Election.deployed()
      .then((instance) => {
        electionInstance = instance;
        return electionInstance.condidates(1);
      })
      .then((condidate) => {
        assert.equal(condidate.id.words[0], 1, " contains the correct id");
        assert.equal(
          condidate.name,
          "Karim BENZEMA",
          " contains the correct id"
        );
        assert.equal(
          condidate.voteCount.words[0],
          0,
          " contains the correct votes count"
        );
        return electionInstance.condidates(2);
      })
      .then((condidate) => {
        assert.equal(condidate.id.words[0], 2, " contains the correct id");
        assert.equal(
          condidate.name,
          "Saeed ABDELKRIM",
          " contains the correct id"
        );
        assert.equal(
          condidate.voteCount.words[0],
          0,
          " contains the correct votes count"
        );
      }));
});
