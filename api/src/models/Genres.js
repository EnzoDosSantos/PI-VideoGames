const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genres', {
    name: {
      type: DataTypes.STRING
    },
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
  }, {
    timestamps: false
  });
};
