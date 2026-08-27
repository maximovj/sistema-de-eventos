# Eventos Elite (EE)

un sistema de gestión de eventos con organización, sedes, artistas, actividades, ventas, proveedores, patrocinadores, gastos, staff e incidencias

## Requisitos

- node v18.20.8
- npm v11.17.0
- angular/cli v17.3.7
- turbo@2.10.11 (minimo)

## Como usarlo

### Levantar apps modo desarrollador usando monorepo

```shell
# Desde la raíz
npm install
npm run check-types --workspace=@repo/shared-types # Verificar tipos
npx turbo build check-types # Construir
npx turbo run start:iu # o también npx turbo run start --filter=@repo/ui --only
npx turbo run start # o también npx turbo run start --filter=web --filter=server --only

# reconstruir componentes
npx turbo build --filter=@repo/ui # reconstruir componentes ui
npx turbo build --filter=web # reconstruir componentes web

# Levantar modo demo (sin desarrollo)
npx turbo build check-types # Construir
npx turbo start # o también npm run start 
```

### Construir apps modo desarrollador usando monorepo

```shell
# Desde la raíz
npm install
npx turbo build check-types # Construir 
npx turbo build # o también npm run build 
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

