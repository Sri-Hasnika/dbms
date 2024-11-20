
const express = require('express');
const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
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
function getConnection() {
  try {
    return oracledb.getConnection(dbConfig);
  } catch (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
}

function generateUniqueID(prefix) {
  const randomPart = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `${prefix}${randomPart}`;
}

// User Routes
app.post('/api/register', async (req, res) => {
  const { name, email, PhoneNumber, password } = req.body;
  const connection = await getConnection();
  const userId = generateUniqueID('USR');

  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.execute(
      `INSERT INTO Users (UserID, FullName, Email, phoneNumber, PasswordHash)
       VALUES (:userId, :name, :email, :PhoneNumber, :hashedPassword)`,
      {
        userId,
        name,
        email,
        PhoneNumber,
        hashedPassword,
      },
      { autoCommit: true }
    );

    res.send({ message: 'user created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const connection = await getConnection();

//   try {
//     const result = await connection.execute(
//       'SELECT UserID, PasswordHash FROM Users WHERE Email = :1',
//       [email]
//     );

//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const [userId, hashedPassword] = result.rows[0];
//     const validPassword = await bcrypt.compare(password, hashedPassword);

//     if (!validPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   } finally {
//     await connection.close();
//   }
// });

// // Trip Routes
// app.post('/api/trips', authenticateToken, async (req, res) => {
//   const { tripName, startDate, endDate, purpose, budget } = req.body;
//   const connection = await getConnection();
//   const tripId = generateUniqueID('TRIP');

//   try {
//     await connection.execute(
//       `INSERT INTO Trips (TripID, UserID, TripName, StartDate, EndDate, Purpose, Budget, CreationDate)
//        VALUES (:1, :2, :3, :4, :5, :6, :7, SYSDATE)`,
//       [tripId, req.user.userId, tripName, startDate, endDate, purpose, budget],
//       { autoCommit: true }
//     );

//     res.json({ tripId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   } finally {
//     await connection.close();
//   }
// });
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const connection = await getConnection();

  try {
    // Modify query to select Name along with UserID and PasswordHash
    const result = await connection.execute(
      'SELECT UserID, PasswordHash, fullName, phonenumber FROM Users WHERE Email = :1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const [userId, hashedPassword, name, phoneNumber] = result.rows[0];
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);

    // Include Name in the response
    res.json({ token, name, phoneNumber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Trip Routes
app.post('/api/trips', authenticateToken, async (req, res) => {
  const { tripName, startDate, endDate, purpose, budget } = req.body
  const connection = await getConnection()
  const tripId = generateUniqueID('TRIP')

  try {
    // Insert the trip details into the database
    await connection.execute(
      `INSERT INTO Trips (TripID, UserID, TripName, StartDate, EndDate, Purpose, Budget, CreationDate)
       VALUES (:1, :2, :3, TO_DATE(:4, 'YYYY-MM-DD'), TO_DATE(:5, 'YYYY-MM-DD'), :6, :7, SYSDATE)`,
      [tripId, req.user.userId, tripName, startDate, endDate, purpose, budget],
      { autoCommit: true }
    )

    // Return the tripId of the newly created trip
    res.json({ tripId })
  } catch (err) {
    console.error('Error inserting trip into database:', err)
    res.status(500).json({ error: err.message })
  } finally {
    await connection.close()
  }
})


// Emergency Contacts
app.post('/api/trips/:tripId/emergency-contacts', authenticateToken, async (req, res) => {
  const { tripId } = req.params;
  const { name, relation, contactDetails } = req.body;
  const connection = await getConnection();
  const contactId = generateUniqueID('ECON');

  try {
    await connection.execute(
      `INSERT INTO EmergencyContacts (ContactID, TripID, Name, Relation, ContactDetails)
       VALUES (:1, :2, :3, :4, :5)`,
      [contactId, tripId, name, relation, contactDetails],
      { autoCommit: true }
    );

    res.json({ contactId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Notifications
app.post('/api/notifications', authenticateToken, async (req, res) => {
  const { message } = req.body;
  const connection = await getConnection();
  const notificationId = generateUniqueID('NOTI');

  try {
    await connection.execute(
      `INSERT INTO Notifications (NotificationID, UserID, Message, Timestamp, ReadStatus)
       VALUES (:1, :2, :3, SYSDATE, 'UNREAD')`,
      [notificationId, req.user.userId, message],
      { autoCommit: true }
    );

    res.json({ notificationId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
