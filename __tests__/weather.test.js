const express = require('express');
const fs = require('fs');
const request = require('supertest');
const router = require('../routes/weather'); 
const sendSMS = require('../utils/sms');

jest.mock('../utils/sms'); 

describe('Weather Alert Endpoint', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json()); 
    app.use('/', router); 
  });

  afterEach(() => {
    jest.resetModules(); 
    jest.clearAllMocks(); 
  });

  it('should send weather alert to all users', async () => {
    const mockUsers = [
      { phoneNumber: '1234567890' },
      { phoneNumber: '0987654321' }
    ];


    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockUsers));

    
    const weatherMessage = 'Weather alert: Heavy rain expected!';


    const response = await request(app)
      .post('/notify')
      .send({ weatherMessage })
      .expect(302);

    expect(sendSMS).toHaveBeenCalledTimes(mockUsers.length);
    mockUsers.forEach((user, index) => {
      expect(sendSMS).toHaveBeenCalledWith(user.phoneNumber, weatherMessage);
    });

    expect(response.header.location).toBe('/weather');
  });
});
