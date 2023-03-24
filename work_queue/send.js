const amqp = require("amqplib");

const queue = "task";
const msg = process.argv.slice(2).join(" ") || "hello world";

async function sendTask() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
  console.log("[x] Sent %s", msg);

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
}

sendTask();
