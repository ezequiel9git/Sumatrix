# 🧠 Sumatrix

**Sumatrix** es un juego web de lógica matemática donde debes descubrir una combinación oculta de números en una cuadrícula 3x3. Usa las sumas de filas, columnas y diagonales como pistas, y resuelve el enigma aplicando deducción matemática. ¡Un verdadero Sudoku con superpoderes!


---

## 🎮 ¿Cómo se juega?

- Tienes una cuadrícula de **3x3**, con letras `A` a `I` representando cada celda.
- Cada celda oculta un número **único** del 1 al 9.
- Se muestran las **sumas** de cada fila, columna y diagonal como pistas.
- El jugador debe deducir y escribir el número correcto en cada celda.
- Incluye un área grande para tomar **notas y ecuaciones** mientras juegas.
- Puedes usar el **Tablero de Posibilidades** para tachar o marcar posibles números por celda.
- Haz clic en **"Comprobar solución"** para validar tu respuesta.

---

## ✨ Características

- 💻 Construido con **React + Vite**
- 🎨 Estilizado con **Tailwind CSS 3.4**
- 🔢 Generación aleatoria de combinaciones únicas en cada partida
- 🧮 Herramienta integrada de anotaciones
- ✅ Verificación automática de solución
- 🧊 Tablero auxiliar de posibilidades por celda
- 📱 Diseño responsive
- 🌈 Estética divertida y temática matemática

---

## 🚀 Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tuusuario/sumatrix.git
cd sumatrix
```

2. Instala las dependencias:

```
npm install
```

3. Inicia el entorno de desarrollo:

```
npm run dev
```

4. Accede a la app en: http://localhost:5173


---

## 🧩 Estructura del proyecto

src/
├── components/
│   ├── GridCell.jsx
│   ├── NoteBox.jsx
│   └── PossibilityBoard.jsx
├── App.jsx
├── main.jsx
├── index.css
└── assets/

---

## 🔮 Posibles mejoras futuras

- ⏱ Modo contrarreloj o speedrun
- 🎯 Sistema de pistas limitado
- 🏆 Logros y niveles de dificultad
- 👥 Modo multijugador por turnos
- 📊 Estadísticas personales con localStorage

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Creado con pasión por los acertijos matemáticos por Ezequiel Parrado.