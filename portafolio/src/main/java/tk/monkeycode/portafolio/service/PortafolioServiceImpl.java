package tk.monkeycode.portafolio.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.transaction.Transactional;

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
	public List<Proyecto> buscarProyectos() {
		return proyectoRepo.findAllProyects();
	}

	@Override
	public List<Etiqueta> obtenerEtiquetas() {
		return etiquetaRepo.findAllTags();
	}

	@Override
	public Proyecto buscarProyectoPorId(int id) {
		return proyectoRepo.findById(id).orElseThrow();
	}

	@Transactional
	@Override
	public Proyecto guardarProyecto(Proyecto p) {
		if (p.getEtiquetas() != null)
			etiquetaRepo.saveAll(p.getEtiquetas());
		return proyectoRepo.save(p);
	}
	
	@Transactional
	@Override
	public Proyecto actualizarProyecto(Proyecto p) {
		if (p.getEtiquetas() != null)
			etiquetaRepo.saveAll(p.getEtiquetas());
		Proyecto proyectoViejo = proyectoRepo.findById(p.getId()).orElseThrow();
		proyectoViejo.setImagen(p.getImagen());
		proyectoViejo.setNombre(p.getNombre());
		proyectoViejo.setDescripcionCorta(p.getDescripcionCorta());
		proyectoViejo.setDescripcionLarga(p.getDescripcionLarga());
		proyectoViejo.setUrlProyecto(p.getUrlProyecto());
		proyectoViejo.setUrlRepositorio(p.getUrlRepositorio());
		proyectoViejo.setEtiquetas(p.getEtiquetas());
		proyectoViejo.setCreadoEn(p.getCreadoEn());
		return proyectoRepo.save(proyectoViejo);
	}

	@Override
	public void borrarProyecto(int id) {
		proyectoRepo.delete(proyectoRepo.findById(id).orElseThrow());
	}

	@Override
	public List<Proyecto> buscarProyectos(String termino) {
		List<Proyecto> pNombre = proyectoRepo.findByNombreContainingIgnoreCase(termino);
		List<Etiqueta> etiquetas = etiquetaRepo.findBynombreContainingIgnoreCase(termino);
		List<Proyecto> pEtiqueta = proyectoRepo.findByEtiquetasIn(etiquetas);
		return Stream.of(pNombre, pEtiqueta)
					 .flatMap(x -> x.stream())
					 .distinct()
					 .sorted((o1, o2)-> o2.getCreadoEn().compareTo(o1.getCreadoEn()))
					 .collect(Collectors.toList());
	}
	
}
