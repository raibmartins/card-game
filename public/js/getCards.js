const axios = require("axios");

function getCards(req, res) {
    var cards = [];
    axios.get('https://akabab.github.io/superhero-api/api/all.json').then(function(response){   
        let itens = response.data;
        for (i = cards.length; i<10; i++) {
            let toAdd = _getRandom(itens);
            if (!cards.includes(toAdd)) {
                cards.push(toAdd);
            }
        }
        res.json(_makeHeroes(cards))
    });
}

function _getRandom(list) {
    return list[Math.floor((Math.random()*list.length))];
}

function _makeHeroes(cards) {
    var heroes = [];
    cards.forEach((item)=>{
        heroes.push({
            id: item.id,
            nome: item.name,
            poderes: item.powerstats,
            imagem: item.images['md']
        });
    });
    return {
        p1Cards: heroes.splice(0,5),
        p2Cards: heroes
    };
}

module.exports = getCards;