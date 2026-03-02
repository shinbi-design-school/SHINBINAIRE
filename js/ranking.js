// URLパラメータを取得する関数
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function loadRanking(scoreType) {
    $.ajax({
        url: 'api/ranking.php',
        method: 'GET',
        data: { type: scoreType },
        dataType: 'json',
        success: function(data) {
            const $tbody = $('#rankingBody');
            $tbody.empty();

            for (let i = 0; i < 10; i++) {
                let rowHtml = '';

                if (data[i]) {
                    rowHtml = `
                        <tr>
                            <td class="rank">${i + 1}</td>
                            <td class="name">${data[i].name}</td>
                            <td class="date">${data[i].updated_at}</td>
                            <td class="score">得点 ${data[i].score}</td>
                        </tr>`;
                } else {
                    rowHtml = `
                        <tr>
                            <td class="rank">${i + 1}</td>
                            <td class="name">---</td>
                            <td class="date">----/--/--</td>
                            <td class="score">得点 0</td>
                        </tr>`;
                }
                $tbody.append(rowHtml);
            }
        },
        error: function() {
            console.error('ランキングの取得に失敗しました');
        }
    });
}

$(function() {
    // URLパラメータから先生を判定
    const teacherParam = getUrlParameter('teacher');
    let initialScoreType = 'scoreT'; // デフォルトは田中先生
    
    // パラメータに応じて初期表示を変更
    if (teacherParam === 'akabane') {
        initialScoreType = 'scoreA';
    } else if (teacherParam === 'usui') {
        initialScoreType = 'scoreU';
    }
    
    // 該当するボタンにactiveクラスを追加
    $('.teacher-btn').each(function() {
        if ($(this).data('score-type') === initialScoreType) {
            $(this).addClass('active');
        }
    });
    
    // ページ読み込み時に該当する先生のランキングを表示
    loadRanking(initialScoreType);

    // ボタンクリックで切り替え
    $('.teacher-btn').on('click', function() {
        // data-score-typeがないボタン（TOPへ戻る）の場合は処理しない
        if (!$(this).data('score-type')) {
            return;
        }
        
        $('.teacher-btn').removeClass('active');
        $(this).addClass('active');
        const scoreType = $(this).data('score-type');
        loadRanking(scoreType);
    });
});