# 📌 To-Do App

Este proyecto es una aplicación web de tareas pendientes con un diseño inspirado en un panel de corcho. Las tareas se muestran como notas adhesivas fijadas con chinchetas.

## 🚀 Tecnologías Utilizadas
- **React** con **TypeScript**
- **PrimeReact** para componentes UI
- **Axios** para la comunicación con la API
- **CSS personalizado** para el diseño tipo panel de corcho

## 📂 Estructura del Proyecto
```
📦 Prueba-tecnica-React
├── 📂 public
├── 📂 src
│   ├── 📂 components  # Componentes de React
│   ├── 📂 pages        # Páginas principales
│   ├── 📂 styles       # Estilos CSS
│   ├── 📄 App.tsx      # Componente principal
│   ├── 📄 index.tsx    # Punto de entrada
│   ├── 📄 api.ts       # Configuración de Axios
├── 📄 .env.example     # Variables de entorno (ejemplo)
├── 📄 README.md        # Documentación del proyecto
├── 📄 package.json     # Dependencias y scripts
```

## ⚙️ Configuración y Ejecución
### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Korchea/Prueba-tecnica-React.git
cd Prueba-tecnica-React
```
### 2️⃣ Crear el archivo `.env`
Antes de ejecutar la aplicación, debes crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
REACT_APP_API_TOKEN=tu_bearer_token
REACT_APP_API_URL=https://tu-api.com
```

### 3️⃣ Instalar dependencias
```bash
npm install
```

### 4️⃣ Ejecutar la aplicación
```bash
npm start
```
La aplicación se ejecutará en `http://localhost:3000/`

## 📝 Funcionalidades
- ✅ Agregar, editar y eliminar tareas.
- ✅ Mostrar tareas en un tablero con un diseño tipo corcho con post-its.
- ✅ Estado de tareas (completadas o pendientes).
- ✅ Persistencia de datos con una API externa.

## 🤝 Contribución
Si deseas contribuir a este proyecto, ¡eres bienvenido! Puedes hacer un fork, crear una rama y enviar un pull request.

---
**Autor:** Guillermo Vega - Korchea - [GitHub](https://github.com/Korchea)