import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

//the component wil addapt with the context if is it in the edit context or a add context
// depending of the value of isEdited passed as props in each case ture or false

// mail input

class FormAddEdit extends Component {
  state = {
    name: "",
    lastName: "",
    phoneNumber: "",
    email: ""
  };
  

  componentDidMount = () =>
    this.props.isEdited ? this.setState({ ...this.props.contact }) : null;

  //if is edited false
  handelSubmit = e => {
    e.preventDefault();

    if (Object.values(this.state).indexOf("") === -1) {
      axios
        .post("/add_Contact", {
          name: this.state.name,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email
        })
        .then(
          res =>
            axios
              .get("/contact_list")
              .then(res => this.props.updateContactList(res.data))
              .catch(err => alert(err)),
          this.props.handelOpenForm(false),
          this.setState({
            name: "",
            lastName: "",
            phoneNumber: "",
            email: ""
          })
        )
        .catch(err => alert("Cannot add a Contact"));
    } else {
      alert(`Check if there is a missing information`);
    }
  };
  //if is edited true
  handelSumbmitEdit = e => {
    e.preventDefault();
    if (Object.values(this.state).indexOf("") === -1) {
      axios
        .put(`/edit_contact/${this.props.contact._id}`, {
          name: this.state.name,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber * 1,
          email: this.state.email
        })
        .then(
          res =>
            axios
              .get("/contact_list")
              .then(res => this.props.updateContactList(res.data))
              .catch(err => alert(err)),
          this.setState({
            name: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            isModified: true
          })
        )

        .catch(err => alert("Cannot add a Contact"));
    } else {
      alert("Enter a valid informations ");
    }
  };

  handelCancelForm = e => {
    e.preventDefault();
    this.props.handelOpenForm(false);
    this.setState({
      name: "",
      lastName: "",
      phoneNumber: "",
      email: ""
    });
  };

  handelForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return this.state.isModified ? (
      <Redirect to="/" />
    ) : (
      <form
        // if isOpen is false( component in add context) or undifiend(means thaht the componet is in edit context) the className will change

        className={
          this.props.isOpen
            ? "add-contact-form"
            : this.props.isEdited
            ? "edit-contact-form"
            : "display-none"
        }
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="ex:Jhon"
          onChange={this.handelForm}
        />
        <label>Last name</label>
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          placeholder="ex:Doe"
          onChange={this.handelForm}
        />
        <label>Phone number</label>
        <input
          maxLength="13"
          name="phoneNumber"
          value={this.state.phoneNumber}
          placeholder="ex:+21699999999"
          onChange={e => {
            e.target.value = e.target.value.replace(/[^+0-9]/g, "");
            this.handelForm(e);
          }}
        />
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          placeholder="ex:Jhon@gmail.com"
          onChange={this.handelForm}
        />
        <div className="btn-container">
          <button
            onClick={e =>
              this.props.isEdited
                ? this.handelSumbmitEdit(e)
                : this.handelSubmit(e)
            }
            className="edit-btn"
          >
            Confirm
          </button>
          <button
            onClick={this.handelCancelForm}
            className={this.props.isEdited ? "display-none" : "delete-btn"}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default FormAddEdit;
