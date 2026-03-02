-- テーブル作成スクリプト
CREATE TABLE IF NOT EXISTS user_rankings (
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
);

CREATE INDEX IF NOT EXISTS idx_email ON user_rankings(email);
CREATE INDEX IF NOT EXISTS idx_scoreT ON user_rankings(scoreT DESC);
CREATE INDEX IF NOT EXISTS idx_scoreA ON user_rankings(scoreA DESC);
CREATE INDEX IF NOT EXISTS idx_scoreU ON user_rankings(scoreU DESC);