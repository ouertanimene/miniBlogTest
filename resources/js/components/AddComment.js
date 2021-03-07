import React, { Component } from "react";
import ReactDOM from 'react-dom';

export default class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({
            body: e.target.value
        });
     
    }
    
      
    handleSubmit(e) {
        e.preventDefault();$
        let token = JSON.parse(localStorage.getItem('token'));
        console.log("tokin",token);
        axios.post('/api/addComment', {
                body: this.state.body,
                post_id: this.props.id_post
                },
                {
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            .then(res => {
               
            });
    }

   
    render() {
    return (
      
        <div class="card-body">
        <form method="POST"  onSubmit={this.handleSubmit} >                              
            <div class="form-group row">
            
                <div class="col-md-12">                                           
                    <textarea
                        className="form-control"
                        rows="1"        
                        placeholder="Enter your comment..."                                
                        required
                        onChange={this.handleChange}
                        value={this.state.body}                      
                    />
                </div>
            </div>


            <div class="form-group row ">
                <div class="col-md-12 " >
                    <button type="submit" class="btn btn-primary">
                        Publish
                    </button>

                </div>
            </div>
        </form>
    </div> 
              
    
    );
}
}

