import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Layout.css';
import ResponsiveDrawer from './SideMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <ResponsiveDrawer>
        <div className="back">
          <Container>
            {this.props.children}
          </Container>
        </div>
      </ResponsiveDrawer>
      </>
    );
  }
}
