<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// セッションチェック
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$scoreType = $input['scoreType'] ?? null;
$score     = $input['score'] ?? null;

// セッションからユーザー情報を取得
$name  = $_SESSION['username'] ?? null;
$email = $_SESSION['email'] ?? null;

// バリデーション
$allowedTypes = ['scoreT', 'scoreA', 'scoreU'];
if (!in_array($scoreType, $allowedTypes) || !is_numeric($score) || empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid parameters']);
    exit;
}

$dateColumn = 'updated_' . $scoreType . '_at';

try {
    $pdo = new PDO('sqlite:' . DB_PATH);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT id, {$scoreType} FROM user_rankings WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    $isNewRecord = false;
    $bestScore   = 0;

    if ($existing) {
        $bestScore = (int)$existing[$scoreType];
        if ((int)$score > $bestScore) {
            // 新記録
            $stmt = $pdo->prepare("UPDATE user_rankings 
                                   SET {$scoreType} = :score, 
                                       {$dateColumn} = CURRENT_TIMESTAMP
                                   WHERE email = :email");
            $stmt->execute([':score' => (int)$score, ':email' => $email]);
            $isNewRecord = true;
            $bestScore   = (int)$score;
        }
    } else {
        // 新規ユーザー
        $stmt = $pdo->prepare("INSERT INTO user_rankings (name, email, {$scoreType}, {$dateColumn})
                               VALUES (:name, :email, :score, CURRENT_TIMESTAMP)");
        $stmt->execute([
            ':name'  => $name,
            ':email' => $email,
            ':score' => (int)$score
        ]);
        $isNewRecord = true;
        $bestScore   = (int)$score;
    }

    echo json_encode([
        'success'     => true,
        'score'       => (int)$score,
        'bestScore'   => $bestScore,
        'isNewRecord' => $isNewRecord,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
