package tk.monkeycode.portafolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import tk.monkeycode.portafolio.domain.Proyecto;

public interface ProyectoRepository extends CrudRepository<Proyecto, Integer> {
	
	@Query("from Proyecto p order by p.creadoEn desc")
	List<Proyecto> findAllProyects();
	
	Optional<Proyecto> findById(int id);
	
	List<Proyecto> findByNombreContainingIgnoreCase(String term);

}
