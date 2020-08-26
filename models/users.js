
const bcrypt = require("bcryptjs");


module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5,20]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
  
    });

    Users.associate = function(models) {
        //associating users with books library
        // when the user is deleted, delete the library
        Users.hasMany(models.Library, {
            onDelete: "cascade"
        });
    };

    Users.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      Users.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(
          user.password,
          bcrypt.genSaltSync(10),
          null
        );
      });
      return Users;
}
