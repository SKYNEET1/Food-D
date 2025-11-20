const request = require('supertest');
const user = require('../../model/User');
const { setUpDb, closeDB, clearDB } = require('./config/setup');
const app = require('..');
const { validUser, invalidUser } = require('./payload/payload');


beforeAll(async () => {
    await setUpDb();
})

beforeEach(async () => {
    await clearDB();   
});

afterAll(async () => {
    await closeDB();
})

describe("User Registration API Tests", () => {

    test("Should register a user successfully", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send(validUser)
    });

    test("Should fail for duplicate user", async () => {
        await User.create(invalidUser.existingUser);

        const res = await request(app)
            .post("/api/auth/signup")
            .send(invalidUser.existingUser);

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/already registered/);
    })

        test("Should fail JOI validation (missing username)", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send(invalidUser.usernameMissing);

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors.length).toBeGreaterThan(0);
    });

    test("Should fail for invalid category", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send(invalidUser.invalidCategory);

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors[0]).toMatch(/category/);
    });
})