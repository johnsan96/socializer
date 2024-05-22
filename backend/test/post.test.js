const request = require('supertest');
const app = require('../app');
require("dotenv").config();

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MTU4NTM5ODcsImV4cCI6MTcxNTg1NzU4N30.rPhcUUVsqK7NK4ShRYM8O4Xl6uz-oXFf_eW7HkX4adE";

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
