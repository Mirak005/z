import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import ContactHeader from "./components/ContactHeader";
import ContactList from "./components/ContactList";
import EditContact from "./components/EditContact";
import "./App.css";

const data = [
  {
    name: "karim",
    lastName: "gharbi",
    phoneNumber: 54429894,
    email: "karim@gmail.com",
    _id: 0
  },
  {
    name: "hejer",
    lastName: "laouani",
    phoneNumber: 58540540,
    email: "hejer@gmail.com",
    _id: 1
  }
];

class App extends React.Component {
  state = {
    contactList: data
  };

  componentDidMount = () => {
    axios
      .get("/contact_list")
      .then(res => this.setState({ contactList: res.data }))
      .catch(err => alert("Error cannot fetch data from the server!"));
  };

  updateContactList = data => this.setState({ contactList: data });

  render() {
    return (
      <div>
        <ContactHeader updateContactList={this.updateContactList} />
        <Route
          exact
          path="/"
          render={() => (
            <ContactList
              updateContactList={this.updateContactList}
              contactList={this.state.contactList}
            />
          )}
        />

        {this.state.contactList.map(contact => (
          <Route
            key={contact._id}
            path={`/${contact.name}`}
            render={() => (
              <EditContact
                updateContactList={this.updateContactList}
                contact={contact}
              />
            )}
          />
        ))}
      </div>
    );
  }
}

export default App;
