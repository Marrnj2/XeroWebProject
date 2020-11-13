import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

export default function AccountWatchlist() {
  const [organisationData, setOrganisationData] = useState([]);

  useEffect(() => {
    getOrganisationData();
  }, []);

  // get employee data from api
  const getOrganisationData = async () => {
    console.log("START API REQUEST");
    const response = await fetch("Xero/Organisation");
    const jsonData = await response.json();
    console.log(jsonData.Organisations[0]);
  };

  return (
    <Paper variant="outlined" className="card-paper">
      <h5>Organisations</h5>
      <hr></hr>
    </Paper>
  );
}
