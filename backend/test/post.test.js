const request = require('supertest');
const app = require('../app');
require("dotenv").config();

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE5MTA3ODMsImV4cCI6MTcxMTkxNDM4M30.JbAd4hOW_K-TeOggvxL7D9zlDNmKZ0_4ueVAMUMVUso";

describe('POST /posts', () => {
    it('should create a new post', async () => {
        const postData = {
            title: 'Test Title',
            description: 'Test Description',
            image_url: 'test_image_url'
        };

        const res = await request(app)
            .post('/posts')
            .set('Cookie', `token=${token}`)
            .send(postData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('post');
        expect(res.body.post).toHaveProperty('title', 'Test Title');
        expect(res.body.post).toHaveProperty('description', 'Test Description');
        expect(res.body.post).toHaveProperty('image_url', 'test_image_url');
    });
});

describe('GET /posts', () => {
    it('should get all posts', async () => {
        const res = await request(app)
            .get('/posts')
            .set('Cookie', `token=${token}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
