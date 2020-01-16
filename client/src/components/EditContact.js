import React, { Component } from "react";
import FormAddEdit from "./FormAddEdit";
import ContactCard from "./ContactCard";

class EditContact extends Component {
  render() {
    const {contact , updateContactList=()=>{} }= this.props
    return (
      <div className="edit-card">
        <ContactCard
          contact={contact}
          updateContactList={updateContactList}
          isEdited={true}
        />
        <FormAddEdit
          contact={contact}
          isEdited={true}
          updateContactList={updateContactList}
        />
      </div>
    );
  }
}

export default EditContact;
