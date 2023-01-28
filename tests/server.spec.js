const request = require("supertest");
const server = require("../index");
const {faker} = require("@faker-js/faker");

describe("Operaciones CRUD de cafes", () => {
    describe("GET /cafes", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(server).get("/cafes").send();
            expect(response.statusCode).toBe(200);
        });

        test("should respond an array", async () => {
            const response = await request(server).get("/cafes").send();
            expect(response.body).toBeInstanceOf(Array);
        });

        test("should respond have at least one object", async () => {
            // const response = await request(server).get("/cafes").send();
            // const anyObject = response.body.some(elem => typeof elem === 'object');
            // expect(anyObject).toBeTruthy();

            const response = await request(server).get("/cafes").send();
            expect(response.body.length >= 1 ).toBeTruthy();
        });

        test("should respond with a 404 status code", async () => {
            const token = "token";
            const idTest = `${faker.datatype.uuid()}`;
            const response = await request(server).delete(`/cafes/${idTest}`)
                .set('Authorization', token)
                .send();
            expect(response.statusCode).toBe(404);
        });

        test("should respond with a 201 status code when adding a new coffe", async () => {
            const idTest = `${faker.datatype.uuid()}`;
            const newCoffe = {
                "id": idTest,
                "nombre":"testCoffe"
            }
            const response = await request(server).post("/cafes").send(newCoffe);
            expect(response.statusCode).toBe(201);
        });

        test("should respond with a 400 status code when adding a new coffe", async () => {
            const idTest = `${faker.datatype.uuid()}`;
            const newCoffe = {
                "id":"2",
                "nombre":"testCoffe"
            }
            const response = await request(server).put(`/cafes/${idTest}`).send(newCoffe);
            expect(response.statusCode).toBe(400);
        });
    });
});
