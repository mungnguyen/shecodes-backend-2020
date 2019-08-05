module.exports = function(sequelize, DataTypes) {
  const Information = sequelize.define(
    'Information',
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
      birthday: {
        type: DataTypes.DATE,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fb_link: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apply_job: {
        type: DataTypes.STRING,
        allowNull: false
      },
      link_product: {
        type: DataTypes.STRING,
        allowNull: false
      },
      orther_job: {
        type: DataTypes.STRING,
        allowNull: false
      },
      orther_description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )
  return Information
}
