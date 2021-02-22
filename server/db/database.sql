-- DROP DATABASE IF EXISTS vocabularyapp;

CREATE DATABASE vocabulary_app;

-- \c into vocabulary_app database

CREATE TABLE cards(
  card_id SERIAL PRIMARY KEY,
  deck VARCHAR(45),
  korean VARCHAR(45) NOT NULL,
  english VARCHAR(255) NOT NULL,
  hanja VARCHAR(45),
  onMaster BOOLEAN 
);