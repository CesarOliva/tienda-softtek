# Tienda Softtek

Tienda en línea (e-commerce) construida con **React 19 + Vite**, **Tailwind CSS v4**, **shadcn/ui** y **Supabase** como backend (autenticación, base de datos y almacenamiento).

## ✨ Características

- **Catálogo de productos** con filtrado por categoría y búsqueda.
- **Página de producto** con galería de imágenes, stock y reseñas de clientes.
- **Carrito de compras** global con verificación de stock en tiempo real.
- **Checkout** con direcciones guardadas, compra directa o desde el carrito, validación de stock y confirmación animada (confetti).
- **Autenticación** con Supabase Auth: registro, inicio de sesión y perfil de usuario.
- **Rutas protegidas** (`/profile`, `/checkout`) accesibles solo para usuarios autenticados.
- **Historial de compras** en el perfil del usuario.
- **Diseño responsive** con Tailwind CSS y componentes de shadcn/ui.

## 🛠️ Stack tecnológico

| Capa        | Tecnología                                        |
| ----------- | ------------------------------------------------- |
| Frontend    | React 19, React Router DOM v7                     |
| Build       | Vite 8                                            |
| Estilos     | Tailwind CSS v4, shadcn/ui (Radix UI), lucide-react |
| Backend     | Supabase (Auth + PostgreSQL + Storage)            |
| Extras      | sonner (toasts), react-confetti, Geist (tipografía) |

## 📁 Estructura del proyecto

```
tienda-softtek/
├── public/                  # Archivos estáticos
├── src/
│   ├── _components/         # Componentes reutilizables (UI, carrito, checkout, etc.)
│   │   ├── ui/              # Componentes base de shadcn/ui
│   │   ├── Checkout/        # Componentes del flujo de checkout
│   │   ├── Main/            # Componentes de la página principal
│   │   └── Producto/        # Componentes de la página de producto
│   ├── context/             # Contextos globales (Auth, Cart)
│   ├── lib/                 # Cliente de Supabase y utilidades
│   ├── pages/               # Páginas de la aplicación
│   ├── types/               # Tipos de TypeScript
│   ├── App.jsx              # Configuración de rutas
│   └── main.jsx             # Punto de entrada
├── .env.local               # Variables de entorno (no versionado)
├── components.json          # Configuración de shadcn/ui
├── vite.config.js           # Configuración de Vite (alias @ → src)
└── package.json
```

### Páginas

| Ruta            | Descripción                                        |
| --------------- | -------------------------------------------------- |
| `/`             | Página principal (carrusel, destacados, contacto)  |
| `/catalogo`     | Catálogo de productos con filtros y búsqueda       |
| `/:productId`   | Detalle de producto con reseñas                    |
| `/login`        | Inicio de sesión                                   |
| `/register`     | Registro de usuario                                |
| `/profile`      | Perfil del usuario (protegida)                     |
| `/checkout`     | Checkout y confirmación de compra (protegida)      |

## 🚀 Puesta en marcha

### Requisitos previos

- Node.js 18 o superior
- Un proyecto de Supabase con las tablas necesarias (ver [Esquema de base de datos](#-esquema-de-base-de-datos))

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/CesarOliva/tienda-softtek.git
cd tienda-softtek

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Copia .env.local.example a .env.local y completa los valores
```

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica_de_supabase
```

> ⚠️ La clave pública (publishable key) es segura para exponerse en el cliente. Nunca uses la clave `service_role` en el frontend.

### Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Build de producción

```bash
npm run build      # Genera la carpeta dist/
npm run preview    # Previsualiza el build de producción
```

## 📜 Scripts disponibles

| Comando          | Descripción                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Servidor de desarrollo con HMR       |
| `npm run build`  | Build de producción                  |
| `npm run lint`   | Ejecuta ESLint                       |
| `npm run preview`| Previsualiza el build de producción  |

## 🗄️ Esquema de base de datos

El proyecto usa las siguientes tablas en Supabase:

| Tabla                | Descripción                                   |
| -------------------- | --------------------------------------------- |
| `products`           | Productos (nombre, precio, stock, categoría)  |
| `categories`         | Categorías de productos                       |
| `images`             | Imágenes de productos                         |
| `product_reviews`    | Reseñas de productos                          |
| `addresses`          | Direcciones guardadas por usuario             |
| `purchases`          | Órdenes de compra                             |
| `purchased_products` | Productos incluidos en cada compra            |

## 🤝 Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu cambio: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit.
4. Envía un pull request.

## 📄 Licencia

Este proyecto es de uso privado/educativo. Consulta al propietario del repositorio para más detalles.