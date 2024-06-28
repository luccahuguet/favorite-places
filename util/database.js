import { Place } from "@/models/place";
import * as SQLite from "expo-sqlite";

// Singleton instance of the database
let db;

// Flags to control logging
const INSERT_LOG = false;
const FETCH_LOG = true;

// Initialize the database and create the table if it does not exist
export async function init() {
  if (!db) {
    try {
      db = await SQLite.openDatabaseAsync("places.db");
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        );
      `);
      console.log("[DB] Database initialized successfully");
    } catch (error) {
      console.error("[DB] Error initializing database:", error);
    }
  } else {
    console.log("[DB] Database already initialized");
  }
}

export async function insertPlace(place) {
  try {
    if (!db) {
      await init();
    }

    if (INSERT_LOG) console.log("[INSERT] Inserting place with data:", place);

    // Check if all required fields are present
    if (
      !place.title ||
      !place.imageUri ||
      !place.address ||
      !place.location?.lat ||
      !place.location?.lng
    ) {
      throw new Error("[INSERT] Missing required place fields");
    }

    // Log the values to be inserted
    const values = [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ];
    if (INSERT_LOG) console.log("[INSERT] Values to be inserted:", values);

    const result = await db.runAsync(
      "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);",
      ...values
    );
    if (INSERT_LOG) {
      console.log("[INSERT] Place inserted successfully");
      console.log("[INSERT] Result:", result);
    }
  } catch (error) {
    console.error("[INSERT] Error inserting place:", error);
  }
}

export async function fetchPlaces() {
  try {
    if (!db) {
      await init();
    }

    const result = await db.getAllAsync("SELECT * FROM places");

    if (FETCH_LOG) {
      console.log("[FETCH] Results:", result);
    }

    const places = result.map(
      (p) =>
        new Place(
          p.title,
          p.imageUri,
          {
            address: p.address,
            lat: p.lat,
            lng: p.lng,
          },
          p.id
        ) // Ensure id is included
    );

    console.log("[FETCH] Places array:", places);

    return places;
  } catch (error) {
    console.error("[FETCH] Error fetching places:", error);
    return [];
  }
}

export async function fetchPlaceDetails(id) {
  try {
    if (!db) {
      await init();
    }

    console.log("[fetchPlaceDetails] Fetching place details for ID:", id);
    const result = await db.getFirstAsync(
      "SELECT * FROM places WHERE id = ?;",
      [id]
    );

    if (FETCH_LOG) {
      console.log("[FETCH] Result:", result);
    }

    if (!result) {
      throw new Error(`[FETCH] No place found with id: ${id}`);
    }

    const place = new Place(
      result.title,
      result.imageUri,
      {
        address: result.address,
        lat: result.lat,
        lng: result.lng,
      },
      result.id
    ); // Ensure id is included

    console.log("[fetchPlaceDetails] Returning place:", place);
    return place;
  } catch (error) {
    console.error("[FETCH] Error fetching place details:", error);
    return null;
  }
}
