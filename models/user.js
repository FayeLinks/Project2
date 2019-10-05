// Dependencies below

var Sequelize = require("sequelize");
var bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    // Set up User table
var User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// This below code encrypts the User PW (aka makes it "salted") and the allows it to be checked un
User.beforeCreate((user, options) => {
    var salt = bcrypt.genSaltSync();
    // this code makes it so the original user input PW and the "salted PW" are the same
    user.password = bcrypt.hashSync(user.password, salt);
});

// Validate the PW
User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

    return User;
};



