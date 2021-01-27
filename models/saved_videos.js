module.exports = (sequelize,DataTypes) => {
    const Saved = sequelize.define('saved', {
        videos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.TEXT,
            allowNull:false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    Saved.associate = (models) => {
        Saved.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        })
    };
    return Saved;
}