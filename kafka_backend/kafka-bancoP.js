import { Kafka } from 'kafkajs';
import promptSync from 'prompt-sync';

const prompt = promptSync();

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
});

const producer = kafka.producer();

async function run() {
  try {
    await producer.connect();
    
    let continueLoop = true;
    while (continueLoop) {
      const key = prompt('Ingreso: opI / Retirada: opR / s para salir): ');

      if (key.toLowerCase() === 's') {
        continueLoop = false;
        break;
      }
      const value = prompt('Importe: ');
      const partition = (key === 'opI') ? 1 : 0;

      await producer.send({
        topic: 'banco',
        messages: [
          { key: key, value: value, partition: partition },
        ],
      });

      console.log(`Operacion enviada: '${key}' y valor: '${value}'. Particion: '${partition}'`);
      console.log('---');
    }

  } catch (error) {
    console.error('Error al ejecutar el productor de Kafka:', error);
  } finally {
    await producer.disconnect();
    
  }
}

run().catch(console.error);