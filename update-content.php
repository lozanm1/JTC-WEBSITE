<?php
/**
 * Update Mission/Vision Content
 * JTC GROUP OF COMPANIES
 * 
 * This script handles updates to mission and vision statements
 */

header('Content-Type: application/json');

// Get JSON data from request
$input = json_decode(file_get_contents('php://input'), true);

$type = isset($input['type']) ? $input['type'] : '';
$content = isset($input['content']) ? $input['content'] : '';

// Validate input
if (empty($type) || empty($content)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Type and content are required'
    ]);
    exit;
}

// Validate type
if ($type !== 'mission' && $type !== 'vision') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid type. Must be "mission" or "vision"'
    ]);
    exit;
}

try {
    // Path to content file
    $contentFile = 'data/content.json';

    // Create data directory if it doesn't exist
    if (!is_dir('data')) {
        mkdir('data', 0755, true);
    }

    // Load existing content or create new array
    $contentData = [];
    if (file_exists($contentFile)) {
        $contentData = json_decode(file_get_contents($contentFile), true);
        if (!is_array($contentData)) {
            $contentData = [];
        }
    }

    // Update the content
    $contentData[$type] = sanitizeContent($content);
    $contentData['updated_at'] = date('Y-m-d H:i:s');

    // Save to file
    $saved = file_put_contents(
        $contentFile,
        json_encode($contentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    );

    if ($saved !== false) {
        // Log the update
        logContentUpdate($type, $content);

        echo json_encode([
            'success' => true,
            'message' => ucfirst($type) . ' updated successfully'
        ]);
    } else {
        throw new Exception('Failed to save content');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while updating content: ' . $e->getMessage()
    ]);
}

/**
 * Sanitize content input
 */
function sanitizeContent($content) {
    // Remove potentially dangerous HTML tags but preserve text formatting
    $allowed_tags = '<p><br><strong><em><ul><li><ol>';
    return strip_tags($content, $allowed_tags);
}

/**
 * Log content updates
 */
function logContentUpdate($type, $content) {
    $logFile = 'logs/content_updates.log';

    // Create logs directory if it doesn't exist
    if (!is_dir('logs')) {
        mkdir('logs', 0755, true);
    }

    $logData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'type' => $type,
        'content' => substr($content, 0, 100), // Log first 100 chars
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
    ];

    $logEntry = json_encode($logData) . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}
?>
