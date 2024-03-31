/*
import { mocked } from 'ts-jest/utils'
import dbConnection from "../../database/database"
import mongoose from "mongoose";
import { DatabaseConnection } from "../classes/Errors"

// Testing the retry connection method to database
jest.mock('mongoose')

describe('Database Connection Retry Test', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should successfully connect on the first attempt', async () => {
      mocked(mongoose.connect).mockResolvedValueOnce();
  
      await dbConnection();
  
      expect(mongoose.connect).toHaveBeenCalledTimes(1);
    });
  
    it('should retry connecting on failure and succeed eventually', async () => {
      mocked(mongoose.connect).mockRejectedValueOnce(new Error('Connection failed'));
      mocked(mongoose.connect).mockResolvedValueOnce();
  
      await dbConnection();
  
      expect(mongoose.connect).toHaveBeenCalledTimes(2);
    });
  
    it('should retry connecting multiple times and throw error if unsuccessful', async () => {
      const tries = 6
      mocked(mongoose.connect)
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockRejectedValueOnce(new Error('Connection failed'))

  
      await expect(dbConnection(tries)).rejects.toThrow(DatabaseConnection);
  
      expect(mongoose.connect).toHaveBeenCalledTimes(tries);
    });
  });
  */