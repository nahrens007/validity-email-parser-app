import React from 'react';
import MessageRow from './MessageRow';

class MessageRows extends React.Component {
  render() {
    // Ensure messages is set and length of greater than 0
    if (this.props.messages && this.props.messages.length > 0) {
      return (
        this.props.messages.map(
          (m) => ( <MessageRow message={m} /> )
        )
      );
    }
    // Return null if no messages to display
    return (null);
  }
}
export default MessageRows
