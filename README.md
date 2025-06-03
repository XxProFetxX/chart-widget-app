# Chart Widget App

Aplicación web construida con **Vue 3**, **TypeScript** y **Vite** que permite visualizar gráficos de criptomonedas en tiempo real y manipular redes de nodos interactivas.

## Características

- **Gráficos de criptomonedas**: Consulta precios históricos y en tiempo real de criptomonedas usando la API de CoinGecko, con selección de moneda, rango de fechas y tipo de gráfico (barra o línea).
- **Red de nodos interactiva**: Visualiza y manipula grafos usando D3.js, permitiendo agregar nodos, enlazarlos, arrastrarlos y eliminar enlaces.
- **UI moderna**: Estilizado con TailwindCSS para una experiencia responsiva y atractiva.
- **Arquitectura modular**: Separación clara por módulos (`chart-widget`, `crypto-dashboard`, `graph-widget`, `node-network`).

## Requisitos previos

- **Node.js**: versión 20.18.2

## Instalación y ejecución

1. **Clona el repositorio**  
   ```sh
   git clone https://github.com/XxProFetxX/chart-widget-app.git
   cd chart-widget-app
   ```

2. **Instala dependencias**  
   ```sh
   npm install
   ```

3. **Ejecuta en modo desarrollo**  
   ```sh
   npm run dev
   ```

4. Accede a [http://localhost:5173](http://localhost:5173) (o el puerto que indique Vite).

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza la build de producción.

## Decisiones de arquitectura y stack

- **Vue 3 + TypeScript**: Permite una estructura de componentes moderna, tipado estricto y mejor mantenibilidad.
- **Vite**: Proporciona recarga rápida y configuración sencilla para proyectos Vue modernos.
- **TailwindCSS**: Facilita el diseño responsivo y la personalización rápida de estilos.
- **Chart.js + vue-chartjs**: Para gráficos rápidos y personalizables.
- **D3.js**: Para manipulación avanzada de SVG y simulaciones de fuerza en grafos.
- **Pinia**: Preparado para gestión de estado global si el proyecto crece.
- **Arquitectura modular**: Cada funcionalidad principal está separada en módulos bajo `src/modules`, facilitando la escalabilidad y el mantenimiento.
- **API externa (CoinGecko)**: Se eligió por ser gratuita y ofrecer datos actualizados de criptomonedas.

## Estructura del proyecto

```
src/
  app/                # Componente raíz y layout principal
  modules/
    chart-widget/     # Lógica y UI para gráficos genéricos
    crypto-dashboard/ # Dashboard de criptomonedas
    graph-widget/     # Lógica y UI para grafos
    node-network/     # Pantalla de red de nodos interactiva
  router/             # Definición de rutas
  assets/             # Estilos globales
```

## Notas

- El proyecto está preparado para ampliarse fácilmente con nuevos widgets o dashboards.
- Se recomienda usar [VSCode](https://code.visualstudio.com/) con la extensión [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para mejor experiencia con Vue + TypeScript.

---

Desarrollado por [tu nombre o equipo].