<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../includes/db.php';

$db = new Database();

// リクエストメソッドを取得
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $action = $data['action'] ?? '';
    
    if ($action === 'auto_login') {
        // 自動登録/ログイン処理
        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        
        // バリデーション
        if (empty($name) || empty($email)) {
            echo json_encode(['success' => false, 'message' => '名前とメールアドレスを入力してください']);
            exit;
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => '有効なメールアドレスを入力してください']);
            exit;
        }
        
        // メールアドレスでユーザーを検索
        $user = $db->getUserByEmail($email);
        
        if ($user) {
            // 既存ユーザー → ログイン
            
            // 名前が変更されている場合は更新
            if ($user['name'] !== $name) {
                $db->updateUserName($email, $name);
                $user['name'] = $name;
            }
            
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_name'] = $user['name'];
            
            echo json_encode([
                'success' => true, 
                'message' => 'ログイン成功',
                'isNewUser' => false,
                'user' => $user
            ]);
        } else {
            // 新規ユーザー → 自動登録
            $result = $db->registerUser($name, $email);
            
            if ($result) {
                $_SESSION['user_email'] = $email;
                $_SESSION['user_name'] = $name;
                
                // 登録後のユーザー情報を取得
                $user = $db->getUserByEmail($email);
                
                echo json_encode([
                    'success' => true, 
                    'message' => '新規登録完了',
                    'isNewUser' => true,
                    'user' => $user
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => '登録に失敗しました']);
            }
        }
        
    } elseif ($action === 'logout') {
        // ログアウト
        session_destroy();
        echo json_encode(['success' => true, 'message' => 'ログアウトしました']);
    }
    
} elseif ($method === 'GET') {
    // ログイン状態確認
    if (isset($_SESSION['user_email'])) {
        $user = $db->getUserByEmail($_SESSION['user_email']);
        echo json_encode(['loggedIn' => true, 'user' => $user]);
    } else {
        echo json_encode(['loggedIn' => false]);
    }
}