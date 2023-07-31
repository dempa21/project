const form = document.getElementById("loginForm");
// const boton = document.getElementById("botonReestablecer");
// import { mailingService } from "../../dao/services/mailing.service.js";


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  
  if(result.error) {
    alert(result.error);
  } else {
    window.location.href = '/products';
  }
});


// boton.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   // mailingService.
//   const data = new FormData(form);
//   const obj = {};

//   data.forEach((value, key) => (obj[key] = value));

//   let response = await fetch("/mail", {
//     method: "POST",
//     body: JSON.stringify(obj),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   let result = await response.json();
  
//   if(result.error) {
//     alert(result.error);
//   } else {
    
//   }

// });


