CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

INSERT INTO items (name) VALUES
  ('Linux'),
  ('Redes'),
  ('DevOps')
ON CONFLICT (name) DO NOTHING;
