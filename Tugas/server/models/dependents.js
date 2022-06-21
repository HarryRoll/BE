const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dependents', {
    dependent_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    relationship: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dependents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "dependents_pkey",
        unique: true,
        fields: [
          { name: "dependent_id" },
        ]
      },
    ]
  });
};
