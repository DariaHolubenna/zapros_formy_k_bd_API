const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalSchema = new Schema({ // Схема
  title: {
    type: Schema.Types.String,
    minLength: 0,
    maxLength: 255,
  },
  author: {
    type: Schema.Types.String,
    minlength: 0,
    maxlength: 255,
  },
  content: {
    type: Schema.Types.String,
    minlength: 0,
    maxlength: 255,
  },
}, { timestamps: true }); // Настройки схемы, в данном случае добавить поле createdAt, updatedAt (когда создали документ, когда обновили документ)

const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const articleModel = mongoose.model('modelname', generalSchema); // собственно создаем модель
module.exports = articleModel;
