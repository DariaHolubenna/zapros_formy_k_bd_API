const ArticleModel = require('models/article');

const getList = async () => {
  const docs = await ArticleModel.find();
  return docs;
};

const create = async (title, author, content) => {
  const doc = new ArticleModel({ title, author, content });
  console.log('create!!!!!');
  await doc.save();

  return doc.id;
};
module.exports.getList = getList;
module.exports.create = create;