# Lanzamientos

Un proyecto de análisis de planes y estados de lanzamiento, con una interfaz web local para cargar archivos Excel y comparar resultados.

## Qué hace

- Carga un archivo de `Estado` y uno o más archivos de `Plan de lanzamiento`.
- Calcula dos niveles de servicio (NS):
  - `NS 15 días`: porcentaje facturado desde la `Fecha inicio lanzamiento` hasta 15 días después.
  - `NS`: porcentaje facturado desde la `Fecha inicio lanzamiento` hasta la fecha actual del análisis.
- Muestra indicadores, tablas y gráficos de avance por OC, negocio y artículo.
- Permite exportar comparativos y generar históricos.
- Abre el `Histórico` en una nueva pestaña para mantener los datos cargados en la pantalla principal.

## Estructura del repositorio

- `extract_excel.py` - script adicional para procesamiento fuera de la interfaz web.
- `lanza_analisis_web/` - aplicación web de análisis.
  - `levantar_web.bat` - abre la aplicación en el navegador.
  - `web/` - frontend HTML/CSS/JS.

## Cómo usar

1. Abrir `lanza_analisis_web/levantar_web.bat` o abrir directamente `lanza_analisis_web/web/index.html`.
2. Seleccionar el archivo de `Estado`.
3. Seleccionar uno o más archivos de `Plan de lanzamiento`.
4. Ingresar `Fecha inicio lanzamiento` en cada plan.
5. Hacer clic en `Cargar y preparar analisis`.
6. Ver los resultados en la sección de análisis.

## Notas importantes

- La columna `NS` ahora calcula el nivel de servicio desde la fecha de inicio del lanzamiento hasta el momento del análisis usando la fecha del sistema.
- La columna `NS 15 días` sigue calculándose desde la fecha de inicio del lanzamiento hasta 15 días después.
- No se modifica la planilla de lanzamientos durante el análisis.

## Requisitos

- Navegador moderno (Chrome, Edge, Firefox).
- Los archivos se cargan desde el cliente; no hay servidor necesario.

## Licencia

Proyecto libre para uso interno y análisis.
