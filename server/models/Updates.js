module.exports = (sequelize, DataType) => {
    const Update = sequelize.define("Update", {
        product: {
            type: DataType.STRING,
            allowNull: false
        },
        quantity: {
            type: DataType.STRING,
            allowNull: false
        },
        unit: {
            type: DataType.STRING,
            allowNull: false
        },
    });
    return Update
}
