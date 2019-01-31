/*** /database/seed-data.sql
***/

USE fsfp_burger;

INSERT INTO burger( burger_name , is_devoured )
VALUES ( 'BurgerFi' , false );

INSERT INTO burger( burger_name , is_devoured )
VALUES ( 'Chelino\'s' , false );

INSERT INTO burger( burger_name , is_devoured )
VALUES ( 'Los Verdes' , false );

INSERT INTO burger( burger_name , is_devoured )
VALUES ( 'Pincho Factory' , false );

COMMIT;
