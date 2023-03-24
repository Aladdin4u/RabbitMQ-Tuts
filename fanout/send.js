const amqp = require("amqplib");

const exhangeName = "logs";
const msg = process.argv.slice(2).join(" ") || "hello world";

async function sendTask() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertExchange(exhangeName, "fanout", { durable: false });
  channel.publish(exhangeName, "", Buffer.from(msg));
  console.log("[x] Sent %s", msg);

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
}

sendTask();
