const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

        const userId = "ritika_jhanwar_10032003";
        const email = "ritika@xyz.com";
        const rollNumber = "21BCE1035";

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
