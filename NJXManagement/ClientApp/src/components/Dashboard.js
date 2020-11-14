import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import CompanyInfo from "./Dashboard/CompanyInfo";
import InvoiceSummary from "./Dashboard/InvoiceSummary";

export default class Dashboard extends Component {

  render () {
    return (
      <div className="component-grid">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <CompanyInfo/>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <InvoiceSummary/>
          </Grid>
          </Grid>
      </div>
    );
  }
}