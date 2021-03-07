import React, { Component } from 'react';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {

      name: "",
      email: "",
      password: "",


    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
 
  handleName(e) {
    this.setState({
      name: e.target.value
    })
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
  handleSubmit(e) {

    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }
    axios.post('/api/auth/register', user)
      .then(res => {
        
      });
  }





  render() {
    return (
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Register</div>

              <div class="card-body">
                <form method="POST" onSubmit={this.handleSubmit}>

                  <div class="form-group row">
                    <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                    <div class="col-md-6">
                      <input id="name" type="text" class="form-control " name="name" required autocomplete="name"
                        value={this.state.name}
                        onChange={this.handleName} />

                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                    <div class="col-md-6">
                      <input id="email" type="email" class="form-control" name="email" v required autocomplete="email"
                        value={this.state.email}
                        onChange={this.handleEmail} />

                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                    <div class="col-md-6">
                      <input id="password" type="password" class="form-control " name="password" required autocomplete="new-password"
                        value={this.state.password}
                        onChange={this.handlePassword} />


                    </div>
                  </div>

                  <div class="form-group row mb-0">
                    <div class="col-md-6 offset-md-4">
                      <button type="submit" class="btn btn-primary">
                        Register
                                    </button>
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