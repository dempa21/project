const formEstablecer = document.getElementById("reestablecerForm");



formEstablecer.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const data = new FormData(formEstablecer);
    const obj = {};
  
    data.forEach((value, key) => (obj[key] = value));
  
    
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