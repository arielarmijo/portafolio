package tk.monkeycode.portafolio.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tk.monkeycode.portafolio.domain.Etiqueta;
import tk.monkeycode.portafolio.domain.Proyecto;
import tk.monkeycode.portafolio.service.PortafolioService;
import tk.monkeycode.portafolio.service.StorageService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200", "*"})
public class PortafolioController {
	
	@Autowired
	private PortafolioService ps;
	
	@Autowired
	private StorageService ss;

	@GetMapping("/proyectos")
	public List<Proyecto> obtenerProyectos() {
		return ps.obtenerProyectos();
	}
	
	@GetMapping("/etiquetas")
	public List<Etiqueta> obtenerEtiquetas() {
		return ps.obtenerEtiquetas();
	}
	
	@GetMapping("/proyecto/{id}")
	public Proyecto buscarProyectoPorId(@PathVariable int id) {
		return ps.buscarProyectoPorId(id);
	}
	
	@GetMapping("/proyecto/img/{id}")
	public ResponseEntity<Resource> mostrarImagenProyecto(@PathVariable int id) {
		Proyecto p = ps.buscarProyectoPorId(id);
		String imagen = p.getImagen() == null ? "no-image.jpg": p.getImagen();
		Resource file = ss.loadAsResource(imagen);
		return ResponseEntity.ok()
							 .header(HttpHeaders.CONTENT_DISPOSITION)
							 .contentType(MediaType.IMAGE_GIF)
							 .contentType(MediaType.IMAGE_JPEG)
							 .contentType(MediaType.IMAGE_PNG)
							 .body(file);
	}
	
	@PostMapping("/proyecto/img/{id}")
	public ResponseEntity<Map<String, String>> handleFileUpload(@PathVariable int id,
																@RequestParam("imagen") MultipartFile image) {
		Map<String, String> response = new HashMap<>();
		ss.store(image);
		Proyecto p = ps.buscarProyectoPorId(id);
		p.setImagen(image.getOriginalFilename());
		ps.guardarProyecto(p);
		return new ResponseEntity<Map<String, String>>(response, HttpStatus.CREATED);
	}
}
