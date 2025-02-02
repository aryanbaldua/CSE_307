import User from "../models/user.js";

const UserService = {
  getAllUsers: () => User.find(),
  getUserById: (id) => User.findById(id),
  createUser: (userData) => User.create(userData),
  deleteUser: (id) => User.findByIdAndDelete(id),
};

export default UserService;
