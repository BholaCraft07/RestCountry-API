

// fetch('https://restcountries.com/v3.1/all')
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         data.forEach((e) => {
//             console.log(e);
//             const countryContainer = document.querySelector('.country-container');
//             const countyCard = document.createElement('a');
//             countyCard.classList.add('country-card');
//             const cardHtml = `
//                 <div class="imageStore">
//                     <img src=${e.flags.svg} alt="">
//                 </div>
//                 <div class="content">
//                     <h2>${e.name.common}</h2>
//                     <p><b>Population :</b>${e.population}</p>
//                     <p><b>Region : </b>${e.region}</p>
//                     <p><b>Capital :</b>${e.capital}</p>
//                 </div>`;
//             countyCard.innerHTML = cardHtml;
//             countryContainer.appendChild(countyCard);

//         })
//     })





let currentPage = 1;
const itemsPerPage = 12;
let countries = [];

// Fetch countries data
fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        countries = data;
        displayCountries();
    });

// Function to display countries based on the current page
function displayCountries() {
    const countryContainer = document.querySelector('.country-container');
    countryContainer.innerHTML = ''; // Clear previous cards

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCountries = countries.slice(startIndex, endIndex);

    paginatedCountries.forEach((e) => {
        const countyCard = document.createElement('a');
        countyCard.classList.add('country-card');
        countyCard.href=`./CountryDetails.html?name=${e.name.common}`;
        const cardHtml = `
            <div class="imageStore">
                <img src=${e.flags.svg} alt="">
            </div>
            <div class="content">
                <h2>${e.name.common}</h2>
                <p><b>Population :</b>${e.population}</p>
                <p><b>Region : </b>${e.region}</p>
                <p><b>Capital :</b>${e.capital}</p>
            </div>`;
        countyCard.innerHTML = cardHtml;
        countryContainer.appendChild(countyCard);
    });

    // Update button states
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = endIndex >= countries.length;
}

// Event listeners for pagination buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayCountries();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if ((currentPage * itemsPerPage) < countries.length) {
        currentPage++;
        displayCountries();
    }
});


// Add this code to your existing script.js file

const modeToggle = document.getElementById('modeToggle');

// Check for saved user preference in local storage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    modeToggle.innerHTML = '<i class="fa-regular fa-sun"></i> &nbsp; Light Mode'; // Change text to Light Mode
}

// Toggle dark/light mode
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update local storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update button text
    modeToggle.innerHTML = isDarkMode ? '<i class="fa-regular fa-sun"></i> &nbsp; Light Mode' : '<i class="fa-regular fa-moon"></i> &nbsp; Dark Mode';
});