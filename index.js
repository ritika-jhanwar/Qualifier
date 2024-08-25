const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function processData(data) {
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets
        .filter(ch => ch === ch.toLowerCase())
        .sort()
        .slice(-1);

    return { numbers, alphabets, highestLowercaseAlphabet };
}

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        const userId = "john_doe_17091999";
        const email = "john@xyz.com";
        const rollNumber = "ABCD123";

        const { numbers, alphabets, highestLowercaseAlphabet } = processData(data);

        const response = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            is_success: false,
            message: 'An error occurred processing the request.'
        });
    }
});

app.get('/bfhl', (req, res) => {
    return res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});