App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Election.json", (election) => {
      App.contracts.Election = TruffleContract(election);

      App.contracts.Election.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: () => {
    let electionInstance;
    let loader = $("#loader");
    let content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed()
      .then((instance) => {
        electionInstance = instance;
        return electionInstance.condidatesCount();
      })
      .then((condidatesCount) => {
        var condidatesResults = $("#candidatesResults");
        condidatesResults.empty();

        for (let i = 1; i <= condidatesCount; i++) {
          electionInstance.condidates(i).then((condidate) => {
            console.log(condidate);
            let id = condidate[0];
            let name = condidate[1];
            let voteCount = condidate[2];

            var condidateTemplate =
              "<tr><th>" +
              id +
              "</th><td>" +
              name +
              "</td><td>" +
              voteCount +
              "</td></tr>";

            condidatesResults.append(condidateTemplate);
          });
        }

        loader.hide();
        content.show();
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  bindEvents: function () {
    $(document).on("click", ".btn-adopt", App.handleAdopt);
  },

  markAdopted: function () {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data("id"));

    /*
     * Replace me...
     */
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
