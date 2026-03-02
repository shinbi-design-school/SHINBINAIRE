<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHINBINAIRE シンビネア | あなたのシンビ愛を確かめるクイズゲーム</title>
    <!-- ファビコン -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <!-- Reset CSS -->
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css">
    <link rel="stylesheet" href="css/top.css">
    <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js" defer></script>
    <script src="js/howto.js" defer></script>
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
<body id="top">
    <div id="container">
        <div id="loginbox">
            <form action="php/login.php" method="post">
                <input type="text" placeholder="名前" name="username" id="login" required>
                <input type="email" placeholder="メールアドレス" name="email" id="login" required>
                <input type="submit" name="login" value="ログイン" id="login2">
            </form>
        </div>
        <p id="t_link">　/　<button type="button" class="js-open-modal text-button" data-slide-index="1">遊び方</button>　/　<button type="button" class="text-button"><a href="ranking.html">ランキング</a></button>　/　<button type="button" class="text-button"><a href="credits.html" target="_blank" rel="noopener noreferrer">クレジット</a></button>　/</p>
    </div>

    <!-- モーダル -->
    <div class="modal" id="modal">
        <div class="modal__overlay js-close-modal"></div>
        <div class="modal__content">
            <button class="modal__close-btn js-close-modal" aria-label="閉じる">×</button>
            <div class="swiper modal__slider">
                <div class="swiper-wrapper">
                    <div class="swiper-slide modal__slide"><img class="rule_image" src="images/rule01.png"></div>
                    <div class="swiper-slide modal__slide"><img class="rule_image" src="images/rule02.png"></div>
                    <div class="swiper-slide modal__slide"><img class="rule_image" src="images/rule03.png"></div>
                    <div class="swiper-slide modal__slide"><img class="rule_image" src="images/rule04.png"></div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
    </div>

    <footer>
        <div id="copyright">
            <small>&copy; 2026 KOCCHAN'S RIDERS CLUB.</small>
        </div>
    </footer>
</body>
</html>