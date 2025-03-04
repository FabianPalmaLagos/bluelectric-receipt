/**
 * Resolver personalizado para Jest que ayuda a manejar módulos ESM en React Native
 */
module.exports = (path, options) => {
  // Llamar al resolver por defecto de Jest
  return options.defaultResolver(path, {
    ...options,
    // Asegurarse de que los módulos ESM se resuelvan correctamente
    packageFilter: pkg => {
      // Para módulos que tienen un campo "module" o "exports" en su package.json
      if (pkg.module || pkg.exports) {
        // Forzar a Jest a usar la versión CommonJS
        pkg.main = pkg.main || 'index.js';
        delete pkg.module;
        delete pkg.exports;
      }
      return pkg;
    }
  });
}; 