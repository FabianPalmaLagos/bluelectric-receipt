import { Database } from './database';

// Categorías predefinidas para la inicialización
const DEFAULT_CATEGORIES = [
  'Materiales',
  'Comida',
  'Alojamiento',
  'Transporte',
  'Herramientas',
  'Otros'
];

export async function initializeDatabase(): Promise<void> {
  try {
    const db = Database.getInstance();
    // Inicializar la base de datos (crear tablas)
    await db.init();

    // Verificar si ya existen categorías
    const existingCategories = await db.query(
      'SELECT COUNT(*) as count FROM categories'
    );

    // Si no hay categorías, insertar las predefinidas
    if (existingCategories[0].count === 0) {
      console.log('Insertando categorías predefinidas...');
      for (const categoryName of DEFAULT_CATEGORIES) {
        await db.insert('categories', { nombre: categoryName });
      }
    }

    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

export async function runMigrations(): Promise<void> {
  try {
    const db = Database.getInstance();
    // Crear tabla de migraciones si no existe
    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        executed_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Lista de migraciones (se agregarán más según sea necesario)
    const migrations = [
      {
        name: '001_initial_schema',
        up: async () => {
          // La estructura inicial ya se crea en db.init()
          console.log('Migración 001_initial_schema completada');
        }
      },
      // Agregar más migraciones aquí según sea necesario
    ];

    // Ejecutar migraciones pendientes
    for (const migration of migrations) {
      const executed = await db.query(
        'SELECT id FROM migrations WHERE name = ?',
        [migration.name]
      );

      if (executed.length === 0) {
        console.log(`Ejecutando migración: ${migration.name}`);
        await migration.up();
        await db.insert('migrations', { name: migration.name });
      }
    }

    console.log('Migraciones completadas exitosamente');
  } catch (error) {
    console.error('Error al ejecutar las migraciones:', error);
    throw error;
  }
}