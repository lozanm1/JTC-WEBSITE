<?php
/**
 * Retrieve Mission/Vision Content
 * JTC GROUP OF COMPANIES
 * 
 * This script retrieves mission and vision statements from storage
 */

header('Content-Type: application/json');

try {
    $contentFile = 'data/content.json';

    // Load content from file
    if (file_exists($contentFile)) {
        $contentData = json_decode(file_get_contents($contentFile), true);
        
        // Return the content
        echo json_encode([
            'mission' => $contentData['mission'] ?? 'To deliver innovative solutions and exceptional services that create lasting value for our customers, employees, and communities.',
            'vision' => $contentData['vision'] ?? 'To be the most trusted and respected group of companies, recognized globally for our excellence, innovation, and positive impact on society.'
        ]);
    } else {
        // Return default content if file doesn't exist
        echo json_encode([
            'mission' => 'To deliver innovative solutions and exceptional services that create lasting value for our customers, employees, and communities.',
            'vision' => 'To be the most trusted and respected group of companies, recognized globally for our excellence, innovation, and positive impact on society.'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while retrieving content: ' . $e->getMessage()
    ]);
}
?>
