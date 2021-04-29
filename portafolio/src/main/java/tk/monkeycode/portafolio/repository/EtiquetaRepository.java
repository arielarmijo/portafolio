package tk.monkeycode.portafolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import tk.monkeycode.portafolio.domain.Etiqueta;

public interface EtiquetaRepository extends CrudRepository<Etiqueta, Integer> {

	@Query("from Etiqueta")
	List<Etiqueta> findAllTags();
}
