function getData(page) {
    const apiUrl = "https://swapi.dev/api/people/?page=" + page
    console.log(apiUrl)
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return data.results.map(person => ({
                name: person.name,
                height: person.height,
                mass: person.mass
            }));
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

function createPokemonCard(person, sectionClass) {
    let backgroundColor;

    switch (sectionClass) {
        case 'pokemones-planta':
            backgroundColor = '#fa8070';
            break;
        case 'pokemones-fuego':
            backgroundColor = '#91ed91';
            break;
        case 'pokemones-agua':
            backgroundColor = '#87cefa';
            break;
        default:
            backgroundColor = '#ce4e50'; 
    }

    return `
        <div class="card">
            <div class="pokemon-title">
                <b><p class="pokemon__name" style="background-color: ${backgroundColor};">${person.name}</p></b>
            </div>
            <div class='pokemon-info'>
                <p class="pokemon__height"><b>Altura:</b> ${person.height} cm</p><hr>
                <p class="pokemon__weight"><b>Peso:</b> ${person.mass} kg</p><hr>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    let personData = [];

    let plantaIndex = 0, fuegoIndex = 5, aguaIndex = 10;

    getData(1).then(data => {
        personData.push(...data);

        getData(2).then(data => {
            personData.push(...data);

            document.querySelector('.energia-planta').addEventListener('mouseenter', () => {
                if (plantaIndex < 5) {
                    const container = document.querySelector('.pokemones-planta');
                    container.innerHTML += createPokemonCard(personData[plantaIndex], 'pokemones-planta');
                    plantaIndex++;
                }
            });

            document.querySelector('.energia-fuego').addEventListener('mouseenter', () => {
                if (fuegoIndex < 10) {
                    const container = document.querySelector('.pokemones-fuego');
                    container.innerHTML += createPokemonCard(personData[fuegoIndex], 'pokemones-fuego');
                    fuegoIndex++;
                }
            });

            document.querySelector('.energia-agua').addEventListener('mouseenter', () => {
                if (aguaIndex < 15) {
                    const container = document.querySelector('.pokemones-agua');
                    container.innerHTML += createPokemonCard(personData[aguaIndex], 'pokemones-agua');
                    aguaIndex++;
                }
            });
        });
    });
});
