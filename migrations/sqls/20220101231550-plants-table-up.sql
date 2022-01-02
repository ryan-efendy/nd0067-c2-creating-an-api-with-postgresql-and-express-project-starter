/* Replace with your SQL commands */
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS plants_id_seq;

-- Table Definition
CREATE TABLE "public"."plants" (
    "id" int4 NOT NULL DEFAULT nextval('plants_id_seq'::regclass),
    "name" varchar(100) NOT NULL,
    "description" text,
    "individuals" int4,
    "sighting_date" date,
    PRIMARY KEY ("id")
);