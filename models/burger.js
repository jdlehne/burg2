module.exports = function(sequelize, DataTypes) {
  var Burgers = sequelize.define("Burgers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    burger_name: {
      type: DataTypes.STRING,
    
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  return Burgers;
};
