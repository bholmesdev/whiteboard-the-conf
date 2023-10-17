DROP TABLE IF EXISTS user_key;
DROP TABLE IF EXISTS user_session;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    badge_img_url TEXT
);
CREATE TABLE user_key (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    hashed_password TEXT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    active_expires INTEGER NOT NULL,
    idle_expires INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
