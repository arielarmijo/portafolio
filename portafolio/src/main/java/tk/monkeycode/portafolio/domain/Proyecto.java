package tk.monkeycode.portafolio.domain;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Nationalized;

import lombok.Data;

@Data
@Entity
@Table(name = "proyectos")
@SequenceGenerator(name="proyectoSeq", sequenceName = "proyecto_seq", allocationSize = 1)
public class Proyecto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="proyectoSeq")
	private Integer id;
	
	@Column(nullable = false, length = 50)
	private String nombre;
	
	@Column(nullable = false, length = 150)
	@Nationalized
	private String descripcionCorta;
	
	@Lob
	@Nationalized
	@Column(nullable = true)
	private String descripcionLarga;
	
	@Column(nullable = true, length = 50)
	private String imagen;
	
	@Column(nullable = true, length = 100)
	private String urlProyecto;
	
	@Column(nullable = false, length = 100)
	private String urlRepositorio;
	
	@Column(nullable = true)
	private LocalDate creadoEn;
	
	//@JsonIgnoreProperties(value = {"proyectos"})
	@ManyToMany
	@JoinTable(name = "proyectos_etiquetas",
			   joinColumns = @JoinColumn(name = "proyecto_id"),
			   inverseJoinColumns = @JoinColumn(name = "etiqueta_id")) 
	private Set<Etiqueta> etiquetas;

}
