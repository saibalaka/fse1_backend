const kafka = require('kafka-node');

// Creating a client and consumer

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const consumer = new kafka.Consumer(
    client,
    [{ topic: 'deletedTopic', partition: 0 }],
    { autoCommit: true }
);

// Handling message event
consumer.on('message', (message) => {
    const movieDeletionInfo = JSON.parse(message.value);
    console.log(`Movie deleted: ${movieDeletionInfo.movieName} from theatre ${movieDeletionInfo.theatreName} with ID ${movieDeletionInfo.id}`);
});

consumer.on('error', (err) => {
    console.error('Error in Kafka consumer:', err);
});