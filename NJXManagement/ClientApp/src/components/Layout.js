import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import SideMenu from './side-menu';
import './Layout.css';
import ResponsiveDrawer from './SideMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <ResponsiveDrawer>
        <div className="back">
          <Container>
            {this.props.children}
          </Container>
        </div>
      </ResponsiveDrawer>
    );
  }
}
