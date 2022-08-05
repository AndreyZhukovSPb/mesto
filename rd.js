

  function testPR9() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards', {
    headers: {
      authorization: '83fc8ebe-1f08-4a5e-8995-87cf7a67fcf1'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    }); 
  }
  
  testPR9()

/* 
как отметить свои карточки что их можно было удалять - по своему id + 
оствлять закрашенным лайк если есть свой лайк
задеплоить
*/







