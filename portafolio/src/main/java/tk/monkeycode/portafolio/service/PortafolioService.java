package tk.monkeycode.portafolio.service;

import java.util.List;

import tk.monkeycode.portafolio.domain.Etiqueta;
import tk.monkeycode.portafolio.domain.Proyecto;

public interface PortafolioService {

	List<Proyecto> obtenerProyectos();
	List<Etiqueta> obtenerEtiquetas();
	Proyecto buscarProyectoPorId(int id);
	void guardarProyecto(Proyecto p);
	
}
