import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Etiqueta } from 'src/app/models/etiqueta.interface';
import { Proyecto } from 'src/app/models/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-project-form',
  templateUrl: './admin-project-form.component.html',
  styleUrls: ['./admin-project-form.component.css']
})
export class AdminProjectFormComponent implements OnInit, OnDestroy {

  projectForm!: FormGroup;
  action = 'Crear';
  imageUrl!: string;
  imagen!: string;
  hoy: string;
  id!: number;
  etiquetas!: Etiqueta[];
  // https://codefoundry.nl/blogs/rxjs-subscriptions
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private ps: ProyectoService, private ar: ActivatedRoute, private router: Router) {
    this.hoy = (new Date()).toISOString().split('T')[0];
    ar.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.id;
      if (id) {
        this.id = id;        
        this.ps.obtenerProyectoPorId(id).pipe(takeUntil(this.destroy$)).subscribe(proyecto => this.updateForm(proyecto));
      }
    });
    this.obtenerEtiquetas();
  }
  

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      imagen: [],
      file: [],
      nombre: [],
      descripcionCorta: [],
      descripcionLarga: [],
      urlProyecto: [],
      urlRepositorio: [],
      etiquetas: [],
      creadoEn: [this.hoy]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  vistaPrevia(event: any) {
    
    var reader = new FileReader();
    const file = event.target.files[0];

    // Comprueba tipo de archivo
    if (!file.type.includes('image/')) {
      Swal.fire({
        title: 'Tipo de archivo incorrecto',
        text: 'Selecciona una imagen.',
        icon: 'error'
      });
      this.projectForm.get('fileName')?.setValue('');
      return;
    }

    // Comprueba tamaño del archivo
    if (file.size > 2000000) {
      Swal.fire({
        title: 'Archivo muy grande',
        text: 'Selecciona un archivo menor a 2MB.',
        icon: 'error'
      });
      this.projectForm.get('fileName')?.setValue('');
      return;
    }

    // Actualiza el formulario
    this.projectForm.patchValue({
      file: file
    });
    this.imagen = file.name;

    // Muestra imagen
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.imageUrl = reader.result as string;
    };

  }

  onSubmit() {
    
    // Sube la foto al servidor
    const file = this.projectForm.get('file')?.value;
    if (file) {
      this.ps.subirFotoProyecto(file).pipe(takeUntil(this.destroy$)).subscribe();
    }

    // Crea proyecto
    if (this.action == 'Crear') {
      this.crearProyecto();
    }

    // Actualiza  proyecto
    if (this.action == 'Editar') {
      this.actualizarProyecto();
    }

  }

  private crearProyecto() {
    const suba = this.ps.crearProyecto(this.mapForm2Project()).pipe(takeUntil(this.destroy$)).subscribe(
      resp => {
        Swal.fire({
          title: 'Proyecto creado con éxito',
          text: '¿Crear otro proyecto?',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'Sí',
          showCancelButton: true,
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.imageUrl = '';
            this.obtenerEtiquetas();
            this.projectForm.reset();
            setTimeout(() => {
              window.scrollTo(0,0);
            }, 250);
          }
          if (result.isDismissed) {
            this.router.navigateByUrl('/admin');
          }
        });
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: `${error.error.message}`,
          icon: 'error'
        });
      }
    );
  }

  private obtenerEtiquetas() {
    this.ps.obtenerEtiquetas()
      .pipe(
        map(resp => resp.map(item => ({id: item.id, nombre: item.nombre}))),
        takeUntil(this.destroy$))
      .subscribe(resp => this.etiquetas = resp);
  }

  private actualizarProyecto() {
    this.ps.actualizarProyecto(this.mapForm2Project()).pipe(takeUntil(this.destroy$)).subscribe(
      resp => {
        Swal.fire({
          title: 'Proyecto',
          text: `${resp.mensaje}`,
          icon: 'success'
        }).then(() => this.router.navigateByUrl('/admin'));
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: `${error.message}`,
          icon: 'error'
        });
      }
    );
  }

  private mapForm2Project(): Proyecto {
    return {
      id: this.id,
      nombre: this.projectForm.get('nombre')?.value,
      descripcionCorta: this.projectForm.get('descripcionCorta')?.value,
      descripcionLarga: this.projectForm.get('descripcionLarga')?.value,
      urlProyecto: this.projectForm.get('urlProyecto')?.value,
      urlRepositorio: this.projectForm.get('urlRepositorio')?.value,
      imagen: this.imagen,
      etiquetas: this.projectForm.get('etiquetas')?.value?.map((tag: any) => (typeof tag.id === 'string') ? {nombre: tag.nombre} : tag),
      creadoEn: this.projectForm.get('creadoEn')?.value
    }
  }

  private updateForm(proyecto: Proyecto): void {
    this.action = 'Editar';
    this.imageUrl = proyecto.urlImagen as string;
    this.imagen = proyecto.imagen as string;
    this.projectForm.get('nombre')?.setValue(proyecto.nombre);
    this.projectForm.get('descripcionCorta')?.setValue(proyecto.descripcionCorta);
    this.projectForm.get('descripcionLarga')?.setValue(proyecto.descripcionLarga);
    this.projectForm.get('urlProyecto')?.setValue(proyecto.urlProyecto);
    this.projectForm.get('urlRepositorio')?.setValue(proyecto.urlRepositorio);
    this.projectForm.get('etiquetas')?.setValue(proyecto.etiquetas);
    this.projectForm.get('creadoEn')?.setValue(proyecto.creadoEn);
  }
  
}
