module.exports = function(sequelize, DataTypes) {
  var Bom = sequelize.define("Bom", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    summary: DataTypes.TEXT
  });
  return Bom;
};
