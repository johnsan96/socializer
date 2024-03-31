const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');

// Annahme: Das Testbild liegt im 'uploads'-Ordner
const testImagePath = path.join(__dirname, '..', 'uploads', '0x0ss.png');

describe('POST /image', () => {
    it('should upload an image', async () => {
        // Lese das Bild als Buffer
        const imageBuffer = fs.readFileSync(testImagePath);

        const res = await request(app)
            .post('/image')
            .attach('image', imageBuffer, '0x0ss.png');

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('imageName');
        expect(res.body.imageName).toEqual('0x0ss.png');
    });
});
