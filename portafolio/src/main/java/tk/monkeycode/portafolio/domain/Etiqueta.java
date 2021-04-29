package tk.monkeycode.portafolio.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "etiquetas")
@Data
public class Etiqueta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Column(nullable = false)
	private String nombre;

	@JsonIgnoreProperties(value = {"etiquetas"})
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "etiquetas")
	private List<Proyecto> proyectos;
}
