# Manual de la Calculadora DAB+ CU ↔ Bitrate

La Calculadora DAB+ CU ↔ Bitrate convierte entre **Capacity Units (CU)** y **bitrate** para los subcanales DAB+, para los dos perfiles de protección uniforme (Equal Error Protection) definidos en ETSI EN 300 401. Es una pequeña aplicación web (PWA) que funciona sin conexión después de la primera visita. Es gratuita, de OnAir Garage.

## Abrir e instalar

Abre la calculadora en `https://onairgarage.com/apps/dab-calculator/` (la página de la herramienta es `https://onairgarage.com/tools/dab-calculator/`). Para usarla no se instala nada, y después de la primera visita funciona sin conexión. También puedes instalarla como app:

- **Chrome, Edge y Android**: pulsa el botón *Instalar app* de la cabecera de la página.
- **iPhone y iPad (Safari)**: toca el botón Compartir y luego «Añadir a pantalla de inicio».
- **Safari en Mac** (macOS Sonoma o posterior): menú Archivo y luego «Añadir al Dock».

La app se abre siempre en inglés. Pulsa EN, IT o ES en la cabecera para cambiar el idioma: un cambio manual se recuerda en el dispositivo.

## Usar la calculadora

1. Elige el **Perfil EEP**: EEP-A (niveles de protección de 1-A a 4-A, bitrates en pasos de 8 kbit/s, de 8 a 192 kbit/s) o EEP-B (niveles de protección de 1-B a 4-B, bitrates en pasos de 32 kbit/s, de 32 a 192 kbit/s).
2. Elige la **Dirección**: *CU → Bitrate* (conoces las capacity units asignadas al subcanal y quieres el bitrate) o *Bitrate → CU* (conoces el bitrate y quieres las capacity units que necesita).
3. Elige el **Nivel de protección**.
4. Elige las **CU asignadas** o el **Bitrate objetivo**, según la dirección. El resultado aparece debajo: el bitrate resultante o las CU necesarias, con una banda de calidad indicativa y un uso típico.
5. La **Tabla completa** del nivel de protección seleccionado enumera cada bitrate con su tamaño en CU, su banda de calidad y su uso típico.

La banda de calidad y el uso típico son orientaciones editoriales: **no** forman parte del estándar.

## Fórmulas y fuentes

Los tamaños de los subcanales proceden de **ETSI EN 300 401 V2.1.1 (2017-01)**, cláusula 6.2.1:

| Perfil | Bit rate | Coding rate | Nivel 1 | Nivel 2 | Nivel 3 | Nivel 4 |
|---|---|---|---|---|---|---|
| EEP-A (tabla 9) | 8n kbit/s, n entero ≥ 1 | 1/4, 3/8, 1/2, 3/4 | 12n CU | 8n CU | 6n CU | 4n CU |
| EEP-B (tabla 10) | 32n kbit/s, n entero ≥ 1 | 4/9, 4/7, 4/6, 4/5 | 27n CU | 21n CU | 18n CU | 15n CU |

- Una trama DAB (CIF) tiene **864 CU de 64 bits** (55 296 bits), así que un subcanal debe caber en 864 CU.
- El estándar admite cualquier n ≥ 1 que quepa. La app enumera 8–192 kbit/s (EEP-A) y 32–192 kbit/s (EEP-B), el intervalo usado para los servicios DAB+.
- El borrador ETSI EN 300 401 V2.2.1 (2026-02) tiene las mismas tablas 9 y 10.

Por ejemplo, 96 kbit/s con el nivel de protección 3-A ocupan 72 CU, 128 kbit/s con 3-A ocupan 96 CU y 64 kbit/s con 3-A ocupan 48 CU.

## Idioma y privacidad

No hay cuentas, seguimiento ni peticiones externas: la calculadora funciona por completo en tu navegador. Una pequeña tarjeta de propina al final de la página tiene la hucha del sitio y un enlace a la página de apoyo de onairgarage.com en tu idioma, que se abre en una pestaña nueva solo cuando haces clic; dentro de la calculadora no se pide nunca nada. En las pantallas táctiles cada botón, selector y enlace mide al menos 44 px.

## Actualizaciones

La app se actualiza sola: cuando hay una versión nueva lista, un aviso dice «Hay una nueva versión lista.» con *Recargar* y *Luego*. Pulsa *Recargar* para usarla ya. La app sigue funcionando sin conexión con la versión que ya tiene guardada.

## Límites

- No es una herramienta certificada, y una configuración real de multiplexor **no** se ha validado: comprueba siempre las cifras en tu multiplexor.
- Las tablas enumeran el intervalo DAB+ habitual. El estándar admite otros valores de n, siempre que el subcanal quepa en 864 CU.
- Las bandas de calidad y los usos típicos son sugerencias editoriales, no forman parte del estándar ETSI.

## Solución de problemas

| Problema | Qué hacer |
|---|---|
| No aparece el botón *Instalar app* | Puede que tu navegador no lo ofrezca: en iPhone, iPad y Safari para Mac usa los pasos del capítulo Abrir e instalar. |
| La página no se actualiza | Pulsa *Recargar* en el aviso, o recarga la página; una copia instalada se actualiza la próxima vez que se inicia con conexión. |
| Un bitrate no está en la lista | Las tablas muestran solo el intervalo DAB+ habitual (8–192 kbit/s para EEP-A, 32–192 kbit/s para EEP-B). |

## Contactos

Graziano Melzi · OnAir Garage — `https://onairgarage.com` — `hello@onairgarage.com`. Página de la herramienta: `https://onairgarage.com/tools/dab-calculator/`. Código fuente y versiones: `https://github.com/djgragra/dab-calculator`. Licencia: MIT © 2026 Graziano Melzi.
