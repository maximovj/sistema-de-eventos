import { computed, Injectable, signal } from '@angular/core';
import { SettingsStorage } from '../../../shared/models/settings-storage.model';
import { SettingsStorageSchema } from '../../../shared/models/schemas/settings-storage.schema';
import { Tab } from '../../../shared/enum/Tab.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {
  private _keyName = "settings";

  // Estado global
  private ConfigAppState = signal<SettingsStorage| null>(null);
  private LoadingState = signal<boolean>(false);
  private ErrorState = signal<string | null>(null);

  // Exponer estados (de solo lectura)
  public readonly configApp = this.ConfigAppState.asReadonly;

  // Exponer funciones, helpers, utilidades 
  public isLoading = computed(() => this.LoadingState());
  public error = computed(() => this.ErrorState());
  public tabActive = computed(() => Tab.usarEtiqueta(this.ConfigAppState()?.tab || null));

  constructor() {
    this.cargarSessionStorage();
  }

  cargarSessionStorage() {
    if(this.ConfigAppState() != null) return;
    if(this.LoadingState()) return;

    this.LoadingState.set(true);
    this.ErrorState.set(null);
    
    const datosString = sessionStorage.getItem(this._keyName);
    
    if (!datosString) return;

    try {
      const datosParseados = JSON.parse(datosString);
      
      // Validar con Zod
      const resultado = SettingsStorageSchema.safeParse(datosParseados);
      
      if (resultado.success) {
        this.ConfigAppState.set(resultado.data);
      } else {
        console.error('Validación fallida:', resultado.error);
        this.ErrorState.set('Validación fallida:' + JSON.stringify(resultado.error, null, -2));
        sessionStorage.removeItem(this._keyName);
      }
    } catch (error) {
      console.error('Error al parsear JSON:', error);
      this.ErrorState.set('Error al parsear JSON:' + JSON.stringify(error, null, -2));
      sessionStorage.removeItem(this._keyName);
    }

    this.LoadingState.set(false);
  }

  modificarTab(tab: string) {
    this.LoadingState.set(true);
    this.ErrorState.set(null);

    if(tab) {
      const configApp = this.ConfigAppState();
      this.ConfigAppState.update(() => ({
        ...configApp,
        tab: tab,
      }));
      sessionStorage.setItem(this._keyName, JSON.stringify(this.ConfigAppState()));
      console.log("Guardado !!!");
    }
    
    this.LoadingState.set(false);
  }

}
