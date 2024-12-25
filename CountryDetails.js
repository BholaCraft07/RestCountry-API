
// console.log(CountryName);

const CountryName = new URLSearchParams(window.location.search).get('name')
fetch(`https://restcountries.com/v3.1/name/${CountryName}?fullText=true`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        data.forEach((country) => {
            const CountryContainer = document.querySelector('.country-container')
            // const nativename=document.querySelector('.native');
            // console.log(Object.values(country.name.nativeName)[0].common)
            // if(country.name.nativeName){
            //     nativename.innerHTML=(Object.values(country.name.nativeName)[0].common);
            // }
            // else{
            //     nativename.innerHTML=country.name.common;
            // }
            const htmlcode = ` <div class="country-card">
                    <div class="imageStore">
                        <img src=${country.flags.svg} alt="" width="100%">
                    </div>
                    <div class="content">
                        <h1>${country.name.common}</h1>
                        <div class="content-container">
                            <div class="left">
                                <p><b>Native Name :</b><span class="native">${Object.values(country.name.nativeName)[0].common}</span></p>
                                <p><b>Population :</b>${country.population}</p>
                                <p><b>Region : </b> ${country.region}</p>
                                <p><b>Sub Region : </b>${country.subregion}</p>
                                <p><b>Capital :</b>${country.capital}</p>
                            </div>
                            <div class="right">
                                <p><b>Top Level Domain :</b>${country.tld.join(', ')}</p>
                                <p><b>Currencies : </b>${Object.values(country.currencies)
                    .map((currency) => currency.name)
                    .join(', ')}</p>
                                <p><b>Language :</b>${Object.values(country.languages).join(', ')}</p>
                            </div>
                        </div>
                        <div class="BorderC">
                            <h3>Border country :</h3>
                            <div id="border-countries"></div>
                        </div>
                    </div>
                </div>`
            CountryContainer.innerHTML = htmlcode
            const borderCountriesContainer = document.querySelector('#border-countries');
            if (country.borders) {
                country.borders.forEach((border) => {
                    fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                        .then((res) => res.json())
                        .then(([borderCountry]) => {
                            const borderCountryTag = document.createElement('a');
                            borderCountryTag.innerText = borderCountry.name.common;
                            borderCountryTag.href = `CountryDetails.html?name=${borderCountry.name.common}`;
                            borderCountryTag.classList.add('design')
                            // borderCountryTag.style.marginRight = '20px'; // Add some spacing
                            borderCountriesContainer.append(borderCountryTag);
                        });
                });
            } else {
                borderCountriesContainer.innerText = 'No border countries';
            }
        })
        document.querySelector('.backBtn').addEventListener('click', ()=> {
            if (document.referrer) {
                // Redirect to the referring page
                window.location.href = document.referrer;
            } else {
                // Fallback to a default page if no referrer is available
                window.location.href = 'index.html';
            }
        });
    })

    