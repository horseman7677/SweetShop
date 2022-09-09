module.exports = (sequelize, DataType) => {
    const Items = sequelize.define("Items", {
      item: {
        type: DataType.STRING,
        allowNull: false,
      },
      price: {
        type: DataType.STRING,
        allowNull: false,
      },
    });
    return Items;
  };
  