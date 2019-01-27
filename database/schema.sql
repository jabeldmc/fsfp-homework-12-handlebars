/*** /database/schema.sql
***/

DROP DATABASE IF EXISTS fsfp_burger;

CREATE DATABASE fsfp_burger;

USE fsfp_burger;

CREATE TABLE burger (
    id    INTEGER AUTO_INCREMENT PRIMARY KEY ,
    burger_name    VARCHAR( 255 ) NOT NULL ,
    is_devoured    BOOLEAN NOT NULL DEFAULT false
);
