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
                accumulator += `
                    <li>
                        <h2>${pokemon.id}: ${pokemon.name}</h2>
                    </li>`
                return accumulator
            },'')

            console.log(pokemonsHtmlLis)
        })
}

fetchPokemon()