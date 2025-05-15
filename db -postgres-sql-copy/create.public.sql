-- SCHEMA: public

-- DROP SCHEMA IF EXISTS public ;

CREATE SCHEMA IF NOT EXISTS public
    AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public
    IS 'standard public schema';

GRANT USAGE ON SCHEMA public TO PUBLIC;

GRANT ALL ON SCHEMA public TO pg_database_owner;

-- Table: public.comments

-- DROP TABLE IF EXISTS public.comments;

CREATE TABLE IF NOT EXISTS public.comments
(
    comment_id integer NOT NULL DEFAULT nextval('comments_comment_id_seq'::regclass),
    post_id integer NOT NULL,
    author text COLLATE pg_catalog."default" NOT NULL,
    comment text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comments_pkey PRIMARY KEY (comment_id),
    CONSTRAINT post_id_fkey FOREIGN KEY (post_id)
        REFERENCES public.posts (post_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comments
    OWNER to postgres;

    -- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    post_id integer NOT NULL DEFAULT nextval('posts_post_id_seq'::regclass),
    title text COLLATE pg_catalog."default" NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT posts_pkey PRIMARY KEY (post_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;

-- Insert a few sample posts
INSERT INTO posts (title, content) VALUES
('Welcome to our blog', 'This is the first post.'),
('Learning SQL', 'Today we discuss foreign keys.'),
('Cascade deletes', 'Why they matter.');

-- Insert up to 10 sample comments (linked to post_id)
INSERT INTO comments (post_id, author, comment) VALUES
(1, 'Alice', 'Great first post!'),
(1, 'Bob', 'Thanks for the intro.'),
(2, 'Charlie', 'Foreign keys are tricky but useful.'),
(2, 'Dana', 'This helped me a lot.'),
(2, 'Eli', 'Any tips for joins?'),
(3, 'Fiona', 'I love cascade deletes!'),
(3, 'George', 'Cascades saved me so much time.'),
(3, 'Hana', 'Should I always use them?'),
(3, 'Ivan', 'What are the risks?'),
(3, 'Jill', 'Great explanation, thanks!');