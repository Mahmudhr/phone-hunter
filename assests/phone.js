const loadPhones = (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, dataLimit));
};
const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.textContent = "";

  // Show Button
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 9) {
    // Display only 20 phones
    phones = phones.slice(0, 9);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // Display no phones found
  const noPhone = document.getElementById("no-phone");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // Display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `<div class ="card p-5">
             <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
              <h2>Brand: ${phone.brand}</h2>
                <h5 class="card-title">Title: ${phone.phone_name}</h5>
                <button onclick="loadPhonDetails('${phone.slug}')"class="btn btn-primary mt-3" data-bs-toggle="modal"
          data-bs-target="#phoneDetailModal">Show Details</button>
              </div>
              </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop spinner
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};
// handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader/spinner
  processSearch(9);
});

// search by press enter key
document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      processSearch(9);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSpinner = document.getElementById("loader");
  if (isLoading) {
    loaderSpinner.classList.remove("d-none");
  } else {
    loaderSpinner.classList.add("d-none");
  }
};
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhonDetails = async (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneModal(data.data);
};

const displayPhoneModal = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const modalBody = document.getElementById("modalBody");
  // modalBody.innerText = phone.releaseDate;
  modalBody.innerHTML = `
   <p>Release Note: ${phone.releaseDate ? phone.releaseDate : 'Release Date is not found'}</p>
   <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'Storage is not found'}</p>  
   <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'Memory is not found'}</p>  
   <p>DisplaySize: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Display Size is not found'}</p>  
  `
};
// loadPhones();
