import { Job, Worker } from "bullmq";
import { getRedisConnObject } from "../config/redis.config";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_PAYLOAD } from "../producers/email.producer";


export const setupMailerWorker = () => {
const emailProcessor = new Worker<NotificationDto>(
  MAILER_QUEUE,
  async (job: Job) => {
    if (job.name !== MAILER_PAYLOAD) {
      throw new Error('Invalid job name')
    }

    console.log(`Processing job ${job.name} with data ${JSON.stringify(job.data)}`);
    //Call the service layer from here
  },
  {
    connection: getRedisConnObject(),
  }
)

emailProcessor.on('failed', () => {
  console.error('Email processing failed')
})
emailProcessor.on('completed', () => {
  console.log('Email processing completed successfully')
})
}