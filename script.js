// Replace with your actual API Gateway URL
const API_BASE_URL = 'https://dvrrmeglbk.execute-api.ap-south-1.amazonaws.com/dev';
const API_KEY = '###';

document.addEventListener('DOMContentLoaded', function() {
    const testApiBtn = document.getElementById('testApi');
    const apiResponse = document.getElementById('apiResponse');
    
    testApiBtn.addEventListener('click', testApiConnection);
    
    // Show initial message
    apiResponse.innerHTML = 'Click "Test API Connection" to call your API Gateway endpoint';
});

async function testApiConnection() {
    const apiResponse = document.getElementById('apiResponse');
    const testApiBtn = document.getElementById('testApi');
    
    // Show loading state
    apiResponse.className = 'loading';
    apiResponse.innerHTML = 'Calling API Gateway...';
    testApiBtn.disabled = true;
    
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Show success
        apiResponse.className = 'success';
        apiResponse.innerHTML = JSON.stringify(data, null, 2);
        
    } catch (error) {
        // Show error
        apiResponse.className = 'error';
        apiResponse.innerHTML = `Error: ${error.message}\n\nMake sure to:\n1. Update API_BASE_URL in script.js\n2. Update API_KEY in script.js\n3. Enable CORS on your API Gateway`;
    } finally {
        testApiBtn.disabled = false;
    }
}