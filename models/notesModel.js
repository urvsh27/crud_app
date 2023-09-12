'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    static associate(models) {
      Notes.belongsTo(models.users);
    }
  }
  Notes.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'notes',
      indexes: [
        {
          fields: ['id'],
          using: 'BTREE',
          name: 'notes_id_btree_index',
        },
        {
          fields: ['title'],
          using: 'BTREE',
          name: 'notes_title_btree_index',
        },
        {
          fields: ['text'],
          using: 'BTREE',
          name: 'notes_text_btree_index',
        },
      ],
    }
  );
  return Notes;
};
