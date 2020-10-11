import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import Button from '@material-ui/core/Button';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} to={profilePath} className="text-light">
                    Hello {userName}
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={logoutPath}>
                <Button variant="contained" disableElevation>Logout
                </Button>
                </NavLink>
            </NavItem>
        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} to={registerPath}>
                    <Button variant="contained" disableElevation>
                        Register
                    </Button>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={loginPath}>
                    <Button variant="contained" disableElevation>
                        Login
                    </Button>
                </NavLink>
            </NavItem>
        </Fragment>);
    }
}
