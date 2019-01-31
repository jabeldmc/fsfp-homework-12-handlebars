/*** /database/schema-jaws.sql
***/

USE koyzigsw6oj70yn0;

CREATE TABLE burger (
    id    INTEGER AUTO_INCREMENT PRIMARY KEY ,
    burger_name    VARCHAR( 255 ) NOT NULL ,
    is_devoured    BOOLEAN NOT NULL DEFAULT false
);
