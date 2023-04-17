document.addEventListener("DOMContentLoaded", () => {
  const testFrom = document.getElementById("testForm");
  const successElem = document.querySelector(".alert-success");
  const messageElem = document.querySelector(".alert-danger");
  const sendButton = document.getElementById("submit-form");

  const foo = function () {
    console.log("FOOO!");
  };
  const test = new FormLord({
    form: testFrom, // сюда форму (обязательно нужно указать action="URL"!)
    flag: true, // тут типо нужна ли валидация моя, если что можно как есть отправить
    successElem: successElem, // сюда елмент, который показать когда успех! (тут просто display=block)
    //messageElem: messageElem, // сюда елмент, в который будут писаться ошибки! (innerHTML!)
    sendButton: sendButton,
    flag: false,
    animation: foo,
  });
  test.initSendData();
});
