const firebase = require('firebase/app');
require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyCSKWFuf4hjVGAxQ1AVZFkFX36s-84zZyM",
  authDomain: "lifeline-303af.firebaseapp.com",
  // other config variables
};

// Initialize Firebase
if (!firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig);
}
const bcrypt = require('bcrypt');
  const PatientRegisters = require("../models/patientRegister");
  const request = require("supertest");
  const express = require("express");
  
  const app = express();
  app.use(express.json());
  
  const router = require('../Routes/adminrouter');
  app.use(router);
  jest.mock('bcrypt', () => ({
    compare: jest.fn()
  }));
  
  jest.mock('../models/patientRegister', () => ({
    deleteOne: jest.fn()
  }));
  
  
  
  app.use(router);

  describe("POST /deleteuser", () => {
    beforeEach(() => {
      bcrypt.compare.mockClear();
      PatientRegisters.deleteOne.mockClear();
    });
    
    it("should delete the user if credentials match", async () => {
      bcrypt.compare.mockResolvedValue(true);
      PatientRegisters.deleteOne.mockResolvedValue({ deletedCount: 1 });
  
      const response = await request(app)
        .post("/deleteuser")
        .send({
          enteredUsername: "John123",
          enteredPassword: "John@123",
          actualusername: "John123",
          actualpassword: "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM"
        });
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual('deleted');
        expect(bcrypt.compare).toHaveBeenCalledWith("John@123", "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM");
        expect(PatientRegisters.deleteOne).toHaveBeenCalledWith({ username: "John123" });
        
    });
  
//     it("should return 'mismatched' if usernames do not match", async () => {
//       const response = await request(app)
//         .post("/deleteuser")
//         .send({
//           enteredUsername: "John123",
//           enteredPassword: "John@123",
//           actualusername: "John124",
//           actualpassword: "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM."
//         });
  
//       expect(response.body).toEqual('mismatched');
//     });
  
//     it("should return 'mismatched' if the password does not match", async () => {
//       bcrypt.compare.mockResolvedValue(false);
  
//       const response = await request(app)
//         .post("/deleteuser")
//         .send({
//           enteredUsername: "John123",
//           enteredPassword: "wrongPassword",
//           actualusername: "John123",
//           actualpassword: "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM."
//         });
  
//       expect(bcrypt.compare).toHaveBeenCalledWith("wrongPassword", "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM.");
//       expect(response.body).toEqual('mismatched');
//     });
  
//     it("should handle internal server error", async () => {
//       bcrypt.compare.mockRejectedValue(new Error('Internal Error'));
  
//       const response = await request(app)
//         .post("/deleteuser")
//         .send({
//           enteredUsername: "John123",
//           enteredPassword: "John@123",
//           actualusername: "John123",
//           actualpassword: "$2b$10$MbDguYjgnIpIGc67nzn3O.rmlFNfCQQsgtzOwx0tsPkbUCdGcpXM."
//         });
  
//       expect(response.status).toBe(500);
//       expect(response.body).toEqual({ message: 'Internal Server Error' });
//     });
//   
});
  
  