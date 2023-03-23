const amqp = require("amqplib");

const queue = "hello";

async function recieve() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: false });
  console.log("[*] waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(
    queue,
    (msg) => {
      console.log("[x] Received %s", msg.content.toString());
    },
    { noAck: true }
  );
}

recieve();
