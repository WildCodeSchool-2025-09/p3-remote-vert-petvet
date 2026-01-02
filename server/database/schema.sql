CREATE TABLE owner (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(85) NOT NULL,
  lastname VARCHAR(85) NOT NULL,
  email VARCHAR(85) NOT NULL,
  password VARCHAR(30) NOT NULL,
  city VARCHAR(85) NOT NULL,
  phone VARCHAR(30) NOT NULL
);

CREATE TABLE veterinary (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(85) NOT NULL,
  lastname VARCHAR(85) NOT NULL,
  email VARCHAR(85) NOT NULL,
  password VARCHAR(30) NOT NULL,
  city VARCHAR(85) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  order_nb INT(5) NOT NULL
);

CREATE TABLE pet (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  tattoo_nb VARCHAR(10) NULL,
  chip_nb INT(11) NULL,
  born_at DATETIME NOT NULL,
  specie VARCHAR(15) NOT NULL,
  breed VARCHAR(30) NOT NULL,
  is_neutered BOOLEAN DEFAULT FALSE,
  photo TEXT DEFAULT NULL,
  weight FLOAT(10) DEFAULT NULL,
  owner_id INT NOT NULL,
  veterinary_id INT NOT NULL
);

CREATE TABLE disease (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(85)
);

CREATE TABLE reminder (
  id INT PRIMARY KEY AUTO_INCREMENT,
  programmed_at DATETIME,
  content VARCHAR(100) NOT NULL,
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
  is_vaccinated BOOLEAN DEFAULT FALSE,
  pet_id INT NOT NULL,
  veterinary_id INT NOT NULL,
  PRIMARY KEY (pet_id, veterinary_id)
);

CREATE TABLE sickness (
  pet_id INT NOT NULL,
  desease_id INT NOT NULL,
  PRIMARY KEY (pet_id, desease_id)
);
