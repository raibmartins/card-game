const CARDS_ATRIBUTES = [
    'intelligence',
    'strength',
    'speed',
    'durability',
    'power',
    'combat'
]

function getAtributeToUse(req, res) {
    var card = req.body.card;
    var atributos = [];
    CARDS_ATRIBUTES.forEach((atributo) => {
        atributos.push({atributo: atributo, valor: card.poderes[atributo]});
    });
    res.json(_getMax(atributos))
}

function _getMax(atributos) {
    var max = {valor: 0};
    atributos.forEach((atributo) => {
        if (atributo.valor > max.valor) {
            max = atributo;
        }
    });
    return max.atributo;
}


module.exports = getAtributeToUse;