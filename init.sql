CREATE TABLE url (
    id SERIAL PRIMARY KEY,
	original_url varchar NOT NULL,
	new_url varchar NOT NULL,
	validity_end varchar NOT NULL	
);