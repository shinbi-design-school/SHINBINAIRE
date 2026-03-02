(function ($) {
  'use strict';

  // 合計問題数の設定
  const QUESTION_TOTAL_NUM = 10;

  // 制限時間(秒)
  const TIME_LIMIT = 10;

  // 出題済み問題IDを記録する配列(セッション中保持)
  let usedQuestionIds = [];

/* -----------------------------------------------
  臼井先生クイズ（全44問）
  -------------------------------------------------- */
  const prefecturalCapital = [
    {
      id: "01",
      question: "臼井先生の出身地は？",
      answer01: "栃木県",
      answer02: "奈良県",
      answer03: "北海道",
      answer04: "秋田県",
      hint: "イチゴが有名！！",
      manaka: "臼井先生のことについて詳しくないから知らないなぁ栃木出身かなぁ",
    },
    {
      id: "02",
      question: "臼井先生の血液型は？",
      answer01: "A型",
      answer02: "O型",
      answer03: "AB型",
      answer04: "不明",
      hint: "日本で一番多い血液型だよ",
      manaka: "O型かなぁ？",
    },
    {
      id: "03",
      question: "臼井先生の誕生月は？",
      answer01: "9月",
      answer02: "12月",
      answer03: "5月",
      answer04: "8月",
      hint: "秋分の日がある",
      manaka: "誕生月ィ〜？知らないなあ。実は9月で、僕と一緒だったりして",
    },
    {
      id: "04",
      question: "臼井先生の中学時代の部活は？",
      answer01: "ソフトボール部",
      answer02: "ダンス部",
      answer03: "柔道部",
      answer04: "吹奏楽部",
      hint: "道具を使う部活動",
      manaka: "これは吹奏楽でしょう、、、。",
    },
    {
      id: "05",
      question: "臼井先生の小さい頃の夢は？",
      answer01: "建築士",
      answer02: "モデル",
      answer03: "写真家",
      answer04: "お花屋さん",
      hint: "家に関係する",
      manaka: "カレー屋さんかな？ あれっ、違うのかぁ？",
    },
    {
      id: "06",
      question: "臼井先生の好きな食べ物は？",
      answer01: "アイス",
      answer02: "豚骨ラーメン",
      answer03: "生キャラメル",
      answer04: "ホットドック",
      hint: "夏は絶対食べたいやつだよ！！！！",
      manaka: "え〜、何好きなんだろう？キャラメルかな？違うかあ…。",
    },
    {
      id: "07",
      question: "臼井先生の嫌いな食べ物は？",
      answer01: "豆類",
      answer02: "さけるチーズ",
      answer03: "レーズンパン",
      answer04: "卵類",
      hint: "節分は地獄かも",
      manaka: "え〜、何嫌いなんだろう、レーズン嫌いかなあ…違うかぁ",
    },
    {
      id: "08",
      question: "臼井先生の趣味は？",
      answer01: "DJ",
      answer02: "釣り",
      answer03: "競馬",
      answer04: "パチンコ",
      hint: "音楽に関係",
      manaka: "競馬、釣りって、ギャンブル多くない？ 競馬かなあ、あっ違うか",
    },
    {
      id: "09",
      question: "臼井先生の得意だった教科は？",
      answer01: "美術",
      answer02: "国語",
      answer03: "家庭科",
      answer04: "図工",
      hint: "デザイン得意",
      manaka: "美術得意でしょう！きっと、やっぱり",
    },
    {
      id: "10",
      question: "臼井先生の好きなアーティストは？",
      answer01: "D'Angelo",
      answer02: "Michael Jackson",
      answer03: "One Direction",
      answer04: "Bruno Mars",
      hint: "男性ソロ",
      manaka: "いやあ、分かんないなぁ～これジャクソン好きかなぁ？違うか",
    },
    {
      id: "11",
      question: "臼井先生の苦手だった教科は？",
      answer01: "国語",
      answer02: "算数",
      answer03: "化学",
      answer04: "体育",
      hint: "文系",
      manaka: "苦手だった科目？化学とか苦手だと思う…",
    },
    {
      id: "12",
      question: "学生時代のアルバイトで思い出に残っているものは？",
      answer01: "沢山ありすぎて覚えてない",
      answer02: "お客さんに水をぶっかけた",
      answer03: "出勤を忘れてしまった",
      answer04: "fall in loveできた",
      hint: "色々あったらしい",
      manaka: "思い出に残っているものぉ〜？ 何だろう",
    },
    {
      id: "13",
      question: "臼井先生の時間があったら行きたい国は？",
      answer01: "ドバイ",
      answer02: "ニュージーランド",
      answer03: "バチカン市国",
      answer04: "ベネズエラ",
      hint: "お金持ちの国！！！！",
      manaka: "え〜、どこへ行きたいんだろう。ニュージーランドか？",
    },
    {
      id: "14",
      question: "臼井先生が朝起きたら一番にすることは？",
      answer01: "PCを起動して昨日の続き",
      answer02: "ラジオ体操",
      answer03: "寝ぐせと戦う",
      answer04: "運勢チェック",
      hint: "仕事が大好き臼井先生",
      manaka: "意外と乙女チックかもなー。あ、違う",
    },
    {
      id: "15",
      question: "臼井先生の好きな飲み物は？",
      answer01: "バナナミルク",
      answer02: "ルイボスティー",
      answer03: "モンスターエナジー",
      answer04: "ビール",
      hint: "黄色い飲み物だよ",
      manaka: "酒飲むイメージあんましないんだよなあ。でもこの前、ビール飲んでいたなあ、よってビール…違うか？",
    },
    {
      id: "16",
      question: "臼井先生の休日の過ごし方は？",
      answer01: "予定パンパン",
      answer02: "家から出ない",
      answer03: "ちょっと外出",
      answer04: "気分次第",
      hint: "臼井先生は時間を無駄にしないタイプ",
      manaka: "いやぁ、多分何か予定入ってるでしょう～",
    },
    {
      id: "17",
      question: "臼井先生の集団行動でのタイプは？",
      answer01: "消えたり戻ったり",
      answer02: "先頭",
      answer03: "まとめ役",
      answer04: "ついていく",
      hint: "気づいたらいないタイプ",
      manaka: "意外とあんまり前に出るイメージないんだよあ〜",
    },
    {
      id: "18",
      question: "臼井先生が決断する時は？",
      answer01: "直感",
      answer02: "情報収集",
      answer03: "誰かに相談",
      answer04: "期限ぎりぎり",
      hint: "ビビッと来るタイプ",
      manaka: "期限ギリギリまで‥かな",
    },
    {
      id: "19",
      question: "臼井先生が失敗したときはどうなる？",
      answer01: "反省して切り替え",
      answer02: "引きずる",
      answer03: "笑いにする",
      answer04: "なかったことに",
      hint: "わりと前向き",
      manaka: "引きずるのかな？沈まないよなあ〜",
    },
    {
      id: "20",
      question: "臼井先生が一日だけ生徒になれるとしたら誰の授業を受けたい？",
      answer01: "田中先生（お手本見たい）",
      answer02: "赤羽根先生（仲良いから）",
      answer03: "間中先生（知りたいから）",
      answer04: "自分（自己愛高めだから）",
      hint: "ももクロのファンの先生",
      manaka: "田中先生じゃない？",
    },
    {
      id: "21",
      question: "臼井先生がもしも超能力が使えたら？",
      answer01: "彼氏と犬が欲しい",
      answer02: "自由に移動したい",
      answer03: "タイムトラベルしてみたい",
      answer04: "総理大臣になる",
      hint: "愛だね",
      manaka: "タイムトラベルかな？違うかな？",
    },
    {
      id: "22",
      question: "臼井先生が生徒に実はバレていないと思っていることは？",
      answer01: "デザインが得意",
      answer02: "人見知り",
      answer03: "新聞に載ったことがある",
      answer04: "魚料理が苦手",
      hint: "臼井先生は学生の時美術得意だったんだよ～",
      manaka: "魚、苦手なのかなぁ？…おっ、",
    },
    {
      id: "23",
      question: "実は私、、〇〇なんです",
      answer01: "昔は綺麗なお姉さんだった",
      answer02: "せかせかしている",
      answer03: "得意なスポーツがある",
      answer04: "オタクな面がある",
      hint:"若い頃は、、、、、？",
      manaka: "うーーーん？",
    },
    {
      id: "24",
      question: "臼井先生の苦手なものは？",
      answer01: "カマドウマ",
      answer02: "猫",
      answer03: "ふなっしー",
      answer04: "信玄餅",
      hint: "特に夏は地獄",
      manaka: "苦手なものは？信玄餅ってどんなでしたっけ？猫嫌い？ そんなことないかあ。",
    },
    {
      id: "25",
      question: "臼井先生のダンス歴は？",
      answer01: "38年",
      answer02: "1年",
      answer03: "25年",
      answer04: "12年",
      hint: "子供のころから",
      manaka: "ダンス歴は長いでしょう。10年ぐらいやってるんじゃない？もっと長いのかな？",
    },
    {
      id: "26",
      question: "臼井先生が弾ける楽器は？",
      answer01: "フルート",
      answer02: "ドラム", 
      answer03: "ヴァイオリン",
      answer04: "カスタネット",
      hint: "吹く楽器だよ～",
      manaka: "これは知ってる",
    },
    {
      id: "27",
      question: "臼井先生がフルートを始めたのはいつから？",
      answer01: "小学3年生",
      answer02: "年長さん",
      answer03: "中学1年生",
      answer04: "高校2年生",
      hint: "中学より前からだよ～",
      manaka: "知らねえ〜、中3かなあ？",
    },
    {
      id: "28",
      question: "臼井先生が人との付き合い方で気を付けていることは？",
      answer01: "あまり深入りしない",
      answer02: "名前を早く覚える",
      answer03: "行事は積極的に参加する",
      answer04: "運次第なすがまま",
      hint: "距離感大事！！！",
      manaka: "え〜、何だろうねえー、深入りしない、かなぁ？",
    },
    {
      id: "29",
      question: "臼井先生に聞く！赤羽根先生に伝えたいことは？",
      answer01: "話が長い",
      answer02: "グレーヘアーが素敵",
      answer03: "話題が豊富",
      answer04: "早く遊ぼう",
      hint: "もう少し短く、、、して",
      manaka: "「話が長い」って、思ってても言えないだろう（笑）",
    },
    {
      id: "30",
      question: "臼井先生に聞く！赤羽根先生の好きなところは？",
      answer01: "空気が読めないところ",
      answer02: "よく食べること",
      answer03: "明るいところ",
      answer04: "真面目なところ",
      hint: "マイペースともいうかな？",
      manaka: "え〜っと、真面目かな？",
    },
    {
      id: "31",
      question: "臼井先生に聞く！赤羽根先生の第一印象は？",
      answer01: "でかっ",
      answer02: "声が聞きやすい",
      answer03: "実直そう",
      answer04: "優しそう",
      hint: "赤羽根先生はスタイルがいいよねぇ",
      manaka: "「でかっ」でしょう（笑）俺もそう思ったもん！（笑）",
    },
    {
      id: "32",
      question: "臼井先生と赤羽根先生は出会って何年になる？",
      answer01: "20年",
      answer02: "10年",
      answer03: "5年",
      answer04: "3年",
      hint: "10年以上",
      manaka: "3年くらいじゃないんですかあ？",
    },
    {
      id: "33",
      question: "臼井先生が好きなドラマは？",
      answer01: "相棒",
      answer02: "トリック",
      answer03: "科捜研の女",
      answer04: "逃げ恥",
      hint: "右京さん！！！！！！",
      manaka: "え〜、相棒好きそう〜",
    },
    {
      id: "34",
      question: "臼井先生の好きなTVドラマ「相棒」。右京さんの相方で、一番好きな人は？",
      answer01: "成宮寛貴",
      answer02: "及川光博",
      answer03: "反町隆史",
      answer04: "寺脇康文",
      hint: "一番若いイケメンの人だよ！！！",
      manaka: "これは僕は及川さんの好きなので…",
    },
    {
      id: "35",
      question: "臼井先生の好きなアイスは？",
      answer01: "ポッピングシャワー",
      answer02: "あずきバー",
      answer03: "パルム",
      answer04: "レインボーアイス",
      hint: "口の中が楽しくなるアイス",
      manaka: "ポッピングシャワーは分からんよ、あずきバーかな？パルムだろう",
    },
    {
      id: "36",
      question: "変数名の前につける記号として正しいものはどれ？",
      answer01: "$",
      answer02: "#",
      answer03: "%",
      answer04: "特に指定なし",
      hint: "お金のマーク",
      manaka: "金（かね）が絡んでると考えよう",
    },
    {
      id: "37",
      question: "変数に格納されている文字列の長さを調べる関数はどれ？",
      answer01: "strlen()",
      answer02: "substr()",
      answer03: "str_replace()",
      answer04: "trim()",
      hint: "長さを英語にするとlength",
      manaka: "長さはlengthと言うから…",
    },
    {
      id: "38",
      question: "ヒアドキュメントに利用される記号として正しいものはどれ？",
      answer01: "<<<",
      answer02: ">>>",
      answer03: " ' ' ",
      answer04: "<>",
      hint: "左方向",
      manaka: "矢印の向きで迷うよね",
    },
    {
    id: "39",
    question: "一行コメントとして使用できる記号はどれ？",
    answer01: "//",
    answer02: "**",
    answer03: "%%",
    answer04: "##",
    hint: "'スラスラ'と答えよう",
    manaka: "斜線があった気がするぁ",
    },
    {
    id: "40",
      question: "文字列を分割し配列を作成する関数として正しいものはどれ？",
      answer01: "explode()",
      answer02: "unset()",
      answer03: "implode()",
      answer04: "in_array()",
      hint: "爆発するイメージだね",
      manaka: "エクスプローラーって車あるよね",
    },
    {
      id: "41",
      question: "名前空間を指定するために使用するキーワードはどれ？",
      answer01: "namespace",
      answer02: "use",
      answer03: "import",
      answer04: "include",
      hint: "直訳そのまま",
      manaka: "名前空間って直訳英語にすれば",
    },
    {
      id: "42",
      question: "2進数で使用できる数字として正しいものはどれ？",
      answer01: "0と1",
      answer02: "0~9",
      answer03: "0~7",
      answer04: "A~F",
      hint: "2種類だよ",
      manaka: "2進数って言ってんだから、2が使えないよね",
    },
    {
      id: "43",
      question: "ビット演算子はどれ？",
      answer01: "&",
      answer02: "+",
      answer03: " || ",
      answer04: " .. ",
      hint: "あんドーナツ",
      manaka: "ビットって最小単位なの知ってる？",
    },
    {
    id: "44",
    question: "8 % 4の結果はどれ？",
    answer01: "0",
    answer02: "2",
    answer03: "4",
    answer04: "8",
    hint: "％は余りを返す演算子",
    manaka: "普段、’あまり’　使わないかも（笑）",
    },
    {
      id: "39",
      question: "%演算子の説明として正しいものはどれ？",
      answer01: "余りを返す",
      answer02: "商を返す",
      answer03: "四捨五入する",
      answer04: "数字をパーセント表示にする",
      hint: "割り算には、付きもの",
      manaka: "普段、'あまり'使わないかも（笑）",
    },
    {
      id: "40",
      question: "2進数で桁が増えるとどうなる？",
      answer01: "値が大きくなる",
      answer02: "値が小さくなる",
      answer03: "変わらない",
      answer04: "文字列になる",
      hint: "桁が増えるイコール？",
      manaka: "桁が増えると値もどうなる？",
    },
    {
      id: "41",
      question: "ビットとは何を表す単位？",
      answer01: "最小の情報単位",
      answer02: "8ビットの集合",
      answer03: "文字列",
      answer04: "配列",
      hint: "ミニマム単位",
      manaka: "ビットは単位だね",
    },
    {
      id: "42",
      question: "ビット演算子が使われる主な目的はどれ？",
      answer01: "on/offの管理",
      answer02: "表示制御",
      answer03: "配列処理",
      answer04: "関数呼び出し",
      hint: "切り替えは大事",
      manaka: "シンプルな動作のもとになる",
    },
    {
      id: "43",
      question: "2進数の1桁分の情報の最小単位をなんという？",
      answer01: "ビット",
      answer02: "バイト",
      answer03: "ワード",
      answer04: "カード",
      hint: "「ビ」で始まる",
      manaka: "ビビッとくれば大丈夫",
    },
    {
      id: "44",
      question: "「PHP」は、何の略？",
      answer01: "HypertextPreprocessor",
      answer02: "PersonalHostingPage",
      answer03: "PersonalHyperProgram",
      answer04: "PoohsanHonny",
      hint: "最初のPは無視してOK",
      manaka: "まあ、フィーリングでいけるっしょ",
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
      data: JSON.stringify({ scoreType: 'scoreU', score: score }),
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
