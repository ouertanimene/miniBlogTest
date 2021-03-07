import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import AddPost from './AddPost';
import Login from './Login';


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('isLoggedIn'),
            navigate: false

        };

        this.handleLogout = this.handleLogout.bind(this);
    }



    handleLogout(event) {

        event.preventDefault()

        localStorage.setItem('isLoggedIn', false);
        localStorage.clear();
        //  this.props.history.push("/login");
        this.setState({

            navigate: true,
        });


    }

    componentDidUpdate() {
        this.handleLogout(event);
    }
    render() {
        const { loggedIn } = this.state;

        return (

            <Router>
                <div className="App">
                    <header className="App-header">
                        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                            <div class="container">
                                {loggedIn ?
                                    <a class="navbar-brand" href="">
                                        AOSBook
                                    </a>
                                    : <a class="navbar-brand" href="">
                                        Laravel
                                    </a>
                                }
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav mr-auto">
                                    </ul>
                                    <Switch>
                                        <ul class="navbar-nav ml-auto">
                                            {loggedIn ? <li class="nav-item">
                                                {/*  <Link class="nav-link"  onClick={this.handleLogout}>Logout</Link>     */}
                                                <Link class="nav-link" onClick={this.handleLogout}>Logout</Link>
                                            </li> :
                                                <ul class="navbar-nav ml-auto">      <li class="nav-item">
                                                    <Link class="nav-link" to={"/login"}>Login</Link>

                                                </li>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/register">Register</Link>
                                                    </li>   </ul>
                                            }


                                        </ul>
                                    </Switch>
                                </div>
                            </div>
                        </nav>
                    </header>

                    <div>
                        <div md={12}>.</div>
                        <div md={12}>
                            <div className="wrapper">
                                <Switch>
                                    <Route path="/login" component={Login} />
                                    <Route path='/register' component={Register} />
                                    <Route path='/addPost' component={AddPost} />
                                </Switch>
                            </div>
                        </div>

                    </div>
                </div>
            </Router>

        );
    }
}
