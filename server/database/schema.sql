CREATE TABLE owner (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(85) NOT NULL,
  mail VARCHAR(85) NOT NULL,
  password VARCHAR(30) NOT NULL,
  adress VARCHAR(85) NOT NULL,
  phone_nb INT(10) NOT NULL
);

CREATE TABLE veterinary (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(85) NOT NULL,
  mail VARCHAR(85) NOT NULL,
  password VARCHAR(30) NOT NULL,
  adress VARCHAR(85) NOT NULL,
  phone_nb INT(10) NOT NULL,
  order_nb INT(5) NOT NULL
);

CREATE TABLE pet (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  tattoo_nb VARCHAR(10) NULL,
  chip_nb INT(11) NOT NULL,
  born_at DATETIME NOT NULL,
  species VARCHAR(15) NOT NULL,
  breed VARCHAR(30) NOT NULL,
  is_neutered BOOLEAN NOT NULL,
  photo TEXT DEFAULT NULL,
  weight FLOAT(10) DEFAULT NULL,
  owner_id INT NOT NULL,
  veterinary_id INT NOT NULL
);

CREATE TABLE disease (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(85)
);

CREATE TABLE frequency (
  id INT PRIMARY KEY AUTO_INCREMENT,
  frequency_type TEXT
);

CREATE TABLE reminder (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATETIME,
  medication VARCHAR(100) NOT NULL,
  dosage INT NOT NULL,
  veterinary_id INT NOT NULL,
  pet_id INT NOT NULL,
  frequency_id INT NOT NULL
);

CREATE TABLE communication (
  text TEXT NOT NULL,
  date DATETIME,
  owner_id INT NOT NULL,
  veterinary_id INT NOT NULL,
  PRIMARY KEY (owner_id, veterinary_id)
);

CREATE TABLE consultation (
  date DATETIME,
  report TEXT,
  is_vaccinated BOOLEAN NOT NULL,
  pet_id INT NOT NULL,
  veterinary_id INT NOT NULL,
  PRIMARY KEY (pet_id, veterinary_id)
);

CREATE TABLE sickness (
  pet_id INT NOT NULL,
  desease_id INT NOT NULL,
  PRIMARY KEY (pet_id, desease_id)
);
