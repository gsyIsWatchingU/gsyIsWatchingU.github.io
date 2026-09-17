ALTER TABLE messages ADD COLUMN mood TEXT NOT NULL DEFAULT 'chat';
ALTER TABLE messages ADD COLUMN ip_display TEXT;

CREATE INDEX idx_messages_mood_created
ON messages(mood, created_at DESC);

PRAGMA optimize;
