import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect } from "react-router-dom";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      redirect: false,

    };

    this.onSignInHandler = this.onSignInHandler.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSignInHandler(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/api/auth/login', user)
      .then(res => {
        console.log('message', res.data.status)
        if (res.data.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('token', JSON.stringify(res.data.access_token));
          this.setState({

            redirect: true,
          });
        }

      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/addPost" />;
    }
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Redirect to="/" />;
    }
    return (

      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Login</div>

              <div class="card-body">
                <form method="POST" onSubmit={this.onSignInHandler}>


                  <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                    <div class="col-md-6">
                      <input id="email" type="email" class="form-control" name="email" required autocomplete="email" autofocus
                        value={this.state.email}
                        onChange={this.handleEmail} />

                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                    <div class="col-md-6">
                      <input id="password" type="password" class="form-control" name="password" required autocomplete="current-password"
                        value={this.state.password}
                        onChange={this.handlePassword} />

                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="col-md-6 offset-md-4">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember" />

                        <label class="form-check-label" for="remember">
                          Remember Me
                          </label>
                      </div>
                    </div>
                  </div>

                  <div class="form-group row mb-0">
                    <div class="col-md-8 offset-md-4">
                      <button type="submit" class="btn btn-primary">
                        Login
                                    </button>


                      <a class="btn btn-link" href="{{ route('password.request') }}">
                        Forgot Your Password?
                                        </a>


                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
