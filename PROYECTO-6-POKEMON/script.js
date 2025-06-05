document.addEventListener("DOMContentLoaded", async () => {
    let randon = Math.floor(Math.random() * (400 - 1 + 1) + 1);
    let res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + randon)
    let debilidad = await axios.get(res.data.types[0].type.url)
    console.log(res);
    
    
    document.getElementById("nombre").textContent = res.data.name.toUpperCase()
    document.getElementById("numero").textContent = "#" + res.data.id
    let numerocolor= document.getElementById("numero")
    document.getElementById("pok").src = res.data.sprites.other.dream_world.front_default
    document.getElementById("altura").textContent = "ALTURA: " + res.data.height / 10 + "m"
    document.getElementById("peso").textContent = "PESO: " + res.data.weight / 10 + "kg"
    
    
    
    const colores = [
        { type: 'normal', color: '#A8A77A' },
        { type: 'fire', color: '#EE8130' },
        { type: 'water', color: '#6390F0' },
        { type: 'electric', color: '#F7D02C' },
        { type: 'grass', color: '#7AC74C' },
        { type: 'ice', color: '#96D9D6' },
        { type: 'fighting', color: '#C22E28' },
        { type: 'poison', color: '#A33EA1' },
        { type: 'ground', color: '#E2BF65' },
        { type: 'flying', color: '#A98FF3' },
        { type: 'psychic', color: '#F95587' },
        { type: 'bug', color: '#A6B91A' },
        { type: 'rock', color: '#B6A136' },
        { type: 'ghost', color: '#735797' },
        { type: 'dragon', color: '#6F35FC' },
        { type: 'dark', color: '#705746' },
        { type: 'steel', color: '#B7B7CE' },
        { type: 'fairy', color: '#D685AD' }
    ];
    
    let lista = []
    res.data.types.forEach((item) => {
        colores.forEach((elemento) => {
            if (item.type.name === elemento.type) {
                lista.push(elemento.color)
                numerocolor.style.color=lista[0]
                document.getElementById("tipo-pokemon").innerHTML += ` <button class="boton" style="background:${elemento.color}">${item.type.name.toUpperCase()}</button> `
                if (item.slot > 1) {
                    document.querySelector(".card").innerHTML += `<style>.card{ background: linear-gradient(${lista[0]},${lista[1]});}</style>`
                }
                else {
                    document.querySelector(".card").innerHTML += `<style>.card{ background: ${lista}});}</style>`
                }
            }
        })
    })


    debilidad.data.damage_relations.double_damage_from.forEach((elemento) => {
        colores.forEach((item) => {
            if (item.type == elemento.name) {
                document.getElementById("debilidad").innerHTML += `<button class="boton" style="background:${item.color}" >${elemento.name.toUpperCase()} </button>  `
            }
        })
    })


    res.data.stats.forEach((elemento) => {
        let porcentage = (elemento.base_stat / 255) * 100
        document.getElementById("estadistica").innerHTML += `<div class="textos">${elemento.stat.name.toUpperCase()}   ${elemento.base_stat} / 255 </div>
        <div id="contenedor-linea"><div id="linea" style="width:${porcentage}%; background:${lista[0]}"></div></div>`
    })


})