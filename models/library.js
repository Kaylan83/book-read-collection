module.exports = function(sequelize, DataTypes) {
    var Library = sequelize.define("Library", {

        book_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        author: {
            type: DataTypes.String,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        book_link: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Library.associate = function(models) {
        //associating library to the users where a library
        Library.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Library;
};