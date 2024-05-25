require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res, next) => {
  try {
    const code = req.query.code;
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`
        ).toString('base64')}`,
      },
    });
    res.send(response.data.access_token);
  } catch (error) {
    console.log('error', error);
    res.send(error);
  }
});

app.get('/auth/zoom', (req, res, next) => {
  const clientId = process.env.ZOOM_API_KEY;
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
