-- SCHEMA: eurovision

-- DROP SCHEMA IF EXISTS eurovision ;

CREATE SCHEMA IF NOT EXISTS eurovision
    AUTHORIZATION postgres;

    -- Table: eurovision.actuacion

-- DROP TABLE IF EXISTS eurovision.actuacion;

CREATE TABLE IF NOT EXISTS eurovision.actuacion
(
    id_actu integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    artista character varying(30) COLLATE pg_catalog."default" NOT NULL,
    id_pais character(3) COLLATE pg_catalog."default" NOT NULL,
    titulo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT fk_pais PRIMARY KEY (id_actu),
    CONSTRAINT fk_actu FOREIGN KEY (id_pais)
        REFERENCES eurovision.paises (id_pais) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS eurovision.actuacion
    OWNER to postgres;

    INSERT INTO "Eurovision".actuacion (artista, id_pais, titulo) VALUES
('Melody', 'ESP', 'Esa diva'),
('Remember Monday', 'GBR', 'What The Hell Just Happened?'),
('Louane', 'FRA', 'Maman'),
('Abor & Tynna', 'DEU', 'Baller'),
('Lucio Corsi', 'ITA', 'Volevo essere un duro'),
('Zoë Më', 'CHE', 'Voyage'),
('Ziferblat', 'UKR', 'Bird of Pray'),
('Kyle Alessandro', 'NOR', 'Lighter'),
('Claude', 'NLD', 'Cest La Vie'),
('Ina Kollmeier', 'ALB', 'Zemrën ndorë'),
('Ladaniva', 'ARM', 'Jako'),
('Electric Fields', 'AUS', 'One Milkali (One Blood)'),
('Kaleen', 'AUT', 'We Will Rave'),
('Fahree feat. İlkin Dövlətov', 'AZE', 'Özünlə apar'),
('Mustii', 'BEL', 'Before the Partys Over'),
('Victoria Georgieva', 'BGR', 'TBA'), -- Pendiente confirmación final
('Baby Lasagna', 'HRV', 'Rim Tim Tagi Dim'),
('Silia Kapsis', 'CYP', 'Liar'),
('Aiko', 'CZE', 'Pedestal'),
('Saba', 'DNK', 'Sand'),
('5miinust x Puuluup', 'EST', '(Nendest) narkootikumidest ei tea me (küll) midagi'),
('Windows95man', 'FIN', 'No Rules!'),
('Nutsa Buzaladze', 'GEO', 'Firefighter'),
('Hera Björk', 'ISL', 'Scared of Heights'),
('Bambie Thug', 'IRL', 'Doomsday Blue'),
('Eden Golan', 'ISR', 'Hurricane'),
('Silvester Belt', 'LTU', 'Luktelk'),
('Sarah Bonnici', 'MLT', 'Loop'),
('Sergej Ćetković', 'MNE', 'TBA'), -- Pendiente confirmación final
('Gåte', 'NOR', 'Ulveham'),
('Luna', 'POL', 'The Tower'),
('Iolanda', 'PRT', 'Grito'),
('Bambi', 'ROU', 'TBA'), -- Pendiente confirmación final
('Megara', 'SMR', '11:11'),
('Teya Dora', 'SRB', 'Ramonda'),
('Raiven', 'SVN', 'Veronika'),
('Marcus & Martinus', 'SWE', 'Unforgettable');

    -- Table: eurovision.paises

-- DROP TABLE IF EXISTS eurovision.paises;

CREATE TABLE IF NOT EXISTS eurovision.paises
(
    id_pais character(3) COLLATE pg_catalog."default" NOT NULL,
    nombre character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT paises_pkey PRIMARY KEY (id_pais)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS eurovision.paises
    OWNER to postgres;

    INSERT INTO "Eurovision".paises (id, nombre) VALUES
('ALB', 'Albania'),
('ARM', 'Armenia'),
('AUS', 'Australia'),
('AUT', 'Austria'),
('AZE', 'Azerbaiyán'),
('BEL', 'Bélgica'),
('BGR', 'Bulgaria'),
('HRV', 'Croacia'),
('CYP', 'Chipre'),
('CZE', 'Chequia'),
('DNK', 'Dinamarca'),
('EST', 'Estonia'),
('FIN', 'Finlandia'),
('FRA', 'Francia'),
('GEO', 'Georgia'),
('DEU', 'Alemania'),
('GRC', 'Grecia'),
('ISL', 'Islandia'),
('IRL', 'Irlanda'),
('ISR', 'Israel'),
('ITA', 'Italia'),
('LVA', 'Letonia'),
('LTU', 'Lituania'),
('MLT', 'Malta'),
('MNE', 'Montenegro'),
('NLD', 'Países Bajos'),
('NOR', 'Noruega'),
('POL', 'Polonia'),
('PRT', 'Portugal'),
('ROU', 'Rumanía'),
('SMR', 'San Marino'),
('SRB', 'Serbia'),
('SVK', 'Eslovaquia'),
('SVN', 'Eslovenia'),
('ESP', 'España'),
('SWE', 'Suecia'),
('CHE', 'Suiza'),
('UKR', 'Ucrania'),
('GBR', 'Reino Unido');

    

    -- Table: eurovision.votaciones

-- DROP TABLE IF EXISTS eurovision.votaciones;

CREATE TABLE IF NOT EXISTS eurovision.votaciones
(
    id_vota integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    votante character varying(20) COLLATE pg_catalog."default" NOT NULL,
    voto integer NOT NULL,
    id_actu integer NOT NULL,
    CONSTRAINT votaciones_pkey PRIMARY KEY (id_vota),
    CONSTRAINT fk_actu FOREIGN KEY (id_actu)
        REFERENCES eurovision.actuacion (id_actu) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_vota FOREIGN KEY (id_vota)
        REFERENCES eurovision.votante (id_vota) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT ck_voto CHECK (voto >= 1 AND voto <= 12 AND voto <> 11)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS eurovision.votaciones
    OWNER to postgres;

 -- Table: eurovision.votante

-- DROP TABLE IF EXISTS eurovision.votante;

CREATE TABLE IF NOT EXISTS eurovision.votante
(
    id_vota integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    id_pais character(3) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT votante_pkey PRIMARY KEY (id_vota),
    CONSTRAINT fk_pais FOREIGN KEY (id_pais)
        REFERENCES eurovision.paises (id_pais) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS eurovision.votante
    OWNER to postgres;

    INSERT INTO "Eurovision".votante (id_pais, email) VALUES
('ESP', 'usuario1@example.com'),
('GBR', 'fan_eurovision@gmail.com'),
('FRA', 'amantedelamusica@yahoo.com'),
('DEU', 'schlagerfan@web.de'),
('ITA', 'cantante_italiano@libero.it'),
('CHE', 'eurofan_suizo@bluewin.ch'),
('UKR', 'melodi_ukr@ukr.net'),
('NOR', 'norwegian_musiclover@online.no'),
('NLD', 'holland_fan@ziggo.nl'),
('ALB', 'albania_12points@hotmail.com'),
('ARM', 'armenian_votes@mail.ru'),
('AUS', 'aussie_eurofan@optusnet.com.au'),
('AUT', 'austria_music@aon.at'),
('AZE', 'azerbaijan_fanclub@gmail.com'),
('BEL', 'belgium_lover@proximus.be'),
('BGR', 'bulgarian_music@abv.bg'),
('HRV', 'croatian_fan@inet.hr'),
('CYP', 'cyprus_rocks@cytanet.com.cy'),
('CZE', 'czech_voter@seznam.cz'),
('DNK', 'danish_music@tdc.dk'),
('EST', 'estonian_fan@elion.ee'),
('FIN', 'finnish_musiclover@netti.fi'),
('GEO', 'georgian_votes@posta.ge'),
('ISL', 'iceland_fanclub@simnet.is'),
('IRL', 'irish_musicfan@eircom.net'),
('ISR', 'israel_calling@walla.co.il'),
('LVA', 'latvian_fan@apollo.lv'),
('LTU', 'lithuanian_music@takas.lt'),
('MLT', 'maltese_fan@maltanet.net'),
('MNE', 'montenegro_music@t-com.me'),
('POL', 'polish_voter@wp.pl'),
('PRT', 'portugal_fan@sapo.pt'),
('ROU', 'romanian_fanclub@rdslink.ro'),
('SMR', 'sanmarino_votes@omniway.sm'),
('SRB', 'serbian_fan@eunet.rs'),
('SVK', 'slovak_voter@stonline.sk'),
('SVN', 'slovenian_music@siol.net'),
('SWE', 'swedish_fan@telia.com'),
(NULL, 'votante_global@eurovision.tv'), -- Ejemplo de votante sin país específico
(NULL, 'otro_fan@internet.com'); -- Otro ejemplo
