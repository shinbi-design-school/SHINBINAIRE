<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
require_once __DIR__ . '/config.php';

$type = $_GET['type'] ?? 'scoreT';

$mapping = [
    'scoreT' => 'updated_scoreT_at',
    'scoreA' => 'updated_scoreA_at',
    'scoreU' => 'updated_scoreU_at'
];

if (!array_key_exists($type, $mapping)) {
    echo json_encode([]);
    exit;
}

$dateColumn = $mapping[$type];

try {
    $pdo = new PDO('sqlite:' . DB_PATH);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQLiteはDATE_FORMATの代わりにstrftimeを使用
    $sql = "SELECT name,
                   {$type} AS score,
                   strftime('%Y-%m-%d', {$dateColumn}) AS updated_at
            FROM user_rankings
            WHERE {$type} IS NOT NULL
            ORDER BY {$type} DESC
            LIMIT 10";

    $stmt = $pdo->query($sql);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
