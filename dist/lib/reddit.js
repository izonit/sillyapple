"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedditToken = getRedditToken;
exports.getRedditMeme = getRedditMeme;
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const userAgent = process.env.USER_AGENT;
async function getRedditToken() {
    const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
    const response = await axios_1.default.post('https://www.reddit.com/api/v1/access_token', 'grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': userAgent,
        },
    });
    return response.data.access_token;
}
async function getRedditMeme(subreddit = 'memes') {
    const token = await getRedditToken();
    const response = await axios_1.default.get(`https://oauth.reddit.com/r/${subreddit}/hot?limit=100`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'User-Agent': userAgent,
        },
    });
    const posts = response.data.data.children;
    const memes = posts.filter(post => post.data.post_hint === 'image');
    return memes[Math.floor(Math.random() * memes.length)].data;
}
