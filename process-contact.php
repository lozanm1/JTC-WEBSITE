<?php
/**
 * Contact Form Processor
 * JTC GROUP OF COMPANIES
 * 
 * This script processes contact form submissions
 */

header('Content-Type: application/json');

// Get form data
$name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
$message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';

// Validate form data
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// If there are errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// Process the contact form
try {
    // Prepare email data
    $to = 'contact@jtcgroup.com'; // Replace with your email
    $subject = 'New Contact Form Submission from ' . $name;
    
    $emailBody = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
                .header { color: #15133F; border-bottom: 2px solid #6366f1; padding-bottom: 10px; margin-bottom: 20px; }
                .content { line-height: 1.6; }
                .field { margin: 15px 0; }
                .label { font-weight: bold; color: #15133F; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>New Contact Form Submission</h2>
                </div>
                <div class='content'>
                    <div class='field'>
                        <span class='label'>Name:</span> {$name}
                    </div>
                    <div class='field'>
                        <span class='label'>Email:</span> {$email}
                    </div>
                    <div class='field'>
                        <span class='label'>Message:</span>
                        <p>{$message}</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    ";

    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: " . $email . "\r\n";

    // Send email
    $mailSent = mail($to, $subject, $emailBody, $headers);

    if ($mailSent) {
        // Log the contact submission (optional)
        logContactSubmission($name, $email, $message);

        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while processing your request. Please try again later.'
    ]);
}

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

/**
 * Log contact submissions (optional)
 */
function logContactSubmission($name, $email, $message) {
    $logFile = 'logs/contact_submissions.log';
    
    // Create logs directory if it doesn't exist
    if (!is_dir('logs')) {
        mkdir('logs', 0755, true);
    }

    $logData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
    ];

    $logEntry = json_encode($logData) . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}
?>
