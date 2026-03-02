<?php
require_once __DIR__ . '/../api/config.php';

class Database {
    private $db;
    
    public function __construct() {
        try {
            $this->db = new PDO('sqlite:' . DB_PATH);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // テーブルを自動作成
            $this->initializeTables();
            
        } catch (PDOException $e) {
            error_log('データベース接続エラー: ' . $e->getMessage());
            throw new Exception('データベース接続エラー: ' . $e->getMessage());
        }
    }
    
    // ★ テーブル初期化メソッドを追加 ★
    private function initializeTables() {
        // テーブル作成SQL
        $sql = "CREATE TABLE IF NOT EXISTS user_rankings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            scoreT INTEGER DEFAULT 0,
            scoreA INTEGER DEFAULT 0,
            scoreU INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_scoreT_at DATETIME,
            updated_scoreA_at DATETIME,
            updated_scoreU_at DATETIME
        )";
        
        $this->db->exec($sql);
        
        // インデックス作成
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_email ON user_rankings(email)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_scoreT ON user_rankings(scoreT DESC)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_scoreA ON user_rankings(scoreA DESC)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_scoreU ON user_rankings(scoreU DESC)");
        
        error_log("Tables initialized successfully");
    }
    
    public function getConnection() {
        return $this->db;
    }
    
    // ユーザー登録
    public function registerUser($name, $email) {
        try {
            $stmt = $this->db->prepare("INSERT OR IGNORE INTO user_rankings (name, email) VALUES (?, ?)");
            return $stmt->execute([$name, $email]);
        } catch (PDOException $e) {
            error_log('registerUser エラー: ' . $e->getMessage());
            throw new Exception('ユーザー登録エラー');
        }
    }
    
    // ユーザー取得
    public function getUserByEmail($email) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM user_rankings WHERE email = ?");
            $stmt->execute([$email]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('getUserByEmail エラー: ' . $e->getMessage());
            throw new Exception('ユーザー取得エラー');
        }
    }
    
    // 名前更新
    public function updateUserName($email, $name) {
        try {
            $stmt = $this->db->prepare("UPDATE user_rankings SET name = ? WHERE email = ?");
            return $stmt->execute([$name, $email]);
        } catch (PDOException $e) {
            error_log('updateUserName エラー: ' . $e->getMessage());
            throw new Exception('名前更新エラー');
        }
    }
    
    // スコア更新（レコード更新のみ）
    public function updateScore($email, $scoreType, $newScore) {
        $allowedTypes = ['scoreT', 'scoreA', 'scoreU'];
        if (!in_array($scoreType, $allowedTypes)) {
            return false;
        }
        
        try {
            $updateColumn = "updated_{$scoreType}_at";
            $sql = "UPDATE user_rankings 
                    SET {$scoreType} = ?, {$updateColumn} = CURRENT_TIMESTAMP 
                    WHERE email = ? AND ({$scoreType} IS NULL OR {$scoreType} < ?)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$newScore, $email, $newScore]);
            
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log('updateScore エラー: ' . $e->getMessage());
            throw new Exception('スコア更新エラー');
        }
    }
    
    // ランキング取得
    public function getRanking($scoreType, $limit = 10) {
        $allowedTypes = ['scoreT', 'scoreA', 'scoreU'];
        if (!in_array($scoreType, $allowedTypes)) {
            return [];
        }
        
        try {
            $updateColumn = "updated_{$scoreType}_at";
            $sql = "SELECT 
                        ROW_NUMBER() OVER (ORDER BY {$scoreType} DESC) as rank,
                        name,
                        email,
                        {$scoreType} as score,
                        {$updateColumn} as updated_at
                    FROM user_rankings
                    WHERE {$scoreType} IS NOT NULL
                    ORDER BY {$scoreType} DESC
                    LIMIT ?";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$limit]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('getRanking エラー: ' . $e->getMessage());
            return [];
        }
    }
    
    // ユーザーの順位取得
    public function getUserRank($email, $scoreType) {
        $allowedTypes = ['scoreT', 'scoreA', 'scoreU'];
        if (!in_array($scoreType, $allowedTypes)) {
            return null;
        }
        
        try {
            $sql = "SELECT rank, name, email, score
                    FROM (
                        SELECT 
                            ROW_NUMBER() OVER (ORDER BY {$scoreType} DESC) as rank,
                            name,
                            email,
                            {$scoreType} as score
                        FROM user_rankings
                        WHERE {$scoreType} IS NOT NULL
                    )
                    WHERE email = ?";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$email]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('getUserRank エラー: ' . $e->getMessage());
            return null;
        }
    }
}