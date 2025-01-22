# REST Countries API Project

Welcome to the **REST Countries API Project**! This project is designed to provide a seamless and interactive experience for exploring information about countries around the world. Built using modern web technologies, this project fetches data from the [REST Countries API](https://restcountries.com/) and presents it in a user-friendly interface.

---

## **Features**

- **Country Listings**: View a list of countries with key details such as population, region, and capital.
- **Pagination**: Navigate through the list of countries with pagination buttons.
- **Country Details**: Click on any country to view detailed information, including native name, subregion, currencies, languages, and more.
- **Border Countries**: Explore neighboring countries directly from the country details page.
- **Responsive Design**: The project is fully responsive, ensuring a great experience on all devices.

---

## **How to Use**

1. **Clone the Repository**: Start by cloning this repository to your local machine.
   ```bash
   git clone https://github.com/your-username/rest-countries-api-project.git
   ```

2. **Open the Project**:
   ```bash
   cd rest-countries-api-project
   open index.html
   ```

3. **Usage**:
   - **Explore Countries**: Use the pagination buttons to navigate through the list of countries.
   - **View Details**: Click on any country card to view more information.
   - **Toggle Dark Mode**: Use the "Dark Mode" button in the header to switch themes.

---

## Code Highlights

### Fetching Country Data
Country data is fetched from the REST Countries API and used to dynamically generate country cards.

```javascript
fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        countries = data;
        displayCountries();
    });
```

### Pagination
Pagination is implemented to handle large datasets efficiently.

```javascript
function displayCountries() {
    const countryContainer = document.querySelector('.country-container');
    countryContainer.innerHTML = ''; // Clear previous cards

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCountries = countries.slice(startIndex, endIndex);

    paginatedCountries.forEach((e) => {
        const countyCard = document.createElement('a');
        countyCard.classList.add('country-card');
        countyCard.href = `./CountryDetails.html?name=${e.name.common}`;
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
```

## Contributing
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Acknowledgments
- **REST Countries API**: For providing the comprehensive country data.
- **Frontend Mentor**: For the inspiration and design challenges.
- **Font Awesome**: For the beautiful icons used in the project.
