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
  var cardsChosen = [] //空の配列を定義(選んだカードの名前を格納)
  var cardsChosenId = [] //空の配列を定義(選んだカードのIDを格納)
  const cardsWon = [] //空の配列を定義(マッチングしたカードの名前を格納)

  //盤面を生成
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img') //指定したHTML要素(ここではimg)を生成
      card.setAttribute('src', 'images/ramen.jpeg') //指定の要素に属性を追加(画像をramen.jpegに指定)
      card.setAttribute('data-id', i) //imgにdata-idを与える(0,1,2,3…)
      card.setAttribute('width', 200)
      card.setAttribute('height', 200)
      card.addEventListener('click', flipCard) //画像をクリックしたらflipCard関数を実行
      grid.appendChild(card) //div要素(class="grid")にcard(img)を追加
    }
  }

  //めくられた2枚のカードの状態を確認
  function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    //1枚目にめくったカードをもう一度めくろうとした場合
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/ramen.jpeg')
      cards[optionTwoId].setAttribute('src', 'images/ramen.jpeg')
      alert('1枚目とは別のカードをめくってね')
    }
    //1枚目と2枚目のカードの名前が同じだった場合
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert(`${cardArray[optionOneId].name}のラーメンを見つけた！食いてえ〜`)
      cards[optionOneId].removeEventListener('click', flipCard) //以前にaddEventListener()で登録されたイベントリスナーを削除
      cards[optionTwoId].removeEventListener('click', flipCard) //以前にaddEventListener()で登録されたイベントリスナーを削除
      cardsWon.push(cardsChosen) //cardsWon配列に、選んだカードの名前を追加
    //1枚目と2枚目のカードの名前が違った場合
    } else {
      cards[optionOneId].setAttribute('src', 'images/ramen.jpeg')
      cards[optionTwoId].setAttribute('src', 'images/ramen.jpeg')
      alert('もう一度ラーメンを巡る旅へ')
    }
    cardsChosen = [] //選んだカードの名前を格納していたcardsChosen配列を空にする
    cardsChosenId = [] //選んだカードのIDを格納していたcardsChosenId配列を空にする
    resultDisplay.textContent = cardsWon.length //resultDisplay(スコア表示させてるh3タグ)のテキスト内容をcardsWon配列の要素数とする
    // 全てのカードがめくられた場合の処理
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = '今日からお前が二郎だ。'
    }
  }

  //カードをめくる
  function flipCard() {
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name) //空のcardsChosen配列にカードの名前を追加(カードはcardArrayから取ってくる)
    cardsChosenId.push(cardId) //空のcardsChosenId配列にcardIdを追加
    this.setAttribute('src', cardArray[cardId].img) //this(ここではcard)の画像を(ramen.jpegから)cardArrayから取ってきたカードの画像に変更
    if (cardsChosen.length ===2) { //cardsChosen配列の要素数が2になる(2枚のカードがめくられた状態)と、500ミリ秒後にcheckForMatch関数を実行
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})
