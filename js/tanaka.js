(function ($) {
  'use strict';

  // 合計問題数の設定
  const QUESTION_TOTAL_NUM = 10;

  // 制限時間(秒)
  const TIME_LIMIT = 10;

  // 出題済み問題IDを記録する配列(セッション中保持)
  let usedQuestionIds = [];

/* -----------------------------------------------
田中先生クイズ（全50問）
-------------------------------------------------- */
  const prefecturalCapital = [
    {
      id: "01",
      question: "田中先生の出身地は？",
      answer01: "大阪府",
      answer02: "岩手県",
      answer03: "栃木県",
      answer04: "広島県",
      hint: "たこ焼きだねっ",
      manaka: "広島広島",
    },
    {
      id: "02",
      question: "田中先生の血液型は？",
      answer01: "O型",
      answer02: "A型",
      answer03: "AB型",
      answer04: "不明",
      hint: "おおざっぱと言われがち",
      manaka: "じゃあO型",
    },
    {
      id: "03",
      question: "田中先生の誕生月は？",
      answer01: "5月",
      answer02: "11月",
      answer03: "8月",
      answer04: "2月",
      hint: "みんなハッピーGWがあるよ",
      manaka: "陽キャだから８月だろう",
    },
    {
      id: "04",
      question: "田中先生の中学時代の部活は？",
      answer01: "卓球部",
      answer02: "野球部",
      answer03: "弓道部",
      answer04: "吹奏楽部",
      hint: "ラケット使う部活動だよ",
      manaka: "野球やってそうー",
    },
    {
      id: "05",
      question: "田中先生の小さい頃の夢は？",
      answer01: "パイロット",
      answer02: "すし職人",
      answer03: "サラリーマン",
      answer04: "警察官",
      hint: "空に関係する職業だよ",
      manaka: "男の子はみんなパイロットですから",
    },
    {
      id: "06",
      question: "田中先生の好きな食べ物は？",
      answer01: "ピザ",
      answer02: "ハンバーグ",
      answer03: "青椒肉絲",
      answer04: "納豆ご飯",
      hint: "イタリアといえば、、、",
      manaka: "さっきも出てきたなあ ピザ好きですよ、絶対",
    },
    {
      id: "07",
      question: "田中先生の嫌いな食べ物は？",
      answer01: "特になし",
      answer02: "ゴーヤチャンプル",
      answer03: "人参",
      answer04: "酢豚",
      hint: "田中先生は好き嫌いないよ",
      manaka: "僕が嫌いなので…、ゴーヤでしょ？",
    },
    {
      id: "08",
      question: "田中先生の趣味は？",
      answer01: "トライアスロン",
      answer02: "キャンプ",
      answer03: "ゲーム",
      answer04: "読書",
      hint: "3種目連続で行うものだよ",
      manaka: "はてこれはお伺いしましょう、読書とか好きなんじゃない？違うの？",
    },
    {
      id: "09",
      question: "田中先生の得意だった教科は？",
      answer01: "数学",
      answer02: "社会",
      answer03: "理科",
      answer04: "情報処理",
      hint: "サインコサインタンジェント！！！",
      manaka: "情報処理は得意なんじゃない？そんなことないかなあ",
    },
    {
      id: "10",
      question: "田中先生の好きなアーティストは？",
      answer01: "ももいろクローバーZ",
      answer02: "乃木坂46",
      answer03: "twice",
      answer04: "perfume",
      hint: "田中先生は4人組のアイドルが好きなんだよ～",
      manaka: "アイドルが好きなんですね、この中からどれかあるって事ですよねperfumeであってほしい",
    },
    {
      id: "11",
      question: "田中先生の苦手だった教科は？",
      answer01: "国語",
      answer02: "家庭科",
      answer03: "社会",
      answer04: "体育",
      hint: "文系の教科だよぉ",
      manaka: "家庭科が苦手だったんじゃない？違うかなあ",
    },
    {
      id: "12",
      question: "田中先生の学生時代のアルバイトで思い出に残っているものは？",
      answer01: "居酒屋店員",
      answer02: "ピザ配達",
      answer03: "スーパーのレジ",
      answer04: "ライブスタッフ",
      hint: "お酒にかかわるお仕事",
      manaka: "これは…ピザでしょ",
    },
    {
      id: "13",
      question: "田中先生の時間があったら行きたい国は？",
      answer01: "ドイツ",
      answer02: "カナダ",
      answer03: "スイス",
      answer04: "韓国",
      hint: "ビールの国",
      manaka: "ドイツとかじゃない？ビール好きでしょう",
    },
    {
      id: "14",
      question: "田中先生が朝起きたら一番にすることは？",
      answer01: "体重を測る",
      answer02: "カーテン開ける",
      answer03: "金魚にご飯あげる",
      answer04: "筋トレ",
      hint: "何かに乗るよ",
      manaka: "体重測っているの？筋トレかなぁ？",
    },
    {
      id: "15",
      question: "田中先生の好きな飲み物は？",
      answer01: "ビール",
      answer02: "カフェラテ",
      answer03: "イチゴみるく",
      answer04: "オレンジ100%",
      hint: "プリン体にご注意を。",
      manaka: "オレンジ100％？いや、ビールかもしれない",
    },
    {
      id: "16",
      question: "田中先生の休日の過ごし方は？",
      answer01: "気分次第",
      answer02: "家から出ない",
      answer03: "ちょっと外出",
      answer04: "予定パンパン",
      hint: "田中先生はノープラン派なのです！",
      manaka: "謎ですねえ",
    },
    {
      id: "17",
      question: "田中先生の集団行動でのタイプは？",
      answer01: "単独行動",
      answer02: "先頭",
      answer03: "まとめ役",
      answer04: "ついていく",
      hint: "一人が好きらしいよ～",
      manaka: "意外とまとめ役だったりして",
    },
    {
      id: "18",
      question: "田中先生が決断する時は？",
      answer01: "期限ぎりぎり",
      answer02: "直感",
      answer03: "誰かに相談",
      answer04: "情報収集",
      hint: "ラストスパート",
      manaka: "とりあえず情報収集とか？",
    },
    {
      id: "19",
      question: "田中先生が失敗したときはどうなる？",
      answer01: "笑いにする",
      answer02: "引きずる",
      answer03: "反省して切り替え",
      answer04: "なかったことに",
      hint: "田中先生は前向きな人だよ",
      manaka: "引きずるのかなあ、引きずらないような人ですよね",
    },
    {
      id: "20",
      question: "田中先生が一日だけ生徒になれるとしたら誰の授業を受けたい？",
      answer01: "臼井先生(デザイン得意)",
      answer02: "赤羽根先生(優しそう)",
      answer03: "間中先生(面白そう)",
      answer04: "自分(ももクロが好き)",
      hint: "よくダンスしている先生といえば、、、！",
      manaka: "僕だったら、デザインの知識ないから臼井先生かな？",
    },
    {
      id: "21",
      question: "田中先生がもしも超能力が使えたら？",
      answer01: "念動力でパチンコに勝つ",
      answer02: "水操作の力で水道代0円★",
      answer03: "瞬間移動使って福男で1位",
      answer04: "みんなから寿命吸収",
      hint: "お金get!!!!",
      manaka: "水操作の力って、おもろ〜",
    },
    {
      id: "22",
      question: "田中先生が生徒に実はバレていないと思っていることは？",
      answer01: "太っている事",
      answer02: "本当は目がいい",
      answer03: "タイピング苦手",
      answer04: "Dオタ",
      hint: "フォルムが愛らしい💛",
      manaka: "目はいいですよ、きっと",
    },
    {
      id: "23",
      question: "実は私、、〇〇なんです",
      answer01: "実は元警備員",
      answer02: "実はプログラミングが苦手",
      answer03: "実は猫が大好き",
      answer04: "実はお菓子作りが得意",
      hint: "制服を着る職業",
      manaka: "これは、よく分からないなあ〜",
    },
    {
      id: "24",
      question: "ももいろクローバーZで一番好きなメンバーは？",
      answer01: "百田夏菜子",
      answer02: "玉井詩織",
      answer03: "高城れに",
      answer04: "佐々木彩夏",
      hint: "赤色担当の人だよっ",
      manaka: "知らねえ〜、分かんねえから、ヤマカンで答えよう！",
    },
    {
      id: "25",
      question: "ももいろクローバーZのファン歴は？",
      answer01: "12年",
      answer02: "5年",
      answer03: "2年",
      answer04: "18年",
      hint: "10年以上",
      manaka: "分かんないってえー、勘で12年くらいやってんのかな？",
    },
    {
      id: "26",
      question: "ももクロ雑学：結成時のリーダーは？",
      answer01: "高城れに",
      answer02: "百田夏菜子",
      answer03: "玉井詩織",
      answer04: "佐々木彩夏",
      hint: "紫色担当の人だよっ",
      manaka: "これも知らねえ〜、勘で、答えてみよう！",
    },
    {
      id: "27",
      question: "モモノフ（ももクロファンの呼び名）'あるある'はどれ？",
      answer01: "色を見て○○推しと考える",
      answer02: "次は誰が卒業か気になる",
      answer03: "うちわ本気出す",
      answer04: "全通は当たり前",
      hint: "色にアンテナが立つらしい",
      manaka: "難しいんだけど、これ…分かんないです",
    },
    {
      id: "28",
      question: "田中先生が、ももいろクローバーZ以外に興味を持ったことがあるグループは？",
      answer01: "聖飢魔Ⅱ",
      answer02: "乃木坂46",
      answer03: "Xjapan",
      answer04: "speed",
      hint: "ビジュアル強め",
      manaka: "僕は聖飢魔IIが好きなんだけど、SPEEDだろうか",
    },
    {
      id: "29",
      question: "トライアスロンを始めた年齢は？",
      answer01: "35歳",
      answer02: "40歳",
      answer03: "25歳",
      answer04: "10歳",
      hint: "30歳以上",
      manaka: "結構若い時からやってんじゃないかなあ、35か25だろう",
    },
    {
      id: "31",
      question: "田中先生が仕事をする上で大切にしていることは？",
      answer01: "モチベーション",
      answer02: "コミュニケーション力",
      answer03: "定時退社",
      answer04: "上司の機嫌",
      hint: "気持ちが大事！",
      manaka: "え〜何だろうこれは、モチベかなあ？",
    },
    {
      id: "32",
      question: "田中先生の好きなビールは？",
      answer01: "プレミアムモルツ",
      answer02: "アサヒスーパードライ",
      answer03: "サッポロ黒ラベル",
      answer04: "発泡酒",
      hint: "王道ブランド",
      manaka: "ビール好きな人は、プレミアムモルツでしょう、うまいもんアレ",
    },
    {
      id: "33",
      question: "田中先生はパイロットになりたかった。その理由は？",
      answer01: "父がパイロットだったから",
      answer02: "モテそうだったから",
      answer03: "かっこいいから",
      answer04: "トップガン見て憧れたから",
      hint: "身近な存在って大切だよねぇ",
      manaka: "こういう理由で合って欲しい…トップガンじゃない？",
    },
    {
      id: "34",
      question: "田中先生の好きなピザの国は？",
      answer01: "アメリカ",
      answer02: "イタリア",
      answer03: "トルコ",
      answer04: "スペイン",
      hint: "ボリューム系",
      manaka: "この問題よく分からない、アメリカってあるのかな？",
    },
    {
      id: "35",
      question: "田中先生には、ほぼ毎年行っている国がある。それはどこ？",
      answer01: "アメリカ",
      answer02: "カナダ",
      answer03: "オーストラリア",
      answer04: "フランス",
      hint: "ハリウッド映画",
      manaka: "どこ行くんだろう…、そしたらアメリカでしょ",
    },
    {
      id: "36",
      question: "リンクを貼るタグはどれ？",
      answer01: "<a>",
      answer02: "<ul>",
      answer03: "<li>",
      answer04: "<p>",
      hint: "anchorの略だよ",
      manaka: "これはわかっててほしいなーーーがんばれ！",
    },
    {
      id: "37",
      question: "意味を持たない部分をまとめるタグはどれ？",
      answer01: "<div>",
      answer02: "<section>",
      answer03: "<aside>",
      answer04: "<span>",
      hint: "divisionの略だよ",
      manaka: "これはこの選択肢の中だったら一番使うよね～",
    },
    {
      id: "38",
      question: "ナビゲーションメニューを作るタグはどれ？",
      answer01: "<nav>",
      answer02: "<header>",
      answer03: "<main>",
      answer04: "<article>",
      hint: "navigationの略だよ",
      manaka: "スペルでわかるっしょ",
    },
    {
      id: "39",
      question: "見出しと本文の文字サイズの比率をなんという？",
      answer01: "ジャンプ率",
      answer02: "クリック率",
      answer03: "コンバージョン率",
      answer04: "回遊率",
      hint: "縄跳び！！！！！",
      manaka: "スポーツ新聞はこの率でかいよね",
    },
    {
      id: "40",
      question: "文字の太さを変えるプロパティはどれ？",
      answer01: "font-weight",
      answer02: "line-height",
      answer03: "text-align",
      answer04: "border-width",
      hint: "文字は英語でfontだよね",
      manaka: "weightは太さだよね",
    },
    {
      id: "41",
      question: "正しい変数名として使えるものはどれ？",
      answer01: "$_name",
      answer02: "$-name",
      answer03: "$1name",
      answer04: "$user-name",
      hint: "ハイフンは使えない。あと、一文字目数字はだめだよ！",
      manaka: "ややこしいなこれ",
    },
    {
      id: "42",
      question: "プログラムの途中で値を変更できるのはどれ？",
      answer01: "変数",
      answer02: "定数",
      answer03: "関数",
      answer04: "素数",
      hint: "変更できるってことは～？",
      manaka: "定数素数って懐かしいな～これは簡単でしょ",
    },
    {
      id: "43",
      question: "整数型(int型)ではないものはどれ？",
      answer01: "123.0",
      answer02: "0b11",
      answer03: "1_234",
      answer04: "220",
      hint: "小数点は整数っていえるかな？",
      manaka: "整数じゃないものか～ややこしい。小数点は違うんじゃね？",
    },
    {
      id: "44",
      question: "式がfalseになるものはどれ？",
      answer01: "0 == ' ' ",
      answer02: "0 == '0' ",
      answer03: "1 == true ",
      answer04: "1 == 1.0 ",
      hint: "等しくない場合に出る",
      manaka: ""===" の場合との違いを覚えていれば解けそうだね",
    },
    {
      id: "45",
      question: "デザインの打ち合わせで使う、完成イメージに近いものをと言う？",
      answer01: "デザインカンプ",
      answer02: "デザインランプ",
      answer03: "たたき台",
      answer04: "バナー",
      hint: "デザイン〇〇〇",
      manaka: "”たたき台”ってひっかけカモ!?",
    },
    {
      id: "46",
      question: "コンソールに値を表示する命令はどれ？",
      answer01: "console.log",
      answer02: "alert()",
      answer03: "document.write()",
      answer04: "print()",
      hint: "そのままだよ～",
      manaka: "コンソールって言ってるし",
    },
    {
      id: "47",
      question: "aとbの型と値が等しい演算子はどれ？",
      answer01: "a === b",
      answer02: "a == b",
      answer03: "a! = b",
      answer04: "a! == b",
      hint: "厳しい比較だから～？",
      manaka: "＝をいくつ並べるかだね",
    },
    {
      id: "48",
      question: "aとbの値が等しい演算子はどれ？",
      answer01: "a == b",
      answer02: "a === b",
      answer03: "a! = b",
      answer04: "a! == b",
      hint: "=が2個と3個の違いを考えて",
      manaka: "＝をいくつ並べるかだね",
    },
    {
      id: "49",
      question: "aとbの値が等しくない演算子はどれ？",
      answer01: "a! = b",
      answer02: "a! == b",
      answer03: "a == b",
      answer04: "a === b",
      hint: "イコールは二つも要らない",
      manaka: "等しくない場合は、イコールのみではないね",
    },
    {
      id: "50",
      question: "aとbの値か型が等しくない演算子はどれ？",
      answer01: "a! == b",
      answer02: "a! = b",
      answer03: "a === b",
      answer04: "a == b",
      hint: "等しくないってことは！を使うよ。",
      manaka: "等しくない場合は、イコールのみではないね",
  },
  ];

  // シャッフル関数
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1));
      let tmp = array[i];
      array[i] = array[random];
      array[random] = tmp;
    }
    return array;
  }

  // 未出題の問題IDを取得してシャッフル
  function getNewQuizIds() {
    // 全問題IDを取得
    let allQuizIds = prefecturalCapital.map(function (item) { return item.id; });
    
    // 未出題の問題IDのみをフィルタリング
    let availableIds = allQuizIds.filter(function(id) {
      return usedQuestionIds.indexOf(id) === -1;
    });

    // 未出題問題が10問未満の場合、出題履歴をリセット
    if (availableIds.length < QUESTION_TOTAL_NUM) {
      console.log('問題をリセットします');
      usedQuestionIds = [];
      availableIds = allQuizIds;
    }

    // シャッフル
    shuffleArray(availableIds);
    
    // 10問取得
    let selectedIds = availableIds.slice(0, QUESTION_TOTAL_NUM);
    
    // 出題済みリストに追加
    usedQuestionIds = usedQuestionIds.concat(selectedIds);
    
    return selectedIds;
  }

  // 今回出題する問題IDを取得
  let quizId = getNewQuizIds();

  // 現在の問題インデックス(0から開始)
  let currentNum = 0;

  // スコア
  let score = 0;

  // タイマー
  let timerInterval = null;
  let timeLeft = TIME_LIMIT;

  // ヒント使用フラグ
  let fiftyFiftyUsed = false;
  let hintInfoUsed = false;

  // 現在表示中の問題データ・選択肢順
  let currentAnswerOrder = [];
  let currentQuestion = null;

  // ---- DOM参照 ----
  const $timerNum       = $('#timerNum');
  const $questionText   = $('#questionText');
  const $answerBtns     = $('.answer-btn');
  const $answerTexts    = [$('#answerA'), $('#answerB'), $('#answerC'), $('#answerD')];
  const $hint5050       = $('#hint5050');
  const $hintPhone      = $('#hintPhone');
  const $hintInfo       = $('#hintInfo');
  const $hintModal      = $('#hintModal');
  const $hintModalText  = $('#hintModalText');
  const $hintModalClose = $('#hintModalClose');
  const $phoneModal     = $('#phoneModal');
  const $phoneModalImg  = $('#phoneModalImg');
  const $phoneModalText = $('#phoneModalText');
  const $phoneModalClose = $('#phoneModalClose');

  // テレフォン画像リスト
  const phoneImages = [
    'images/telephone_01.png',
    'images/telephone_02.png',
    'images/telephone_03.png',
    'images/telephone_04.png',
    'images/telephone_05.png',
    'images/telephone_06.png',
    'images/telephone_07.png',
    'images/telephone_08.png',
    'images/telephone_09.png',
  ];

  // ---- 問題データ取得 ----
  function getQuestion(id) {
    return prefecturalCapital.find(function (item) { return item.id === id; });
  }

  // タイプライター用インターバル
  let typeInterval = null;

  // ---- タイプライター演出 ----
  function typeQuestion(text, callback) {
    if (typeInterval) {
      clearInterval(typeInterval);
      typeInterval = null;
    }
    $questionText.text('');
    let chars = text.split('');
    let i = 0;
    const SPEED = 100;

    typeInterval = setInterval(function () {
      $questionText.text($questionText.text() + chars[i]);
      i++;
      if (i >= chars.length) {
        clearInterval(typeInterval);
        typeInterval = null;
        if (typeof callback === 'function') callback();
      }
    }, SPEED);
  }

  // ---- 問題表示 ----
  function showQuestion(num) {
    // 最初にタイマーをリセット(表示を10に戻す)
    resetTimer();
    let q = getQuestion(quizId[num]);
    currentQuestion = q;

    let answers = [
      { text: q.answer01, isCorrect: true },
      { text: q.answer02, isCorrect: false },
      { text: q.answer03, isCorrect: false },
      { text: q.answer04, isCorrect: false },
    ];
    shuffleArray(answers);
    currentAnswerOrder = answers;

    // クラスリセットとテキスト設定
    $answerBtns.removeClass('is-correct is-incorrect is-checked is-hidden is-blinking');
    
    // インラインスタイルをクリア（CSSのホバー効果を復活させる）
    $answerBtns.each(function() {
      $(this).find('.img-default').removeAttr('style');
      $(this).find('.img-hover').removeAttr('style');
    });
    
    for (let i = 0; i < 4; i++) {
      $answerTexts[i].text(answers[i].text);
      $answerTexts[i].css('opacity', 1); // 最初から表示
    }
    $answerBtns.prop('disabled', true); // ボタンは無効のまま

    // タイプライター完了後にボタン有効化・タイマースタート
    typeQuestion(q.question, function () {
      setTimeout(function () {
        $answerBtns.prop('disabled', false);
        startTimer();
      }, 10);
    });
  }

  // ---- タイマー ----
  function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(function () {
      timeLeft--;
      $timerNum.text(timeLeft);
      if (timeLeft <= 0) {
        stopTimer();
        timeUp();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function resetTimer() {
    timeLeft = TIME_LIMIT;
    $timerNum.text(TIME_LIMIT);
  }

  // ---- 時間切れ ----
  function timeUp() {
    $answerBtns.addClass('is-incorrect is-checked').prop('disabled', true);
    setTimeout(nextOrFinish, 1000);
  }

  // ---- 次の問題 or 終了 ----
  function nextOrFinish() {
    // 問題番号をインクリメント(0始まりなので、10問目はcurrentNum=9)
    currentNum++;
    
    // QUESTION_TOTAL_NUM問(10問)終了したかチェック
    if (currentNum >= QUESTION_TOTAL_NUM) {
      finishQuiz();
    } else {
      showQuestion(currentNum);
    }
  }

  // ---- クイズ終了 ----
  function finishQuiz() {
    stopTimer();

    $.ajax({
      url: 'api/score.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ scoreType: 'scoreT', score: score }),
      success: function (response) {
        showResultModal(response);
      },
      error: function () {
        showResultModal({ score: score, isNewRecord: false, bestScore: null });
      }
    });
  }

  // ---- 終了モーダル表示 ----
  function showResultModal(response) {
    $('#resultScore').text(response.score + ' / 100点');

    if (response.isNewRecord) {
      $('#resultComment').text('🎉 新記録達成！おめでとうございます！');
    } else if (response.bestScore !== null && response.bestScore !== undefined) {
      $('#resultComment').text('あなたの最高得点は ' + response.bestScore + ' 点です');
    } else {
      $('#resultComment').text('');
    }

    $('#resultModal').removeAttr('style').css('display', 'flex');
  }

  // ---- 回答ボタン クリック ----
  $answerBtns.on('click', function () {
    if ($(this).hasClass('is-checked')) return;

    stopTimer();

    let index = $answerBtns.index(this);
    let isCorrect = currentAnswerOrder[index].isCorrect;

    // 正解のボタンを見つける
    let correctBtn = null;
    $answerBtns.each(function (i) {
      if (currentAnswerOrder[i].isCorrect) {
        correctBtn = $(this);
        $(this).addClass('is-correct');
      }
    });

    if (isCorrect) {
      $(this).addClass('is-checked');
      score += timeLeft;
    } else {
      $(this).addClass('is-incorrect is-checked');
    }

    $answerBtns.prop('disabled', true);

    // 正解のボタンを点滅させる（正誤に関わらず）
    if (correctBtn) {
      let blinkCount = 0;
      let isOrange = false;
      
      let blinkInterval = setInterval(function() {
        if (blinkCount < 10) { // 10回切り替え（5回点滅）
          isOrange = !isOrange;
          if (isOrange) {
            // オレンジ表示（hoverを表示、defaultを非表示）
            correctBtn.addClass('is-blinking');
          } else {
            // 青表示（defaultを表示、hoverを非表示）
            correctBtn.removeClass('is-blinking');
          }
          blinkCount++;
        } else {
          clearInterval(blinkInterval);
          // 最後は青(default)に戻す
          correctBtn.removeClass('is-blinking');
        }
      }, 100); // 100msごとに切り替え(0.1秒)
    }
    
    setTimeout(nextOrFinish, 1200); // 点滅時間を考慮（100ms × 10回 = 1000ms + 余裕200ms）
  });

  // ---- 50:50ヒント ----
  $hint5050.on('click', function () {
    if (fiftyFiftyUsed) return;
    fiftyFiftyUsed = true;

    let wrongIndices = [];
    for (let i = 0; i < 4; i++) {
      if (!currentAnswerOrder[i].isCorrect) wrongIndices.push(i);
    }
    shuffleArray(wrongIndices);
    // 不正解3つのうち2つを非表示 → 正解1つ＋不正解1つの2択
    $answerBtns.eq(wrongIndices[0]).addClass('is-hidden');
    $answerBtns.eq(wrongIndices[1]).addClass('is-hidden');

    $(this).hide();
  });

  // ---- テレフォンヒント:モーダルを開く ----
  $hintPhone.on('click', function () {
    if (!currentQuestion || !currentQuestion.manaka) return;

    // タイマー停止
    stopTimer();

    // ランダムに画像を1枚選ぶ
    let randomImg = phoneImages[Math.floor(Math.random() * phoneImages.length)];
    $phoneModalImg.attr('src', randomImg);

    // コメントをセット
    $phoneModalText.text(currentQuestion.manaka);

    // モーダル表示
    $phoneModal.show();
  });

  // ---- テレフォンモーダルの閉じるボタン ----
  $phoneModalClose.on('click', function () {
    $phoneModal.hide();

    // 回答ボタンがまだ有効な場合のみタイマー再開
    if (!$answerBtns.first().prop('disabled')) {
      startTimer();
    }
  });

  // ---- 電球ヒント:モーダルを開く ----
  $hintInfo.on('click', function () {
    if (hintInfoUsed) return;
    if (!currentQuestion || !currentQuestion.hint) return;

    // タイマー停止
    stopTimer();

    // ヒントをセットしてモーダル表示
    $hintModalText.text(currentQuestion.hint);
    $hintModal.show();
  });

  // ---- モーダルの閉じるボタン ----
  $hintModalClose.on('click', function () {
    $hintModal.hide();

    // 使用済みにしてボタンを非表示
    hintInfoUsed = true;
    $hintInfo.hide();

    // 回答ボタンがまだ有効な場合のみタイマー再開
    if (!$answerBtns.first().prop('disabled')) {
      startTimer();
    }
  });

  // ---- 初期化 ----
  $(window).on('load', function () {
    showQuestion(currentNum);
  });

})(jQuery);
