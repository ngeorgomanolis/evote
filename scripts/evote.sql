SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at timestamp without time zone DEFAULT Now(),
    username character varying(100),
    email character varying(100),
    pwd character varying(100),
    candidate boolean DEFAULT false,
    info jsonb
);

--
-- Name: votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.votes (
    id SERIAL NOT NULL PRIMARY KEY,
    created_at timestamp without time zone DEFAULT Now(),
    user_id uuid,
    candidate_id uuid,
    info jsonb not null default '{}'::jsonb
);

INSERT INTO public.users (id, created_at, username, email, pwd, candidate, info)
VALUES 
('ecfa478c-a18f-4b3d-aaa2-c702d1c14621', '2021-01-23 07:36:29.325355','c1','c1@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',true, '{"picture":"https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Ftherealchamps.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2020%2F07%2F1227657321-850x560.jpeg"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14622', '2021-01-23 08:36:29.325355','c2','c2@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',true, '{"picture":"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Gandalf600ppx.jpg/170px-Gandalf600ppx.jpg"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14623', '2021-01-23 09:36:29.325355','c3','c3@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',true, '{"picture":"https://cdn.britannica.com/47/201647-050-C547C128/Hugh-Jackman-2013.jpg"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14624', '2021-01-23 10:36:29.325355','c4','c4@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',true, '{"picture":"https://assets.catawiki.nl/assets/2020/7/4/0/8/6/086800aa-06bf-44d3-961e-af43a0a12498.jpg"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14625', '2021-01-23 11:36:29.325355','c5','c5@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',true, '{"picture":"https://images.daznservices.com/di/library/omnisportcontentd/32/6d/giannis-antetokounmpo-milwaukee-bucks-v-washington-wizards-nba-02242020_giannis_antetokounmpo_milwaukee_bucks_v_washington_wizards_nba_02242020_1qk61qzkvoah31mrpm4qnu80ne.jpg?t=-915608843&quality=100"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14626', '2021-01-23 12:36:29.325355','c6','c6@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',true, '{"picture":"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14627', '2021-01-23 13:36:29.325355','u1','u1@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',false, '{"picture":"https://images.theconversation.com/files/304864/original/file-20191203-67028-qfiw3k.jpeg?ixlib=rb-1.1.0&rect=638%2C2%2C795%2C745&q=45&auto=format&w=496&fit=clip"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14628', '2021-01-23 14:36:29.325355','u2','u2@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',false, '{"picture":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbDZjuWtkNT7JiiaNhW5SdmenJB8lOVJOnjw&usqp=CAU"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14629', '2021-01-23 15:36:29.325355','u3','u3@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',false, '{"picture":"https://www.essentiallysports.com/wp-content/uploads/GettyImages-1174484852.jpg"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14630', '2021-01-23 16:36:29.325355','u4','u4@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',false, '{"picture":"https://i.guim.co.uk/img/media/16a94f2b1ac0a638892517cd7f7127e4d81c4639/0_45_1948_1169/master/1948.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=5a733b0dc0c5ebe4f6984976c1dc887e"}'),
('ecfa478c-a18f-4b3d-aaa2-c702d1c14631', '2021-01-23 17:36:29.325355','u5','u5@evote.com','$2a$08$aGVtiNfPw2tH0maaXDSaiO3Wo3ab/8Eh3PEtUds4d8SUQVWmVqVvy',false, '{"picture":"https://as01.epimg.net/tikitakas/imagenes/2017/12/28/portada/1514448082_557886_1514448185_noticia_normal_recorte1.jpg"}');




--
-- Name: vote vote_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT vote_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Type: CONSTRAINT; Schema: public; Users and Votes -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT vote_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_candidate_id_key UNIQUE (user_id,candidate_id);

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT user_id_cannot_be_equal_to_candidate_id_CHK CHECK (user_id <> candidate_id);
