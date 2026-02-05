import { syncDatabase } from './src/models/index.js';

console.log('Starting database synchronization...');
syncDatabase().then(() => {
    console.log('Sync process finished.');
    process.exit(0);
}).catch(err => {
    console.error('Sync failed:', err);
    process.exit(1);
});
