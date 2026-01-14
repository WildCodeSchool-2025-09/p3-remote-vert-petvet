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

CREATE TABLE reminder (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  programmed_at DATETIME NOT NULL,
  content VARCHAR(100) NOT NULL,
  dosage VARCHAR(30) DEFAULT NULL,
  veterinary_id INT NOT NULL,
  pet_id INT NOT NULL,
  frequency ENUM('jour', 'semaine', 'mois', 'an') DEFAULT NULL,
  frequency_count INT DEFAULT 1
);


CREATE TABLE consultation (
  date DATETIME,
  report TEXT,
  is_vaccinated BOOLEAN DEFAULT FALSE,
  category ENUM('vaccination', 'urgence', 'suivi', 'opération', 'médicale'),
  pet_id INT NOT NULL,
  veterinary_id INT NOT NULL,
  PRIMARY KEY (pet_id, veterinary_id)
);
