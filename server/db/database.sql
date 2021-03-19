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

CREATE TABLE reference(
  card_id SERIAL PRIMARY KEY,
  korean VARCHAR(45),
  korean_no VARCHAR(45),
  sort VARCHAR(255),
  part_of_speech VARCHAR(45),
  native_language VARCHAR(255),
  pronunciation VARCHAR(45),
  grade VARCHAR(45),
  hint VARCHAR(255),
  english VARCHAR(255),
  english_extension VARCHAR
);

-- select korean, native_language, english
-- from reference
-- where to_tsvector(korean || ' ' || native_language || ' ' || english) @@ to_tsquery('다:*');

-- select korean, native_language, english
-- from reference
-- where native_language like '%離%';


-- COPY reference (korean, korean_no, sort, part_of_speech, native_language, pronunciation, grade, hint, english, english_extension)
-- FROM 'filename.tsv'
-- CSV 
-- HEADER
-- ;

--set extention
CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_role VARCHAR(255) DEFAULT 'user',
  token_version INTEGER DEFAULT 0
);