import React from 'react';
import "bootstrap/js/src/collapse.js";
import Table from 'react-bootstrap/Table';

class MessageRow extends React.Component {
  onClickHandler = (e) => {
      const hiddenElement = e.currentTarget.nextSibling;
      hiddenElement.className.indexOf("collapse show") > -1 ? hiddenElement.classList.remove("show") : hiddenElement.classList.add("show");
  };
  //render() {
  //  return (<tr><td>{ this.props.message.message_id }</td><td>{ this.props.message.from_email }</td><td>{ this.props.message.to_email }</td><td>{ this.props.message.subject }</td><td>{ this.props.message.email_date }</td></tr>);
  //}
  render() {
    return (<>
      <tr onClick={this.onClickHandler}>
        <td>{this.props.message.from_email}</td>
        <td>{this.props.message.subject}</td>
      </tr>
      <tr className="collapse">
        <td colSpan="2">
          <Table bordered>
            <thead>
              <th>Message ID</th>
              <th>To</th>
              <th>Date</th>
            </thead>
            <tbody>
              <tr>
                <td>{ this.props.message.message_id }</td>
                <td>{ this.props.message.to_email }</td>
                <td>{ this.props.message.email_date }</td>
              </tr>
            </tbody>
          </Table>
        </td>
      </tr>
    </>);
  }
}
export default MessageRow
