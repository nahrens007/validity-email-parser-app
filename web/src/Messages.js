import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import MessageRows from './MessageRows';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      messages: null
    };
    this.getData();
  }

  // getData will populate this.state.messages with the message data from /api/get
  getData = () => {
    axios.get('/api/get')
       .then((response) => {
        // handle success
        console.log("Success getting data: " + response.data.length + " rows.");
        this.setState({
          messages: response.data
        });
       })
       .catch((error) => {
         // handle error
         console.log("Error getting data");
         console.log(error);
       });
  }

  render() {
    // Render message table
    return (
      <div style={{padding: "10px"}}>
        <h2>Messages</h2>
        <p>Click a row to see more details</p>
        <Table bordered hover>
          <thead>
            {/*<th>Message ID</th>*/}
            <th>From</th>
            {/*<th>To</th>*/}
            <th>Subject</th>
            {/*<th>Date</th>*/}
          </thead>
          <tbody>
              <MessageRows messages={this.state.messages} />
          </tbody>
        </Table>
      </div>
    )
  }
}
export default Messages
