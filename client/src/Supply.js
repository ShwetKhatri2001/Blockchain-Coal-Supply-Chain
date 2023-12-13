import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function Supply() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const handlerSubmitRMSsupply = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .RMSsupply(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitManufacturing = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Manufacturing(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitDistribute = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Distribute(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitRetail = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Retail(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitSold = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .sold(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  return (
    <div className="m-3">
      <span>
        <b>Current Account Address:</b> {currentaccount}
      </span>
      <span
        onClick={redirect_to_home}
        className="btn btn-outline-danger btn-sm"
      >
        HOME
      </span>
      <h4 className="mt-3">
        <b>Coal Supply Chain Flow:</b>
      </h4>
      <span>
        Government Require -&gt; Power Plant -&gt; Coal Miner -&gt; Regulatory
        Authority -&gt; Transporter;
      </span>
      <table className="table table-bordered mt-3">
        {Object.keys(MED)?.length > 0 && (
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Current Processing Stage</th>
            </tr>
          </thead>
        )}
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>
        <b>Step 1: Accept Electricity Order </b>( Only a registered Thermal
        Power Plants can perform this step ):-
      </h4>
      <form onSubmit={handlerSubmitRMSsupply}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Order ID"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitRMSsupply}
        >
          Accept Order
        </button>
      </form>
      <hr />
      <br />
      <h4>
        <b>Step 2: Mine Coal </b>( Only a registered Coal Miners can perform
        this step ):-
      </h4>
      <form onSubmit={handlerSubmitManufacturing}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Order ID"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitManufacturing}
        >
          Mining Completed
        </button>
      </form>
      <hr />
      <br />
      <h4>
        <b>Step 3: Get Approval to Transport </b>( Only a registered Regulatory
        Authority can perform this step ):-
      </h4>
      <form onSubmit={handlerSubmitDistribute}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Order ID"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitDistribute}
        >
          Approve Transport
        </button>
      </form>
      <hr />
      <br />
      <h4>
        <b>Step 4: Transport </b>( Only a registered Transporter can perform
        this step ):-
      </h4>
      <form onSubmit={handlerSubmitRetail}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Order ID"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitRetail}
        >
          Accept Transport
        </button>
      </form>
      <hr />
      <br />
      <h4>
        <b>Step 5: Mark as Transported to Power Plant </b>( Only a registered
        Transporter can perform this step ):-
      </h4>
      <form onSubmit={handlerSubmitSold}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Enter Order ID"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitSold}
        >
          Transported to Powerplant
        </button>
      </form>
      <hr />
    </div>
  );
}

export default Supply;
