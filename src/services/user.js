const User = require('../models/userModel');

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
}

async function createUser(data) {
  try {
    const user = new User(data);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, name, lastName) {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    return await User.findByIdAndRemove(id);
  } catch (error) {
    throw error;
  }
}

async function findOneUserByQuery(query) {
    try {
        return await User.findOne(query)
    }
    catch (error) {
        throw error
    }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findOneUserByQuery
};
