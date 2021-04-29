package tk.monkeycode.portafolio.domain;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Nationalized;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name = "proyectos")
public class Proyecto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Nationalized
	@Column(nullable = false, length = 50)
	private String nombre;
	
	@Nationalized
	@Column(nullable = false)
	private String descripcionCorta;
	
	@Lob
	@Nationalized
	@Column(nullable = true)
	private String descripcionLarga;
	
	@Column(nullable = true, length = 50)
	private String imagen;
	
	@Column(nullable = false, length = 100)
	private String urlProyecto;
	
	@Column(nullable = false, length = 100)
	private String urlRepositorio;
	
	@Column(nullable = false)
	private LocalDate creadoEn;
	
	@JsonIgnoreProperties(value = {"proyectos"})
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "proyectos_etiquetas",
			   joinColumns = @JoinColumn(name = "proyecto_id"),
			   inverseJoinColumns = @JoinColumn(name = "etiqueta_id")) 
	private List<Etiqueta> etiquetas;

}
