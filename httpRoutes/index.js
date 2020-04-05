const express = require('express');

const router = express.Router();
const articleController = require('controllers/article');
const Ajv = require('ajv');
const testSchema = require('schemas/routes/test');
const multer = require('multer');

const upload = multer();
const axios = require('axios');
const model = require('../models/article');


router.get('/form', async (req, res) => {
  res.render('index.ejs');
});

router.post('/formArt', upload.none(), async (req, res) => {
  const { body } = req;
  console.log('body', body);

  // 1. body провалидировать с помошью Ajv

  const ajv = new Ajv();
  const validate = ajv.compile(testSchema);
  const valid = validate(body);

  if (!valid) {
    const { errors } = validate;
    const result = {
      status: 'invalid data',
      payload: { errors },
    };
    res.json(result);
    return;
  }

  const { create } = articleController;

  // 2. Передаешь данные из body в функцию create 
  const { title, author, content } = body;
  const id = await create(title, author, content);
  res.json({
    status: 'ok',
    payload: { id },
  });
  console.log('id', id);
});

router.get('/list', async (req, res, next) => {
  const { getList } = articleController;
  const result = await getList();
  const list = result.map((value) => {
    const { title, author, content } = value;
    return { title, author, content };
  });
  res.json({
    status: 'ok',
    payload: { list },
  });
});

router.get('/:id', (req, res, next) => {

});

        //  router.get('/test1', async (req, res, next) => {
        //   const { body } = res;

  // Валидируем!
  // const ajv = new Ajv();
  // const validate = ajv.compile(testSchema);
  // const valid = validate(body);

  // if (!valid) {
  //   const { errors } = validate;

  //   const result = {
  //     status: 'invalid data',
  //     payload: { errors },
  //   };
  //   res.json(result);
  //   return;
  // }

  // Дергаем контроллер. Все! больше тут ничего нет
   // +  //   const { getList } = articleController; // получить все статьи
    //+  //  const result = await getList();

  // Отдаем ответ
       //+   // res.json({ status: 'ok', payload: { result } });
// });


        // router.get('/test2', async (req, res, next) => {
        //   const { body } = res;
// вот эта хрень вездесущая сверху
  // Валидируем!
  // const ajv = new Ajv();
  // const validate = ajv.compile(testSchema);
  // const valid = validate(body);

  // if (!valid) {
  //   const { errors } = validate;

  //   const result = {
  //     status: 'invalid data',
  //     payload: { errors },
  //   };
  //   res.json(result);
  //   return;
  // }

  // Дергаем контроллер. Все! больше тут ничего нет
  // const { create } = articleController; // создать статью
  // const id = await create('My Title', 'Lorem ipsum');

  // console.log(id);
  // Отдаем ответ
  // res.json({ status: 'ok', payload: { id } });
// });




module.exports = router;
