import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../registro.service'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm!: FormGroup;
  distritos = ['Lima', 'San Isidro', 'Miraflores', 'Surco', 'La Molina', 'San Borja', 'Callao'];
  registros: any[] = []; 

  constructor(private fb: FormBuilder, private registroService: RegistroService) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: [''],
      distrito: ['', Validators.required]
    });

    // Obtener los registros existentes al cargar la página
    this.cargarRegistros();
  }

  // Método para obtener los registros del backend
  cargarRegistros(): void {
    this.registroService.obtenerRegistros().subscribe(
      data => {
        console.log('Datos recibidos del backend:', data); 
        this.registros = data;  
      },
      error => {
        console.error('Error al obtener los registros', error);  
      }
    );
  }


  onSubmit(): void {
    if (this.registroForm.valid) {
      const registro = this.registroForm.value;

      if (registro.id) {
        // Si el formulario tiene un id, es una edición
        this.registroService.modificarRegistro(registro.id, registro).subscribe(
          response => {
            console.log('Usuario modificado exitosamente', response);
            this.cargarRegistros(); 
            this.registroForm.reset();
            alert('Usuario modificado exitosamente');
          },
          error => {
            console.error('Error al modificar el usuario', error);
            alert('Ocurrió un error al modificar el usuario');
          }
        );
      } else {
        // Si no tiene id, es un nuevo registro
        this.registroService.registrarUsuario(registro).subscribe(
          response => {
            console.log('Usuario registrado exitosamente', response);
            this.registros.push(response); 
            this.registroForm.reset(); 
            alert('Usuario registrado exitosamente');
          },
          error => {
            console.error('Error al registrar el usuario', error);
            alert('Ocurrió un error al registrar el usuario');
          }
        );
      }
    }
  }


  eliminarRegistro(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.registroService.eliminarRegistro(id).subscribe(
        () => {
          this.registros = this.registros.filter(registro => registro.id !== id); 
          alert('Usuario eliminado exitosamente');
        },
        error => {
          console.error('Error al eliminar el usuario', error);
          alert('Ocurrió un error al eliminar el usuario');
        }
      );
    }
  }


  editarRegistro(registro: any): void {
    this.registroForm.patchValue({
      nombres: registro.nombres,
      apellidos: registro.apellidos,
      telefono: registro.telefono,
      distrito: registro.distrito
    });

    this.registroForm.addControl('id', this.fb.control(registro.id));
  }


}
