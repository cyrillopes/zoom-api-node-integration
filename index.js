require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// const apiKey = process.env.ZOOM_API_KEY;
// const apiSecret = process.env.ZOOM_API_SECRET;

// const payload = {
//   iss: apiKey,
//   exp: new Date().getTime() + 5000,
// };

// const token = jwt.sign(payload, apiSecret);

const token = process.env.TOKEN;

const getMeetings = async () => {
  try {
    const response = await axios.get(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message, 'error');
  }
};

const createMeeting = async (
  topic,
  start_time,
  type,
  duration,
  timezone,
  agenda
) => {
  try {
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic,
        start_time,
        type,
        duration,
        timezone,
        agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: 'both',
          auto_recording: 'none',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message, 'error');
  }
};

(async () => {
  console.log(await getMeetings());
  console.log(
    await createMeeting(
      'Appointment With Andrea',
      '2024-05-26T12:11:00Z',
      '2',
      '40',
      'UTC',
      'Team meeting for event preparation'
    )
  );
  console.log(await getMeetings());
})();
