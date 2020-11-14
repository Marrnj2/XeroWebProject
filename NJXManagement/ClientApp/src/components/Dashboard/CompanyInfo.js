import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

export default function AccountWatchlist() {
  const [organisationData, setOrganisationData] = useState([]);
  const [organisationAddress, setOrganisationAddress] = useState({});

  useEffect(() => {
    getOrganisationData();
  }, []);

  // get employee data from api
  const getOrganisationData = async () => {
    console.log("START API REQUEST");
    const response = await fetch("Xero/Organisation");
    const jsonData = await response.json();
    console.log(jsonData.Organisations[0]);

    setOrganisationData(jsonData.Organisations[0])

    let address = {
      AddressLine1: jsonData.Organisations[0].Addresses[0].AddressLine1,
      AddressLine2: jsonData.Organisations[0].Addresses[0].AddressLine2,
      PostalCode: jsonData.Organisations[0].Addresses[0].PostalCode,
      City: jsonData.Organisations[0].Addresses[0].City,
      CountryCode: jsonData.Organisations[0].CountryCode
    }
    setOrganisationAddress(address)
  };

  return (
    <Paper variant="outlined" className="card-paper">
      <h5>{organisationData.Name}</h5>
      <hr></hr>
        <p>{organisationAddress.AddressLine1}<br></br>
          {organisationAddress.AddressLine2}<br></br>
          {organisationAddress.PostalCode + " " + organisationAddress.City}<br></br>
          {organisationAddress.CountryCode}<br></br>
        </p>
        <p>End of finacial year:<br></br>{organisationData.FinancialYearEndDay + " " + Moment(organisationData.FinancialYearEndMonth).format("MMM") + " " + Moment().format('YYYY')}</p>
    </Paper>
  );
}
