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
	public Proyecto actualizarProyecto(Proyecto p) {
		Proyecto proyectoViejo = proyectoRepo.findById(p.getId()).orElseThrow();
		proyectoViejo.setImagen(p.getImagen());
		proyectoViejo.setNombre(p.getNombre());
		proyectoViejo.setDescripcionCorta(p.getDescripcionCorta());
		proyectoViejo.setDescripcionLarga(p.getDescripcionLarga());
		proyectoViejo.setUrlProyecto(p.getUrlProyecto());
		proyectoViejo.setUrlRepositorio(p.getUrlRepositorio());
		proyectoViejo.setCreadoEn(p.getCreadoEn());
		return proyectoRepo.save(proyectoViejo);
	}

	@Override
	public void borrarProyecto(int id) {
		proyectoRepo.delete(proyectoRepo.findById(id));
	}

	@Override
	public List<Proyecto> buscarProyectos(String termino) {
		return proyectoRepo.findByNombreContainingIgnoreCase(termino);
	}
	
}
