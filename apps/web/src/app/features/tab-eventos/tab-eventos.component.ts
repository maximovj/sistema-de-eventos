import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ContentComponent } from '../../shared/components';
import { EventosService } from '@repo/shared-services';
import { Evento } from '@repo/shared-types';
import { delay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SpinnerComponent, StatGridComponent, EventCardComponent, ModalEventComponent } from '@repo/ui';

@Component({
  selector: 'app-tab-eventos',
  standalone: true,
  imports: [
    CommonModule, 
    ContentComponent, 
    EventCardComponent, 
    StatGridComponent, 
    SpinnerComponent,
    ModalEventComponent
  ],
  templateUrl: './tab-eventos.component.html',
  styleUrl: './tab-eventos.component.css'
})
export class TabEventosComponent implements OnInit {
  private eventosService = inject(EventosService);
  public eventos = signal<Evento[]>([]);
  public cargando = signal<boolean>(false);
  eventoSeleccionado: any | null = null;
  modalAbierto: boolean = false;
  modalTipo: 'view' | 'create' | 'edit' = 'view';
  modalTitulo: string = 'Detalle del evento';

  public bolentosVendidos = computed(() => this.eventos().reduce(
    (acc, evento) => acc+evento.boletosVendidos, 0)
  );

  public presupuestoEjercido = computed(() => this.eventos().reduce(
    (acc, evento) => acc+evento.presupuestoEjercido, 0).toLocaleString('es-MX')
  );

  public presupuestoTotal = computed(() => this.eventos().reduce(
    (acc, evento) => acc+evento.presupuestoTotal, 0).toLocaleString('es-MX')
  );
  
  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos() {
    this.cargando.set(true);
    this.eventosService.eventos()
    .pipe(
      delay(1700)
    )
    .subscribe({
      next: (eventos: Evento[]) => {
        console.log("Eventos =>", eventos);
        this.eventos.update(() => [...eventos]);
      },
      complete: () => {
        this.cargando.set(false);
      },
    });
  }

  onEditarEvento(evento: any) {
    this.eventoSeleccionado = evento;
    this.modalAbierto = true;
    this.modalTipo = 'edit';
    this.modalTitulo = 'Editar información del evento';
  }

  onVerEvento(evento: any) {
    this.eventoSeleccionado = evento;
    this.modalAbierto = true;
    this.modalTipo = 'view';
    this.modalTitulo = 'Información del evento';
  }

  onGuardarEvento(evento: any) {
    console.log("Guardar evento: ", evento);
    
  }
  
  onActualizarEvento(evento: any) {
    console.log("Actualizar evento: ", evento);
  }
  
  onCerrarModal() {
    this.modalAbierto = false; 
  }

}
