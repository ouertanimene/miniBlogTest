
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ListPosts from "./ListPosts";


export default class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            posts: []
        };
      

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount () {
        axios.get('/api/getPosts').then(response => {
            this.setState({
              posts: response.data
            })
          })
      }
    handleChange(e) {
        this.setState({
            status: e.target.value
        });
    }
      
    handleSubmit(e) {
        let token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem("user")).id;
        e.preventDefault();
        axios.post('/api/addPost', {
                status: this.state.status,
                user_id:userId,
                token:token
            },
            
           /*  {
                headers: {
                    'Bearer Token': `Basic ${token}` ,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                 }}  */)
            .then(res => {
            //    console.log('from handle submit', config);
            });
    }

    render() {
        console.log('user in local ',localStorage.getItem("user"));
        const user = JSON.parse(localStorage.getItem("user"));
        const userAUth=localStorage.getItem("user")
        return (
            <div className="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header"> Hi  {user.name} what's new ?</div>

                            <div class="card-body">
                                <form method="POST"  onSubmit={this.handleSubmit}>                              
                                    <div class="form-group row">
                                    
                                        <div class="col-md-12">
                                                                    
                                            <textarea
                                                className="form-control"
                                                rows="2"
                                            
                                                required
                                                onChange={this.handleChange}
                                                value={this.state.status}
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
                        </div>
                    </div>
                   
                    <ListPosts/> 
                </div>
            
            </div>
        
            );
    }
}

//export default AddPost;


