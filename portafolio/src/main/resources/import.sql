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

update proyectos set descripcion_larga='Solución al caso World Parts Tech de la prueba de certificación de Talento Digital. El caso consiste en realizar consultas a una base de datos relacional, construir algoritmo de validación de margen de ventas con sus respectivas pruebas unitarias. También se pide crear una página web que muestre el listado de productos y una API REST que muestre la misma información. El proyecto se realizó utilizando Java, JSP y Spring'
where id = 1;

update proyectos set descripcion_larga='Solución al caso Classic Models de la prueba de certificación de Talento Digital. El caso consiste en realizar consultas a una base de datos relacional, construir algoritmo para el cálculo de descuentos y promociones e implementar pruebas unitarias. También se pide crear una página web que muestre el listado de órdenes y una API REST que muestre la misma información. El proyecto se realizó utilizando Java, JSP y Spring'
where id = 2;
