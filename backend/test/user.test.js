const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const model = require('../models/user');

describe('POST /users', () => {
    it('should register a new user', async () => {
        const userData = {
            name: 'TestdfsdfdsfUser',
            description: 'Test Descripdsfsftion',
            email: 'tessdfdsft@example.com',
            password: 'password12sdfsf3'
        };

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const res = await request(app)
            .post('/users')
            .send({
                name: userData.name,
                description: userData.description,
                email: userData.email,
                password: userData.password
            });

        // Überprüfe, ob die Antwort den erwarteten Statuscode hat
        expect(res.statusCode).toEqual(201);

        // Überprüfe, ob die Antwort eine Benachrichtigung über die erfolgreiche Erstellung des Benutzers enthält
        expect(res.body).toHaveProperty('message', 'User erstellt');

        // Überprüfe, ob die Antwort den Benutzer enthält und seine Eigenschaften korrekt sind
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('name', userData.name);
        expect(res.body.user).toHaveProperty('description', userData.description);
        expect(res.body.user).toHaveProperty('email', userData.email);

        // Überprüfe, ob das Passwort korrekt gehasht wurde
        expect(res.body.user.password).not.toEqual(userData.password);
        expect(await bcrypt.compare(userData.password, res.body.user.password)).toBe(true);
    });
});
