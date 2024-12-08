import TaskType from '../models/TaskType.js';

const index = async (request, response) => {
    const defaultTypes = [
        { name: 'New', color: 'red' },
        { name: 'In Progress', color: 'blue' },
        { name: 'Completed', color: 'green' },
    ];
    
    const addDefaultRecordsIfEmpty = async () => {
        try {
            // Check if there are any documents in the collection
            const typeCount = await TaskType.countDocuments();
    
            if (typeCount === 0) {
                // Insert the default records
                console.log('No records found, inserting default task types...');
                await TaskType.insertMany(defaultTypes);
                console.log('Default task types inserted successfully!');
            } else {
                console.log('Skipping default insertion.');
            }
        } catch (err) {
            console.error('Error adding default records:', err);
        }
    };

    await addDefaultRecordsIfEmpty();

    // Get a list of task types and send back to the front end
    try {
        const taskTypes = await TaskType.find(); // Retrieve all task types
        response.status(200).json(taskTypes); // Send the task types back to the client
    } catch (err) {
        console.error('Error fetching task types:', err);
        response.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
};

export const TaskTypeController = { index };