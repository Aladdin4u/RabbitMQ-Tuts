const amqp = require("amqplib");

const queue = "task";

async function recieveTask() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.prefetch(1);
  console.log("[*] waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(
    queue,
    (msg) => {
      const secs = msg.content.toString().split(".").length - 1;
      console.log("[x] Received %s", msg.content.toString());
      setTimeout(() => {
        console.log("Done resizing image");
        channel.ack(msg);
      }, secs * 1000);
    },
    { noAck: false }
  );
}

recieveTask();
