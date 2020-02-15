import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { storage } from '../../config/fbConfig';

class CreateProject extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (e) => {
    if (e.target.id != 'file') {
      this.setState({
        [e.target.id]: e.target.value
      })
    } else {
      this.setState({
        [e.target.id]: e.target.files[0]
      })
    }
  }
  
  componentDidUpdate = () => {
    console.log("this.state ->", this.state);
    const fileRef = storage.ref().child('files').child('test');
    console.log("fileRef ->", fileRef);
    fileRef.put(this.state.file).then(function(snapshot) {
      console.log('Uploaded a blob or file! ->', snapshot);
    }).catch(function(error) {
      console.log("Error ->", error)
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createProject(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Upload notes</h5>
          <div className="input-field">
            <label htmlFor="file">Choose a file</label>
            <input type="file" id='file' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id='title' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Description</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Upload</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
