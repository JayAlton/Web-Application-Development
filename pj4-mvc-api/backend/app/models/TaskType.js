import mongoose from 'mongoose';

// create a schema
let taskTypeSchema = new mongoose.Schema({
    name: String,  // A brief task description
    color: String,
}, {
    toJSON: {
      virtuals: true,  // Enable virtual fields when converting to JSON
    }
});

// the schema is useless so far, we need to create a model using it
let TaskType = mongoose.model('TaskType', taskTypeSchema);

export default TaskType;