/*** /database/seed-data-jaws.sql
***/

USE koyzigsw6oj70yn0;

INSERT INTO burger( burger_name , is_devoured )
VALUES ( 'BurgerFi' , false );

INSERT INTO burger( burger_name , is_devoured )
VALUES ( 'Chelino\'s' , false );

INSERT INTO burger( burger_name , is_devoured )
VALUES ( 'Los Verdes' , false );

INSERT INTO burger( burger_name , is_devoured )
VALUES ( 'Pincho Factory' , false );

COMMIT;
