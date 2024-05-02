const request = require("supertest");
const express = require("express");
const bcrypt = require('bcrypt');
const PatientRegister = require("../models/patientRegister");
const authRouter = require("../Routes/authrouter");

// Mocking the Models
jest.mock("../models/patientRegister", () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));

jest.mock('../models/docRegister', () => ({ findOne: jest.fn() }));
jest.mock('../models/hospRegister', () => ({ findOne: jest.fn() }));
jest.mock('../models/admin', () => ({ findOne: jest.fn() }));

// Create an Express app
const app = express();
app.use(express.json());
app.use(authRouter) // Enable JSON body parsing

// Mount the user router
app.use(authRouter);

describe("Authentication routes", () => {
    const mockUsers = {
      patient: { username: 'John123', password: 'John@123', type: 'patient' },
    };
   
beforeEach(() => {
    require('../models/patientRegister').findOne.mockClear();
    });

describe("POST /login", () => {
it.each(Object.entries(mockUsers))("should authenticate %s with correct credentials", async (type, user) => {
    const { findOne } = require(`../models/${type === 'patient' ? 'patientRegister' : type + 'Register'}`);
    findOne.mockResolvedValue({
    ...user,
    password: await bcrypt.hash(user.password, 10) // Simulating stored hashed password
    });

    const response = await request(app)
    .post("/login")
    .send(user)
    .expect(200);

    expect(response.body).toEqual('exist');
    expect(findOne).toHaveBeenCalledWith({ username: user.username });
});
});

describe("POST /patientRegister", () => {
    it("should register a new patient", async () => {
      const patientData = {
        firstName: "Jane", lastName: "Doe", mobileNumber: "1234567890",
        mailID: "hesvitha@gmail.com", dob: "1990-01-01", occupation: "Engineer",
        bloodGroup: "A+", maritalStatus: "Single", gender: "Female"
      };

      require('../models/patientRegister').findOne.mockResolvedValue(null);
      require('../models/patientRegister').create.mockResolvedValue({
        ...patientData,
        verificationToken: '12345'
      });

      const response = await request(app)
        .post("/patientRegister")
        .send(patientData)
        .expect(200);

      expect(response.body.message).toContain('Registration successful');
    });

    it("should reject registration with existing email", async () => {
        const patientData = {
          firstName: "Jane", lastName: "Doe", mobileNumber: "1234567890",
          mailID: "hesvitha@example.com", dob: "1990-01-01", occupation: "Engineer",
          bloodGroup: "A+", maritalStatus: "Single", gender: "Female"
        };
  
        require('../models/patientRegister').findOne.mockResolvedValue(patientData);
  
        const response = await request(app)
          .post("/patientRegister")
          .send(patientData)
          .expect(400); // Assuming you handle this with a 400 status in your route
  
        expect(response.body).toEqual('exist');
      });
    });
  

});