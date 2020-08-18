module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
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

    return Users;
}
