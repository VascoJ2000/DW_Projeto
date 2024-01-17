-- Creating the 'users' table
CREATE TABLE users (
    user_id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT false,
    role VARCHAR(50) NOT NULL CHECK (role IN ('normal', 'admin'))
);

-- Creating the 'movie_nights' table
CREATE TABLE movie_nights (
    movie_night_id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    movie_id INTEGER NOT NULL,
    movie_night_date TIMESTAMP NOT NULL,
    description TEXT
);

-- Creating the 'user_nights' table
CREATE TABLE user_nights (
    movie_night_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    confirmed BOOLEAN NOT NULL,
    night_host BOOLEAN NOT NULL,
    FOREIGN KEY (movie_night_id) REFERENCES movie_nights (movie_night_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT user_night_pkey PRIMARY KEY (movie_night_id, user_id)
);

-- Creating the 'frienlist' table
CREATE TABLE friendlists (
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT friendlist_pkey PRIMARY KEY (user_id, friend_id)
);

-- Creating the 'refresh tokens' table
CREATE TABLE tokens (
    token_id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id INTEGER NOT NULL,
    token TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
)