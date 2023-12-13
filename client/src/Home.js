import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const redirect_to_roles = () => {
    navigate("/roles");
  };
  const redirect_to_addmed = () => {
    navigate("/addmed");
  };
  const redirect_to_supply = () => {
    navigate("/supply");
  };
  const redirect_to_track = () => {
    navigate("/track");
  };
  return (
    <div className="container">
      <div className="header">
        <h3>Coal Supply Chain</h3>
      </div>
      <br />
      <div className="register">
        <h6>
          (Note: Here Owner ( Government ) is the person who deployed the smart
          contract on the blockchain)
        </h6>
        <h5>
          Step 1: Government Should Register Thermal Power plants, Coal Miners,
          Regulatory Authorities and Transporters
        </h5>
        <h6>(Note: This is a one time step. Skip to step 2 if already done)</h6>
        <button
          onClick={redirect_to_roles}
          className="btn btn-outline-primary btn-sm"
        >
          Register
        </button>
      </div>
      <br />
      <div className="ordermedicines">
        <h5>Step 2: Government place order of electricity </h5>
        <button
          onClick={redirect_to_addmed}
          className="btn btn-outline-primary btn-sm"
        >
          Add Order
        </button>
      </div>
      <br />
      <div className="controlchain">
        <h5>Step 3: Control Supply Chain</h5>
        <button
          onClick={redirect_to_supply}
          className="btn btn-outline-primary btn-sm"
        >
          Control Supply Chain
        </button>
      </div>
      <br />
      <div className="track">
        <h5>Track the order:</h5>
        <button
          onClick={redirect_to_track}
          className="btn btn-outline-primary btn-sm"
        >
          Track Order
        </button>
      </div>
    </div>
  );
}

export default Home;
