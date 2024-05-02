const request = require("supertest");
const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const DocRegisters = require("../models/docRegister");
const PatientRegisters = require("../models/patientRegister");
const HospRegisters = require("../models/hospRegister");
const Appointments = require("../models/appointments");
const ODRegisters = require("../models/organdonation");
const BBRegisters = require("../models/bloodbanks");
const Feedback = require("../models/feedback");
const authRouter = require("../Routes/authrouter"); 
const docRouter = require("../Routes/docrouter");
const patientRouter = require("../Routes/patientrouter");
const hospRouter = require("../Routes/hosprouter");

jest.mock("../models/docRegister");
jest.mock("../models/patientRegister");
jest.mock("../models/hospRegister");
jest.mock("../models/appointments");
jest.mock("../models/organdonation");
jest.mock("../models/bloodbanks");
jest.mock("../models/feedback");

const app = express();
app.use(express.json());
app.use(authRouter);
app.use(docRouter);
app.use(patientRouter);
app.use(hospRouter);

describe("Authentication routes", () => {
  const mockUsers = {
      patient: { username: 'John123', password: 'John@123', type: 'patient' },
  };
  

  beforeEach(() => {
      PatientRegisters.findOne.mockClear();
  });

  describe("POST /login", () => {
      it.each(Object.entries(mockUsers))("should authenticate %s with correct credentials", async (type, user) => {
          // Mock the findOne function to resolve with the necessary user data
          PatientRegisters.findOne.mockResolvedValue({
              ...user,
              password: await bcrypt.hash(user.password, 10) // Simulating stored hashed password
          });

          const response = await request(app)
              .post("/login")
              .send({
                  username: user.username,
                  password: user.password,
                  type: user.type
              })
              .expect(200);

          expect(response.body).toEqual('exist');
          expect(PatientRegisters.findOne).toHaveBeenCalledWith({ username: user.username });
      });
  });
});



describe("Patient Routes", () => {
    describe("GET /getUserDetails/:username", () => {
        it("should return patient details if the patient exists", async () => {
            const patientDetails = { username: "John123", firstName: "John" };
            PatientRegisters.findOne.mockResolvedValue(patientDetails);
            
            const response = await request(app)
                .get("/getUserDetails/John123")
                .expect(200);

            expect(response.body).toEqual(patientDetails);
            expect(PatientRegisters.findOne).toHaveBeenCalledWith({ username: "John123" });
        });

        it("should return 404 if the patient does not exist", async () => {
          
            PatientRegisters.findOne.mockResolvedValue(null);

            const response = await request(app)
                .get("/getUserDetails/nonexistent")
                .expect(404);

            expect(response.body).toEqual('User not found');
        });
    });

    

    });



    describe("Doctor Routes", () => {
      describe("GET /getDocDetails/:username", () => {
          it("should return doctor details if the doctor exists", async () => {
              const docDetails = { docID : "srawan", name: "Srawan Meesala" };
              DocRegisters.findOne.mockResolvedValue(docDetails);
              
              const response = await request(app)
                  .get("/getDocDetails/srawan")
                  .expect(200);
  
              expect(response.body).toEqual(docDetails);
              expect(DocRegisters.findOne).toHaveBeenCalledWith({ docID: "srawan" });
          });
  
        });
        
      });



      describe("Hospital Routes", () => {
        describe("GET /getHospDetails/:username", () => {
            it("should return hospital details if the hospitals exists", async () => {
                const hospDetails = { hospID : "xenon"};
                HospRegisters.findOne.mockResolvedValue(hospDetails);
                
                const response = await request(app)
                    .get("/gethospDetails/xenon")
                    .expect(200);
    
                expect(response.body).toEqual(hospDetails);
                expect(HospRegisters.findOne).toHaveBeenCalledWith({ hospID: "xenon" });
            });
    
          });
          
        });


        
  
  