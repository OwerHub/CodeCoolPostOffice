// ez működik
function loaded() {
  console.log("loaded");

  // list the mails.

  const mailDiv = document.getElementById("mailListContainer");
  const mailDivButton = document.getElementById("listMailsButton");

  function printMail(listArray) {
    mailDiv.innerHTML = "";
    for (const data of listArray) {
      mailDiv.insertAdjacentHTML(
        "beforeend",
        `
      <div> Id: ${data.id} </div>
      <div> From: ${data.from} </div>
      <div> To: ${data.to} </div>
      <div> Content: ${data.content} </div>
      <div>... </div>
      `
      );
      /*   console.log(data.id); */
    }
  }

  function fetchMail() {
    //get-nél üresen lehet hagyni a zárójelet
    fetch("http://localhost:8000/mails", {})
      .then((response) => response.json()) // a json egy függvény, ami átalakítja
      // visszaad egy értéket lényegen a Then-nek
      .then((responseJson) => printMail(responseJson));
  } // functionEnd

  mailDivButton.addEventListener("click", fetchMail);

  // Upload
  const referenceInput = document.getElementById("referenceNumber");
  const mailToInput = document.getElementById("mailTo");
  const mailFromInput = document.getElementById("mailFrom");
  const contentInput = document.getElementById("content");
  const submitButton = document.getElementById("sumbitButton");

  function uploadData() {
    let object = {};
    object.id = referenceInput.value;
    object.to = mailToInput.value;
    object.from = mailFromInput.value;
    object.content = contentInput.value;

    fetch("http://localhost:8000/submit-form", {
      method: "POST",
      /* mode: "cors", */
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });

    console.log(object);
  }

  submitButton.addEventListener("click", uploadData);

  // search
  const searchButton = document.getElementById("searchButton");
  const searchField = document.getElementById("searcReference");
  const searchDiv = document.getElementById("searchDiv");

  function printSearch(data) {
    searchDiv.innerHTML = "";

    searchDiv.insertAdjacentHTML(
      "beforeend",
      `
      <div> Id: ${data.id} </div>
      <div> From: ${data.from} </div>
      <div> To: ${data.to} </div>
      <div> Content: ${data.content} </div>
      <div>... </div>
      `
    );
    /*   console.log(data.id); */
  }

  function searchFetch() {
    let searchParam = "empty";
    if (searchField.value) {
      searchParam = searchField.value;
    }
    let urlVar = "http://localhost:8000/search/" + searchParam;
    fetch(urlVar, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => printSearch(responseJson));
  } // functionEnd

  searchButton.addEventListener("click", searchFetch);
}

window.addEventListener("load", loaded);
