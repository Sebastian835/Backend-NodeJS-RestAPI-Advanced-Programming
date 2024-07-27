const { getDB } = require('../config/db');
const User = require('../models/user');
const { ObjectId } = require('mongodb');

exports.getUsers = async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const db = getDB();
    const user = new User(name, email, password);
    await db.collection('users').insertOne(user);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const db = getDB();
    const updatedUser = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name, email, password } },
      { returnOriginal: false }
    );
    res.json(updatedUser.value);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
