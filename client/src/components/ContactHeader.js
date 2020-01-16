import React, { Component } from "react";
import FormAddEdit from "./FormAddEdit";
import addContact from "./add-contact.svg";

class ContactHeader extends Component {
  state = {
    isOpen: false
  };

  handelOpenForm = condition => {
    this.setState({ isOpen: condition });
  };
  render() {
    const {updateContactList=()=>{}}=this.props
    return (
      <div className="contact-header-container">
        <div>
          <h2 className="header-title">Contact List </h2>
          <p className="click-here-message">Click here to add a new contact</p>
          <button
            className="add-contact-button"
            onClick={() => this.handelOpenForm(true)}
          >
            <img
              className="add-contact-img"
              src={addContact}
              alt="Add contact"
            />
          </button>
        </div>
        <FormAddEdit
          handelOpenForm={this.handelOpenForm}
          isOpen={this.state.isOpen}
          updateContactList={updateContactList}
        />
        
      </div>
    );
  }
}
export default ContactHeader;
