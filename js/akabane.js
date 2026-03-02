(function ($) {
  'use strict';

  // 合計問題数の設定
  const QUESTION_TOTAL_NUM = 10;

  // 制限時間(秒)
  const TIME_LIMIT = 10;

  // 出題済み問題IDを記録する配列(セッション中保持)
  let usedQuestionIds = [];

/* -----------------------------------------------
     赤羽根先生クイズ(全53問)
  -------------------------------------------------- */
  const prefecturalCapital = [
    {
      id: "01",
      question: "赤羽根先生の出身地は？",
      answer01: "鹿沼市",
      answer02: "水戸市",
      answer03: "川崎市",
      answer04: "船橋市",
      hint: "日光市に近いところ",
      manaka: "いや～全然分かんないんで",
    },
    {
      id: "02",
      question: "赤羽根先生の血液型は？",
      answer01: "O型",
      answer02: "A型",
      answer03: "AB型",
      answer04: "B型",
      hint: "大雑把って言われがち",
      manaka: "赤羽根先生、結構カチカチしてるイメージなので多分あれ。",
    },
    {
      id: "03",
      question: "赤羽根先生の誕生月は？",
      answer01: "11月",
      answer02: "12月",
      answer03: "3月",
      answer04: "1月",
      hint: "ポッキーの日があるよ！！",
      manaka: "これは分からんて～、なにかなぁ、...きっとさそり座ですね",
    },
    {
      id: "04",
      question: "赤羽根先生の中学時代の部活は？",
      answer01: "ソフトボール部",
      answer02: "テニス部",
      answer03: "吹奏楽部",
      answer04: "水泳部",
      hint: "攻守交代制の球技",
      manaka: "どれもありそう～、実は水泳部じゃない？",
    },
    {
      id: "05",
      question: "赤羽根先生の小さい頃の夢は？",
      answer01: "記憶にございません",
      answer02: "プリンセス",
      answer03: "お金持ち",
      answer04: "保育士",
      hint: "覚えてない、、、ぽい",
      manaka: "え～？！現実的な気がするけどな。意外とこういう金持ちとか？",
    },
    {
      id: "06",
      question: "赤羽根先生の好きな食べ物は？",
      answer01: "ラーメン",
      answer02: "オムライス",
      answer03: "麻婆豆腐",
      answer04: "ステーキ",
      hint: "〇〇walkerとして特集される",
      manaka: "好きな食べ物...なるほど、肉だろう",
    },
    {
      id: "07",
      question: "赤羽根先生の嫌いな食べ物は？",
      answer01: "中華なまこのスープ",
      answer02: "魚料理",
      answer03: "納豆",
      answer04: "辛い食べ物",
      hint: "見た目が独特",
      manaka: "おふくろ系の食べ物を挙げればいいわけで...何？中華まなこって。僕は辛いものかな～",
    },
    {
      id: "08",
      question: "赤羽根先生の趣味は？",
      answer01: "寝る",
      answer02: "編み物",
      answer03: "食べ歩き",
      answer04: "お菓子作り",
      hint: "人間の本能かも",
      manaka: "趣味ね！編み物してそう！（な気がする..）",
    },
    {
      id: "09",
      question: "赤羽根先生の得意だった教科は？",
      answer01: "理科",
      answer02: "国語",
      answer03: "社会",
      answer04: "音楽",
      hint: "すいへいりーべぼくのふね",
      manaka: "ん～理科得意でしょう、あの感じは...音楽だったりするのかなぁ..",
    },
    {
      id: "10",
      question: "赤羽根先生の好きなアーティストは？",
      answer01: "特にない",
      answer02: "EXILE",
      answer03: "SMAP",
      answer04: "モーニング娘。",
      hint: "特に、、、雑種らしい",
      manaka: "音楽とか聴かなそうだけどなぁ～ないんじゃない？",
    },
    {
      id: "11",
      question: "赤羽根先生の苦手な教科は？",
      answer01: "全般",
      answer02: "世界史",
      answer03: "英語",
      answer04: "数学",
      hint: "どれも、、、",
      manaka: "ごちゃごちゃしててよくわからん、というより世界史でしょう",
    },
    {
      id: "12",
      question: "赤羽根先生が学生時代のアルバイトで思い出に残っているものは？",
      answer01: "バイトの…※長いので省略",
      answer02: "消費税導入時を経験した",
      answer03: "選挙のお手伝いをした",
      answer04: "世の中の裏側を見た",
      hint: "臼井先生曰く。話が長い！らしい",
      manaka: "こんなのわかんねぇ",
    },
    {
      id: "13",
      question: "時間があったら、赤羽根先生が行きたい国は？",
      answer01: "アメリカ",
      answer02: "スペイン",
      answer03: "エジプト",
      answer04: "インド",
      hint: "ハリウッドがある国だよ",
      manaka: "僕だったらエジプトなんですけどね、スペインとかじゃない？",
    },
    {
      id: "14",
      question: "赤羽根先生が朝起きたら一番にすることは？",
      answer01: "お弁当を作る",
      answer02: "コーヒー豆を挽く",
      answer03: "植物に水やり",
      answer04: "散歩",
      hint: "愛する家族のために、、、！",
      manaka: "え、赤羽根先生お弁当派なのかな？そんな気がするなぁ。そうなんじゃねェ？",
    },
    {
      id: "15",
      question: "赤羽根先生の好きな飲みものは？",
      answer01: "カルピス",
      answer02: "ドクターペッパー",
      answer03: "ミルクティー",
      answer04: "白湯",
      hint: "体にピース！",
      manaka: "ん～～なんだろう。意外とカルピスかな？",
    },
    {
      id: "16",
      question: "赤羽根先生の休日の過ごし方は？",
      answer01: "農繁期は多忙",
      answer02: "道具のお手入れ",
      answer03: "ファミリーと過ごす",
      answer04: "起きてから考えます",
      hint: "屋外作業だよ",
      manaka: "え、むずっ。けど農業やってるの聞いたことあるな。",
    },
    {
      id: "17",
      question: "赤羽根先生の集団行動でのタイプは？",
      answer01: "ついていく",
      answer02: "先頭",
      answer03: "まとめ役",
      answer04: "単独行動",
      hint: "リーダータイプではない",
      manaka: "単独行動派でしょ。きっと",
    },
    {
      id: "18",
      question: "赤羽根先生が決断する時は？",
      answer01: "直観",
      answer02: "情報収集",
      answer03: "誰かに相談",
      answer04: "期限ギリギリ",
      hint: "ビビビ!!!",
      manaka: "ん～～～...直観かなぁ",
    },
    {
      id: "19",
      question: "赤羽根先生が失敗したときはどうなる？",
      answer01: "反省して切り替え",
      answer02: "笑いにする",
      answer03: "引きずる",
      answer04: "なかったことに",
      hint: "ポジティブシンキング",
      manaka: "意外と引きずったりするのかなぁ？そんなことないかぁ（笑）",
    },
    {
      id: "20",
      question: "一日だけ生徒になれるとしたら、誰の授業を受けたい？",
      answer01: "田中先生（ほぼ謎の人）",
      answer02: "自分（あたりが柔らか）",
      answer03: "臼井先生（興味あるから）",
      answer04: "間中先生（ライバルだし）",
      hint: "ももクロのことも教えてくれそう人！！！",
      manaka: "僕はライバル役なのかぁ、知らなかった。僕だったら田中先生かなぁ。",
    },
    {
      id: "21",
      question: "もしも超能力が使えたら、何をしたい？",
      answer01: "アンチエイジング",
      answer02: "異世界転移",
      answer03: "テレパシー",
      answer04: "天候操作",
      hint: "抗いたい",
      manaka: "僕だったら異世界転移ですね。",
    },
    {
      id: "22",
      question: "生徒に実はバレていないと思っていることは？",
      answer01: "ズボラなこと",
      answer02: "大食いなこと",
      answer03: "繊細なこと",
      answer04: "餃子が好きじゃないこと",
      hint: "テキトー",
      manaka: "え？そうなの？餃子好きじゃないの？",
    },
    {
      id: "23",
      question: "実は私、、〇〇なんです。",
      answer01: "オタク",
      answer02: "運動大好き",
      answer03: "歌うの好き",
      answer04: "サウナ好き",
      hint: "ゲーム、漫画、アニメ好き",
      manaka: "運動好きでしょ～？違うかなぁ",
    },
    {
      id: "24",
      question: "赤羽根先生は普段、どんな農作業をしているか？",
      answer01: "稲作",
      answer02: "果実栽培",
      answer03: "畑作",
      answer04: "花卉栽培",
      hint: "赤羽根先生はお米事情に詳しいですよ～。",
      manaka: "え～何してんだろう、畑？",
    },
    {
      id: "25",
      question: "赤羽根先生に聞く！農作業で大変なことは？",
      answer01: "草刈り",
      answer02: "カラスとの闘い",
      answer03: "腰痛問題",
      answer04: "田植え",
      hint: "夏は地獄。やってもやっても・・",
      manaka: "腰痛かなぁ？",
    },
    {
      id: "26",
      question: "赤羽根先生が最初に作ったプログラムは？",
      answer01: "Perlかshell",
      answer02: "動物占いのプログラム",
      answer03: "ブロック崩しゲーム",
      answer04: "3Dプリンタの制御",
      hint: "主にUNIX/Linux環境でシステムやテキスト管理に使うスクリプト言語",
      manaka: "全然分かる気がしないんですけど",
    },
    {
      id: "27",
      question: "赤羽根先生の得意なお弁当の具材は？",
      answer01: "卵料理",
      answer02: "冷凍食品",
      answer03: "ウインナー",
      answer04: "きんぴらごぼう",
      hint: "甘い派かしょっぱい派か分かれるやつ！！",
      manaka: "僕は卵だと思うな",
    },
    {
      id: "28",
      question: "赤羽根先生の得意料理は？",
      answer01: "きんぴらごぼう",
      answer02: "炒飯",
      answer03: "ハンバーグ",
      answer04: "八宝菜",
      hint: "和食だよ",
      manaka: "肉じゃないかな？なんか定期的に中華料理がでますね。",
    },
    {
      id: "29",
      question: "赤羽根先生の苦手料理は？",
      answer01: "グラタン",
      answer02: "おでん",
      answer03: "ナポリタン",
      answer04: "餃子",
      hint: "これといえばホワイトソースだよねぇ",
      manaka: "餃子きになるなぁ",
    },
    {
      id: "30",
      question: "赤羽根先生に聞く！臼井先生に伝えたいことは？",
      answer01: "寝てください",
      answer02: "もう少しゆっくり話して",
      answer03: "そろそろ落ち着きが必要",
      answer04: "今も昔もカワユイですね",
      hint: "心配、、、。",
      manaka: "どれもありえるなぁ。臼井先生忙しいから",
    },
    {
      id: "31",
      question: "赤羽根先生に聞く！臼井先生の好きなところは？",
      answer01: "アクティブなところ",
      answer02: "ちょっと抜けているところ",
      answer03: "歩き方",
      answer04: "生徒に人気なところ",
      hint: "臼井先生ってエネルギッシュだよね！！",
      manaka: "臼井先生と赤羽根先生って仲良いんでしたっけ？アクティブなところじゃないですかねぇ。",
    },
    {
      id: "32",
      question: "赤羽根先生に聞く！臼井先生の第一印象は？",
      answer01: "しごデキで怖い",
      answer02: "カワユイ",
      answer03: "頭よさそう",
      answer04: "天然そう",
      hint: "バリキャリウーマン",
      manaka: "ん～そうだなぁ...",
    },
    {
      id: "33",
      question: "なまこが入った中華スープの器は？",
      answer01: "メロンをくりぬいたもの",
      answer02: "ココナッツの殻",
      answer03: "パンのくりぬいたもの",
      answer04: "急須",
      hint: "黄緑の果物だよ",
      manaka: "どういうこと？前に出たなまこの問題もよく分からなかったんですけども。",
    },
    {
      id: "34",
      question: "学生時代、1か月間生活していたホームステイの国は？",
      answer01: "カナダ",
      answer02: "オーストラリア",
      answer03: "スペイン",
      answer04: "フィンランド",
      hint: "メープルシロップの国",
      manaka: "あ～前に聞いた気がするんだよなぁ。トロントだな。",
    },
    {
      id: "35",
      question: "赤羽根先生の好きなアニメは？",
      answer01: "ワンピース",
      answer02: "ハンター×ハンター",
      answer03: "僕らのヒーローアカデミア",
      answer04: "地獄先生ぬ～べ～",
      hint: "ゴムゴムの～～～～～～～",
      manaka: "どれだろう...ハンターハンター好きでしょう、きっと。",
    },
    {
      id: "36",
      question: "赤羽根先生は、何時に布団にいたい？",
      answer01: "22時",
      answer02: "21時",
      answer03: "26時",
      answer04: "24時",
      hint: "まあまあ早め",
      manaka: "これくらいかなぁ。",
    },
    {
      id: "37",
      question: "赤羽根先生が、この世になくなったら嫌な食べ物は？",
      answer01: "お米",
      answer02: "クッキー",
      answer03: "忍者飯",
      answer04: "ランチパック",
      hint: "日本人みんな大好き",
      manaka: "きっとお米でしょう。",
    },
    {
      id: "38",
      question: "赤羽根先生がやっているスマホゲームは？",
      answer01: "ツムツム",
      answer02: "プロジェクトセカイ",
      answer03: "原神",
      answer04: "ポケモンGO",
      hint: "丸いキャラをなぞって消すゲームだよ",
      manaka: "あ、ゲームやるんだ。意外。プロジェクトセカイやっていてほしいなぁ。",
    },
    {
      id: "39",
      question: "赤羽根先生の好きな漫画の系統は？",
      answer01: "異世界系",
      answer02: "恋愛ラブコメ系",
      answer03: "日常系",
      answer04: "バトル系",
      hint: "ファンタジー！！",
      manaka: "ほぉ～、何っスかねぇ、ラブコメかな？",
    },
    {
      id: "40",
      question: "繰り返し回数が決まっている場合に最も適した構文はどれ？",
      answer01: "for",
      answer02: "if",
      answer03: "while",
      answer04: "switch",
      hint: "fの文字が入っているよ",
      manaka: "こりゃあ、わかるっしょ",
    },
    {
      id: "41",
      question: "背景画像を縦方向に繰り返して表示するプロパティはどれ？",
      answer01: "repeat-y",
      answer02: "repeat",
      answer03: "repeat-x",
      answer04: "no-repeat",
      hint: "縦＝ｙだよ",
      manaka: "ｘとｙは、縦横の関係だよね～",
    },
    {
      id: "42",
      question: "データが軽くイラストやロゴなど色数の少ない画像に適してるのはどれ？",
      answer01: "PNG",
      answer02: "JPG",
      answer03: "WebP",
      answer04: "GIF",
      hint: "jpgではないよ",
      manaka: "ピンピンころりで色少ないと覚えたよ、俺は",
    },
    {
      id: "43",
      question: "メインコンテンツではない、補足情報のタグはどれ？",
      answer01: "aside",
      answer02: "footer",
      answer03: "main",
      answer04: "article",
      hint: "footerは違う！",
      manaka: "header,footer以外であと何かだね",
    },
    {
      id: "44",
      question: "リンクを貼るタグはどれ？",
      answer01: "<a>",
      answer02: "<ul>",
      answer03: "<li>",
      answer04: "<p>",
      hint: "anchorの略だよ",
      manaka: "これはわかっててほしいなーーーーがんばれ！！",
    },
    {
      id: "45",
      question: "breakの役割として正しいものはどれ？",
      answer01: "条件分岐を終了",
      answer02: "ループを一回スキップ",
      answer03: "ループを強制終了",
      answer04: "プログラム全体を終了",
      hint: "条件を終了させるよ",
      manaka: "英語の意味からわかるっしょ",
    },
    {
      id: "46",
      question: "条件が最初から偽の場合でも必ず一回は処理が実行される構文はどれ？",
      answer01: "do...while",
      answer02: "for",
      answer03: "while",
      answer04: "foreach",
      hint: "一回は実行がポイントだよ～",
      manaka: "これはねぇdoなんちゃらだよ",
    },
    {
      id: "47",
      question: "4の2進数はどれ？",
      answer01: "100",
      answer02: "1000",
      answer03: "10",
      answer04: "1010",
      hint: "ガチャガチャでよく使うよ！",
      manaka: "今どき手計算で求められるってないよね",
    },
    {
      id: "48",
      question: "データが軽く写真やグラデーションなど色数の多い画像に適しているのはどれ？",
      answer01: "JPG",
      answer02: "PNG",
      answer03: "WebP",
      answer04: "SVG",
      hint: "写真の代表的な拡張子でｊから始まるよ",
      manaka: "デジカメ撮ったときを思い出せばいいんじゃない？",
    },
    {
      id: "49",
      question: "文字列を画面に表示するためによく使われる命令はどれ？",
      answer01: "echo",
      answer02: "console.log",
      answer03: "print()",
      answer04: "alert",
      hint: "エコー！！！！！",
      manaka: "こりゃあ、わかるっしょ",
    },
    {
      id: "50",
      question: "webページの見出しを表すタグはどれ？",
      answer01: "<h1>",
      answer02: "<p>",
      answer03: "<span>",
      answer04: "<div>",
      hint: "見出しを英語にすると、、、headerだよ！",
      manaka: "見出しぃ？これだろ",
    },
    {
      id: "51",
      question: "文字の色を変更するプロパティはどれ？",
      answer01: "color",
      answer02: "background-color",
      answer03: "text-align",
      answer04: "font-style",
      hint: "色は英語でcolorだよね！",
      manaka: "font-styleは惑わせるよね～",
    },
    {
      id: "52",
      question: "画像を表示するタグはどれ？",
      answer01: "<img>",
      answer02: "<src>",
      answer03: "<a>",
      answer04: "<alt>",
      hint: "画像は英語でimageだよね",
      manaka: "これはそのままでしょ、img",
    },
    {
      id: "53",
      question: "段落を表示するタグはどれ？",
      answer01: "<p>",
      answer02: "<a>",
      answer03: "<h1>",
      answer04: "<li>",
      hint: "段落を英語にするとparagraphだよ～",
      manaka: "これは簡単すぎでしょ",
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
      data: JSON.stringify({ scoreType: 'scoreA', score: score }),
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
