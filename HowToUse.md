# Guía de uso

## Instalación

Instala las dependencias del monorepo desde la raíz del proyecto:

```shell
npm install
```

## Verificación y compilación

Comprueba los tipos y compila los paquetes principales de forma individual:

```shell
npm run check-types --workspace=@repo/shared-types
npm run build --workspace=@repo/shared-services
npm run build --workspace=@repo/ui
npm run build --workspace=web
```

También puedes ejecutar la compilación y la verificación de tipos mediante Turbo:

```shell
npx turbo run build check-types
```

## Desarrollo

Inicia la compilación de la biblioteca de interfaz en modo de observación:

```shell
npm run start:ui
# Equivalente:
npx turbo run start --filter=@repo/ui --only
```

Inicia la aplicación web y el servidor de datos:

```shell
npm run start
# Equivalente:
npx turbo run start --filter=web --filter=server --only
```

## Reconstrucción de paquetes

Reconstruye un paquete concreto después de realizar cambios en su código:

```shell
npx turbo run build --filter=@repo/shared-services
npx turbo run build --filter=@repo/ui
npx turbo run build --filter=web
```

## Ejecución de la aplicación

Para preparar el proyecto y ejecutar la aplicación, compila primero y verifica sus tipos:

```shell
npx turbo run build check-types
npm run start
```

Este último comando inicia la aplicación web y el servidor de datos. Si necesitas iniciar todos los paquetes que tienen definido un script `start`, puedes ejecutar:

```shell
npx turbo run start
```
