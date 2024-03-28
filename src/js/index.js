const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
  alert("Messagem enviada!")
  location.reload()
});

const sendMail = (mail) => {
  fetch("http://localhost:3050/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};
