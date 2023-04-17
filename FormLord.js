window.DebugFromLord = [];
window.DebugFromLordStatus = {};
class FormLord {
  constructor({ form, successElem, messageElem, sendButton, animation, flag }) {
    this.form = form;
    this.url = form.action;
    this.successElem = successElem;
    this.messageElem = messageElem;
    this.values = [];
    this.validData = {};
    this.sendButton = sendButton;
    this.animation = animation;
    this.flag = flag;
    this.metrikaId = "";
    this.metrikaGoal = "";
    // console.log(this.form);

    // function findAncestor(el, cls) {
    //   while ((el = el.parentElement) && !el.classList.contains(cls));
    //   return el;
    // }
  }
  // Getter
  get all() {
    return this.getAll();
  }
  // Method
  // getForm(el, cls) {
  //   while ((el = el.parentElement) && !el.nodeName == "FORM");
  //   return el;
  // }
  getValue() {
    return this.form;
  }
  getAllValue(evt) {
    // console.log(this.getForm(evt, "FORM"));
    if (this.form.hasChildNodes()) {
      this.values = Array.prototype.filter.call(
        this.form,
        function (currElement) {
          if (currElement.nodeName === "SELECT") {
            return currElement.children;
          } else if (
            currElement.nodeName === "INPUT" ||
            currElement.nodeName === "TEXTAREA"
          ) {
            return currElement;
          }
        }
      );
      return this.values;
    } else {
      // const inputFormButtnos = this.getForm(evt, "FORM");

      // this.values = Array.prototype.filter.call(
      //   inputFormButtnos,
      //   function (currElement) {
      //     if (currElement.nodeName === "SELECT") {
      //       return currElement.children;
      //     } else if (
      //       currElement.nodeName === "INPUT" ||
      //       currElement.nodeName === "TEXTAREA"
      //     ) {
      //       return currElement;
      //     }
      //   }
      // );
      // return this.values;
      throw Error("Обьект пуст или у него нет детей!");
    }
  }
  validFormat() {
    const arrRadioInputs = [];
    for (let i = 0; i <= this.values.length - 1; i++) {
      if (this.values[i].name.length) {
        if (this.values[i].nodeName == "SELECT") {
          this.validData[this.values[i].name] = this.values[i].value;
        } else {
          const inputType = this.values[i].type;
          this.values[i].setCustomValidity("");
          switch (inputType) {
            case "tel":
              if (this.values[i].attributes.req) {
                if (
                  this.values[i].attributes.req.value ==
                  this.values[i].value.length
                ) {
                  this.validData[this.values[i].name] = this.values[i].value;
                } else {
                  this.values[i].setCustomValidity(`Введите номер`);
                  this.values[i].reportValidity();
                  const errorMessage = `Введите номер`;
                  window.DebugFromLord.includes(errorMessage)
                    ? false
                    : window.DebugFromLord.push(errorMessage);
                }
              } else {
                this.validData[this.values[i].name] = this.values[i].value;
              }
              break;
            case "text":
              if (this.values[i].attributes.req) {
                if (
                  Number(this.values[i].attributes.req.value) <=
                  this.values[i].value.length
                ) {
                  this.validData[this.values[i].name] = this.values[i].value;
                } else {
                  this.values[i].setCustomValidity(
                    `Заполните это текстовое поле`
                  );
                  this.values[i].reportValidity();
                  const errorMessage = `Заполните это текстовое поле`;
                  window.DebugFromLord.includes(errorMessage)
                    ? false
                    : window.DebugFromLord.push(errorMessage);
                }
              } else {
                this.validData[this.values[i].name] = this.values[i].value;
              }
              break;
            case "email":
              if (this.values[i].attributes.req) {
                if (
                  Number(this.values[i].attributes.req.value) <=
                  this.values[i].value.length
                ) {
                  this.validData[this.values[i].name] = this.values[i].value;
                } else {
                  this.values[i].setCustomValidity(`Заполните это поле!!`);
                  this.values[i].reportValidity();
                  const errorMessage = `Заполните это поле!!`;
                  window.DebugFromLord.includes(errorMessage)
                    ? false
                    : window.DebugFromLord.push(errorMessage);
                }
              } else {
                this.validData[this.values[i].name] = this.values[i].value;
              }
              break;
            case "radio":
              if (this.values[i].attributes.req) {
                let allRadioInputs = this.form.querySelectorAll(
                  `input[name="${this.values[i].name}"]`
                );
                arrRadioInputs.push(allRadioInputs);
              } else {
                if (this.values[i].checked) {
                  this.validData[this.values[i].name] = this.values[i].value;
                }
              }
              break;
            case "checkbox":
              if (this.values[i].attributes.req) {
                if (this.values[i].checked) {
                  this.validData[this.values[i].name] = this.values[i].value;
                } else {
                  this.values[i].setCustomValidity("Заполните все поля!");
                  this.values[i].reportValidity();
                  const errorMessage = "Заполните все поля!";
                  window.DebugFromLord.includes(errorMessage)
                    ? false
                    : window.DebugFromLord.push(errorMessage);
                }
              } else {
                if (this.values[i].checked) {
                  this.validData[this.values[i].name] = this.values[i].value;
                }
              }
              break;
            case "textarea":
              this.validData[this.values[i].name] = this.values[i].value;
              break;
            case "hidden":
              if (this.values[i].name == "metrika_id") {
                this.metrikaId = this.values[i].value;
              } else if (this.values[i].name == "metrika_goal") {
                this.metrikaGoal = this.values[i].value;
              } else {
                this.validData[this.values[i].name] = this.values[i].value;
              }
              break;
            default:
              console.warn(
                "input type - должен быть textarea | hidden | text | radio | checkbox | tel | email | select"
              );
          }
        }
      } else {
        this.validData["Эта строка не заполнена"] = this.values[i].value;
      }
    }
  }
  errorMessage(data) {
    fetch(
      "https://centr-polov.ru/vendor/webhook/errors/send_telegram_leads_with_error_send.php",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    this.form.reset();
  }
  initSendData() {
    if (this.flag) {
      this.sendButton.addEventListener("click", async (evt) => {
        evt.preventDefault();
        window.DebugFromLord = [];
        this.getAllValue();
        this.validFormat();
        this.messageElem.innerHTML = "";
        if (window.DebugFromLord == 0) {
          this.messageElem.style.display = "none";
          this.messageElem.innerHTML = "";
          try {
            const url = this.url;
            const res = await fetch(url, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(this.validData),
            });
            this.successElem.style.display = "block";
            this.form.reset();
            setTimeout(() => {
              this.successElem.style.display = "none";
            }, 2000);
            window.DebugFromLordStatus["status"] = res.status;
            if (res.status !== 200) {
              this.errorMessage(this.validData);
              throw error;
            }
          } catch (error) {
            this.errorMessage(this.validData);
          }
        } else {
          this.messageElem.style.display = "block";
          for (let i = 0; i < window.DebugFromLord.length; i++) {
            this.messageElem.innerHTML += window.DebugFromLord[i] + "<br>";
          }
        }
      });
    } else {
      this.sendButton.addEventListener("click", async (evt) => {
        evt.preventDefault();
        window.DebugFromLord = [];
        this.getAllValue(evt.target);
        this.validFormat();
        if (window.DebugFromLord.length == 0) {
          this.sendButton.innerHTML =
            '<svg width="100%" height="31px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ellipsis"> 							<!--circle(cx="16",cy="50",r="10")--> 							<circle cx="84" cy="50" r="0" fill="#ffffff"> 								<animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="0s"></animate> 								<animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="0s"></animate> 							</circle> 							<circle cx="16" cy="50" r="9.73158" fill="#ffffff"> 								<animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="-1.3s"></animate> 								<animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="-1.3s"></animate> 							</circle> 							<circle cx="84" cy="50" r="0.268423" fill="#ffffff"> 								<animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="-0.65s"></animate> 								<animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="-0.65s"></animate> 							</circle> 							<circle cx="83.0874" cy="50" r="10" fill="#ffffff"> 								<animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="0s"></animate> 								<animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="0s"></animate> 							</circle> 							<circle cx="49.0874" cy="50" r="10" fill="#ffffff"> 								<animate attributeName="r" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="0s"></animate> 								<animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.6s" repeatCount="indefinite" begin="0s"></animate> 							</circle> 						</svg>';
          setTimeout(() => {
            this.animation();
            this.sendButton.innerHTML = "Сообщение отправленно!";
          }, 2500);
          try {
            const url = this.url;
            const res = await fetch(url, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(this.validData),
            });
            ym(Number(this.metrikaId), "reachGoal", `${this.metrikaGoal}`);
            this.form.reset();
            window.DebugFromLordStatus["status"] = res.status;
            if (res.status !== 200) {
              this.errorMessage(this.validData);
              throw error;
            }
          } catch (error) {
            this.errorMessage(this.validData);
          }
        }
      });
    }
  }
  *getAll() {
    yield this.error;
    yield this.form;
    yield this.errorElem;
    yield this.false;
  }
}
