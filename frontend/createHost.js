document.querySelector("form").addEventListener('submit', async e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const response = await fetch("http://127.0.0.1:3000/guests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });
  console.log(await response.text());
  window.location.replace("http://localhost:5500/frontend/index.html")
})
