const BASEURL = "https://pokeapi.co/api/v2/";
// const catchBtn = document.querySelector("button")

document.getElementById("catchBtn").addEventListener("click", function () {
  console.log(this);
  axios.get(`${BASEURL}pokemon?limit=100000&offset=0`).then((res) => {
    let pokeArr = res.data.results;
    let totalNum = res.data.count;
    let pokemonNameArr = [];

    let randomURL = [
      pokeArr[Math.floor(Math.random() * totalNum)].url,
      pokeArr[Math.floor(Math.random() * totalNum)].url,
      pokeArr[Math.floor(Math.random() * totalNum)].url,
    ];

    let threePokemonPromises = [];

    for (let i = 0; i < 3; i++) {
      threePokemonPromises.push(axios.get(randomURL[i]));
    }

    Promise.all(threePokemonPromises)
      .then((pokemon) => {
        for (let i = 0; i < 3; i++) {
          pokemonNameArr.push(pokemon[i].data.name);
        }

        return Promise.all(threePokemonPromises);
      })
      .then((pokemon) => {
        let pokemonSpeciesArr = [];
        for (let i = 0; i < 3; i++) {
          pokemonSpeciesArr.push(axios.get(pokemon[i].data.species.url));
        }

        return Promise.all(pokemonSpeciesArr);
      })
      .then((pokemon) => {
        let flavorArr = [];
        let enFlavTextArr = [];

        for (let i = 0; i < 3; i++) {
          flavorArr.push(pokemon[i].data.flavor_text_entries);
        }
        console.log(flavorArr);
        for (let i = 0; i < 3; i++) {
          let first = flavorArr[i].find(
            (flavText) => flavText.language.name === "en"
          );
          enFlavTextArr.push(first.flavor_text);
          console.log(`${pokemonNameArr[i]}: ${enFlavTextArr[i]}`);
        }
      })

      .catch((err) => console.log(err));
  });
});
