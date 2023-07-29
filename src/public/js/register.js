const form = document.getElementById("registerForm");
const button = document.getElementById("reestablecerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  console.log(result);

  if(result.error) {
    alert(result.error)
  } else {
    window.location.href = '/login';
  }
});

button.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { email, password } = req.body;
  const obj = {
    email,
    password
  }
  
  let response = await fetch("/api/sessions/reestablecer", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  console.log(result);

  if(result.error) {
    alert(result.error)
  } else {
    window.location.href = '/login';
  }

  


});