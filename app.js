const fetchPokemon = () => {
    const getUrlPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonsPromises = []

    for (let i = 1; i<= 150; i++) {
        pokemonsPromises.push(
            fetch(getUrlPokemon(i)).then(response => response.json())
        )
    }

    /* Recebe um array de promises como argumento, e quando todas elas tiverem resolvidas,
    retorna outra promise que é um array com todos os resultados dessas pokemonsPromisses.
    Cada resultado é um objeto do pokemon em questão.*/
    Promise.all(pokemonsPromises)
        .then(pokemons => {
            const pokemonsHtmlLis = pokemons.reduce((accumulator, pokemon) => {
                const pokemonTypes = pokemon.types.map(typeInfo => typeInfo.type.name)
                accumulator += `
                    <li class="pokemon">
                        <img src="${pokemon.sprites.front_default}">
                        <h2>${pokemon.name}</h2>
                        <p>id: ${pokemon.id} </p>
                        <p>tipo(s): ${pokemonTypes.join(" | ")}</p>
                    </li>`
                return accumulator
            },'')

            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemonsHtmlLis
        })
}

fetchPokemon()