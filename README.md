# Portafolio de Marcos González

Sitio personal de desarrollo web con proyectos profesionales, trayectoria, artículos técnicos y un cotizador de servicios. Está disponible en español, inglés y portugués.

Las páginas se generan con Astro y el cotizador utiliza una isla de React. El envío de solicitudes se procesa en una función de servidor desplegada en Vercel.

## Funcionalidades

- Inicio con presentación, tecnologías, experiencia y contacto.
- Portafolio con categorías de proyectos personales, Balabox y TDI, páginas de detalle y enlaces a demostraciones o repositorios cuando están disponibles.
- Página de trayectoria profesional con experiencia y recursos de presentación.
- Blog con cinco artículos, cada uno con su versión completa en los tres idiomas: perfil profesional, desarrollo front-end, desarrollo back-end, rendimiento web e inteligencia artificial en el desarrollo web.
- Cotizador con cálculo de servicios, dependencias entre opciones, desglose de impuestos y mensualidades, descarga de PDF y formulario de cotización personalizada.
- Navegación adaptable, selector de idioma que conserva la página y página de error 404.
- Preguntas frecuentes sobre entregas, mantenimiento y pagos debajo del cotizador.
- Footer con presentación, redes sociales, mapa de sitio, contacto e información legal.
- Políticas de privacidad, cookies y términos en los tres idiomas, enlazadas desde el footer; privacidad también desde el formulario.
- Metadatos SEO, enlaces canónicos, alternativas de idioma, sitemap y datos estructurados para los artículos.

## Tecnologías

| Área                   | Implementación                          |
| ---------------------- | --------------------------------------- |
| Sitio y rutas          | Astro 5                                 |
| Estilos                | Tailwind CSS 4 y CSS                    |
| Interfaz del cotizador | React 19                                |
| Artículos              | MDX y colecciones de contenido de Astro |
| Tipografía             | Plus Jakarta Sans, alojada localmente   |
| Documentos PDF         | pdfMake, cargado bajo demanda           |
| Correo                 | Nodemailer y SMTP de Brevo              |
| Despliegue             | Adaptador de Vercel para Astro          |
| Validación             | Astro Check y pruebas con Node.js       |
| Dependencias           | pnpm, con archivo de bloqueo versionado |

## Desarrollo local

Requisitos: Node.js 22 (22.12 o posterior dentro de la rama 22.x) y pnpm 11. La versión de pnpm utilizada está declarada en `package.json`. El campo `engines.node` fija la rama `22.x` para coincidir con Vercel y evitar actualizaciones automáticas a otra versión mayor.

```sh
pnpm install
pnpm dev
```

El servidor utiliza `http://127.0.0.1:4321` de forma predeterminada. Si el puerto está ocupado, Astro indica el puerto alternativo en la terminal.

Para habilitar el envío de correo, copia `.env.example` a `.env` y completa sus valores. El sitio y la descarga del PDF funcionan sin credenciales SMTP.

| Comando       | Función                                         |
| ------------- | ----------------------------------------------- |
| `pnpm dev`    | Inicia el servidor de desarrollo                |
| `pnpm check`  | Valida tipos y archivos Astro                   |
| `pnpm build`  | Genera el despliegue para Vercel                |
| `pnpm test`   | Ejecuta las pruebas automatizadas               |
| `pnpm format` | Formatea los archivos configurados del proyecto |

Las pruebas del sitio inspeccionan `.vercel/output/static`, por lo que deben ejecutarse después de compilar:

```sh
pnpm check
pnpm build
pnpm test
```

El adaptador de Vercel no admite `astro preview`. Para trabajar localmente y probar el endpoint de correo, utiliza `pnpm dev`.

## Estructura del proyecto

```text
public/                     Recursos públicos, imágenes, favicon y robots.txt
src/
  components/               Componentes visuales y secciones compartidas
  config/site.ts            Identidad y contacto usados por el cotizador
  content/blog/
    es/                     Artículos en español
    en/                     Artículos en inglés
    pt/                     Artículos en portugués
  content.config.ts         Esquema y carga de la colección del blog
  data/                     Proyectos, experiencia y tecnologías
  features/quote/           Interfaz, precios, PDF y lógica de correo
  features/legal/           Contenido traducido de privacidad, cookies y términos
  layouts/                  Documento HTML, navegación y metadatos comunes
  lib/i18n.ts               Rutas localizadas y textos de la interfaz
  locales/                  Diccionarios por idioma
  pages/                    Rutas, páginas de detalle y API
  styles/                   Estilos globales y animaciones
  views/                    Vistas de proyectos, trayectoria y blog
tests/                      Pruebas de sitio, animaciones y cotizador
.env.example                Plantilla de configuración sin credenciales
astro.config.mjs             Integraciones, dominio y redirecciones
vercel.json                 Configuración de despliegue
pnpm-workspace.yaml         Configuración de instalación de dependencias
```

## Rutas e idiomas

| Sección     | Español                   | Inglés               | Portugués                     |
| ----------- | ------------------------- | -------------------- | ----------------------------- |
| Inicio      | `/`                       | `/en`                | `/pt`                         |
| Proyectos   | `/proyectos`              | `/en/projects`       | `/pt/projects`                |
| Trayectoria | `/acerca-de`              | `/en/about`          | `/pt/about`                   |
| Blog        | `/blog`                   | `/en/blog`           | `/pt/blog`                    |
| Cotizador   | `/cotizacion`             | `/en/cotizacion`     | `/pt/cotizacion`              |
| Privacidad  | `/politica-de-privacidad` | `/en/privacy-policy` | `/pt/politica-de-privacidade` |
| Cookies     | `/politica-de-cookies`    | `/en/cookie-policy`  | `/pt/politica-de-cookies`     |

Las categorías de proyectos utilizan `/personal-projects`, `/projects-bbx` y `/projects-tdi`, con los prefijos de idioma correspondientes. Cada proyecto dispone de su propia ruta de detalle.

Los artículos usan `/blog/<slug>` y los prefijos `/en` y `/pt`. Se conserva el mismo slug en las tres traducciones para mantener los enlaces del selector de idioma y las alternativas `hreflang`.

Los términos se publican en `/terminos-y-condiciones`, `/en/terms` y `/pt/termos-e-condicoes`.

La función `localized()` en `src/lib/i18n.ts` centraliza los enlaces internos. Las rutas antiguas `/projects` y `/about` tienen redirecciones permanentes 301 hacia `/proyectos` y `/acerca-de`.

## Edición del contenido

| Contenido                              | Archivo                                   |
| -------------------------------------- | ----------------------------------------- |
| Presentación, fotografía y experiencia | `src/data/about.js`                       |
| Textos como `about.tdi.date`           | `src/locales/{es,en,pt}/translation.json` |
| Proyectos personales                   | `src/data/projects.ts`                    |
| Proyectos Balabox                      | `src/data/work.js`                        |
| Proyectos TDI                          | `src/data/tdi.ts`                         |
| Tecnologías                            | `src/data/skills.js`                      |
| Cabeceras y textos generales           | `src/lib/i18n.ts`                         |
| Identidad y contacto del cotizador     | `src/config/site.ts`                      |
| Precios, impuestos y mensualidades     | `src/features/quote/pricing.mjs`          |
| Traducciones del cotizador             | `src/features/quote/copy.ts`              |
| Diseño del PDF                         | `src/features/quote/pdf.ts`               |
| Políticas y fecha de actualización     | `src/features/legal/content.ts`           |

Para editar proyectos TDI, utiliza los campos `name`, `image`, `skills`, `description`, `livedemo` y `repository`. La descripción contiene las versiones `es`, `en` y `pt`. Conserva el `id` de los proyectos publicados para mantener sus URLs. La propiedad opcional `isDemo: true` permite identificar ejemplos; las ilustraciones de muestra están en `public/images/tdi/`.

## Blog y SEO

Cada artículo tiene un archivo MDX en cada carpeta de idioma. El contenido se valida mediante `src/content.config.ts` y se genera como HTML durante la compilación.

```yaml
---
title: 'Título visible del artículo'
seoTitle: 'Título para buscadores'
slug: 'slug-compartido-entre-idiomas'
description: 'Descripción breve y específica del contenido.'
focusKeyword: 'frase clave objetivo'
image: '/images/blog/portada.jpg'
imageAlt: 'Descripción de la imagen'
date: '2026-09-18'
lang: 'es'
---
```

`seoTitle` es opcional y utiliza `title` como alternativa. La descripción es obligatoria y admite hasta 200 caracteres. La frase clave es una referencia editorial y forma parte de los datos estructurados; no se genera una etiqueta `meta keywords`.

La plantilla incluye título, metadescripción, URL canónica, alternativas de idioma, Open Graph, tarjetas de X/Twitter, fecha de publicación y JSON-LD de tipo `BlogPosting`. El cuerpo del MDX debe comenzar con texto o un encabezado de nivel dos, porque la página ya muestra el título principal.

Para añadir una publicación, crea las tres versiones con el mismo slug y metadatos traducidos. Las imágenes admiten URLs HTTP(S) o rutas públicas como `/images/blog/portada.jpg`. Para las vistas al compartir, utiliza preferentemente PNG, JPEG o WebP.

La portada del artículo `rendimiento-sitio-web` se configura mediante `image` e `imageAlt` en sus tres versiones. La ilustración de ejemplo permanece disponible en `public/images/blog/rendimiento-demo.svg`.

El dominio canónico se configura en `astro.config.mjs`, actualmente `https://marcosgzz.tech`. Si cambia, actualiza también `public/robots.txt` y las expectativas de dominio de las pruebas. El sitemap se genera al compilar.

`sitemap-index.xml` referencia `sitemap-0.xml`, que contiene las URLs de todas las páginas públicas, proyectos y artículos en los tres idiomas. Una única referencia en el índice es normal; no representa una única página. Las redirecciones antiguas, las páginas de error y la API se excluyen. Los enlaces del sitemap coinciden con las URLs canónicas y se anuncian en `robots.txt` y el layout.

`ShareArticle.astro` añade enlaces para compartir cada artículo en LinkedIn, Facebook y Twitter / X, con su URL canónica y título traducido. Los iconos están incluidos en el HTML; no se cargan SDK de redes sociales. El visitante completa la publicación en el servicio externo.

## Cotizador de servicios

### Cotización instantánea

Las selecciones se mantienen en memoria del navegador. El PDF incluye el desglose de desarrollo, mensualidades, IVA, comentarios y una referencia aleatoria. La referencia no corresponde a un registro almacenado y la descarga no envía información al servidor.

Los precios actuales están centralizados en `pricing.mjs`: base de $5,000 MXN, hosting de $450 mensuales e IVA del 16 %. Las opciones de tienda incluyen catálogo sin duplicar su costo. Reseñas, cupones y favoritos dependen de tienda; el formulario depende de contacto y la IA premium depende de IA. Al desactivar una opción principal se ajustan sus extras dependientes.

### Cotización personalizada

El formulario envía nombre, WhatsApp, correo y empresa opcionales, descripción y presupuesto a `/api/send-email`. Requiere consentimiento explícito. No almacena solicitudes en una base de datos ni envía mensajes automáticos de WhatsApp.

El servidor valida origen, tamaño y campos, escapa el contenido HTML y utiliza un campo trampa y un límite de solicitudes por IP en memoria. Este límite funciona por instancia y no constituye un contador compartido entre funciones de Vercel.

### Preguntas frecuentes

`QuoteFAQ.astro` presenta tres acordeones nativos debajo del cotizador, disponibles en todas sus fases y sin depender de React. La apertura y el cierre animan la altura; los clics repetidos invierten la transición y la preferencia de movimiento reducido conserva la interacción nativa. Los textos se editan en `src/features/quote/faq.ts`: entrega aproximada de cuatro semanas, hospedaje de $200 a $700 MXN y distribución de pagos del 50% al inicio y 50% a la entrega. Son condiciones generales; el calculador conserva el desglose de sus opciones.

## Configuración de correo

| Variable          | Uso                             |
| ----------------- | ------------------------------- |
| `BREVO_SMTP_USER` | Usuario SMTP de Brevo           |
| `BREVO_SMTP_PASS` | Clave SMTP de Brevo             |
| `QUOTE_MAIL_FROM` | Remitente verificado en Brevo   |
| `QUOTE_MAIL_TO`   | Destinatario de las solicitudes |

En desarrollo se cargan desde `.env`. En Vercel deben configurarse en las variables de entorno del proyecto y del entorno de despliegue correspondiente. Después de modificarlas, realiza un nuevo despliegue.

Estas variables se utilizan exclusivamente en el servidor y no deben llevar el prefijo `PUBLIC_`. Si faltan credenciales, el endpoint devuelve un estado 503 y la interfaz informa que el correo no está disponible. Las pruebas automatizadas simulan el transporte SMTP; la entrega real se verifica con la configuración del proveedor.

Si Brevo responde `525 5.7.1 Unauthorized IP address`, revisa la lista de IP autorizadas para SMTP en la cuenta. Debe incluir la IP de salida del entorno que realiza el envío; desarrollo local y Vercel pueden utilizar IP distintas. Un archivo `.env` local no configura las variables de producción. El servidor registra únicamente el código de error y el motivo general, sin credenciales ni contenido de la solicitud.

## Diseño y accesibilidad

La interfaz combina superficies translúcidas, cabeceras oscuras, secciones claras, luces índigo y fucsia, tarjetas y botones redondeados. Los estilos se encuentran en `src/styles/global.css` y `src/styles/animations.css`.

`ScrollAnimations.astro` gestiona las apariciones al desplazarse. Los atributos `data-reveal="fade"`, `data-reveal="scale"` y `data-stagger` permiten aplicar movimiento a bloques y cuadrículas. Las apariciones respetan la preferencia de movimiento reducido y el contenido permanece accesible sin JavaScript o sin IntersectionObserver.

`Header.astro` comienza transparente con texto blanco en el inicio de cada idioma y cambia a blanco al superar 10 px de desplazamiento. Las páginas interiores utilizan la prop `alwaysWhite`; el cotizador conserva este aspecto en todas sus fases. El contenido reserva el espacio del header fijo. En móvil, la navegación se abre en un panel lateral desde la derecha, con control de foco, cierre por Escape y soporte para movimiento reducido.

Las transiciones entre páginas utilizan mejora progresiva del navegador. React se carga únicamente en las páginas del cotizador y pdfMake se solicita al generar el documento.

### Iconos sociales y acciones rápidas

Los componentes reutilizables están en `src/components/ui/`. `Footer.astro` organiza presentación y redes, mapa de sitio, contacto y enlaces legales en cuatro columnas en escritorio, dos en tablet y una en móvil. El copyright se muestra al final. Los textos traducidos están en `copy.ts` y los perfiles se definen en `Footer.astro`.

`SocialLinks.astro` muestra los perfiles debajo de la presentación, con círculos de 32 px, SVG incluidos en el HTML y áreas táctiles de 44 px.

`BackToTop.astro` aparece después de 280 px de desplazamiento, a la derecha en las páginas generales y a la izquierda en el cotizador para dejar espacio al botón de WhatsApp. Cuando está oculto permanece deshabilitado y respeta la preferencia de movimiento reducido.

`WhatsAppButton.astro` se incluye a la derecha únicamente en `/cotizacion`, `/en/cotizacion` y `/pt/cotizacion`, en ambas modalidades. Usa el teléfono de `src/config/site.ts` y un mensaje traducido de `src/components/ui/copy.ts`. La burbuja de texto se oculta en móvil. Ambos botones respetan las áreas seguras de pantalla; el enlace abre WhatsApp con un mensaje preparado que el visitante decide enviar.

### Privacidad, cookies y términos

`PolicyPage.astro` presenta los textos de `src/features/legal/content.ts`. Las políticas describen los datos del formulario, el envío por Brevo, la generación local del PDF, los servicios de infraestructura y los enlaces externos a WhatsApp. El formulario incluye un enlace a privacidad junto al consentimiento.

Los términos explican el uso del portfolio, las estimaciones, el acuerdo de alcance, los plazos y los pagos. Solicitar una cotización no contrata automáticamente un servicio ni realiza un pago.

El sitio no incorpora analítica ni cookies publicitarias propias; la verificación de Search Console es una etiqueta de metadatos. Si se añaden herramientas de seguimiento o cambia el tratamiento de datos, actualiza las políticas y su fecha junto con la implementación.

## Despliegue en Vercel

1. Conecta el repositorio y selecciona la carpeta que contiene `package.json` como raíz.
2. Utiliza el preset **Astro** y el comando de compilación `pnpm build`.
3. Deja que el adaptador determine el directorio de salida; elimina overrides heredados de Next.js.
4. Configura las variables SMTP si se utilizará el formulario a medida.
5. Despliega y verifica las rutas, los idiomas y el envío de correo.

El adaptador genera `.vercel/output` con archivos estáticos y una función de servidor para el endpoint de correo. La configuración `nodeLinker: hoisted` facilita el empaquetado de funciones en Windows.

## Control de versiones

`.gitignore` excluye dependencias, variables de entorno, compilaciones, cachés, registros, resultados de pruebas y temporales. Esto incluye `.env`, sus variantes, `node_modules`, `.astro`, `.next`, `.vercel`, `.pnpm-store`, `dist` y `tmp`.

`.env.example` se conserva como plantilla sin secretos. También deben versionarse `pnpm-lock.yaml`, los archivos de configuración, el código fuente y los recursos públicos.

Para comprobar las exclusiones y detectar archivos ya rastreados que coincidan con ellas:

```sh
git check-ignore -v .env .env.local node_modules/ejemplo dist/ejemplo .astro/ejemplo .vercel/ejemplo
git ls-files -ci --exclude-standard
```

La segunda orden no debe devolver archivos. Las reglas de exclusión no eliminan archivos que ya estén rastreados ni borran contenido del historial de Git.

## Verificación

Las pruebas cubren generación de rutas, enlaces internos, traducciones, metadatos, datos estructurados, redirecciones, comportamiento de las animaciones, reglas de precios, validación del formulario y respuestas del endpoint. La comprobación de envío utiliza un transporte simulado y no manda correos reales.

Después de `pnpm build`, ejecuta `pnpm test:preview` para revisar los archivos de producción en `http://127.0.0.1:4323`. Este servidor de pruebas usa el manejador real del formulario con un transporte SMTP simulado, no lee `.env` y no envía mensajes. Una descripción que contenga `Prueba de error SMTP` permite comprobar el estado de error y reintentar. La cotización automática sí descarga un PDF real.

Vite utiliza cachés separadas para desarrollo y compilación, configuradas en `astro.config.mjs`. Así, ejecutar un build mientras el servidor local está abierto no sustituye las dependencias de React por una versión incompatible con el JSX de desarrollo. Tras cambiar esta configuración, reinicia el servidor de desarrollo si continúa abierto.
