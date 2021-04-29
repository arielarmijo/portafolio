insert into etiquetas (id, nombre) values (1, 'Java');
insert into etiquetas (id, nombre) values (2, 'JavaScript');
insert into etiquetas (id, nombre) values (3, 'Spring');
insert into etiquetas (id, nombre) values (4, 'Talento Digital');

insert into proyectos (id, nombre, descripcion_corta, url_proyecto, url_repositorio, creado_en) values (1, 'World Parts', 'Certificacion Talento Digital', 'http://monkeycode.tk/worldparts', 'https://github.com/arielarmijo/certificacion-td', to_date('2021-01-27', 'yyyy-MM-dd'));
insert into proyectos (id, nombre, descripcion_corta, url_proyecto, url_repositorio, creado_en) values (2, 'Classic Models', 'Certificacion Talento Digital', 'http://monkeycode.tk/classicmodels', 'https://github.com/arielarmijo/certificacion-td', to_date('2021-03-15', 'yyyy-MM-dd'));

insert into proyectos_etiquetas (proyecto_id, etiqueta_id) values (1, 1);
insert into proyectos_etiquetas (proyecto_id, etiqueta_id) values (1, 3);
insert into proyectos_etiquetas (proyecto_id, etiqueta_id) values (1, 4);

insert into proyectos_etiquetas (proyecto_id, etiqueta_id) values (2, 1);
insert into proyectos_etiquetas (proyecto_id, etiqueta_id) values (2, 3);
insert into proyectos_etiquetas (proyecto_id, etiqueta_id) values (2, 4);

