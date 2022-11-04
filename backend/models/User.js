const { DataTypes } = require("sequelize");
const { sequelize } = require("./../config/db/connection");

const User = sequelize?.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "standard"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(64)
  },
  pendingRequests: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  isLoggedIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

(async () => {
  try {
    await User.sync({ alter: true });
    console.log("database created");
  } catch (error) {
    console.log(error.message);
  }
})();

module.exports = User;
