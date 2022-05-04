_initialize();

const CARDS_ATRIBUTES = [
    'intelligence',
    'strength',
    'speed',
    'durability',
    'power',
    'combat'
]

var players = {
    player1: {
        cards: [],
        points: 0
    },
    player2: {
        cards: [],
        points: 0
    }
}

var rodada;
var playing;

function _initialize() {
    _loadCards();
}

function _loadCards() {
    fetch('getCards').then(function(response) {
        response.json().then(function(data) {
            players.player1.cards = data["p1Cards"];
            players.player2.cards = data["p2Cards"];
            _startGame();
        });
    });
}

function _startGame() {
    rodada = 0;
    playing = 'player1';
    _loadAllViewCards();
    _disableSelectAtribute();
}

function _loadViewCards(id, card) {
    var lis = _getListItens(id);

    lis.forEach((li)=> {
        CARDS_ATRIBUTES.forEach((atributo) => {
            if (li.firstChild.value === atributo) {
                if (id.includes(playing)) {
                    li.lastChild.innerHTML = ' '+ _parseAtributeName(atributo) + ': ' + card.poderes[atributo];
                } else {
                    li.lastChild.innerHTML = ' '+ _parseAtributeName(atributo) + ': ?'
                }
            }
        })
    });
}

function _parseAtributeName(atribute) {
    switch(atribute) {
        case 'intelligence':
            return 'Inteligência';
        case 'strength': 
            return 'Força';
        case 'speed':
            return 'Velocidade';
        case 'durability':
            return 'Durabilidade';
        case 'power':
            return 'Poder'
        case 'combat':
            return 'Combate'
    }
}

function comparar() {
    var atributo = _getAtributoChecked();
    if (atributo === undefined) {
        alert('Seleciona um atributo para comparar');
        return;
    }
    fetch('/comparar', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                p1Card: players.player1.cards.splice(0,1)[0],
                p2Card: players.player2.cards.splice(0,1)[0],
                atributo: atributo
            }
        )
    }).then(function(response) {
        response.json().then((data)=>{
            rodada += 1;
            if (data !== 'empate') {
                _unselectRadios(playing);
                playing = data;
                players[data].points += 1;
                document.getElementById(data + '-points').innerHTML = 'Pontos: ' + players[data].points;
            }
            if (rodada < 5) {
                _disableSelectAtribute();
                if (playing === 'player1') {
                    _enableSelectAtribute();
                }
                _loadAllViewCards();
                if (playing === 'player2') {
                    _startPcPlaying();
                }
            } else {
                setTimeout(()=> {
                    if (confirm(_messageFinalDeJogo())) {
                        window.location.reload();
                    } else {
                        window.location.href = 'choose'
                    }
                }, 1000)
            }
        })
    })
}

function _startPcPlaying() {
    fetch('/getAtributeToUse', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                card: players.player2.cards[0],
            }
        )
    }).then(function(response) {
        response.json().then((data)=>{
            setTimeout(()=> {
               _setChecked(data); 
               setTimeout(()=> {
                   comparar();
               }, 3000);
            }, 3000);
        });
    });
}

function _setChecked(atributo) {
    var lis = _getListItens('player2');
    lis.forEach((li) => {
        if (li.children[0].value === atributo) {
            li.children[0].checked = true;
        } 
    });
};

function _messageFinalDeJogo() {
    var mensagem = 'O jogo finalizou, '
    if (players.player1.points > players.player2.points) {
        mensagem += 'o vencedor foi o player 1.'
    } else if (players.player2.points > players.player1.points) {
        mensagem += 'o vencedor foi o player 2.'
    } else {
        mensagem += 'houve um empate.'
    }
    mensagem += ' Quer reiniciar a partida?'
    return mensagem;
}

function _loadAllViewCards() {
    _loadViewCards('player1', players.player1.cards[0]);
    _loadViewCards('player2', players.player2.cards[0]);
    document.getElementById('player1-card').src = players.player1.cards[0].imagem;
    document.getElementById('player2-card').src = players.player2.cards[0].imagem;
}

function _getAtributoChecked() {
    var lis = _getListItens(playing);
    var checked;
    lis.forEach((li) =>{
        if (li.children[0].checked) {
            checked = li.children[0].value;
        }
    })
    return checked;
}

function _getListItens(player) {
    return Array.from(document.getElementById(player + '-radios').getElementsByClassName('list-group-item'))
}

function _disableSelectAtribute() {
    var lis = _getListItens(playing === 'player1' ? 'player2' : 'player1');
    lis.forEach((li) => {
        li.children[0].disabled = true;
    });
}

function _enableSelectAtribute() {
    var lis = _getListItens(playing);
    lis.forEach((li) => {
        li.children[0].disabled = false;
    });
}

function _unselectRadios(player) {
    var lis = _getListItens(player);

    lis.forEach((li)=> {
        li.children[0].checked = '';
    })
}