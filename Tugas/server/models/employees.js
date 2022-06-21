const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
    employee_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'jobs',
        key: 'job_id'
      }
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'department_id'
      }
    }
  }, {
    sequelize,
    tableName: 'employees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employees_pkey",
        unique: true,
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
