import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ContactCard({
  contact: { name, lastName, phoneNumber, email, _id },
  updateContactList = () => {},
  isEdited
}) {
  const handelDeleteContact = () => {
    axios
      .delete(`/delete_contact/${_id}`)
      .then(
        axios
          .get("/contact_list")
          .then(res => updateContactList(res.data))
          .catch(err => alert(err))
      )
      .catch(err => alert(err));
  };

  return (
    <div className={isEdited ? "contact-card-edit" : "contact-card"}>
      <div className="card-header">
        <h2 className="contact-icon">{name[0].toUpperCase()}</h2>
        <h2 className="contact-name">
          {name.toUpperCase() + " " + lastName.toUpperCase()}
        </h2>
      </div>
      <div className="contact-info">
        <p>
          Phone : <span className="contact-number">{phoneNumber}</span>
        </p>
        <p>
          E-mail : <span className="contact-email">{email}</span>
        </p>
      </div>
      <div className="btn-container">
        <Link
          className={isEdited ? "display-none" : "edit-btn"}
          to={`/${name}`}
        >
          Edit
        </Link>
        <button
          onClick={handelDeleteContact}
          className={isEdited ? "display-none" : "delete-btn"}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContactCard;
