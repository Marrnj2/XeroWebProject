import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import CompanyInfo from "./Dashboard/CompanyInfo";
import BusinessSavingsAccount from "./Dashboard/BusinessSavingsAccount";
import TotalCashInAndOut from "./Dashboard/TotalCashInAndOut";
import AccountWatchlist from "./Dashboard/AccountWatchlist";
import Bills from "./Dashboard/Bills";

export default class Dashboard extends Component {

  render () {
    return (
      <div className="component-grid">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <CompanyInfo/>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <BusinessSavingsAccount/>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TotalCashInAndOut/>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <AccountWatchlist/>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Bills/>
          </Grid>
        </Grid>
      </div>
    );
  }
}