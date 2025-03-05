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

// Usuarios predefinidos para la inicialización
const DEFAULT_USERS = [
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

// Flag para rastrear si la migración ya se ejecutó
let migrationExecuted = false;

async function insertInitialData(db: Database) {
  // Insertar categorías
  if ((await db.query('SELECT COUNT(*) as count FROM categories'))[0].count === 0) {
    console.log('Insertando categorías iniciales...');
    for (const categoryName of DEFAULT_CATEGORIES) {
      try {
        await db.insert('categories', { nombre: categoryName });
      } catch (error) {
        if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
          console.log('Registro duplicado en categories, saltando...');
        } else {
          throw error;
        }
      }
    }
  }

  // Insertar usuarios
  if ((await db.query('SELECT COUNT(*) as count FROM users'))[0].count === 0) {
    console.log('Insertando usuarios iniciales...');
    for (const userData of DEFAULT_USERS) {
      try {
        await db.insert('users', userData);
      } catch (error) {
        if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
          console.log('Registro duplicado en users, saltando...');
        } else {
          throw error;
        }
      }
    }
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    const db = Database.getInstance();

    // Verificar si ya existen categorías
    let existingCategories;
    try {
      existingCategories = await db.query(
        'SELECT COUNT(*) as count FROM categories'
      );
    } catch (error) {
      // Si la tabla no existe, inicializamos la base de datos
      await db.init();
      existingCategories = await db.query(
        'SELECT COUNT(*) as count FROM categories'
      );
    }

    // Insertar datos iniciales si es necesario
    if (existingCategories[0].count === 0) {
      await insertInitialData(db);
    }

    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

export async function runMigration(): Promise<void> {
  if (migrationExecuted) {
    console.log('La migración ya fue ejecutada en esta sesión.');
    return;
  }

  try {
    const db = Database.getInstance();
    
    // Verificar si ya hay datos en la base de datos
    try {
      const status = await checkMigrationStatus();
      if (status.categoriesCount > 0 && status.usersCount > 0) {
        console.log('La base de datos ya contiene datos, omitiendo migración.');
        migrationExecuted = true;
        return;
      }
    } catch (error) {
      // Si hay error al verificar el estado, continuamos con la migración
      console.log('No se pudo verificar el estado, procediendo con la migración');
    }

    // Si no hay datos, procedemos con la migración
    try {
      // Crear tabla de migraciones si no existe
      await db.executeQuery(`
        CREATE TABLE IF NOT EXISTS migrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          executed_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Verificar si la migración inicial ya se ejecutó
      const executed = await db.query(
        'SELECT id FROM migrations WHERE name = ?',
        ['001_initial_schema']
      );

      if (executed.length === 0) {
        console.log('Ejecutando migración inicial...');
        await initializeDatabase();
        await db.insert('migrations', { name: '001_initial_schema' });
        console.log('Migración inicial completada');
      } else {
        console.log('La migración inicial ya fue ejecutada previamente');
      }

      migrationExecuted = true;

    } catch (error) {
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        console.log('La migración ya fue registrada previamente');
        migrationExecuted = true;
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('Error al ejecutar la migración:', error);
    throw error;
  }
}

export async function checkMigrationStatus(): Promise<{ 
  categoriesCount: number; 
  projectsCount: number; 
  usersCount: number 
}> {
  const db = Database.getInstance();

  try {
    const [categories, projects, users] = await Promise.all([
      db.query('SELECT COUNT(*) as count FROM categories')
        .catch(() => [{ count: 0 }]),
      db.query('SELECT COUNT(*) as count FROM projects')
        .catch(() => [{ count: 0 }]),
      db.query('SELECT COUNT(*) as count FROM users')
        .catch(() => [{ count: 0 }])
    ]);

    const status = {
      categoriesCount: categories[0].count,
      projectsCount: projects[0].count,
      usersCount: users[0].count
    };
    
    console.log('Estado actual de la base de datos:', status);
    return status;

  } catch (error) {
    console.error('Error al verificar el estado de la migración:', error);
    throw error;
  }
}