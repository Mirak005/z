const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();

app.use(bodyParser.json());

const mongo_url = "mongodb://localhost:27017";
const database = "contact-list";

MongoClient.connect(
  mongo_url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    assert.equal(err, null, "database connexion failed");

    const db = client.db(database);
    // post and create contact-list
    app.post("/add_Contact", (req, res) => {
      let newContact = req.body;
      db.collection(database).insertOne(newContact, (err, data) => {
        if (err) res.send("can not add a contact !");
        else res.send(data);
      });
    });

    //edit_contact by name
    app.put("/edit_contact/:id", (req, res) => {
      let id = ObjectID(req.params.id);
      db.collection(database).findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        (err, data) => {
          if (err) res.send("Cannot update contact");
          else res.send(data);
        }
      );
    });

    //get contact list
    app.get("/contact_list", (req, res) => {
      db.collection(database)
        .find()
        .sort({ _id: -1 })
        .toArray((err, data) => {
          if (err) res.send("Cannot find contact list");
          else {
            res.send(data);
            console.log(data);
          }
        });
    });

    //delete contact
    app.delete("/delete_contact/:id", (req, res) => {
      let id = ObjectID(req.params.id);
      db.collection(database).deleteOne({ _id: id }, (err, data) => {
        if (err) res.send("cannot delete contact");
        else res.send(data);
      });
    });

    //get contact by id
    app.get("/contact_list/:id", (req, res) => {
      let id = ObjectID(req.params.id);
      db.collection(database).findOne({ _id: id }, (err, data) => {
        if (err) res.send("Cannot get the contact");
        else res.send(data);
      });
    });
  }
);

app.listen(5000, err => {
  if (err) console.log("The server is not running !!");
  else console.log(`The server is running on PORT 5000...`);
});
