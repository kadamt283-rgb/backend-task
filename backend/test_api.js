const http = require('http');
const fs = require('fs');

http.get('http://127.0.0.1:5000/api/products', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('api_test_result.json', data);
        console.log('Results written to api_test_result.json');
    });
}).on('error', err => {
    fs.writeFileSync('api_test_result.json', JSON.stringify({ error: err.message }));
    console.log('Error:', err.message);
});
