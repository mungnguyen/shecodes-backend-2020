module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '12345'
      }
    },
    {
      timestamps: false
    }
  )
  return Admin
}
