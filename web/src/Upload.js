import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      isSelected: false
    };
  }

  changeHandler = (event) => {
    if (event.target.files[0]) {
      this.setState({
        selectedFile : event.target.files[0],
        isSelected : true
      });
    } else {
      this.setState({
        selectedFile : null,
        isSelected : false
      });
    }
  }

  handleSubmission = () => {
    const formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile
    );
    axios.post("/api/load",formData)
      .then((response) => {

        if (response.data.error==="Unable to commit to database. No data was loaded.") {
          // Handle resonse where no data was loaded - most likely message_id duplicates.
          this.setState({
            error: "Could not load messages. Perhaps some share duplicate Message ID's? No data was loaded.",
            isError: true
          });
        } else if (typeof(response.data.error)=="string"){
          // Hanlde case where error message is string but not above message. Most likely archive with no msg files.
          this.setState({
            error: response.data.error,
            isError: true
          });
        } else if (typeof(response.data.error)=="object") {
          // Handle case where error is array with specific files/errors, and try to build error message for user.
          try {
            this.setState({
              error: response.data.error.map((e) => (<p>{e.filename}:{e.description}</p>)),
              isError: true
            });
          } catch(err) {
            this.setState({
              error: "Failure uploading data; tried to build error message but could not. See javascript console log for details.",
              isError: true
            });
            console.log(response);
          }
        }
        //Some files could still succeed if there were errors
        if (response.data.success) {
          this.setState({
            success: "Success loading data.",
            isSuccess: true
          });
        }
      })
      .catch((error) => {
        // handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.setState({
            error: error.response.status + ": " + error.response.statusText,
            isError: true
          });
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          this.setState({
            error: "The request was made but no response was received.",
            isError: true
          });
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          this.setState({
            error: "Unable to make the request.",
            isError: true
          });
          console.log('Error', error.message);
        }

      });
  };


  render() {
    return (
      <div style={{padding: "10px"}}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload a tar.gz archive file that contains email messages to parse and store.</Form.Label>
          <Form.Control type="file" name="file" onChange={this.changeHandler} />
          {this.state.isError ? (
            <div className="alert alert-danger">{this.state.error}</div>
          ) : (
            null
          )}
          {this.state.isSuccess ? (
            <div className="alert alert-success">{this.state.success}</div>
          ) : (
            null
          )}
        </Form.Group>
        {/*<input type="file" name="file" onChange={this.changeHandler} /> */}
        <div>
          <Button variant="dark" onClick={this.handleSubmission} disabled={!this.state.isSelected}>Submit</Button>
        </div>
      </div>
    )
  }
}
export default Upload
