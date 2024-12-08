import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Method to compare passwords (not needed if using argon2)
userSchema.methods.comparePassword = async function(password) {
    return await argon2.verify(this.password, password);
};

const User = mongoose.model('User ', userSchema);
export default User;