const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ruta de la base de datos
const dbPath = path.join(__dirname, 'bluelectric.db');

// Verificar si la base de datos ya existe
if (fs.existsSync(dbPath)) {
  console.log('La base de datos ya existe. Eliminándola para crear una nueva...');
  fs.unlinkSync(dbPath);
}

// Crear la base de datos
const db = new sqlite3.Database(dbPath);

// Ejecutar en modo transacción
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');

  // Crear tabla de usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      rol TEXT NOT NULL CHECK (rol IN ('ADMINISTRADOR', 'TRABAJADOR')) COLLATE NOCASE,
      foto_perfil TEXT,
      fecha_alta TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Crear tabla de proyectos
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      fecha_creacion TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Crear tabla de categorías
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Crear tabla de recibos
  db.run(`
    CREATE TABLE IF NOT EXISTS receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      monto REAL NOT NULL,
      fecha TEXT NOT NULL,
      comercio TEXT NOT NULL,
      imagenUri TEXT NOT NULL,
      estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')) COLLATE NOCASE,
      motivo_rechazo TEXT,
      usuario_id INTEGER NOT NULL,
      proyecto_id INTEGER NOT NULL,
      categoria_id INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (proyecto_id) REFERENCES projects (id) ON DELETE CASCADE,
      FOREIGN KEY (categoria_id) REFERENCES categories (id) ON DELETE CASCADE
    )
  `);

  // Crear tabla de comentarios
  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      texto TEXT NOT NULL,
      fecha TEXT NOT NULL,
      recibo_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (recibo_id) REFERENCES receipts (id) ON DELETE CASCADE,
      FOREIGN KEY (usuario_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Crear tabla de migraciones
  db.run(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      executed_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insertar datos iniciales
  console.log('Insertando datos iniciales...');

  // Insertar usuarios predefinidos
  const users = [
    {
      nombre: 'Admin',
      email: 'admin@bluelectric.cl',
      rol: 'ADMINISTRADOR',
      fecha_alta: new Date().toISOString()
    },
    {
      nombre: 'Trabajador',
      email: 'trabajador@bluelectric.cl',
      rol: 'TRABAJADOR',
      fecha_alta: new Date().toISOString()
    }
  ];

  const insertUserStmt = db.prepare('INSERT INTO users (nombre, email, rol, fecha_alta) VALUES (?, ?, ?, ?)');
  users.forEach(user => {
    insertUserStmt.run(user.nombre, user.email, user.rol, user.fecha_alta);
  });
  insertUserStmt.finalize();

  // Insertar categorías predefinidas
  const categories = [
    'Materiales',
    'Comida',
    'Alojamiento',
    'Transporte',
    'Herramientas',
    'Otros'
  ];

  const insertCategoryStmt = db.prepare('INSERT INTO categories (nombre) VALUES (?)');
  categories.forEach(category => {
    insertCategoryStmt.run(category);
  });
  insertCategoryStmt.finalize();

  // Insertar registro de migración
  db.run('INSERT INTO migrations (name) VALUES (?)', ['001_initial_schema']);

  console.log('Base de datos inicializada correctamente');
});

// Cerrar la conexión
db.close(err => {
  if (err) {
    console.error('Error al cerrar la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos cerrada');
  }
}); 