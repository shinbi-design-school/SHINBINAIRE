<?php
require_once __DIR__ . '/../api/config.php';

// POSTでなければトップに戻す
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

$username = trim($_POST['username'] ?? '');
$email    = trim($_POST['email'] ?? '');

// バリデーション
if (empty($username) || empty($email)) {
    header('Location: index.php?error=empty');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.php?error=invalid_email');
    exit;
}

try {
    $pdo = new PDO('sqlite:' . DB_PATH);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // メールアドレスで既存ユーザーを検索
    $stmt = $pdo->prepare("SELECT id, name FROM user_rankings WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        // 既存ユーザー：セッションにセット
        $_SESSION['user_id']   = $existing['id'];
        $_SESSION['username']  = $existing['name'];
        $_SESSION['email']     = $email;
    } else {
        // 新規ユーザー：INSERT
        $stmt = $pdo->prepare("INSERT INTO user_rankings (name, email) VALUES (:name, :email)");
        $stmt->execute([':name' => $username, ':email' => $email]);
        $_SESSION['user_id']  = $pdo->lastInsertId();
        $_SESSION['username'] = $username;
        $_SESSION['email']    = $email;
    }

    // select.htmlへリダイレクト
    header('Location: ../select.html');
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo 'DBエラー: ' . $e->getMessage();
}