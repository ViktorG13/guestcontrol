const guestsList = document.getElementById("guests-list");

const renderList = (data) => {
  data.forEach((element) => {
    guestsList.innerHTML += `
    <div id="guest">
      <div id="guest-name"><h1>${element.name}</h1></div>
      <div id="guest-register-dt"><p>${element.hostedat.substring(0, 16).replace("T", ":")}</p></div>
      <div id="guest-controllers">
        <button
          id="guest-controllers-checkout"
          title="Realizar o Checkout do Hospede"
        >
          <span class="material-symbols-outlined" onclick="checkoutGuest(${element.id})"> logout </span>
        </button>
      </div>
    </div>
    `;
  });
};

const getAllHosts = async () => {
  const data = await fetch("http://127.0.0.1:3000/guests", { method: "GET" });
  data.json().then((data) => {
    console.log(...data);
    renderList(data)
  });
};

const checkoutGuest = async (id) => {
  console.log(id);
  const response = await fetch(`http://127.0.0.1:3000/guests/${id}`, {method: "DELETE"});
  window.location.reload();
};

document.addEventListener("DOMContentLoaded", async () => await getAllHosts());
