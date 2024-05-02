const request = require("supertest");
const express = require("express");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const PatientRegisters = require("../models/patientRegister");  // Ensure this is the correct path to your model
const app = express();
app.use(express.json());

jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    getDownloadURL: jest.fn(() => Promise.resolve("http://fakeurl.com/fakeimage.jpg"))
  }));
  

const router = require("../Routes/adminrouter"); // Ensure this is the correct path to your router
app.use(router);

jest.mock("../models/patientRegister", () => {
    return {
      findOne: jest.fn(),
      deleteOne: jest.fn()
    };
  });
  
  jest.mock("bcrypt", () => ({
    compare: jest.fn()
  }));
  
  describe("User management routes", () => {
      beforeEach(() => {
          bcrypt.compare.mockClear();
          PatientRegisters.findOne.mockClear();
          PatientRegisters.deleteOne.mockClear();
      });
  
      describe("DELETE /deleteuser", () => {
          it("should delete the user if credentials match", async () => {
              // Setup
              PatientRegisters.findOne.mockResolvedValue({
                  username: "John123",
                  password: "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM."  // Example bcrypt hash
              });
              bcrypt.compare.mockResolvedValue(true);  // Simulate password match
  
              // Execute
              const response = await request(app)
                  .delete("/deleteuser")
                  .send({
                      username: "John123",
                      password: "John@123"  // Correct password
                  });
  
              // Validate
              expect(bcrypt.compare).toHaveBeenCalledWith("John@123", "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM.");
              expect(PatientRegisters.deleteOne).toHaveBeenCalledWith({ username: "John@123" });
              expect(response.status).toBe(200);
          });
  
          it("should not delete the user if credentials do not match", async () => {
              // Setup
              PatientRegisters.findOne.mockResolvedValue({
                  username: "John123",
                  password: "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM."  // Example bcrypt hash
              });
              bcrypt.compare.mockResolvedValue(false);  // Simulate password mismatch
  
              // Execute
              const response = await request(app)
                  .delete("/deleteuser")
                  .send({
                      username: "John123",
                      password: "wrongPassword"
                  });
  
              // Validate
              expect(bcrypt.compare).toHaveBeenCalledWith("wrongPassword", "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM.");
              expect(PatientRegisters.deleteOne).not.toHaveBeenCalled();
              expect(response.status).toBe(401);
          });
      });
  });