export class Tab {
    public static TabDashboard = new Tab(1, "tab-dashboard");
    public static TabEventos = new Tab(1, "tab-eventos");
    public static TabSedes = new Tab(1, "tab-sedes");
    public static TabArtistas = new Tab(1, "tab-artistas");
    public static TabActividades = new Tab(1, "tab-actividades");
    public static TabVentas = new Tab(1, "tab-ventas");
    public static TabProveedores= new Tab(1, "tab-proveedores");
    public static TabPatrocinadores = new Tab(1, "tab-patrocinadores");
    public static TabGastos = new Tab(1, "tab-gastos");
    public static TabStaff = new Tab(1, "tab-staff");
    public static TabIncidencias = new Tab(1, "tab-incidencias");
    public static TabConfiguracion = new Tab(1, "tab-configuracion");

    constructor(
        public id: number,
        public etiqueta: string
    ) { }

    public static usarEtiqueta(etiqueta: string | null) {
        if(etiqueta == null) return Tab.TabDashboard;
        return this.all().find(item => item.etiqueta == etiqueta);
    }

    public static all() {
        return [
            Tab.TabDashboard,
            Tab.TabEventos,
            Tab.TabSedes,
            Tab.TabArtistas,
            Tab.TabActividades,
            Tab.TabVentas,
            Tab.TabProveedores,
            Tab.TabPatrocinadores,
            Tab.TabGastos,
            Tab.TabStaff,
            Tab.TabIncidencias,
            Tab.TabConfiguracion,
        ];
    }
}