const amqp = require("amqplib");

const exhangeName = "logs";

async function recieveTask() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertExchange(exhangeName, "fanout", { durable: false });
  const q = await channel.assertQueue("", { exclusive: true });
  channel.bindQueue(q.queue, exhangeName, "");
  console.log(
    `[*] waiting for messages in %s. To exit press CTRL+C, ${q.queue}`
  );
  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        console.log("[x] Received %s", msg.content.toString());
      }
    },
    { noAck: true }
  );
}

recieveTask();
