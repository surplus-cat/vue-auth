/* jshint indent: 2 */

export default function (sequelize, DataTypes) {
  return sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    auth: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    create_time: {
      type: DataTypes.TIME(6)
    }
  }, {
    tableName: 'role'
  })
}
