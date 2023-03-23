const amqp = require("amqplib");

const queue = "hello";
const msg = "hello world";

async function send() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log("[x] Sent %s", msg);

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
}

send();
