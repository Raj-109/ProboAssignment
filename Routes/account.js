const { ok } = require("assert");
const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");

const dataPath = "./Details/useraccount.json";

// util functions
const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};


//Add jobId and JobValue
accountRoutes.post("/add", (req, res) => {
  var existAccounts = getAccountData();

  const saveId = req.body.JobValue;
  console.log(saveId);
  existAccounts[saveId] = req.body;

  console.log(existAccounts);

  saveAccountData(existAccounts);
  res.send({ success: true, "stat":ok }).status(200);
});


//Get data through Jobvalue
accountRoutes.get("/all", (req, res) => {
  var existAccounts = getAccountData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      let accountId = req.body.JobValue;
      const allkeys = Object.keys(existAccounts);
      console.log(allkeys[0]);

      const arr = [];
      for (let i = 0; i < allkeys.length; i++) {
        if (allkeys[i] >= accountId) {
          arr.push(existAccounts[allkeys[i]]);
        }
      }

      res.send("account found"`${arr}`).status(200);
    },
    true
  );
});

//delete - using delete method
accountRoutes.post("/remove", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      var existAccounts = getAccountData();

      const bodyjobId = req.body.JobId;
      const allkeys = Object.keys(existAccounts);
      console.log(existAccounts[allkeys[0]].JobId);

      for (let i = 0; i < allkeys.length; i++) {
        if (existAccounts[allkeys[i]].JobId == bodyjobId) {
          delete existAccounts[allkeys[i]];
          saveAccountData(existAccounts);
        }
      }

      console.log(existAccounts);

      res.send({
        "isSuccess":true,
        "stat":"Ok"
      }).status(200);
    },
    true
  );
});
module.exports = accountRoutes;
