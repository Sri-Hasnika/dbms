import React, { useState } from "react";

const TravelStats = () => {
  const [trips, setTrips] = useState(15); // Total number of trips
  const [totalDistance, setTotalDistance] = useState(25000); // Total distance traveled in kilometers
  const [countriesVisited, setCountriesVisited] = useState(12); // Number of countries visited
  const [citiesVisited, setCitiesVisited] = useState(35); // Number of cities visited
  const [hoursTraveled, setHoursTraveled] = useState(500); // Total hours spent traveling
  const [avgTripDuration, setAvgTripDuration] = useState(5); // Average trip duration in days

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Travel Stats</h1>

      <div style={styles.statsContainer}>
        <StatCard label="Total Trips" value={trips} icon="🧳" />
        <StatCard label="Total Distance" value={`${totalDistance} km`} icon="🌍" />
        <StatCard label="Countries Visited" value={countriesVisited} icon="🏞️" />
        <StatCard label="Cities Visited" value={citiesVisited} icon="🏙️" />
        <StatCard label="Hours Traveled" value={`${hoursTraveled} hrs`} icon="⏳" />
        <StatCard label="Average Trip Duration" value={`${avgTripDuration} days`} icon="📅" />
      </div>

      <button style={styles.viewDetailsButton}>View Detailed Stats</button>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardIcon}>{icon}</div>
      <div style={styles.cardContent}>
        <div style={styles.cardLabel}>{label}</div>
        <div style={styles.cardValue}>{value}</div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "30px",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    color: "#333",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "box-shadow 0.3s",
  },
  cardIcon: {
    fontSize: "32px",
    marginRight: "15px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cardLabel: {
    fontSize: "16px",
    color: "#555",
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: "20px",
    color: "#333",
  },
  viewDetailsButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "20px",
  },
};

export default TravelStats;
