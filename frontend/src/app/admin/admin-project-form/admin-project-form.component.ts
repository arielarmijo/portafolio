import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-project-form',
  templateUrl: './admin-project-form.component.html',
  styleUrls: ['./admin-project-form.component.css']
})
export class AdminProjectFormComponent implements OnInit {

  projectForm!: FormGroup;
  action = 'Crear';
  imageUrl!: string;
  imagen!: string;
  hoy: string;
  id!: number;

  constructor(private fb: FormBuilder, private ps: ProyectoService, private ar: ActivatedRoute, private router: Router) {
    this.hoy = (new Date()).toISOString().split('T')[0];
    ar.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.id = id;        
        this.ps.obtenerProyectoPorId(id).subscribe(proyecto => this.updateForm(proyecto));
      }
    });
  }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      imagen: [''],
      file: [null],
      nombre: ['test'],
      descripcionCorta: ['test'],
      descripcionLarga: ['test'],
      urlProyecto: ['test'],
      urlRepositorio: ['test'],
      creadoEn: [this.hoy]
    });
  }

  preview(event: any) {

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

  crearProyecto() {
    
    // Sube la foto al servidor
    const file = this.projectForm.get('file')?.value;
    if (file) {
      this.ps.subirFotoProyecto(file).subscribe(resp => console.log(resp));
    }

    // Crea proyecto
    if (this.action == 'Crear') {
      this.ps.crearProyecto(this.mapForm2Project()).subscribe(
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
          Swal.fire({
            title: 'Error',
            text: `${error.message}`,
            icon: 'error'
          });
        }
      );
    }

    // Actualiza  proyecto
    if (this.action == 'Editar') {
      this.ps.actualizarProyecto(this.mapForm2Project()).subscribe(
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
    this.projectForm.get('creadoEn')?.setValue(proyecto.creadoEn);
  }
  
}
