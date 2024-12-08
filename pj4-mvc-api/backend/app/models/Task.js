import mongoose from 'mongoose';

// create a schema
let taskSchema = new mongoose.Schema({
    type_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    name: String,  // A brief task description
}, {
    toJSON: {
      virtuals: true,  // Enable virtual fields when converting to JSON
    }
});

// the schema is useless so far, we need to create a model using it
let Task = mongoose.model('Task', taskSchema);

export default Task;