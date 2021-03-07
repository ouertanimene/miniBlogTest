
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import AddComment from "./AddComment";
import ListComments from "./ListComments";


export default class ListPosts extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],

    }
    this.handleDelete = this.handleDelete.bind(this);
  }
  getPosts() {
    axios.get('/api/getPosts', {
      headers: {
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({
        posts: response.data
      })
    })

  }

  handleDelete(id) {
    let token = JSON.parse(localStorage.getItem('token'));
    console.log('tek', token)
    const httpReqHeaders = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    };
    const axiosConfigObject = { headers: httpReqHeaders };
    axios.delete(`/api/post/${id}`, axiosConfigObject)
      .then(response => {

      })
    this.getPosts();


  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { posts } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>

            <ul className='list-group list-group-flush'>
              {posts.map(post => (

                <div className='card'>
                  <div className='card-header'>  [{post.created_at}]   &nbsp;
                        {post.user.name}
                    <Link className=" float-right" onClick={() => this.handleDelete(post.id)}> Delete</Link>

                  </div>
                  <div className='card-body' to={`/${post.id}`} key={post.id}>
                    {post.status}
                    <hr></hr>

                    <ListComments id_post={post.id} />
                    <AddComment id_post={post.id}></AddComment>
                  </div>
                </div>

              ))}

            </ul>

          </div>
        </div>
      </div>


    );
  }
}



