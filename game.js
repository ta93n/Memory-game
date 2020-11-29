/*
addEventListenerとは、イベントに合わせて実行させる関数を登録するためのメソッド

DOMContentLoadedとは、最初のHTML文書の読み込みと解析が完了したとき、
スタイルシート、画像、サブフレームの読み込みが完了するのを待たずに発生
*/
document.addEventListener('DOMContentLoaded', ()=>{
  const cardArray =[ //カードの配列を定義
    {
      name: 'kaeru(中野駅)',
      img: 'images/kaeru.jpeg'
    },
    {
      name: 'kaeru(中野駅)',
      img: 'images/kaeru.jpeg'
    },
    {
      name: 'ラーメンエース(西八王子駅)',
      img: 'images/エース.jpeg'
    },
    {
      name: 'ラーメンエース(西八王子駅)',
      img: 'images/エース.jpeg'
    },
    {
      name: 'ジャンプ(一ノ割駅)',
      img: 'images/ジャンプ.jpeg'
    },
    {
      name: 'ジャンプ(一ノ割駅)',
      img: 'images/ジャンプ.jpeg'
    },
    {
      name: 'せんだが家(北参道駅)',
      img: 'images/せんだが家.jpeg'
    },
    {
      name: 'せんだが家(北参道駅)',
      img: 'images/せんだが家.jpeg'
    },
    {
      name: 'どでん(北浦和駅)',
      img: 'images/どでん.jpeg'
    },
    {
      name: 'どでん(北浦和駅)',
      img: 'images/どでん.jpeg'
    },
    {
      name: 'パ郎(秋葉原駅)',
      img: 'images/パ郎.jpeg'
    },
    {
      name: 'パ郎(秋葉原駅)',
      img: 'images/パ郎.jpeg'
    },
    {
      name: '二郎(めじろ台駅)',
      img: 'images/めじろ台二郎.jpeg'
    },
    {
      name: '二郎(めじろ台駅)',
      img: 'images/めじろ台二郎.jpeg'
    },
    {
      name: 'らーめん大(下高井戸駅)',
      img: 'images/らーめん大下高井戸.jpeg'
    },
    {
      name: 'らーめん大(下高井戸駅)',
      img: 'images/らーめん大下高井戸.jpeg'
    },
    {
      name: 'らーめん陸(上町駅)',
      img: 'images/らーめん陸.jpeg'
    },
    {
      name: 'らーめん陸(上町駅)',
      img: 'images/らーめん陸.jpeg'
    },
    {
      name: '歌舞伎町二郎(新宿駅)',
      img: 'images/歌舞伎二郎.jpeg'
    },
    {
      name: '歌舞伎町二郎(新宿駅)',
      img: 'images/歌舞伎二郎.jpeg'
    },
    {
      name: '角ふじ(南流山駅)',
      img: 'images/角ふじ.jpeg'
    },
    {
      name: '角ふじ(南流山駅)',
      img: 'images/角ふじ.jpeg'
    },
    {
      name: '田田(八王子駅)',
      img: 'images/田田.jpeg'
    },
    {
      name: '田田(八王子駅)',
      img: 'images/田田.jpeg'
    },
    {
      name: '八王子野猿街道二郎(京王堀之内駅)',
      img: 'images/野猿二郎.jpeg'
    },
    {
      name: '八王子野猿街道二郎(京王堀之内駅)',
      img: 'images/野猿二郎.jpeg'
    },
    {
      name: '泪橋(溝の口駅)',
      img: 'images/泪橋.jpeg'
    },
    {
      name: '泪橋(溝の口駅)',
      img: 'images/泪橋.jpeg'
    }
  ]

  /*
  sort関数は引数に関数を指定でき、ソートのルールを指定できる


  */
  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  var cardsChosen = []
  var cardsChosenId = []
  const cardsWon = []

  //盤面を生成
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img') // 指定したHTML要素(ここではimg)を生成
      card.setAttribute('src', 'images/kaeru.jpeg') //指定の要素に新しい属性を追加 or 属性の値を変更
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard) //クリックイベントが起きたらflipCard関数を実行
      grid.appendChild(card) //div要素(class="grid")にcard(img)を追加
    }
  }

  //check for matches
  function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/mic.jpeg')
      cards[optionTwoId].setAttribute('src', 'images/mic.jpeg')
      alert('Dont click twice')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert(`You Found ${cardArray[optionOneId].name}`)
      //cards[optionOneId].setAttribute('src', 'images/blank.jpeg')
      //cards[optionTwoId].setAttribute('src', 'images/blank.jpeg')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/mic.jpeg')
      cards[optionTwoId].setAttribute('src', 'images/mic.jpeg')
      alert('Try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  //flip your card
  function flipCard() {
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})
