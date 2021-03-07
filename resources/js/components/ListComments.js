
import React, { Component } from "react";
import { Link } from 'react-router-dom'


export default class ListComments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
    this.handleDelete = this.handleDelete.bind(this);
  }
  getComments(id) {

    axios.get(`/api/getComments/${this.props.id_post}`).then(response => {
      this.setState({
        comments: response.data
      })

    })
  }

  handleDelete(id) {
    let token = JSON.parse(localStorage.getItem('token'));
    const httpReqHeaders = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    };
    const axiosConfigObject = { headers: httpReqHeaders };
    axios.delete(`/api/comment/${id}`, axiosConfigObject)
      .then(response => {

      })
    this.getComments();


  }

  componentDidMount() {

    this.getComments();
  }

  render() {
    const { comments } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>

            <ul className='list-group list-group-flush'>
              <div>
                <b>Comments </b>
                {comments.map(comment => (
                  <div className='card'>
                    <div className='card-body' to={`/${comment.id}`} key={comment.id} >
                      <label><b>{comment.user.name}:</b>   {comment.body}   </label>
                      <div>{comment.created_at} -  <Link onClick={() => this.handleDelete(comment.id)}>Delete</Link>
                      </div>
                    </div>
                  </div>

                ))}
              </div>

            </ul>

          </div>
        </div>
      </div>


    );
  }
}



