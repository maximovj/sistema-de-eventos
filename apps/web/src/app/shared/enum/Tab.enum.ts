export class Tab {
    public static TabDashboard = new Tab(1, "tab-dashboard");
    public static TabEventos = new Tab(1, "tab-eventos");
    public static TabSedes = new Tab(1, "tab-sedes");
    public static TabArtistas = new Tab(1, "tab-artistas");
    public static TabActividades = new Tab(1, "tab-actividades");

    constructor(
        public id: number,
        public etiqueta: string
    ) { }

    public static all() {
        return [
            Tab.TabDashboard,
            Tab.TabEventos,
            Tab.TabSedes,
            Tab.TabArtistas,
            Tab.TabActividades,
        ];
    }
}