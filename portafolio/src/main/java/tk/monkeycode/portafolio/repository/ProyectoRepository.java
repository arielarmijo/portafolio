package tk.monkeycode.portafolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import tk.monkeycode.portafolio.domain.Proyecto;

public interface ProyectoRepository extends CrudRepository<Proyecto, Integer> {
	
	@Query("from Proyecto")
	List<Proyecto> findAllProyects();
	
	Proyecto findById(int id);

}
