package tk.monkeycode.portafolio.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Nationalized;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name = "etiquetas")
@SequenceGenerator(name="etiquetaSeq", sequenceName = "etiqueta_seq", allocationSize = 1)
public class Etiqueta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "etiquetaSeq")
	private Integer id;
	
	@Column(nullable = false, length = 50)
	@Nationalized
	private String nombre;

	@JsonIgnoreProperties(value = {"etiquetas"})
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "etiquetas")
	private List<Proyecto> proyectos;
	
}
