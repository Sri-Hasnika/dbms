 // server.js
const express = require('express');
const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING
};

// Middleware for JWT authentication
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
oracledb.initOracleClient({ libDir: process.env.LIBDIR });

// Database connection helper
async function getConnection() {
  try {
    return await oracledb.getConnection(dbConfig);
  } catch (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
}

// User Routes
app.post('/api/register', async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;
  const connection = await getConnection();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await connection.execute(
      // `INSERT INTO Users (FullName, Email, PhoneNumber, PasswordHash) 
      `INSERT INTO Users (name,email,password,confirmpassword) 
       VALUES (:1, :2, :3, :4) 
       RETURNING UserID INTO :5`,
      // [fullName, email, phoneNumber, hashedPassword, { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }],
      [name,email,password,confirmpassword, { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }],
      
      { autoCommit: true }
    );

    const userId = result.outBinds[0][0];
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      'SELECT UserID, PasswordHash FROM Users WHERE Email = :1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user[1]);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user[0], email }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Trip Routes
app.post('/api/trips', authenticateToken, async (req, res) => {
  const { tripName, startDate, endDate, purpose, budget } = req.body;
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `INSERT INTO Trips (UserID, TripName, StartDate, EndDate, Purpose, Budget)
       VALUES (:1, :2, :3, :4, :5, :6)
       RETURNING TripID INTO :7`,
      [req.user.userId, tripName, startDate, endDate, purpose, budget, 
       { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }],
      { autoCommit: true }
    );

    const tripId = result.outBinds[0][0];
    res.json({ tripId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

app.get('/api/trips', authenticateToken, async (req, res) => {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      'SELECT * FROM Trips WHERE UserID = :1 ORDER BY StartDate',
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Daily Schedule Routes
app.post('/api/trips/:tripId/schedule', authenticateToken, async (req, res) => {
  const { tripId } = req.params;
  const { activityName, activityDate, startTime, endTime, location, notes } = req.body;
  const connection = await getConnection();

  try {
    // Verify trip ownership
    const tripCheck = await connection.execute(
      'SELECT UserID FROM Trips WHERE TripID = :1',
      [tripId]
    );

    if (tripCheck.rows[0][0] !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const result = await connection.execute(
      `INSERT INTO DailySchedule 
       (TripID, ActivityName, ActivityDate, StartTime, EndTime, Location, Notes)
       VALUES (:1, :2, :3, :4, :5, :6, :7)
       RETURNING ScheduleID INTO :8`,
      [tripId, activityName, activityDate, startTime, endTime, location, notes,
       { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }],
      { autoCommit: true }
    );

    const scheduleId = result.outBinds[0][0];
    res.json({ scheduleId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Transportation Routes
app.post('/api/trips/:tripId/transportation', authenticateToken, async (req, res) => {
  const { tripId } = req.params;
  const { type, details, departureDateTime, arrivalDateTime, confirmationNumber, notes } = req.body;
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `INSERT INTO Transportation 
       (TripID, Type, Details, DepartureDateTime, ArrivalDateTime, ConfirmationNumber, Notes)
       VALUES (:1, :2, :3, :4, :5, :6, :7)
       RETURNING TransportID INTO :8`,
      [tripId, type, details, departureDateTime, arrivalDateTime, confirmationNumber, notes,
       { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }],
      { autoCommit: true }
    );

    const transportId = result.outBinds[0][0];
    res.json({ transportId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Accommodation Routes
app.post('/api/trips/:tripId/accommodations', authenticateToken, async (req, res) => {
  const { tripId } = req.params;
  const { hotelName, address, checkInDate, checkOutDate, confirmationNumber, contactInfo, notes } = req.body;
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `INSERT INTO Accommodations 
       (TripID, HotelName, Address, CheckInDate, CheckOutDate, ConfirmationNumber, ContactInfo, Notes)
       VALUES (:1, :2, :3, :4, :5, :6, :7, :8)
       RETURNING AccommodationID INTO :9`,
      [tripId, hotelName, address, checkInDate, checkOutDate, confirmationNumber, contactInfo, notes,
       { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }],
      { autoCommit: true }
    );

    const accommodationId = result.outBinds[0][0];
    res.json({ accommodationId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Budget Routes
app.post('/api/trips/:tripId/budget', authenticateToken, async (req, res) => {
  const { tripId } = req.params;
  const { category, estimatedCost, actualCost, notes } = req.body;
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `INSERT INTO BudgetDetails 
       (TripID, Category, EstimatedCost, ActualCost, Notes)
       VALUES (:1, :2, :3, :4, :5)
       RETURNING BudgetID INTO :6`,
      [tripId, category, estimatedCost, actualCost, notes,
       { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }],
      { autoCommit: true }
    );

    const budgetId = result.outBinds[0][0];
    res.json({ budgetId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
