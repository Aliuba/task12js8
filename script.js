  // - Дана textarea.
  // В неё вводится текст.
  // Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в textarea.

  //   let text = document.getElementById('textarea');

  //   function setText() {
  //       localStorage.setItem("name", text.value)

  //   }
  //   text.value = localStorage.getItem("name")



  // це по лекції пробувала

  // localStorage.clear();
  // navigator.geolocation.getCurrentPosition(data => {
  //     console.log(data)
  // })
  // const videoEl = document.getElementById("vid")
  // navigator
  //     .mediaDevices
  //     .getUserMedia({ video: true })
  //     .then(value => {
  //         videoEl.srcObject = value
  //         videoEl.play()
  //         console.log(videoEl)
  //     })
  // history.forward()
  //     // history.back()

  // - Дана форма с инпутами, текстареа, чекбоксами, радио кнопочками, селектами и тп.
  // Пользователь вводит какие-то данные и закрывает страницу (не факт, что он заполнил всю форму).
  // Сделайте так, чтобы при следующем заходе на страницу введенные им ранее данные стояли на своих местах.
  // Сделайте ваш скрипт как можно более универсальным.
  //   let form = document.getElementById("form")

  //   function setData() {
  //       for (let i = 0; i < form.length; i++) {
  //           if ((form[i].type === "checkbox") || (form[i].type === "radio")) {
  //               (form[i].checked) ? form[i].value = form[i].id: form[i].value = "false"
  //           }
  //           localStorage.setItem(form[i].id, form[i].value)
  //           console.log(form[i])
  //       }
  //   }
  //   for (let i = 0; i < form.length; i++) {
  //       form[i].value = localStorage.getItem(form[i].id, form[i].value)
  //       if ((form[i].type === "checkbox") || (form[i].type === "radio")) {
  //           (form[i].value === "false") ? form[i].checked = false: form[i].checked = true
  //       }
  //   }


  // -Дан текстареа. В него можно ввести данные, нажать кнопку "сохранить" и они "фикисруются" (в хранилище),
  //    затем поредактировать их, затем еще поредактировать и возможно еще.....
  // Требование : хранить историю своих изменений (даже после перезагрузки страницы).
  // Сверху над текстареа должны появится стрелочки, с помощью которых можно перемещаться по истории
  //    (не забудьте!чекпоинт истории - нажатеи кнопки сохранить).

  //   let text = document.getElementById('textarea');
  //   let index;
  //   let butLeft = document.getElementById("left")
  //   let butRight = document.getElementById("right")

  //   function setText() {
  //       localStorage.setItem(localStorage.length, text.value)

  //   }

  //   butLeft.onclick = () => {
  //       for (const key in localStorage) {
  //           if (localStorage.hasOwnProperty(key)) {
  //               if (localStorage.getItem(key) === text.value) {
  //                   index = key
  //               }
  //           }
  //       }
  //       (index === "0") ? text.value = localStorage.getItem(index): text.value = localStorage.getItem(index - 1)

  //   }
  //   butRight.onclick = () => {
  //       for (const key in localStorage) {
  //           if (localStorage.hasOwnProperty(key)) {
  //               if (localStorage.getItem(key) === text.value) {
  //                   index = key
  //               }
  //           }
  //       }
  //       (index === (localStorage.length - 1).toString()) ? text.value = localStorage.getItem(index): text.value = localStorage.getItem(+index + 1)

  //   }




  // - Реализуйте записную книгу, хранящую данные в локальном хранилище.
  // Данные которые надо сохранять : ФИО, номер, почта, фирма, отдел, день рождения
  // Данные вводить через соответсвующую форму.
  // --Каждому контакту добавить кнопку для удаления контакта.
  // --Каждому контакту добавить кнопку редактироваиня. При нажати на нее появляется форма, в которой есть все необходимые
  //    инпуты для редактирования, которые уже заполнены данными объекта  
  //   localStorage.clear();

  let form = document.getElementById("form")
  let tempUser = {}
  let content = document.getElementById("content")
  form.button.onclick = ev => {
      //   ev.preventDefault();
      let person = {...tempUser }
      tempUser = {};
      for (let i = 0; i < form.children.length; i++) {
          const formElement = form.children[i];
          person[formElement.name] = formElement.value;
      }
      if (!person.id) {
          person.id = new Date().getTime();
      }

      console.log(person)
      saveUsers(person)
  }

  const Array_Users = "Array_Users"

  function saveUsers(user) {
      if (localStorage.hasOwnProperty(Array_Users)) {
          let arrayUsers = JSON.parse(localStorage.getItem(Array_Users));
          const found = arrayUsers.find(value => value.id === user.id)
          if (found) {
              const filter = arrayUsers.filter(value => value.id !== user.id)
              filter.push(user)
              localStorage.setItem(Array_Users, JSON.stringify(filter))
          } else {
              arrayUsers.push(user)
              localStorage.setItem(Array_Users, JSON.stringify(arrayUsers))
          }

      } else {
          localStorage.setItem(Array_Users, JSON.stringify([user]))
      }
  }

  function getdataFromLocSt() {
      if (localStorage.hasOwnProperty(Array_Users)) {
          const arrayUsers = JSON.parse(localStorage.getItem(Array_Users));
          for (const user of arrayUsers) {
              content.appendChild(createDivPerson(user))
          }
      }

  }
  getdataFromLocSt();

  function createDivPerson(user) {
      const main = document.createElement("div");
      let flag = true;
      for (const key in user) {

          if (flag) {
              const h3 = document.createElement("h3");
              h3.innerText = key + ":" + user[key];
              main.appendChild(h3);
              flag = false;
          } else {
              const p = document.createElement("p");
              p.innerText = key + ":" + user[key];
              main.appendChild(p)
          }
      }

      main.style = "width:150px; border: tomato 1px solid; float:left;"
      const b1 = document.createElement("button");
      const b2 = document.createElement("button");
      b1.innerText = "Edit"
      b2.innerText = "Delete"
      b1.onclick = function() {
          editUser(user.id)
      }
      b2.onclick = function() {
          deleteUser(user.id)
      }
      main.appendChild(b1)
      main.appendChild(b2)
      return main;

  }

  function deleteUser(id) {
      const parse = JSON.parse(localStorage.getItem(Array_Users))
      const filter = parse.filter(user => user.id !== id)
      localStorage.setItem(Array_Users, JSON.stringify(filter))
      location.reload();
  }

  function editUser(id) {
      const parse = JSON.parse(localStorage.getItem(Array_Users))
      const user = parse.find(user => user.id === id)
      for (let i = 0; i < form.children.length; i++) {
          const formElement = form.children[i];
          for (const key in user) {
              if (formElement.name === key) {
                  formElement.value = user[key];
              }

          }
      }
      tempUser = user;

  }