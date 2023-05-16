let API = "http://localhost:8000/INSTAGRAM";
let createBtn = document.querySelector("#iconAdd");
let mainModal = document.querySelector(".main-modal");
let closeBtnModal = document.querySelector(".btn-closer");
let btnSaveModal = document.querySelector("#btn-addmodal");
let images = document.querySelector("#img");
let images1 = document.querySelector(".post-image");
let userName = document.querySelector("#user");
let comment = document.querySelector("#comenttts");
let contactCard = document.querySelector(".contactCard");
console.log(mainModal);
// MODAL
createBtn.addEventListener("click", async function () {
  mainModal.style.display = "block";
});

closeBtnModal.addEventListener("click", () => {
  mainModal.style.display = "none";
});
// MODAL

// Отправление в db.json

btnSaveModal.addEventListener("click", async function () {
  let obj = {
    images: images.value,
    userName: userName.value,
    comment: comment.value,
  };
  if (!obj.images.trim() || !obj.userName.trim() || !obj.comment.trim()) {
    alert("Заполните все поля");
    return;
  }
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  images.value = "";
  userName.value = "";
  comment.value = "";
  mainModal.style.display = "none";
  render();
});

// Отправление в db.json

// render start
async function render() {
  let contact = await fetch(API)
    // let contact = await fetch(`API`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  console.log(contact);
  contactCard.innerHTML = "";
  contact.forEach((element) => {
    console.log(element);
    let newElem = document.createElement("div");
    newElem.innerHTML = ` 
    <div class="post">
    <div class="info">
      <div class="user">
        <div class="profile-pic">
          <img
            src="${element.images}"
            alt=""
          />
        </div>
        <p>${element.userName}</p>
      </div>
      <img src="" class="options" alt="" />
    </div>
    <img src="${element.images}" class="post-image" alt="" />
    <div class="post-content">
      <div class="reaction-wrapper">
        <img src="./HEART.png" class="icon" alt="" />
        <img src="comments.png" class="icon" alt="" />
        <img src="./podelitstya.png" class="icon" alt="" />
        <img src="img/save.PNG" class="save icon" alt="" />
      </div>
      <p class="likes">1,012 likes</p>
      <p class="description">
    <span>username </span> ${element.comment}
      </p>
      <p class="post-time">2 minutes ago</p>
    </div>
    <div class="comment-wrapper">
      <img src="img/smile.PNG" class="icon" alt="" />
      <input
        type="text"
        class="comment-box"
        placeholder="Add a comment"
      />
      <button class="comment-btn">post</button>
    </div>
  </div>
      `;
    contactCard.append(newElem);
  });
}
render();

// render end
