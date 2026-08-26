import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ContentComponent } from '../../shared/components';
import { EventosService } from '../../core/services/eventos/eventos.service';
import { Evento } from '../../shared/models/evento.model';
import { delay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SpinnerComponent, StatGridComponent, EventCardComponent } from '@repo/ui';

@Component({
  selector: 'app-tab-eventos',
  standalone: true,
  imports: [CommonModule, ContentComponent, EventCardComponent, StatGridComponent, SpinnerComponent],
  templateUrl: './tab-eventos.component.html',
  styleUrl: './tab-eventos.component.css'
})
export class TabEventosComponent implements OnInit {
  private eventosService = inject(EventosService);
  public eventos = signal<Evento[]>([]);
  public cargando = signal<boolean>(false);

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

}
