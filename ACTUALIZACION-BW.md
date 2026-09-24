# Sets BW y menús legibles

Se conservan todos los presets propios de PokeMMO. Se agregan 2103 presets
de 627 especies de la calculadora oficial de Showdown, con el prefijo
`Showdown BW -`. Se ajusta únicamente su nivel a 50. No son probabilidades
ni una certificación de legalidad en PokeMMO; pueden incluir formatos LC,
dobles, Ubers y combinaciones no disponibles en PokeMMO.
Las especies sin preset en ninguna fuente todavía tendrán Blank Set.

Fuente: https://raw.githubusercontent.com/smogon/damage-calc/master/src/js/data/sets/gen5.js
Consultada: 2026-09-24.
SHA-256: 6bb45a0f9d58f4cc9189081fbb3f286b9b2cdf29416c376073d1380c1d349074
Licencia MIT del proyecto original conservada en LICENSE.

Se corrigen los fondos de select al enfocar/pasar el ratón y de sus opciones.
No se cambia el motor, la clave localStorage ni el formato de los equipos guardados.
`src`, `dist` y `docs` incluyen los cambios. GitHub Pages utiliza `docs`.

Para instalar: copia el contenido del ZIP de actualización dentro del repositorio
local (la carpeta que contiene src, dist y docs), aceptando reemplazar los archivos.
No borres las carpetas existentes. Después revisa `git diff --stat` y publica
los archivos de la actualización mediante git add, git commit y git push.
