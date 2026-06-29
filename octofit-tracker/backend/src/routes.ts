import { Router } from 'express';
import { getApiBaseUrl } from './config';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const router = Router();

router.get('/api/users', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ apiBaseUrl: getApiBaseUrl(), users });
});

router.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/api/teams', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ apiBaseUrl: getApiBaseUrl(), teams });
});

router.post('/api/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ apiBaseUrl: getApiBaseUrl(), activities });
});

router.post('/api/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).lean();
  res.json({ apiBaseUrl: getApiBaseUrl(), leaderboard });
});

router.post('/api/leaderboard', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

router.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ apiBaseUrl: getApiBaseUrl(), workouts });
});

router.post('/api/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default router;
