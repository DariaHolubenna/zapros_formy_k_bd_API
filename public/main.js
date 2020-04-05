const ArticleList = async () => {
  const articleList = document.querySelector('.list');
  const { data } = await axios.get('/:id');
  const { list } = data.payload;
  const html = list.map((value) => {
    const { title, author, content } = value;
    const str = `<li data-id="${id}"><h3>${title}</h3><div>${author}</div><div>${content}</div></li>`; 
    return str;
  }).join('');
  articleList.innerHTML = html;
};
ArticleList();