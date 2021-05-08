package tk.monkeycode.portafolio.service;

import java.util.List;

import tk.monkeycode.portafolio.domain.Etiqueta;
import tk.monkeycode.portafolio.domain.Proyecto;

public interface PortafolioService {

	List<Proyecto> buscarProyectos();
	List<Proyecto> buscarProyectos(String termino);
	Proyecto buscarProyectoPorId(int id);
	Proyecto guardarProyecto(Proyecto p);
	Proyecto actualizarProyecto(Proyecto p);
	void borrarProyecto(int id);
	
	List<Etiqueta> obtenerEtiquetas();
	
}
