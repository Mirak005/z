import React from "react";
import ContactCard from "./ContactCard";

function ContactList({ contactList, updateContactList = () => {} }) {
  return contactList.map(contact => (
    <ContactCard
      key={contact._id}
      updateContactList={updateContactList}
      contact={contact}
      isEdited={false}
    />
  ));
}

export default ContactList;
