"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
// Seed the octofit_db database with test data
async function seedDatabase() {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.insertMany([
        { name: 'Ava Patel', email: 'ava@example.com', password: 'hashedpass1', role: 'captain' },
        { name: 'Noah Kim', email: 'noah@example.com', password: 'hashedpass2', role: 'member' },
        { name: 'Mia Chen', email: 'mia@example.com', password: 'hashedpass3', role: 'member' },
    ]);
    const teams = await Team_1.Team.insertMany([
        { name: 'North Stars', sport: 'Cycling', members: users.slice(0, 2).map((user) => user.name), captain: users[0].name },
        { name: 'River Runners', sport: 'Running', members: [users[2].name], captain: users[2].name },
    ]);
    await Activity_1.Activity.insertMany([
        { user: users[0].name, type: 'Run', duration: 35, distance: 7.2, date: new Date('2026-06-20') },
        { user: users[1].name, type: 'Cycling', duration: 60, distance: 24.8, date: new Date('2026-06-21') },
        { user: users[2].name, type: 'Yoga', duration: 25, distance: 0, date: new Date('2026-06-22') },
    ]);
    await Leaderboard_1.Leaderboard.insertMany([
        { user: users[0].name, points: 1800, rank: 1 },
        { user: users[1].name, points: 1520, rank: 2 },
        { user: users[2].name, points: 1320, rank: 3 },
    ]);
    await Workout_1.Workout.insertMany([
        { name: 'HIIT Intervals', duration: 20, difficulty: 'medium', focus: 'cardio' },
        { name: 'Strength Circuit', duration: 35, difficulty: 'hard', focus: 'muscle' },
        { name: 'Mobility Flow', duration: 15, difficulty: 'easy', focus: 'flexibility' },
    ]);
    console.log('Seed data inserted successfully');
    await mongoose_1.default.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
