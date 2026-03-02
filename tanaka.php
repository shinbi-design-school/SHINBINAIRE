<?php
require_once __DIR__ . '/api/config.php';

// セッションチェック：未ログインならindex.phpへ
if (empty($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="クイズSHNBINEIREは、SHNBIデザインスクールにまつわるクイズを提供するゲームサイト。ユーザーのSHNBI愛を測ることができる。">
    <title>クイズSHNBINAIRE - 田中先生</title>
    <!-- ファビコン -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/quiz.css">
  <!-- Adobe Web Fonts -->
    <script>
      (function(d) {
        var config = {
          kitId: 'nyx6yfv',
          scriptTimeout: 3000,
          async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
      })(document);
    </script>
</head>
<body class="quiz-body">
  <!-- 先生画像 -->
  <img src="images/tanaka_bust.png" alt="" class="center-graphic">
  
  <!-- タイマー（左上） -->
  <div class="timer-wrap">
    <img src="images/i_timer.png" alt="タイマー" class="timer-img">
    <div class="timer-num font_en" id="timerNum">10</div>
  </div>

  <!-- ヒントボタン（右上） -->
  <div class="hint-buttons">
    <button class="hint-btn" id="hint5050">
      <img src="images/item_fifty.png" alt="50:50" class="img-default">
      <img src="images/item_fifty2.png" alt="50:50" class="img-hover">
    </button>
    <button class="hint-btn" id="hintPhone">
      <img src="images/item_tel.png" alt="テレフォン" class="img-default">
      <img src="images/item_tel2.png" alt="テレフォン" class="img-hover">
    </button>
    <button class="hint-btn" id="hintInfo">
      <img src="images/item_hint.png" alt="ヒント" class="img-default">
      <img src="images/item_hint2.png" alt="ヒント" class="img-hover">
    </button>
  </div>

  <!-- ヒントモーダル -->
  <div id="hintModal" class="hint-modal" style="display:none;">
    <div class="hint-modal-inner">
      <p class="hint-modal-text" id="hintModalText"></p>
      <button class="hint-modal-close" id="hintModalClose">閉じる</button>
    </div>
  </div>

  <!-- テレフォンモーダル -->
  <div id="phoneModal" class="phone-modal" style="display:none;">
    <div class="phone-modal-inner">
      <img src="" alt="間中先生" id="phoneModalImg" class="phone-modal-img">
      <p class="phone-modal-text" id="phoneModalText"></p>
      <button class="phone-modal-close" id="phoneModalClose">✕</button>
    </div>
  </div>

  <!-- 終了モーダル -->
  <div id="resultModal" class="result-modal" style="display:none;">
    <div class="result-modal-inner">
      <p class="result-score" id="resultScore"></p>
      <p class="result-comment" id="resultComment"></p>
      <div class="result-buttons">
        <a href="index.php" class="result-btn">ゲームをやめる</a>
        <a href="select.html" class="result-btn">もう一度遊ぶ</a>
        <a href="ranking.html?teacher=scoreT" class="result-btn">ランキングを表示</a>
      </div>
    </div>
  </div>

  <!-- 問題エリア -->
  <div class="question-area">
    
    <!-- 問題文 -->
    <div class="question-box">
      <div class="box-line"></div>
      <img src="images/bg_questions.png" alt="問題枠" class="question-frame">
      <div class="question-text" id="questionText">
        <br>
      </div>
    </div>

    <!-- 選択肢 -->
    <div class="answers-grid">
      <div class="box-line-ans line-row1"></div>
      <!-- A -->
      <button class="answer-btn answer-a" data-answer="1">
        <img src="images/btn_a.png" alt="A" class="answer-frame img-default">
        <img src="images/btn_a2.png" alt="A" class="answer-frame img-hover">
        <span class="answer-text" id="answerA"></span>
      </button>

      <!-- B -->
      <button class="answer-btn answer-b" data-answer="2">
        <img src="images/btn_b.png" alt="B" class="answer-frame img-default">
        <img src="images/btn_b2.png" alt="B" class="answer-frame img-hover">
        <span class="answer-text" id="answerB"></span>
      </button>

      <div class="box-line-ans line-row2"></div>
      <!-- C -->
      <button class="answer-btn answer-c" data-answer="3">
        <img src="images/btn_c.png" alt="C" class="answer-frame img-default">
        <img src="images/btn_c2.png" alt="C" class="answer-frame img-hover">
        <span class="answer-text" id="answerC"></span>
      </button>

      <!-- D -->
      <button class="answer-btn answer-d" data-answer="4">
        <img src="images/btn_d.png" alt="D" class="answer-frame img-default">
        <img src="images/btn_d2.png" alt="D" class="answer-frame img-hover">
        <span class="answer-text" id="answerD"></span>
      </button>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-4.0.0.js"></script>
  <script src="js/tanaka.js"></script>
</body>
</html>