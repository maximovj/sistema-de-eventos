# Eventos Elite (EE)

un sistema de gestión de eventos con organización, sedes, artistas, actividades, ventas, proveedores, patrocinadores, gastos, staff e incidencias

## Requisitos

- node v24.19.0
- npm v11.17.0
- angular/cli v22.1.3
- turbo@2.10.8 (minimo)

## Como usarlo

### Levantar apps modo desarrollador usando monorepo

```shell
# Desde la raíz
npm install
npx turbo build check-types
npm run start # o también npx turbo start
```

### Endpoints disponibles

```shell
# Endpoints:
http://localhost:3080/organizadores
http://localhost:3080/eventos
http://localhost:3080/sedes
http://localhost:3080/artistas
http://localhost:3080/actividades
http://localhost:3080/ventas
http://localhost:3080/proveedores
http://localhost:3080/patrocinadores
http://localhost:3080/gastos
http://localhost:3080/staff
http://localhost:3080/incidencias
```

### SPA disponible

```shell
# Visita la ruta:
http://localhost:4200
http://localhost:4201
```

