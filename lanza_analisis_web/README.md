# LANZA Analisis Web (Proyecto Independiente)

Proyecto web aislado 100% cliente (HTML/CSS/JS), sin Python.

## Contenido

- `web/`: frontend HTML/CSS/JS
- `levantar_web.bat`: abre la web en el navegador

## Levantar la web

```powershell
./levantar_web.bat
```

Tambien podes abrir directamente `web/index.html`.

## Nota sobre archivo "en uso"

Al ser full web, el selector de Windows no permite elegir un Excel bloqueado por otra app.

Si aparece `Este archivo esta en uso`, usa `Guardar como` en Excel y carga esa copia.

## Funcionalidades incluidas

- Carga manual de archivo de estado y lanzamiento
- Filtros por fecha, TP Ord y OC cliente
- Clasificacion de estados (580/610, 610/999, etc.)
- Totales y `% avance facturado` (facturado / plan)
- Grafico de barras, torta y lineas en el tiempo
- Exportacion CSV del comparativo
