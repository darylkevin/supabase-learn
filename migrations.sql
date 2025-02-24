CREATE TABLE ip_api_usage (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) NOT NULL,
    total_chars INT NOT NULL DEFAULT 0,
    last_request_day DATE NOT NULL,
    updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_ip_date_constraint UNIQUE (ip, last_request_day)
);

CREATE TABLE global_api_usage (
    id SERIAL PRIMARY KEY,
    total_chars INT NOT NULL DEFAULT 0,
    last_request_day DATE NOT NULL,
    updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_date_constraint UNIQUE (last_request_day)
);

CREATE INDEX idx_ip_last_request_day ON ip_api_usage (ip, last_request_day);
CREATE INDEX idx_global_last_request_day ON global_api_usage (last_request_day);