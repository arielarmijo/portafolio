package tk.monkeycode.portafolio.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tk.monkeycode.portafolio.domain.Etiqueta;
import tk.monkeycode.portafolio.domain.Proyecto;
import tk.monkeycode.portafolio.repository.EtiquetaRepository;
import tk.monkeycode.portafolio.repository.ProyectoRepository;

@Service
public class PortafolioServiceImpl implements PortafolioService {

	@Autowired
	private ProyectoRepository proyectoRepo;
	
	@Autowired
	private EtiquetaRepository etiquetaRepo;
	
	@Override
	public List<Proyecto> obtenerProyectos() {
		return proyectoRepo.findAllProyects();
	}

	@Override
	public List<Etiqueta> obtenerEtiquetas() {
		return etiquetaRepo.findAllTags();
	}

	@Override
	public Proyecto buscarProyectoPorId(int id) {
		return proyectoRepo.findById(id);
	}

	@Override
	public Proyecto guardarProyecto(Proyecto p) {
		return proyectoRepo.save(p);
	}

	@Override
	public void borrarProyecto(int id) {
		Proyecto p = proyectoRepo.findById(id);
		proyectoRepo.delete(p);
	}

}
