import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const userAgent = process.env.USER_AGENT;

export async function getRedditToken() {
  const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post('https://www.reddit.com/api/v1/access_token', 
        'grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': userAgent,
        },
    });
    return response.data.access_token;
}

export async function getRedditMeme(subreddit = 'memes') {
  const token = await getRedditToken();
  const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/hot?limit=100`, {
      headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': userAgent,
      },
  });
  const posts = response.data.data.children;
  const memes = posts.filter(post => post.data.post_hint === 'image');
  return memes[Math.floor(Math.random() * memes.length)].data;
}