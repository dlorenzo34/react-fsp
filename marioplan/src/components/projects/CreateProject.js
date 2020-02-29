import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
  state = {
    userUi: '',
    fileTitle: '',
    fileDescription: '',
    fileName: '',
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log("this.state ->", this.state);
  }
  
  handleFileChange = (event) => {
    const strFileName = event.target.files[0].name.replace(/\.[^/.]+$/, "");
    this.setState({
      [event.target.id]: event.target.files[0],
      fileName: strFileName,
    })
  }

  componentDidMount = () => {
    const { auth } = this.props;
    this.setState({userUi: auth.uid});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createProject(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    console.log("this.state", this.state);
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Upload notes</h5>
          <div className="input-field">
            <label htmlFor="file">Choose a file</label>
            <input type="file" id='file' onChange={this.handleFileChange} />
          </div>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id='fileTitle' onChange={this.handleInputChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Description</label>
            <textarea id="fileDescription" className="materialize-textarea" onChange={this.handleInputChange}></textarea>
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
