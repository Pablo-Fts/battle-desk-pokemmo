# Battle Desk · PokeMMO

Calculadora de combate para Pablo: tu equipo y seis rivales independientes, con guardado automático en este navegador.

## Abrir en Windows

1. Extrae todo el ZIP (no abras archivos dentro del ZIP).
2. Con Node.js LTS instalado, ejecuta `ABRIR-WINDOWS.bat`.
3. Abre `http://localhost:4173`. Mantén la ventana de consola abierta.

También puedes ejecutar `node serve-local.cjs` en esta carpeta. No necesitas instalar paquetes para usar la versión ya compilada incluida en `dist/`. Puedes probar `dist/index.html` directamente, pero se recomienda el servidor local para tener un origen estable y un guardado fiable. Una vez extraída, la calculadora funciona sin conexión; los enlaces externos requieren Internet.

## Uso durante una batalla

- Tu equipo inicial: Garchomp, Slowbro, Heatran, Zapdos, Starmie y Scizor; nivel 50. Verifica sus IVs, EVs, habilidades y objetos contra tus ejemplares reales.
- Pulsa uno de los seis espacios rivales. Busca la especie en el panel derecho y elige un set. La lista presenta sets comunitarios, no probabilidades calculadas ni una predicción del rival.
- Modifica objeto, habilidad, movimientos, EVs, IVs, naturaleza, PS, estados y boosts. Cambia usando los espacios de arriba: al volver, se conservan las modificaciones.
- El buscador del panel REEMPLAZA el Pokémon/set del espacio activo. Para alternar sin reemplazar, utiliza las seis tarjetas.
- Las notas y las marcas «Objeto visto», «M1–M4» se guardan por rival. M1–M4 se refieren al orden de los cuatro movimientos; si editas un movimiento o el objeto, su confirmación se borra.
- El campo es compartido por la batalla. Cambiar de tarjeta NO simula un cambio en el juego: no quita boosts, no activa habilidades ni aplica hazards. Ajusta estos efectos manualmente. Seleccionar un nuevo set puede aplicar los automatismos del motor original, como clima por habilidad.
- «Quitar boosts», «PS 100%» y «Debilitado» son atajos manuales.
- Alt + 1–6 selecciona tu Pokémon; Shift + 1–6 selecciona el rival. No actúan cuando escribes en un campo. El navegador o sistema podría reservar alguno.
- «Nueva batalla» vacía rivales/campo y cura tu equipo, conservando sus sets. «Deshacer reinicio» recupera la sesión anterior hasta recargar la página. Restaurar una copia también permite deshacer.
- «Importar equipo» acepta 1–6 sets Showdown y reemplaza solo el lado elegido, previa confirmación. Un nivel omitido se interpreta como 50.
- «Exportar set» muestra el Pokémon activo en texto Showdown. «Copia de seguridad» descarga la sesión completa, incluidas notas y campo, en JSON.

## Guardado y privacidad

No hay conexión con tu cuenta ni con el cliente de PokeMMO. No se detectan Pokémon automáticamente. No se envían equipos a un servidor: se usa `localStorage` del navegador. La web publicada y `localhost` tienen guardados separados; transfiere una copia JSON entre ellos. Borrar los datos del navegador elimina la sesión; modo incógnito no es adecuado para conservarla. Las copias se validan antes de cargar.

## Motor y límites

Base comunitaria: https://github.com/sah-leem/mmoshowdown-damage-calc
Revisión base: `190aca3c3853a1a95cb0ae63185655e69c170457`.
Derivada de https://github.com/smogon/damage-calc (Honko y colaboradores), licencia MIT incluida.

El fork usa Gen 5 con parches propios: potencias posteriores, habilidades y objetos añadidos, crítico 1.5×, entre otros. No se certifica correspondencia exhaustiva con el servidor actual de PokeMMO. La existencia de una especie, objeto o movimiento en el selector NO demuestra su legalidad o disponibilidad actual. Los datos comunitarios pueden estar desactualizados. Los sets propuestos son supuestos y no evidencian qué lleva el adversario. Nombres y controles avanzados del motor permanecen en inglés. La velocidad comparada no considera la prioridad de los movimientos.

No se reconstruyó la fórmula de daño. Los cambios de Battle Desk están principalmente en `src/js/battle-desk.js`, `src/css/battle-desk.css` y `src/shared.template.html`. Se corrigió además la inicialización del selector en `src/js/shared_controls.js` para no reemplazar el set seleccionado por el primero de la lista al restaurarlo.

## Desarrollar y verificar

Requiere Node.js moderno (20 o superior recomendado).

```sh
npm ci
node build
npm run test:session
npm start
```

Para cambios solo de interfaz: `node build view`. Edita `src/`, no `dist/`; `dist/` se regenera. No hacen falta claves ni servicios de pago. `serve-local.cjs` sirve únicamente `dist/` y escucha solo en localhost por defecto.

Pruebas incluidas: seis integrantes precargados, selección de dos rivales, conservación de PS exactos/objeto/movimientos/boosts/estado/notas/confirmaciones, recarga, IV 0 Velocidad, importación, rechazo de entradas inválidas, reinicio y deshacer, cálculo real de daño. La interfaz también se comprobó en navegador de escritorio. La integración opcional WebMCP es de solo lectura, se detecta por disponibilidad y no fue validable en el navegador de pruebas; no es necesaria para usar la calculadora.

La interfaz es adaptable con reglas para pantallas pequeñas; no se ha realizado una batería exhaustiva en dispositivos móviles ni auditado todas las combinaciones del motor.
