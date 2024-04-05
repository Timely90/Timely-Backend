
CREATE TABLE user_timely (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(255),
    isVerified BOOLEAN ,  
    deletedAt DATETIME,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);

CREATE TABLE salon_timely(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(500) NOT NULL, 
    descripcion VARCHAR(500) NOT NULL,
    capacidad INT NOT NULL,
    ubicacion VARCHAR(255) NOT NULL, 
    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id),
    UNIQUE KEY nombre (nombre)
);

CREATE TABLE archive_timely (
    id INT NOT NULL AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    salonId INT,
    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id),
    KEY salonId_id_idx (salonId)
);