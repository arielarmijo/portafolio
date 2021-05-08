package tk.monkeycode.portafolio.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import tk.monkeycode.portafolio.domain.Etiqueta;
import tk.monkeycode.portafolio.domain.Proyecto;
import tk.monkeycode.portafolio.service.PortafolioService;
import tk.monkeycode.portafolio.service.StorageService;

@Slf4j
@RestController
@RequestMapping("/api")
public class PortafolioController {
	
	@Autowired
	private PortafolioService portafolioService;
	
	@Autowired
	private StorageService storageService;

	
	// PROYECTOS
	
	@GetMapping("/proyectos")
	public List<Proyecto> obtenerProyectos() {
		return portafolioService.buscarProyectos();
	}
	
	@GetMapping("/proyecto/{id}")
	public Proyecto buscarProyectoPorId(@PathVariable int id) {
		return portafolioService.buscarProyectoPorId(id);
	}
	
	@GetMapping("/proyectos/buscar")
	public List<Proyecto> buscarProyectos(@RequestParam(name = "search", required = false) String termino) {
		log.info("Buscando por {}...", termino);
		if (termino == null || termino.equals("null") || termino.isEmpty()) {
			return portafolioService.buscarProyectos();
		}
		return portafolioService.buscarProyectos(termino);
	}
	
	@PostMapping("/proyecto")
	public ResponseEntity<Map<String, Object>> crearProyecto(@RequestBody Proyecto proyecto) {
		Proyecto nuevoProyecto = portafolioService.guardarProyecto(proyecto);
		Map<String, Object> content = new HashMap<>();
		content.put("mensaje", "Proyecto creado con éxito.");
		content.put("proyecto", nuevoProyecto);
		return ResponseEntity.ok().body(content);
	}
	
	@PutMapping("proyecto/{id}")
	public ResponseEntity<Map<String, Object>> actualizarProyecto(@RequestBody Proyecto proyecto) {
		Proyecto nuevoProyecto = portafolioService.actualizarProyecto(proyecto);
		Map<String, Object> content = new HashMap<>();
		content.put("mensaje", "Proyecto actualizado con éxito.");
		content.put("proyecto", nuevoProyecto);
		return ResponseEntity.ok().body(content);
	}
	
	@DeleteMapping("/proyecto/{id}")
	public ResponseEntity<Map<String, Object>> borrarProyecto(@PathVariable int id) {
		Map<String, Object> content = new HashMap<>();
		portafolioService.borrarProyecto(id);
		content.put("mensaje", "Proyecto eliminado con éxito.");
		return ResponseEntity.ok(content);
	}
	
	
	// IMAGENES
	
	@GetMapping(value = "/imagen/{nombre}", produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
	public ResponseEntity<Resource> mostrarImagen(@PathVariable String nombre) {
		Resource file = storageService.loadAsResource(nombre);
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION).body(file);
	}
	
	@PostMapping("/proyecto/img")
	public ResponseEntity<Map<String, Object>> handleFileUpload(@RequestParam("imagen") MultipartFile image) {
		log.info(image.getName());
		Map<String, Object> content= new HashMap<>();
		storageService.store(image);
		content.put("mensaje", "Imagen guardada con éxito.");
		return ResponseEntity.ok(content);
	}
	
	
	// ETIQUETAS
	
	@GetMapping("/etiquetas")
	public List<Etiqueta> obtenerEtiquetas() {
		return portafolioService.obtenerEtiquetas();
	}
	
}
