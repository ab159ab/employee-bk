CREATE DATABASE employee;
CREATE TABLE users (
    uuid SERIAL PRIMARY KEY,
    user_login VARCHAR(255)
);

CREATE TABLE sessions (
    uuid SERIAL PRIMARY KEY,
    start_session TIMESTAMPTZ NOT NULL,
    end_session TIMESTAMPTZ NOT NULL,
    user_id BIGINT REFERENCES users(uuid)
);