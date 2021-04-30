import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-admin-project-form',
  templateUrl: './admin-project-form.component.html',
  styleUrls: ['./admin-project-form.component.css']
})
export class AdminProjectFormComponent implements OnInit {

  projectForm!: FormGroup;
  action = 'Crear';
  imageUrl!: string;

  constructor(private fb: FormBuilder, private ps: ProyectoService) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      file: [null],
      nombre: ['test'],
      descripcionCorta: ['test'],
      descripcionLarga: ['test'],
      urlProyecto: ['test'],
      urlRepositorio: ['test'],
      creadoEn: [null]
    });
  }

  preview(event: any) {
    var reader = new FileReader();
    const file = event.target.files[0];
    this.projectForm.patchValue({
      file: file
    });
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.imageUrl = reader.result as string;
    };
  }

  crearProyecto() {
    const file = this.projectForm.get('file')?.value;
    if (file) {
      this.ps.subirFotoProyecto(file).subscribe(resp => console.log(resp));
    }
    this.ps.crearProyecto(this.mapForm2Project()).subscribe(resp => {
      console.log(resp); 
    });
  }

  mapForm2Project(): Proyecto {
    return {
      nombre: this.projectForm.get('nombre')?.value,
      descripcionCorta: this.projectForm.get('descripcionCorta')?.value,
      urlProyecto: this.projectForm.get('urlProyecto')?.value,
      urlRepositorio: this.projectForm.get('urlRepositorio')?.value,
      imagen: this.projectForm.get('file')?.value?.name,
      creadoEn: this.projectForm.get('creadoEn')?.value
    }
  }

}
