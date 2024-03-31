import mongoose from 'mongoose'
import { DatabaseConnection } from '../globals/classes/Errors'

// Method to connect with the database instance. It includes a retry asset that retries connection up to 5 times if anything fails.
const dbConnection = async (maxRetries: number = 6): Promise<void> => {
  const dbURI: string = process.env.DB_URI || ''
  let currentRetry = 1

  const connectWithRetry = async (): Promise<void> => {
    try {
      const conn = await mongoose.connect(dbURI)
      if (conn) {
        console.log('⚡️[SERVER SAYS]: \nDatabase connected successfully.')
        return
      }
    } catch (error: any) {
      console.error(
        `⛔️[ERROR]: \nError connecting to database: ${error.message}`
      )
      if (currentRetry < maxRetries) {
        console.log(
          `⚡️[SERVER SAYS]: \nRetrying database connection (Retry ${currentRetry}/${
            maxRetries - 1
          })...`
        )
        currentRetry += 1
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return connectWithRetry()
      } else {
        throw new DatabaseConnection('Exceeded maximum retry attempts.')
      }
    }
  }
  try {
    await connectWithRetry()
  } catch (error: any) {
    if (error instanceof DatabaseConnection) {
      console.log(
        `⛔️ ⛔️ ⛔️[CRITICAL ERROR]: \nImpossible to connect to the database... ${error.message} `
      )
      return
    }
  }
}

export default dbConnection
