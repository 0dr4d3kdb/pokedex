const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const types_es = {
	normal: 'Normal',
	fire: 'Fuego',
	water: 'Agua',
	electric: 'Eléctrico',
	grass: 'Hierba',
	ice: 'Hielo',
	fighting: 'Luchador',
	poison: 'Venenoso',
	ground: 'Tierra',
	flying: 'Volador',
	psychic: 'Psíquico',
	bug: 'Insecto',
	rock: 'Roca',
	ghost: 'Fantasma',
	dragon: 'Dragón',
	dark: 'Oscuridad',
	steel: 'Acero',
	fairy: 'Hada',
};

const stats_es = {
    hp: 'Vida',
    attack: 'Ataque',
    defense: 'Defensa',
    "special-attack": 'Ataque especial',
    "special-defense": 'Defensa especial',
    speed: 'Velocidad', 
};

const $ = selector => document.querySelector(selector)

function getPokemon(input) {
    //const input = $("#input").value;
    fetch("https://pokeapi.co/api/v2/pokemon/"+input)
        .then(response=>response.json())
        .then(json=>{
            const color = colours[json.types[0].type.name];
            $("#datos").style.backgroundImage = `radial-gradient(circle, ${color}2B 0%, ${color}2B 30%, #111 90%, #111 100%)`;
            console.log(json);
            $("#id").innerHTML = json.id;
            $("#image").src = json.sprites.other.home.front_default;
            $("#name").innerHTML = json.name;
            $("#input").value = json.name;
            
            $("#types").innerHTML = "";
            json.types.forEach(t => {
                let type = document.createElement("div");
                type.className = "type";
                type.innerHTML = types_es[t.type.name];
                type.style.borderColor = colours [t.type.name];
                type.style.color = colours [t.type.name];
                $("#types").appendChild(type);
            });

            $("#stats").innerHTML = "";
            json.stats.forEach(s => {
                let stat = document.createElement("div");
                stat.className = "stat";
                stat.innerHTML = `
                <div class='stat-name'>${stats_es[s.stat.name]}</div>
                <div class='barra'>
                    <div class='bar' style='width: ${s.base_stat / 2}%; background-color: ${color}'></div>
                </div>
                <div class='stat-value'>${s.base_stat}</div>`;
                $("#stats").appendChild(stat);
            });

            fetch("https://pokeapi.co/api/v2/pokemon-species/"+input)
                .then(response=>response.json())
                .then(json=>{
                    console.log(json);
                    const entry = json.flavor_text_entries.find(e => e.language.name === "es");
                    $("#description").innerHTML = entry?.flavor_text.replace(/\s+/g, " ") || "";
                });
        });
}

function byName(){
    const input = $("#input").value;
    getPokemon(input)
}

function next(){
    const id = parseInt($("#id").innerHTML);
    getPokemon(id + 1);
}

function prev(){
    const id = parseInt($("#id").innerHTML);
    if(id!=1){
        getPokemon(id - 1);    
    }
}
