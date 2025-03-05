## SpecStory

## Error de compilación en Expo (4/3/2025, 4:03:07 p.m.)

_**User**_

Tengo este error: Compiling JS failed: 69089:3:export declaration must be at top levl of module al usar la app de expo, pero no se ve reflejado en los logs

---

_**Assistant**_

<think>El usuario está reportando un error específico en su aplicación de Expo. El error es: "Compiling JS failed: 69089:3:export declaration must be at top level of module" (Fallo en la compilación de JS: la declaración de exportación debe estar en el nivel superior del módulo).

Este es un error común en JavaScript/TypeScript cuando una declaración `export` no está en el nivel superior del módulo. Por ejemplo, si intentas exportar algo dentro de una función o un bloque condicional.

Para ayudar a resolver este problema, necesito buscar en el código fuente dónde podría estar ocurriendo este error. Vamos a explorar la estructura del proyecto primero.</think>Vamos a examinar el proyecto para encontrar el problema con la declaración de exportación. Primero revisemos la estructura del proyecto.

---

_****_

<details>
            <summary>Listed current directory • **17** results</summary>
        
| Name |
|-------|
| 📄 `projectBrief.md` |
| 📄 `babel.config.js` |
| 📁 `bluelectric` |
| 📄 `jest.config.js` |
| 📁 `.git` |
| 📁 `src` |
| 📄 `jest.resolver.js` |
| 📄 `package-lock.json` |
| 📄 `schema_dump.sql` |
| 📁 `supabase` |
| 📄 `.env` |
| 📁 `.vscode` |
| 📁 `.cursor` |
| 📁 `node_modules` |
| 📄 `package.json` |
| 📁 `icon` |
| 📁 `.specstory` |

</details>

---

_****_



Parece que estamos trabajando con un proyecto de React Native/Expo. Veamos qué hay en la carpeta src, que probablemente contiene el código principal:

---

_****_

<details>
            <summary>Listed directory src • **3** results</summary>
        
| Name |
|-------|
| 📁 `__tests__` |
| 📁 `screens` |
| 📁 `__mocks__` |

</details>

---

_****_



Vamos a revisar también el package.json para entender mejor el tipo de proyecto:

---

_****_

Read file: package.json

---

_****_





Vamos a examinar también la estructura de `bluelectric`, que parece ser el directorio principal de la aplicación:

---

_****_

<details>
            <summary>Listed directory bluelectric • **20** results</summary>
        
| Name |
|-------|
| 📄 `MEMORYBANK.md` |
| 📄 `README.md` |
| 📄 `App.tsx` |
| 📄 `package-lock.json` |
| 📄 `package.json` |
| 📁 `node_modules` |
| 📄 `babel.config.js` |
| 📄 `index.js` |
| 📄 `jest.config.js` |
| 📁 `src` |
| 📁 `bluelectric` |
| 📄 `app.json` |
| 📁 `.expo` |
| 📁 `memorybank` |
| 📁 `bluelectric-receipt` |
| 📄 `.gitignore` |
| 📄 `.env` |
| 📄 `tsconfig.json` |
| 📁 `assets` |
| 📄 `App.js` |

</details>

---

_****_





Veamos también qué hay en el directorio `bluelectric/src`:

---

_****_

<details>
            <summary>Listed directory bluelectric/src • **11** results</summary>
        
| Name |
|-------|
| 📁 `__mocks__` |
| 📁 `__tests__` |
| 📁 `assets` |
| 📁 `components` |
| 📁 `types` |
| 📁 `utils` |
| 📁 `screens` |
| 📁 `store` |
| 📁 `navigation` |
| 📁 `constants` |
| 📁 `api` |

</details>

---

_****_





Ahora, vamos a buscar en los archivos JavaScript/TypeScript donde podría haber una declaración `export` incorrecta. Usaré una búsqueda semántica para encontrar posibles coincidencias con el error:

---

_****_

<details>
            <summary>Searched codebase "export declaration dentro de función o bloque condicional" • **25** results</summary>
        
| File | Lines |
|------|-------|
| `.specstory/history/2025-03-04_15-44-error-de-exportación-en-expo.md` | L368-445 |
| `.specstory/history/2025-03-04_15-44-error-de-exportación-en-expo.md` | L246-368 |
| `.specstory/history/2025-03-04_15-32-resolving-regeneratorruntime-error-in-react-native.md` | L498-620 |
| `bluelectric/src/utils/ocr/index.ts` | L40-56 |
| `.specstory/history/2025-03-04_15-32-resolving-regeneratorruntime-error-in-react-native.md` | L342-498 |
| `bluelectric/src/utils/ocr/localProcessor.ts` | L39-55 |
| `.specstory/history/2025-03-04_15-44-error-de-exportación-en-expo.md` | L1-97 |
| `bluelectric/src/utils/ocr/dataExtractor.ts` | L138-189 |
| `.specstory/history/2025-03-04_15-44-error-de-exportación-en-expo.md` | L97-246 |
| `jest.resolver.js` | L1-20 |
| `bluelectric/src/utils/ocr/localProcessor.ts` | L1-39 |
| `bluelectric/src/store/index.ts` | L34-39 |
| `bluelectric/src/utils/ocr/imagePreprocessor.ts` | L59-83 |
| `bluelectric/src/types/receipt.ts` | L78-92 |
| `bluelectric/App.tsx` | L1-41 |
| `bluelectric/src/utils/ocr/dataExtractor.ts` | L102-138 |
| `.specstory/history/2025-03-04_15-44-error-de-exportación-en-expo.md` | L445-483 |
| `bluelectric/App.tsx` | L41-50 |
| `bluelectric/src/navigation/RootNavigator.tsx` | L1-20 |
| `bluelectric/src/api/supabase.ts` | L1-18 |
| `.specstory/history/2025-03-04_15-44-error-de-exportación-en-expo.md` | L483-575 |
| `bluelectric/src/utils/ocr/dataExtractor.ts` | L1-46 |
| `bluelectric/src/types/receipt.ts` | L70-78 |
| `bluelectric/src/__tests__/mocks/mockConstants.ts` | L120-131 |
| `bluelectric/src/utils/ocr/validation.ts` | L24-55 |

</details>

---

_****_





Ahora vamos a buscar declaraciones `export` que pueden estar dentro de bloques condicionales o funciones:

---

_****_

<details>
            <summary>Grep search for "if\s*\(.*\)\s*{[\s\S]*?export|for\s*\(.*\)\s*{[\s\S]*?export|function\s*[a-zA-Z0-9_]*\s*\(.*\)\s*{[\s\S]*?export|\}\s*export" • **0** files</summary>
        
No results found
</details>

---

_****_





Vamos a revisar el archivo index.js de la aplicación, que suele ser el punto de entrada:

---

_****_

Read file: bluelectric/index.js

---

_****_







Veamos la configuración de babel:

---

_****_

Read file: bluelectric/babel.config.js

---

_****_







Basado en los resultados de las búsquedas, no encontramos directamente un archivo con una declaración `export` dentro de un bloque, pero este tipo de error puede deberse a varias causas. Vamos a ampliar nuestra búsqueda y explorar los nodos_modules para ver si hay conflictos de versiones:

---

_****_

```bash
cd bluelectric && npm ls --depth=0 | grep -E 'babel|metro'
```

```
cd bluelectric && npm ls --depth=0 | grep -E 'babel|metro'
<luelectric && npm ls --depth=0 | grep -E 'babel|metro'
├── @babel/core@7.26.9
├── @babel/plugin-transform-runtime@7.26.9
├── @babel/preset-env@7.26.9
├── @babel/preset-react@7.26.3
├── @babel/preset-typescript@7.26.0
├── @babel/runtime@7.26.9
├── babel-jest@29.7.0
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_









Veamos cuáles son los archivos que se han modificado recientemente:

---

_****_

```bash
find src -type f -mtime -7 | grep -v "node_modules" | xargs ls -la | grep -v "/__" | sort -k 6,7
```

```
<odules" | xargs ls -la | grep -v "/__" | sort -k 6,7
-rw-r--r--@ 1 fpalma  staff    707 Mar  3 20:01 src/navigation/RootNavigator.tsx
-rw-r--r--@ 1 fpalma  staff    841 Mar  3 20:00 src/navigation/AuthNavigator.tsx
-rw-r--r--@ 1 fpalma  staff   1495 Mar  3 23:38 src/types/receipt.ts
-rw-r--r--@ 1 fpalma  staff   1519 Mar  3 20:04 src/store/slices/uiSlice.ts
-rw-r--r--@ 1 fpalma  staff   1542 Mar  3 20:01 src/navigation/ReceiptsNavigator.tsx
-rw-r--r--@ 1 fpalma  staff   1793 Mar  3 23:38 src/utils/ocr/localProcessor.ts
-rw-r--r--@ 1 fpalma  staff   1794 Mar  3 20:01 src/navigation/ProjectsNavigator.tsx
-rw-r--r--@ 1 fpalma  staff   2008 Mar  3 23:38 src/utils/ocr/index.ts
-rw-r--r--@ 1 fpalma  staff   2293 Mar  3 20:01 src/navigation/MainNavigator.tsx
-rw-r--r--@ 1 fpalma  staff   3531 Mar  3 23:39 src/utils/ocr/imagePreprocessor.ts
-rw-r--r--@ 1 fpalma  staff   3927 Mar  3 23:40 src/utils/ocr/validation.ts
-rw-r--r--@ 1 fpalma  staff   5760 Mar  3 20:02 src/store/slices/authSlice.ts
-rw-r--r--@ 1 fpalma  staff   6048 Mar  3 20:15 src/screens/receipts/AddCommentScreen.tsx
-rw-r--r--@ 1 fpalma  staff   7322 Mar  3 20:18 src/screens/projects/AddProjectScreen.tsx
-rw-r--r--@ 1 fpalma  staff   7561 Mar  3 23:40 src/utils/ocr/dataExtractor.ts
-rw-r--r--@ 1 fpalma  staff   7609 Mar  3 20:18 src/screens/projects/EditProjectScreen.tsx
-rw-r--r--@ 1 fpalma  staff   8001 Mar  3 23:53 src/components/OCRValidationView.tsx
-rw-r--r--@ 1 fpalma  staff  10250 Mar  3 20:16 src/screens/projects/ProjectsListScreen.tsx
-rw-r--r--@ 1 fpalma  staff  10541 Mar  3 20:05 src/screens/main/HomeScreen.tsx
-rw-r--r--@ 1 fpalma  staff  11435 Mar  3 20:03 src/store/slices/projectsSlice.ts
-rw-r--r--@ 1 fpalma  staff  12257 Mar  3 20:13 src/screens/receipts/ReceiptDetailScreen.tsx
-rw-r--r--@ 1 fpalma  staff  12855 Mar  3 20:12 src/screens/receipts/ReceiptsListScreen.tsx
-rw-r--r--@ 1 fpalma  staff  17447 Mar  3 20:17 src/screens/projects/ProjectDetailScreen.tsx
-rw-r--r--@ 1 fpalma  staff  19035 Mar  3 23:54 src/screens/receipts/EditReceiptScreen.tsx
-rw-r--r--@ 1 fpalma  staff    834 Mar  4 12:41 src/api/supabase.ts
-rw-r--r--@ 1 fpalma  staff    903 Mar  4 01:03 src/screens/main/ProfileScreen.tsx
-rw-r--r--@ 1 fpalma  staff   1316 Mar  4 15:55 src/store/index.ts
-rw-r--r--@ 1 fpalma  staff   1410 Mar  4 15:56 src/types/index.ts
-rw-r--r--@ 1 fpalma  staff   1953 Mar  4 12:47 src/constants/theme.ts
-rw-r--r--@ 1 fpalma  staff   2019 Mar  4 12:43 src/navigation/types.ts
-rw-r--r--@ 1 fpalma  staff   5812 Mar  4 12:55 src/screens/auth/ForgotPasswordScreen.tsx
-rw-r--r--@ 1 fpalma  staff   6144 Mar  4 12:43 src/screens/projects/ProjectCategoriesScreen.tsx
-rw-r--r--@ 1 fpalma  staff   6992 Mar  4 12:53 src/screens/auth/LoginScreen.tsx
-rw-r--r--@ 1 fpalma  staff   8290 Mar  4 12:54 src/screens/auth/RegisterScreen.tsx
-rw-r--r--@ 1 fpalma  staff  15195 Mar  4 15:57 src/store/slices/receiptsSlice.ts
-rw-r--r--@ 1 fpalma  staff  17666 Mar  4 15:57 src/screens/receipts/AddReceiptScreen.tsx
-rw-r--r--@ 1 fpalma  staff  19066 Mar  4 10:30 src/assets/logo-dark.png
-rw-r--r--@ 1 fpalma  staff  59991 Mar  4 10:30 src/assets/logo-light.png
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_











Ahora veamos los archivos que han sido modificados más recientemente:

---

_****_

```bash
find src -type f -mmin -120 | grep -v "node_modules" | xargs ls -la | sort -k 6,7 | tail -5
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % find src -type f -mmin -120 | grep -v "node_modules" | xargs ls -
la | sort -k 6,7 | tail -5                 find src -type f -mmin -120 | grep -v "node_modules" | xargs ls -
la | sort -k 6,7 | tail -5
-rw-r--r--@ 1 fpalma  staff   4263 Mar  4 15:17 src/__tests__/components/OCRValidationView.test.tsx
-rw-r--r--@ 1 fpalma  staff   5489 Mar  4 15:02 src/__tests__/screens/LoginScreenMock.test.js
-rw-r--r--@ 1 fpalma  staff   6433 Mar  4 15:03 src/__tests__/screens/RegisterScreenMock.test.js
-rw-r--r--@ 1 fpalma  staff  15195 Mar  4 15:57 src/store/slices/receiptsSlice.ts
-rw-r--r--@ 1 fpalma  staff  17666 Mar  4 15:57 src/screens/receipts/AddReceiptScreen.tsx
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_









Veamos el contenido de los archivos modificados más recientemente, empezando por receiptsSlice.ts:

---

_****_

Read file: bluelectric/src/store/slices/receiptsSlice.ts

---

_****_







El archivo parece normal en la sección inicial. Veamos la parte final del mismo archivo para buscar posibles problemas:

---

_****_

Read file: bluelectric/src/store/slices/receiptsSlice.ts

---

_****_









Ahora veamos el AddReceiptScreen.tsx:

---

_****_

Read file: bluelectric/src/screens/receipts/AddReceiptScreen.tsx

---

_****_













Revisemos también los archivos de prueba que fueron modificados recientemente:

---

_****_

Read file: bluelectric/src/__tests__/components/OCRValidationView.test.tsx

---

_****_















El problema que estás experimentando con el error "export declaration must be at top level of module" es común en proyectos React Native/Expo, especialmente cuando hay problemas con la configuración de babel o cuando hay un error de sintaxis en el código. Basado en mi análisis, hay varias soluciones posibles:

## Posibles soluciones:

1. **Limpiar la caché de Metro Bundler y Expo**
   
   El primer paso debe ser limpiar la caché para eliminar cualquier archivo compilado corrupto:

   ```bash
   cd bluelectric
   npx expo start --clear
   ```

2. **Verificar declaraciones `export` dentro de bloques**
   
   No encontramos directamente declaraciones de exportación dentro de bloques de código, pero podría haber alguna que no se detectó. Revisa manualmente los archivos modificados recientemente, especialmente:
   - `src/store/slices/receiptsSlice.ts`
   - `src/screens/receipts/AddReceiptScreen.tsx`
   - `src/__tests__/components/OCRValidationView.test.tsx`

3. **Comprobar problema de regenerator-runtime**
   
   Tu archivo `index.js` ya tiene correctamente importado `regenerator-runtime/runtime`, pero asegúrate de que esté importado como la primera línea en el archivo.

4. **Revisar configuración de babel**
   
   Tu configuración de babel parece correcta, pero podrías probar a simplificarla temporalmente para descartar problemas:

   ```javascript
   module.exports = function(api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: ['react-native-reanimated/plugin']
     };
   };
   ```

5. **Verificar los archivos de node_modules**
   
   A veces, los módulos de node_modules pueden tener problemas de compatibilidad. Prueba reinstalando los módulos:

   ```bash
   cd bluelectric
   rm -rf node_modules
   npm install
   ```

6. **Revisar el módulo específico mencionado en el error**
   
   El número de línea 69089 sugiere que este es un archivo generado. Podrías estar encontrando un problema con un módulo que Expo está compilando. Verifica tus dependencias para asegurarte de que sean compatibles con tu versión de Expo.

7. **Actualizar Expo y dependencias clave**
   
   Asegúrate de estar usando versiones compatibles de Expo y React Native.

## Recomendación final:

Dado que este error puede ser difícil de rastrear, recomiendo un enfoque sistemático:

1. Primero, limpia la caché y reinicia la app
2. Si persiste, restaura los últimos cambios que hiciste hasta que funcione
3. Luego, agrega tus cambios uno por uno para identificar cuál causa el problema

¿Has realizado cambios recientes en archivos que podrían estar afectando a la compilación? ¿Ocurre el error solo en determinadas condiciones o siempre?

---

_**User**_

El caché está limpio, haz el resto de acciones tu

---

_**Assistant**_

<think>El usuario me está pidiendo que continúe con el resto de las soluciones propuestas para resolver su problema de error de compilación en Expo. Voy a proceder sistemáticamente con las acciones restantes que mencioné anteriormente.

Primero, deberíamos verificar si hay algún archivo modificado recientemente que podría estar causando el problema. Como ya identificamos en la discusión anterior que los archivos modificados más recientemente eran:
- src/store/slices/receiptsSlice.ts
- src/screens/receipts/AddReceiptScreen.tsx
- src/__tests__/components/OCRValidationView.test.tsx

Debería revisar estas áreas en busca de declaraciones de exportación problemáticas. También deberíamos considerar simplificar temporalmente la configuración de Babel para determinar si eso resuelve el problema.</think>Vamos a proceder con el resto de acciones para solucionar tu problema de exportación. Primero, vamos a simplificar la configuración de Babel para descartar problemas de configuración:

---

_****_

```diff
    api.cache(true);
    return {
-     presets: [
-       'babel-preset-expo',
-       ['@babel/preset-env', { loose: true }],
-       '@babel/preset-typescript',
-       '@babel/preset-react'
-     ],
+     presets: ['babel-preset-expo'],
      plugins: [
-       'react-native-reanimated/plugin',
-       ["@babel/plugin-transform-private-methods", { "loose": true }],
-       ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
-       ["@babel/plugin-transform-class-properties", { "loose": true }],
-       ["@babel/plugin-transform-runtime", { "helpers": true, "regenerator": true }]
+       'react-native-reanimated/plugin'
      ]
    };
```

---

_****_



Ahora, vamos a verificar si hay algún problema en el archivo `store/index.ts` que fue modificado recientemente:

---

_****_

Read file: bluelectric/src/store/index.ts

---

_****_





Vamos a revisar los tipos en el archivo index.ts que también fue modificado recientemente:

---

_****_

Read file: bluelectric/src/types/index.ts

---

_****_







Ahora vamos a reinstalar los módulos para descartar problemas de dependencias:

---

_****_

```bash
cd bluelectric && rm -rf node_modules && npm install
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % cd bluelectric && rm -rf node_modules && npm install
npm WARN ERESOLVE overriding peer dependency
npm WARN While resolving: react-dom@19.0.0-rc-6230622a1a-20240610
npm WARN Found: react@18.3.1
npm WARN node_modules/react
npm WARN   react@"18.3.1" from the root project
npm WARN   31 more (@react-native-community/datetimepicker, ...)
npm WARN 
npm WARN Could not resolve dependency:
npm WARN peer react@"19.0.0-rc-6230622a1a-20240610" from react-dom@19.0.0-rc-6230622a1a-20240610
npm WARN node_modules/react-dom
npm WARN   peer react-dom@"19.0.0-rc-6230622a1a-20240610" from react-server-dom-webpack@19.0.0-rc-6230622a1a
-20240610
npm WARN   node_modules/react-server-dom-webpack
npm WARN 
npm WARN Conflicting peer dependency: react@19.0.0-rc-6230622a1a-20240610
npm WARN node_modules/react
npm WARN   peer react@"19.0.0-rc-6230622a1a-20240610" from react-dom@19.0.0-rc-6230622a1a-20240610
npm WARN   node_modules/react-dom
npm WARN     peer react-dom@"19.0.0-rc-6230622a1a-20240610" from react-server-dom-webpack@19.0.0-rc-6230622a
1a-20240610
npm WARN     node_modules/react-server-dom-webpack
npm WARN ERESOLVE overriding peer dependency
npm WARN While resolving: react-server-dom-webpack@19.0.0-rc-6230622a1a-20240610
npm WARN Found: react@18.3.1
npm WARN node_modules/react
npm WARN   react@"18.3.1" from the root project
npm WARN   31 more (@react-native-community/datetimepicker, ...)
npm WARN 
npm WARN Could not resolve dependency:
npm WARN peer react@"19.0.0-rc-6230622a1a-20240610" from react-server-dom-webpack@19.0.0-rc-6230622a1a-20240
610
npm WARN node_modules/react-server-dom-webpack
npm WARN   react-server-dom-webpack@"19.0.0-rc-6230622a1a-20240610" from jest-expo@52.0.5
npm WARN   node_modules/jest-expo
npm WARN 
npm WARN Conflicting peer dependency: react@19.0.0-rc-6230622a1a-20240610
npm WARN node_modules/react
npm WARN   peer react@"19.0.0-rc-6230622a1a-20240610" from react-server-dom-webpack@19.0.0-rc-6230622a1a-202
40610
npm WARN   node_modules/react-server-dom-webpack
npm WARN     react-server-dom-webpack@"19.0.0-rc-6230622a1a-20240610" from jest-expo@52.0.5
npm WARN     node_modules/jest-expo

up to date, audited 1351 packages in 1s

104 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_








Veo algunas advertencias relacionadas con incompatibilidades de dependencias. Ahora vamos a verificar cuáles son tus versiones de Expo y React:

---

_****_

```bash
cd .. && npm list expo react react-native
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % cd .. && npm list expo react react-native
npm ERR! code ELSPROBLEMS
npm ERR! invalid: react@18.3.1 /Users/fpalma/Proyectos Personales/bluelectric-receipt/bluelectric/node_modul
es/react
bluelectric@1.0.0 /Users/fpalma/Proyectos Personales/bluelectric-receipt/bluelectric
├─┬ @react-native-async-storage/async-storage@1.23.1
│ └── react-native@0.76.7 deduped
├─┬ @react-native-community/datetimepicker@8.2.0
│ ├── expo@52.0.37 deduped
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ @react-native-community/netinfo@11.4.1
│ └── react-native@0.76.7 deduped
├─┬ @react-native-picker/picker@2.9.0
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ @react-navigation/bottom-tabs@7.2.1
│ ├─┬ @react-navigation/elements@2.2.6
│ │ ├── react-native@0.76.7 deduped
│ │ └── react@18.3.1 deduped
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ @react-navigation/native@7.0.15
│ ├─┬ @react-navigation/core@7.4.0
│ │ └── react@18.3.1 deduped
│ ├── react-native@0.76.7 deduped
│ ├── react@18.3.1 deduped
│ └─┬ use-latest-callback@0.2.3
│   └── react@18.3.1 deduped
├─┬ @react-navigation/stack@7.1.2
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ @reduxjs/toolkit@2.6.0
│ └── react@18.3.1 deduped
├─┬ @testing-library/jest-native@5.4.3
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ @testing-library/react-native@13.1.0
│ ├─┬ react-native-gesture-handler@2.24.0
│ │ ├── react-native@0.76.7 deduped
│ │ └── react@18.3.1 deduped
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ expo-file-system@18.0.11
│ ├── expo@52.0.37 deduped
│ └── react-native@0.76.7 deduped
├─┬ expo-image-manipulator@13.0.6
│ ├─┬ expo-image-loader@5.0.0
│ │ └── expo@52.0.37 deduped
│ └── expo@52.0.37 deduped
├─┬ expo-image-picker@16.0.6
│ └── expo@52.0.37 deduped
├─┬ expo-status-bar@2.0.1
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ expo@52.0.37
│ ├─┬ expo-asset@11.0.4
│ │ ├── expo@52.0.37 deduped
│ │ ├── react-native@0.76.7 deduped
│ │ └── react@18.3.1 deduped
│ ├─┬ expo-constants@17.0.7
│ │ ├── expo@52.0.37 deduped
│ │ └── react-native@0.76.7 deduped
│ ├─┬ expo-font@13.0.4
│ │ ├── expo@52.0.37 deduped
│ │ └── react@18.3.1 deduped
│ ├─┬ expo-keep-awake@14.0.3
│ │ ├── expo@52.0.37 deduped
│ │ └── react@18.3.1 deduped
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ jest-expo@52.0.5
│ ├── expo@52.0.37 deduped
│ ├── react-native@0.76.7 deduped
│ └─┬ react-server-dom-webpack@19.0.0-rc-6230622a1a-20240610
│   ├─┬ react-dom@19.0.0-rc-6230622a1a-20240610
│   │ └── react@18.3.1 deduped invalid: "19.0.0-rc-6230622a1a-20240610" from node_modules/react-server-dom-w
ebpack, "19.0.0-rc-6230622a1a-20240610" from node_modules/react-dom
│   └── react@18.3.1 deduped invalid: "19.0.0-rc-6230622a1a-20240610" from node_modules/react-server-dom-web
pack
├─┬ react-native-gesture-handler@2.20.2
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ react-native-image-picker@8.2.0
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ react-native-reanimated@3.16.7
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ react-native-safe-area-context@4.12.0
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ react-native-screens@4.4.0
│ ├─┬ react-freeze@1.0.4
│ │ └── react@18.3.1 deduped invalid: "19.0.0-rc-6230622a1a-20240610" from node_modules/react-server-dom-web
pack
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ react-native-text-recognition@1.0.2
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ react-native-vision-camera@4.6.4
│ ├── react-native@0.76.7 deduped
│ └── react@18.3.1 deduped
├─┬ react-native@0.76.7
│ ├─┬ @react-native/virtualized-lists@0.76.7
│ │ ├── react-native@0.76.7 deduped
│ │ └── react@18.3.1 deduped invalid: "19.0.0-rc-6230622a1a-20240610" from node_modules/react-server-dom-web
pack
│ └── react@18.3.1 deduped
├─┬ react-redux@9.2.0
│ ├── react@18.3.1 deduped
│ └─┬ use-sync-external-store@1.4.0
│   └── react@18.3.1 deduped invalid: "19.0.0-rc-6230622a1a-20240610" from node_modules/react-server-dom-web
pack
├─┬ react-test-renderer@18.3.1
│ ├─┬ react-shallow-renderer@16.15.0
│ │ └── react@18.3.1 deduped invalid: "19.0.0-rc-6230622a1a-20240610" from node_modules/react-server-dom-web
pack
│ └── react@18.3.1 deduped
└── react@18.3.1


npm ERR! A complete log of this run can be found in: /Users/fpalma/.npm/_logs/2025-03-04T19_06_25_508Z-debug
-0.log
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_










Parece que hay conflictos en las versiones de dependencias. Vamos a actualizar el archivo package.json con versiones específicas para resolverlos:

---

_****_

Read file: bluelectric/package.json

---

_****_









Vamos a corregir el archivo Index.js para asegurarnos de que la importación de regenerator-runtime esté correctamente configurada:

---

_****_

```diff
+ // Importar regenerator-runtime primero para evitar problemas con async/await
  import 'regenerator-runtime/runtime';
  import { registerRootComponent } from 'expo';
```

---

_****_










Ahora veremos si hay algún problema con el archivo App.tsx que es el punto de entrada principal de la aplicación:

---

_****_

Read file: bluelectric/App.tsx

---

_****_











Vamos a revisar los archivos principales que se han modificado más recientemente y que podrían contener el error. Comencemos con AddReceiptScreen.tsx:

---

_****_

Read file: bluelectric/src/screens/receipts/AddReceiptScreen.tsx

---

_****_













Vamos a revisar el archivo receiptsSlice.ts que también se modificó recientemente buscando secciones específicas:

---

_****_

```bash
cd bluelectric && grep -A 10 -B 10 "export const" src/store/slices/receiptsSlice.ts | tail -20
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % cd bluelectric && grep -A 10 -B 10 "export const" src/store/slice
s/receiptsSlice.ts | tail -20              cd bluelectric && grep -A 10 -B 10 "export const" src/store/slice
s/receiptsSlice.ts | tail -20
grep: src/store/slices/receiptsSlice.ts: No such file or directory
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_













Parece que hay un problema con la ruta. Vamos a corregirlo y buscar nuevamente:

---

_****_

```bash
cd .. && grep -A 10 -B 10 "export const" bluelectric/src/store/slices/receiptsSlice.ts | tail -20
```

```
<lectric/src/store/slices/receiptsSlice.ts | tail -20
grep: bluelectric/src/store/slices/receiptsSlice.ts: No such file or directory
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_
















Vamos a verificar la estructura de directorios para asegurarnos de que estamos navegando a la ubicación correcta:

---

_****_

```bash
find bluelectric/src -type d -name slices | xargs ls -la
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % 

```

---

_****_

















Vamos a intentar encontrar los archivos de slices con un enfoque diferente:

---

_****_

```bash
find bluelectric -name "*.ts" | grep -i slice
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % 

```

---

_****_

















Vamos a ver qué archivos hay en el directorio src/store:

---

_****_

```bash
find bluelectric -path "*/src/store*" -type f | sort
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % 

```

---

_****_


















Parece que hay un problema con la estructura de carpetas. Vamos a revisar nuevamente la estructura del proyecto:

---

_****_

```bash
find . -type d | grep bluelectric | sort
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % find . -type d | grep bluelectric | sort
./bluelectric
./bluelectric-receipt
./bluelectric-receipt/memorybank
./bluelectric-receipt/src
./bluelectric-receipt/src/api
./bluelectric-receipt/src/assets
./bluelectric-receipt/src/components
./bluelectric-receipt/src/constants
./bluelectric-receipt/src/hooks
./bluelectric-receipt/src/navigation
./bluelectric-receipt/src/screens
./bluelectric-receipt/src/screens/auth
./bluelectric-receipt/src/screens/main
./bluelectric-receipt/src/screens/projects
./bluelectric-receipt/src/screens/receipts
./bluelectric-receipt/src/store
./bluelectric-receipt/src/types
./bluelectric-receipt/src/utils
./bluelectric-receipt/src/utils/ocr
./bluelectric/src
./bluelectric/src/__mocks__
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_















Ahora vemos que hay dos directorios diferentes: ./bluelectric y ./bluelectric-receipt. Vamos a ver si podemos encontrar los slices en el directorio correcto:

---

_****_

```bash
find ./bluelectric-receipt/src/store -type f | xargs cat | grep -n "export.*within"
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % 

```

---

_****_

















Vamos a revisar qué archivos hay en el directorio store:

---

_****_

```bash
find ./bluelectric-receipt/src/store -type f
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % 

```

---

_****_
















Vamos a intentarlo nuevamente, pero esta vez buscando archivos en toda la estructura:

---

_****_

```bash
find . -name "*Slice.ts" | sort
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % find . -name "*Slice.ts" | sort
./node_modules/@reduxjs/toolkit/src/createSlice.ts
./node_modules/@reduxjs/toolkit/src/query/core/buildSlice.ts
./src/store/slices/authSlice.ts
./src/store/slices/projectsSlice.ts
./src/store/slices/receiptsSlice.ts
./src/store/slices/uiSlice.ts
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_
















Ahora que hemos encontrado la ubicación correcta de los archivos slice, vamos a examinar el contenido de receiptsSlice.ts para buscar posibles problemas:

---

_****_

Could not find file 'src/store/slices/receiptsSlice.ts'. Did you mean one of:
- bluelectric/src/store/slices/receiptsSlice.ts

---

_****_
















Vamos a intentar con la ruta correcta:

---

_****_

Could not find file './src/store/slices/receiptsSlice.ts' in the workspace.

---

_****_


















Vamos a usar un comando para encontrar y examinar el archivo:

---

_****_

```bash
find . -name "receiptsSlice.ts" -exec cat {} \; | head -50
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % find . -name "receiptsSlice.ts" -exec cat {} \; | head -50
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../api/supabase';
import { Receipt, ReceiptStatus } from '../../types';

interface ReceiptsState {
  receipts: Receipt[];
  pendingReceipts: Receipt[]; // Recibos guardados localmente para sincronizar
  currentReceipt: Receipt | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReceiptsState = {
  receipts: [],
  pendingReceipts: [],
  currentReceipt: null,
  loading: false,
  error: null,
};

// Thunks para operaciones asíncronas
export const fetchReceipts = createAsyncThunk(
  'receipts/fetchReceipts',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return data.map((receipt: any) => ({
        id: receipt.id,
        userId: receipt.user_id,
        projectId: receipt.project_id,
        categoryId: receipt.category_id,
        amount: receipt.amount,
        date: receipt.date,
        merchant: receipt.merchant,
        description: receipt.description,
        imageUrl: receipt.image_url,
        status: receipt.status,
        rejectionReason: receipt.rejection_reason,
        createdAt: receipt.created_at,
        updatedAt: receipt.updated_at,
      })) as Receipt[];
    } catch (error: any) {
(base) fpalma@CREMJTX9MPN63F bluelectric %
```

---

_****_

















Vamos a buscar instancias donde podría haber un problema con las declaraciones de exportación:

---

_****_

```bash
grep -r --include="*.ts" --include="*.js" --include="*.tsx" "export.*function.*{" .
```

```
(base) fpalma@CREMJTX9MPN63F bluelectric % 
=126515,Mb=218,hC="pattern_identifier",vZ=67643,gd="export_source",vY=216,yn=64279,Lc="Out_of_memory",Bt=113
788,Nf="comments",vX=126624,Ke="win32",gc="object_key_bigint_literal",Kd=185,Ne=283,q2=123214,ja="constructo
r",ym=69955,gb="import_declaration",Ei=68437,Ej="Failure",p5="Unix.Unix_error",vW=64255,vV=42539,yl=110579,e
_="export_default_declaration",dY="jsx_attribute_name",q1=11727,vU=43002,oj=126500,hB="component_param_patte
rn",Kc="collect_comments_opt",e9="match_unary_pattern",dX="keyof_type",Ma="Invalid binary/octal ",Lb="range"
,pd=170,h7="false",vT=43798,Kb=", characters ",hA="object_type_property_getter",Bs=65547,L$=299,vS=126467,Br
=65007,Bq=42237,yk=8318,Bp=71215,dW="object_property_type",e8="type_alias",Eh=67742,hz="function_body",La=30
4,Bo=68111,pc=120745,Bn=71959,p4=43880,K$="Match_failure",vR=280,dV="type_cast",dU=109,hZ="void",Eg="generat
or",Bl=125124,Bm=101589,p3=94179,L_=">>>",pb=70404,e7="optional_indexed_access_type",a_="argument",ga="objec
t_property",hy="object_type_property",Ef=67004,vQ=42783,Bk=68850,L9="@",yi=43741,yj=43487,pa="object",L8="en
d",oi=126571,Bj=71956,L7=208,Ed=126566,Ee=67702,Nd="EEXIST",e6="this_expression",L6=203,Bi=11507,vP=113807,o
h=119893,yh=42735,lR="rest",e5="null_literal",lZ="protected",Bh=43615,aZ=8231,yg=68149,vO=73727,Ec=72348,vN=
92995,jj=224,vM=11686,yf=43013,e4="assignment_pattern",Bg=12329,f$="function_type",kv=192,e3="jsx_element_na
me",Eb=70018,hx="catch_clause_pattern",p2=126540,f_="template_literal",vL=120654,D$=68497,Ea=67679,hw="reado
nly_type",vJ=68735,vK="<",o$=": No such file or directory",D_=66915,Nc="!",dT="object_type",ye=43712,q0=6429
7,yd=183969,Bf=43503,D9=67591,jz=65278,yc=67669,hv="for_of_assignment_pattern",lz="`",D8=11502,hu="catch_bod
y",vI=42191,iB=-744106340,og=182,jy=":",Ka="a string",Be=65663,D7=66978,D6=71947,qZ=43519,yb=71086,vH=125258
,D5=12538,e2="expression_or_spread",K_="Printexc.handle_uncaught_exception",p1=69956,of=120122,o_=247,J$=231
,vG=" : flags Open_rdonly and Open_wronly are not compatible",ht="statement_fork_point",K9=710,J_=-692038429
,bL="static",ya=55203,vE=64324,vF=64111,J9="!==",D4=120132,vD=124903,ly="class",K8=222,f9="pattern_number_li
teral",hY="kind",vC=71903,dS="variable_declarator",dR="typeof_expression",x$=126627,Bd=70084,Nb=228,qY=70480
,e1="class_private_field",Bc=239,oe=120713,cz=0xffff,e0="private_name",Bb=43137,f8="remote_identifier",vB=70
161,eZ="label_identifier",Ba="src/parser/statement_parser.ml",vA=8335,A$=19903,D3=64310,jo="_",dQ="for_init_
declaration",K7="infer",D1=64466,D2=43018,J8="tokens",A_=92735,D0=66954,vz=65473,DZ=70285,f7="sequence",DY="
compare: functional value",vy=69890,lY=1000,vx=65487,DX=42653,J7="\\\\",L5="%=",hs="match_member_pattern_bas
e",A9=72367,dP="function_rest_param",J6="/static/",vw=124911,A8=65276,p0=126558,vv=11498,J5=137,f6="export_d
efault_declaration_decl",vu="cases",od=126602,dO="jsx_child",bK="continue",vt=42962,Na="importKind",ai=122,k
u="Literal",hr="pattern_object_property_identifier_key",x_=42508,iF="in",A7=55238,x9=67071,A6=70831,A4=72161
,A5=67462,J4="<<=",vs=43009,vr=66383,oc=67827,A3=72202,x8=69839,DW=66775,J3="-=",ji=8202,DV=70105,A2=120538,
dN="for_in_left_declaration",A1="rendersType",pZ=126563,DU=70708,ob=126523,J2=166,hq="match_",J1=202,A0=1109
51,h2="component",o9=126552,DT=66977,M$=213,hp="enum_member_identifier",L4=210,ho="enum_bigint_body",K6=">="
,AY=126495,AZ="specifiers",K5=-88,AX="=",x7=65338,lx="members",K4=309,vp=123535,vq=43702,x6=72767,jx="get",A
W=126633,oa=126536,AU=94098,AV="types",K3=273,DS=113663,K2="Internal Error: Found private field in object pr
ops",eY="jsx_element",AT=70366,x5=110959,o8=120655,M9=305,M_="trailingComments",iz=24029,DR=-100,bo="yield",
dM="binding_pattern",hn="typeof_identifier",J0="ENOTEMPTY",x4=-104,L3=295,o7=126468,AS=1255,vo=120628,eX="pa
ttern_object_property_string_literal_key",DQ=8521,JY="leadingComments",JZ=8204,iA="@ ",x3=70319,hX="left",L2
=188,pY="case",AR=19967,pX=42622,x2=43492,DP=113770,AP=42774,AQ=183,o6=8468,f5="class_implements",n$=126579,
kb="string",K1=211,aR=-48,DO=69926,DN=123213,dL="if_consequent_statement",AO=124927,kt="number",vn=126546,x1
=68119,AN=70726,o5=70750,DM=65489,M8="SpreadElement",L1="callee",JX=193,AM=70492,AL=71934,JW=164,AK=110580,D
L=12320,pW="any",bv="/",hm="type_guard",ax="body",L0=178,bQ="pattern",K0="comment_bounds",f4="binding_type_i
dentifier",vm=187,eW="pattern_array_rest_element_pattern",n_="@])",DJ=12543,DK=11623,M7="start",vl=67871,bu=
"interface",AJ=8449,vk=67637,vj=42961,qX=120085,DI=126463,JV="alternate",LZ=-1053382366,x0=70143,JU="--",AI=
68031,hl="jsx_expression",eV="type_identifier_reference",pV=11647,DH="proto",cf="identifier",AH=43696,ce="ra
w",DG=126529,AG=11564,qW=126557,DF=64911,o4=67592,xZ=43493,DE=215,DD=110588,lJ=461894857,vi=92927,AF=67861,D
B=119980,DC=43042,AE=66965,xY=67391,kl="computed",LY="unreachable jsxtext",Dz=71167,DA=42559,vh=72966,JT=180
,xX=197,n9=64319,JR=169,JS="*",jw=129,vg=66335,lw="meta",AD=43388,o3=94178,b1="optional",pU="unknown",Dy=120
121,Dx=123180,o2=8469,AC=68220,LX="|",Dw=43187,AB=94207,vf=124895,qV=120513,ve=42527,jh=8286,Dv=94177,lI="va
r",f3="component_type_param",Du=66421,xW=92991,AA=68415,dK="comment",hk="match_pattern_array_element",jg=244
,pT="^",xV=173791,KZ=136,Az=42890,vd="ENOTDIR",Dt="??",Ax=43711,Ay=66303,Ds=113800,vc=42239,Dr=12703,hi="var
iance_opt",hj="+",JQ=">>>=",n8="mixed",xU=65613,Aw=73029,xT=68191,KY="*=",pS=8487,vb=8477,f2="toplevel_state
ment_list",n6="never",n7="do",iH=125,va=72249,JP="Pervasives.do_at_exit",JO="visit_trailing_comment",dJ="jsx
_closing_element",eU="jsx_namespaced_name",u$=124908,Av=126651,f1="component_declaration",Au=0xf,f0="interfa
ce_type",eT="function_type_return_annotation",xS=64109,o1=65595,qU=126560,u_=110927,pQ=65598,pR=8488,h6="`."
,M6=175,pP="package",qT="else",o0=120771,u9=68023,KX="fd ",jn=8238,n4=888960333,n5=119965,u8=42655,hh="match
_object_pattern",u7=11710,Dq=119993,hg="boolean_literal",dI="statement_list",fZ="function_param",dH="match_a
s_pattern",eS="pattern_object_property_bigint_literal_key",pO=69959,u6=120485,JN=0xf0,u5=191456,fY="declare_
enum",pN=120597,pM=70281,fW="type_annotation",fX="spread_element",n3=126544,xR=120069,iE="key",xQ=43583,u3="
out",u4="\n",KW="**=",eR="pattern_object_property_pattern",xP="e",u2=72712,M5="Internal Error: Found object
private prop",At="ENOENT",u1=-42,eQ="jsx_opening_attribute",As=67646,eP="component_type",xO=64296,xN=43887,L
W="Division_by_zero",LV="EnumDefaultedMember",hf="typeof_member_identifier",u0=43792,dG="match_member_patter
n_property",fV="declare_export_declaration_decl",Dp=93026,fU="type_annotation_hint",uZ=42887,Ar=43881,Aq=437
61,pL=8526,ka=119,Do=43866,xL=72847,xM=8348,bt=101,Ap=94026,pK=72272,JM="src/parser/flow_lexer.ml",Ao=120744
,jf=8191,kk="implies",pJ=255,qS=11711,he="match_unary_pattern_argument",uY=71235,LU=288,pI=68116,JL=261,an=1
00,fT="match_expression",hd="enum_body",pH=1114111,hc="assignment",uX=71955,n2=43260,eO="pattern_array_e",Dn
=126583,JK="prefix",fS="class_body",pG="shorthand",qR=171,uW=66256,oZ=-97,LT=" =",Dl=94032,Dm=42606,fR="matc
h_case",xK=71839,n1=120134,xJ=55291,An=92862,xI=43019,Dk=126543,ke="function",Am=111355,Dj=11389,uV=70753,uU
=43249,Di=64829,n0="line",fQ="function_declaration",qQ="undefined",M4="([^/]+)",xH=110947,Dh=70002,KV="Cygwi
n",dF="as_expression",Dg=12591,qP=64285,Df=2048,uT=73112,oY=126589,M3=225,oX=43259,xG=72817,oW=64318,M2=172,
LS=209,ha="match_binding_pattern",hb=" ",eN="import_source",lH="delete",LR="Enum `",qO=126553,Al=67001,jm="d
efault",xE=11630,xF=206,eM="enum_bigint_member",Ak=67504,qN=67593,xD=113791,uS=69572,g$="typeof_type",M0=212
,M1="%i",dE="function_this_param",xC=72329,iD="0x",jv=8239,De=75075,MZ=277,LQ=0xdfff,eL="pattern_bigint_lite
ral",Dd=12341,MY=201,i$="hook",JJ=": closedir failed",Dc=42959,nZ=119970,xB=43560,LP="||=",g_="member_privat
e_name",uR=120570,eK="object_key_identifier",nY=223,KU="Not_found",MX=230,eJ="jsx_element_name_member_expres
sion",g9="string_literal",Aj=120596,Db=43807,Ai=69687,uQ=63743,qM=72192,dD="member_property",xA=43262,g8="cl
ass_declaration",JI="renders*",KT="%Li",xz=126578,fP="jsx_attribute",ks=254,bE="empty",lX="label",g7="object
_internal_slot_property_type",oV=120133,uP=43359,bJ="predicate",LO="??=",C$=43697,Da=-43,fO="default_opt",MW
="the start of a statement",KS=312,uO=67826,fM="object_",fN="class_element",qL=11631,oU=70855,eI="opaque_typ
e",fL="number_literal",MV=", ",oT=8319,qK=120004,oS=133,fK="type_params",dC="pattern_object_rest_property",b
k="import",Ah=72000,C9=67413,C_=12343,Ag=70080,g6="intersection_type",aY=-36,uN=70005,qJ="properties",xx=116
79,xy=8483,Af=110587,KR=43520,eH="computed_key",uM=207,g5="class_identifier",uL="Invalid number ",dB="functi
on_param_pattern",je=12288,Ae=113817,xw=70730,Ad=178207,pF=71236,MU=167,dA="object_indexer_property_type",uK
=64286,LM="TypeAnnotation",LN=220,fJ="type_identifier",dy="spread_property",dz="jsx_attribute_value_expressi
on",Ac=126519,qI=70108,oR=126,nX=42999,iG="prototype",C8=" : flags Open_text and Open_binary are not compati
ble",JH="**",oQ=43823,C7=": Not a directory",eG="render_type",qH=72349,kj="test",C6=43776,uI=92879,uJ=11263,
KQ=241,uH=93052,eF="nullable_type",Ab=43704,C5=64321,KP="Property",Aa=72191,MT=165,lQ="instanceof",C4=69247,
KO=302,bU="name",oP=126634,z$=8516,pE="typeArguments",z_=71127,g4="jsx_spread_attribute",xv=66559,C3=44031,z
9=43645,aO=8233,xt=71494,xu="opaque",nW=72967,xs=70106,eE="logical",JG="@[%s =@ ",lP="0o",oO=126554,uG=71351
,qG=8484,xr=72242,nV=120687,kd=252,xq=183983,lW="%S",dx="function_this_param_type",qF="decorators",uF=43255,
dw="catch_clause",bO="-",z8=67711,MS=": file descriptor already closed",oN=64311,qE=120539,uE="arguments",oM
=73062,z7=173823,uD=42124,C2=72095,uB=125259,uC=42969,nU=70280,LL=12520,uA=69749,xp=70066,fI="binary",fH="fo
r_in_statement",z6=43010,JF="^=",xo=126570,eD="for_statement",oL=126584,eC="function_return_annotation",C1=7
2144,z5=8505,eB="class_expression",uz=120076,z4=69807,z3=40981,CZ=-24976191,C0=72768,xn=126550,qD='"',fG="ca
ll_type_arg",LK="f",i_="this",nT=126628,JE="===",KN=0xdc00,g3="declare_module_exports",CY=120512,b2=105,ux=1
19974,uy=71450,uw=71942,LJ=195,pD=120629,JD="/=",KM=">>",eA="declare_interface",LI=4096,dv="pattern_array_re
st_element",xm=71338,oK=126520,fF="as_const_expression",MR="Popping lex mode from empty stack",MQ="renders?"
,xl=68405,ez="member",g2="class_extends",jd=12287,pC=126590,uv=66377,iy="async",g1="pattern_array_element",k
i=240,z2=69864,jl="readonly",z1=70460,ut=120779,uu=66378,du="new_",oJ=126551,g0="pattern_object_rest_propert
y_pattern",ey="for_statement_init",us=43595,MP=293,pB=68296,xj=120712,xk=64217,z0=69295,JC="||",zZ=";",ur=70
461,xi=66939,MO="collect_comments",CX=279,dt="generic_type",zY=68295,zX=44002,pA=72162,fE="object_call_prope
rty_type",qC=8305,oI=119995,pz="with",gZ="class_property",KL="qualification",ew="jsx_attribute_name_namespac
ed",ex="if_statement",ds="typeof_qualified_identifier",MN=238,xh=65615,KK=176,aP="expression",qB=126559,fD="
jsx_attribute_value",gX="<2>",gY="component_param",qA="Map.bal",py=132,CW=70412,xg=70440,KJ="<<",px="finally
",KI="v",fC="syntax_opt",dr="meta_property",zW=12447,xf=67514,JB=260,pw=12448,dq="object_mapped_type_propert
y",jc="operator",KH="closedir",fB="unary_expression",CU=126588,CV=70851,fA="export_batch_specifier",kr="rend
ers",KG=226,zV=73111,xe=221,e="",xb=66927,xc=64967,xd="elements",xa=67640,zU=43754,gW="declare_export_declar
ation",w_=-26065557,w$=65855,lG="boolean",h5="typeof",uq=124902,LH=139,CT=65629,MM=0xe0,CS=43123,nS=70449,zT
=12735,aH=107,qz=11719,ML="!=",dp="call_type_args",kq="asserts",ix=-46,zS="namespace",dm="match_pattern",dn=
"for_of_statement_lhs",oH=126504,CR=69505,pv="for",up=72703,pt=120127,pu=43471,CQ=93047,KF="Undefined_recurs
ive_module",KE=2147483647,gV="template_literal_element",JA="Unexpected ",zQ=101631,zR=65497,ps=68120,fz="imp
ort_default_specifier",cG="array",LG="expressions",CP=110930,KD=204,gT="while_",gU="function_rest_param_type
",iC=0x3f,CO=77808,MK="Unexpected token `",V=114,fy="pattern_object_p",w9=65140,uo=123190,dl="pattern_object
_property_number_literal_key",lF="enum",fx="conditional_type",bn=113,dk="array_type",KC="minus",un=43790,dj=
"do_while",w8=11567,CN=11694,lE=256,CM=119976,gS="component_body",bj=111,zP=177976,LF=-56,nR=67644,w7=73439,
lO=951901561,LD="?",LE=")",nQ=43867,oG=65575,CL=69445,MJ="FunctionTypeParam",qy=119996,um=65019,di="conditio
nal",zO=11505,Jz=135,w6=71295,zN=12799,CK=67382,ev="type_guard_annotation",dh="object_key_computed",cy=123,g
R="pattern_object_property_key",zM=119892,w5=67505,zL=66962,dg="with_",ul=43273,df="interface_declaration",n
P="bool",zK=71945,CJ="declaration",CI=11519,lV=">",zJ=66771,oF="}",KB=8472,uk=43014,fw="declare_function",aa
=127,CH="RestElement",zI=190,uj=8467,Kz="module",oE=126522,KA="Sys_blocked_io",gQ="jsx_opening_element",fv="
object_key_number_literal",MI="|=",Ky="mixins",w4=205,LC=217,qx="if",MH="+=",de="match_object_pattern_proper
ty_key",et="match_rest_pattern",eu="export_named_declaration_specifier",pq="try",pr="_bigarr02",CF=70479,cF=
"right",CG=245,zH=11718,gP="tuple_labeled_element",LB="TypeParameterInstantiation",CE="mkdir",CD=71999,zG=87
0530776,LA="@[",Kx=-908856609,Lz=331416730,zF=11670,CC=66735,ui=43709,qw=43642,uh=67002,zE=69375,fu="functio
n_body_any",CB=119807,MG="Assert_failure",es="function_identifier",CA=65479,lv=131,ju="new",gO="for_of_left_
declaration",ug=120084,w3=100343,Cz=73030,pp=70452,Kw=134,uf=253,Cy=42954,MF=227,gN="jsx_member_expression_o
bject",er="class_property_value",w2=120144,Cx=66994,j$="set",Cw=126498,gM="tuple_element",dd="arg_list",zD=6
5481,w1=8511,ue=42964,Cv=11492,kc=-25,qv=126555,ud=71039,Cu="exportKind",dc="program",zC=70187,Ly=173,cd="as
",kh=124,Lx="visit_leading_comment",uc=110575,eq="class_",Ct=72440,Cs=67897,ME=235,w0=8543,Kv=141,eo=120,ep=
"match_object_pattern_property",lu=1024,wZ=101640,Ku=1027,MD=236,j_=246,Kt="(",ub=66511,db="regexp_literal",
zB=65574,zA=43513,ua=43695,Jy="&&",nO=11558,wY=66503,Cr=93071,da="pattern_expression",Cq=65381,qu=126538,Cp=
12292,gL="import_namespace_specifier",Co=67583,t$=120137,wX=69622,Cn=120770,Cm=71131,jb=8287,zy=110590,zz=65
135,wW="Fatal error: exception ",lU=118,Cl=181,qt=11687,a0="camlinternalFormat.ml",Cj=72959,Ck=249,en="union
_type",Ks=8206,zx=73064,Ci=70271,wV=92728,nN=65344,oD=11695,gK="class_decorator",MC="the end of an expressio
n statement (`;`)",t_=177983,zw=8457,Lw=931,Ch=66499,t9=94175,Jx="#",zv="Identifier",gJ="for_in_statement_lh
s",c$="pattern_string_literal",po=70302,qs=126496,zu=66461,Cg=82943,nM=8450,t8=72271,Ce=70853,Cf="of",MB="St
ack_overflow",ls="hasUnknownMembers",lt="a",MA=153,em="variable_declarator_pattern",zt=73061,t7=77711,oC=643
17,zs=73097,gI="enum_declaration",zr=66966,qr=189,wU=119964,ft="type_param",cv=782176664,oB=65535,Lv=-10,zq=
64433,oA=43815,nK=94031,nL=73065,wT=69958,qq="property",c_="jsx_children",el="member_property_identifier",t6
=42537,iw="const",zp=70278,ek="enum_string_member",lN="local",fs="jsx_element_name_identifier",t5=68223,oz="
\x01\x02",wS=119967,pn=119994,t4=66993,ej="jsx_member_expression_identifier",pm="explicitType",wR=67589,Cd=6
5597,t3="exported",zo=94111,zn=113775,ei="object_spread_property_type",wQ=64847,gH="component_identifier",fr
="class_implements_interface",Mz=162,Jw=243,t2=12783,Jv="Fatal error: exception %s\n",oy=120093,lr="column",
eh="component_rest_param",tZ=70451,t0=70312,t1=69967,qp=70279,wP=66463,tY=92975,nJ=70286,c8="pattern_object_
property_computed_key",c9="object_key_string_literal",tX="jsError",fq="type_args",tW=8304,Lu="==",jt=115,gG=
"declare_component",zm=120092,Cc=43638,tV=66811,wO=43334,wN=66863,tU=77823,Lt=143,gF="optional_call",zl=1265
62,pl=70162,bT=104,zk=66963,js="await",nI=70107,bm="0",wL=72250,wM=8507,zj=100351,qo="AssignmentPattern",eg=
"type",Ls="%u",ef="function_expression_or_method",zi=43470,My=242,Ju="camlinternalMod.ml",ee="match_or_patte
rn",zh=72750,Cb=69414,tT=65370,c7="syntax",Lr=0x7ff0,Ca=42963,Mx="End_of_file",zg=12294,B$=8471,Jt="elementT
ype",B_=43782,Mw="++",wK=43641,B9=71944,wJ=126601,zf=78894,B8=-45,jr="null",ze=177,Kr="satisfies",B7=131071,
c6="import_specifier",gE="class_method",ed="type_",B6=126514,zd=8454,Kq="inexact",tS=67807,tR=8525,tQ=65470,
B5=71352,fp="tuple_spread_element",Js=219,zc="abstract",wI=73458,bN="return",lT=65536,nH=126548,ec="array_el
ement",zb=-253313196,nG=186,ox="catch",eb="infer_type",B4=12295,Mv="Invalid legacy octal ",tO=69762,tP=43311
,za=65437,c5="variable_declaration",Jr=-696510241,gD="function_params",y$=64316,Mu=311,ow=11565,Mt="infinity
",wH="@]",B3=65908,gC="extends",tM=66204,tN=43784,y_=11742,qn=126503,bM="debugger",y9=70457,h1=-86,lM=912068
366,B2=68786,ql="keyof",qm=69415,wG=12686,cD=127343600,fo="declare_type_alias",Jq="the",Kp=233,ea="jsx_eleme
nt_name_namespaced",wF=72283,Ms=161,d$="function_param_type",cg=0x80,y8=-673950933,pk=126591,Mr="Sys_error",
y7=74649,tL=74862,lD="is",tK=43738,B1=68479,Lq=196,qk=70854,gB="enum_boolean_member",pj=72163,y6=92783,Jp=28
1,gA="component_param_name",wE=68863,cx=0x8000,Mq=0x800,wD=64284,Ko="@{",y5="\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\
0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x01",pi=8455,gz="update_expression",y4=65500,lS="from",wC=68447,nF=12592
,wB=92766,Lp=">>=",a9=110,B0=66431,tJ=43586,d_="jsx_identifier",wA=" : file already exists",aA=128,BZ=71958,
tI=66717,c4="enum_boolean_body",y3=64262,b="id",c3="component_renders_annotation",BY=42888,tH=8584,tG=73008,
c2="enum_symbol_body",d9="declare_namespace",ov=72713,y2=55215,c1="object_property_value_type",fn="for_in_as
signment_pattern",nE=8485,wz=43395,Mp=229,hW="true",y1=43743,fm="enum_number_member",Jo=234,y0=72969,Lo="exp
ected *",cC=102,Mo=200,lC="symbol",jq="source",gy="tparam_const_modifier",wy=43714,gx="jsx_fragment",fl="jsx
_attribute_name_identifier",lq="public",wx=43442,d8="pattern_object_property",BX=65786,tE=70783,tF=43713,ww=
72160,Ln="*-/",cZ="export_named_specifier",c0="arrow_function",wv=122623,qj=70006,Kn="${",yZ=43814,fk="gener
ic_qualified_identifier_type",Mn=199,d7="jsx_spread_child",qh=8489,qi=184,Jn=2047,wu=66955,d6="try_catch",yY
=70497,Mm=237,wt=67431,yX=125183,Jm=-602162310,cB="params",ws="consequent",yW=68029,yV=67829,BW=68095,gw="en
um_string_body",tC=93823,tD=68351,wr=65495,fj="declare_module",d5="match_as_pattern_target",d4="body_express
ion",yU=66175,qg=191,ou=70441,qe=65141,qf="&",gv="super_expression",ot=126564,tB=72105,yT="fs",bS="throw",tA
=68287,wq=67839,i9=116,wp=110882,BV=69404,tz=123197,i8=65279,j9="src/parser/type_parser.ml",BU=68115,Lm=159,
qd=126547,nD=126556,yS=73055,gu="member_property_expression",fi="enum_defaulted_member",yR=43071,BT=11726,gt
="component_type_rest_param",wo=68607,gs="object_key",Ll=160,bl="variance",BR=70655,BS=70414,kg="super",ty=1
23583,yQ=65594,lL="method",wn=73648,lB=121,BQ=93951,fh="pattern_array_element_pattern",wl=43764,wm=42993,os=
120145,yP=74879,Ml=168,or=8486,yO=72001,ff="tagged_template",fg="module_ref_literal",BP=65312,jk="implements
",tx=43700,wk=120003,Mk="Invalid_argument",gr=0xffffff,tw=83526,nC=69744,oq=12336,gq="switch_case",Km=-61,cY
="optional_member",tv=64274,qc=64322,nB=126530,wj=71998,ph=72970,BO=13311,wi=73647,yN=120074,kf="let",Mj="gl
obal",d2="expression_statement",d3="component_type_params",wh=512,yL=69634,yM=67461,BN=123627,tu=64913,Jl="c
hildren",Kk="PropertyDefinition",Kl=1026,Mi="%li",gp="declare_class",tt=43258,d1="indexed_access_type",yJ=12
4926,h0=112,yK="b",gn="predicate_expression",go="if_alternate_statement",lA="private",Lk=-594953737,ts=140,y
I="nan",wf=72103,op=11735,d0="statement",wg="rmdir",nA=66512,BM="match",Mh=198,yH=11734,gm="import_named_spe
cifier",tr=69599,yG=68799,BL=194559,cX="match_array_pattern",Mg=174,gk="function_",gl="bigint_literal",ah=24
8,nz=67638,qb=126539,yF=11557,Jk=214,we=5760,bR="break",cE="block",dZ="match_member_pattern",yE=123565,wd=66
815,ap="value",Jj=1039100673,yD=69746,BK=70448,wc=74751,gj="init",BJ=69551,qa=65548,gi="jsx_member_expressio
n",oo=68096,hV=108,pg=126521,BI=71487,gh="match_statement",tq=178205,tp=12548,Lj=" : is a directory",cw=".",
yC=12348,kp=-835925911,bi="typeParameters",BH=66855,aQ="typeAnnotation",jp="bigint",fe="jsx_attribute_value_
literal",BG=194,Mf="T_JSX_TEXT",to=68466,on=126537,Ji=67714067,tn=69487,ny="export",BF=43822,p$=126499,tm=55
242,cW="member_type_identifier",Kj=138,yB=71679,lK=130,BE=12438,wb=119969,p_=12539,yA=119972,Me=",",v$=71423
,wa="index out of bounds",cA=106,j8="%d",Ki="T_RENDERS_QUESTION",p9=120571,om="returnType",yz=69423,pf=12007
0,Li="%",ko=117,Md=179,tl="EBADF",yy=93759,p8=64325,gg="component_params",yx=66517,tk=67423,tj=605857695,v_=
43518,Lh=251,cV="for_of_statement",v9=71983,Kh="~",yw=12442,bP="switch",BD=66207,p7=126535,Jh="&&=",v8=69289
,yv=71723,gf="generic_identifier_type",yu=126619,fd="object_type_property_setter",BC=70418,Mc="<=",v7=125251
,BB=11702,fc="enum_number_body",kn=250,th=124910,ti=69297,yt=67455,ys=42511,cU="ts_satisfies",Lg=268,v6=6832
4,p6="an identifier",tg=126534,be=103,v5=120126,Kg=274,km=449540197,lp="declare",v4=68899,tf=126502,fb="func
tion_expression",Jg=142,BA=123135,te=67967,yr=120487,td=120686,cT="export_named_declaration",yq=66348,pe=119
981,yp=12352,ge="tuple_type",v3=68680,ol="target",fa="call";function
./node_modules/flow-parser/flow_parser.js:Og="Array.sub",Ot="first domain already spawned",Ru=[0,"camlintern
alOO.ml",CX,50],Rv=[0,Ju,72,5],Rw=[0,Ju,81,2],Rx="/tmp",Rz=cw,RE=[0,"src/wtf8.ml",65,9],RG=[0,"src/third-par
ty/sedlex/flow_sedlexing.ml",Ck,4],RF="Flow_sedlexing.MalFormed",RI=lG,RJ=kt,RK=kb,RL=lC,RM=jp,RN=[0,[12,40,
[18,[1,[0,[11,gX,0],gX]],[11,"File_key.LibFile",[17,[0,iA,1,0],0]]]],"(@[<2>File_key.LibFile@ "],RO=[0,[3,0,
0],lW],RP=[0,[17,0,[12,41,0]],n_],RQ=[0,[12,40,[18,[1,[0,[11,gX,0],gX]],[11,"File_key.SourceFile",[17,[0,iA,
1,0],0]]]],"(@[<2>File_key.SourceFile@ "],RR=[0,[3,0,0],lW],RS=[0,[17,0,[12,41,0]],n_],RT=[0,[12,40,[18,[1,[
0,[11,gX,0],gX]],[11,"File_key.JsonFile",[17,[0,iA,1,0],0]]]],"(@[<2>File_key.JsonFile@ "],RU=[0,[3,0,0],lW]
,RV=[0,[17,0,[12,41,0]],n_],RW=[0,[12,40,[18,[1,[0,[11,gX,0],gX]],[11,"File_key.ResourceFile",[17,[0,iA,1,0]
,0]]]],"(@[<2>File_key.ResourceFile@ "],RX=[0,[3,0,0],lW],RY=[0,[17,0,[12,41,0]],n_],Sd=[0,1],Sc=[0,0],Sb=[0
,1],Sa=[0,2],R$=[0,2],R_=[0,0],R9=[0,1],R8=[0,1],R7=[0,1],R6=[0,1],R5=[0,2],R4=[0,1],R3=[0,1],R2=[0,0,0],R1=
[0,0,0],RZ=[0,bo,dg,gT,hi,bl,em,dS,c5,gz,en,fB,g$,ds,hf,hn,dR,fK,ft,eV,fJ,ev,hm,dV,fq,fU,fW,e8,ed,ge,fp,gP,g
M,cU,d6,gy,f2,bS,e6,gV,f_,ff,fC,c7,gq,bP,gv,g9,dI,ht,d0,dy,fX,f7,bN,eG,f8,db,hw,dc,e0,gn,bJ,c$,g0,dC,eX,eR,d
l,gR,hr,c8,eS,d8,fy,f9,hC,da,eL,eW,dv,fh,g1,eO,bQ,cY,e7,gF,eI,fd,hA,hy,dT,ei,c1,dW,ga,dq,c9,fv,eK,dh,gc,gs,g
7,dA,fE,fM,fL,eF,e5,du,fg,dr,cW,el,gu,dD,g_,ez,he,e9,gh,et,hk,dm,ee,de,ep,hh,dG,hs,dZ,fT,fR,ha,d5,dH,cX,hq,e
E,e$,eZ,dX,d7,g4,gQ,eQ,eU,gN,ej,gi,d_,gx,hl,ea,eJ,fs,e3,eY,dJ,c_,dO,fe,dz,fD,ew,fl,dY,fP,g6,f0,df,bu,eb,d1,c
6,eN,gL,gm,fz,gb,bk,ex,dL,go,cf,dt,fk,gf,eT,f$,dx,dE,eC,gU,dP,gD,d$,dB,fZ,es,ef,fb,fQ,fu,hz,gk,ey,eD,dn,cV,g
O,hv,dQ,gJ,fH,dN,fn,d2,e2,aP,gd,cZ,eu,cT,f6,e_,fA,c2,ek,gw,fm,fc,hp,fi,gI,gB,c4,hd,eM,ho,bE,dj,fO,hD,fo,d9,g
3,fj,eA,fw,fV,gW,fY,gG,gp,bM,bK,fx,di,eH,gt,d3,f3,eP,eh,c3,gg,hB,gA,gY,gH,f1,gS,dK,er,gZ,e1,gE,fr,f5,g5,g2,e
B,fN,gK,g8,fS,eq,hx,dw,hu,dp,fG,fa,bR,hg,d4,cE,f4,dM,fI,gl,e4,hc,dF,fF,c0,dk,ec,cG,dd],R0=[0,d0,dz,d$,dt,eC,
fa,eF,dh,hl,f0,d4,fU,hy,bP,fd,cZ,hk,de,gK,cU,dq,dJ,du,eb,dO,c4,hp,dg,eL,eT,gy,eD,f9,gQ,d9,eh,gf,gB,cW,cf,hi,
gJ,c8,fw,dp,dB,hu,e3,c2,c$,dx,dn,gq,gs,dL,fR,dI,e9,eN,hd,g4,dr,g2,gZ,cY,dd,eR,dm,gY,hm,eK,dC,gi,fr,dT,bJ,ga,
gU,e7,el,ea,eY,fk,e$,di,e8,fm,hs,ep,d_,eZ,gD,dH,hr,dk,fj,e_,g_,hw,eO,ec,ho,fG,f7,bl,g0,fY,dR,f8,ex,he,fI,ey,
f2,fl,fN,fE,c7,bE,hv,fW,bo,dX,d6,gW,dl,g$,fh,gG,d5,dc,gl,fB,er,fV,fL,c5,dG,c_,dF,fp,g6,fi,fn,hA,eu,d7,dv,fH,
ft,ge,gH,em,gP,dy,fK,g9,en,f5,d1,cV,e1,eE,dP,f1,gz,dK,fM,eU,c3,e4,ez,eq,eB,hB,dZ,eW,gN,gA,dD,bk,bN,hn,eV,gv,
da,bS,bM,e5,go,eI,e2,fe,bQ,hg,fb,gI,c6,gE,gd,fZ,fD,dE,hf,fc,gn,hz,fz,ee,gw,f6,d3,dA,fX,gc,gL,c1,d8,ed,fv,eX,
dW,fJ,g3,hh,hx,eA,f4,dY,fC,eM,gM,f$,e0,gb,c9,fS,g7,fs,g5,ha,df,dj,fq,cG,dS,fO,dw,dV,hD,eJ,ew,eH,eQ,fy,fg,fP,
dN,fT,ej,ev,f_,hc,et,f3,hC,fF,dM,aP,g1,gS,d2,gh,fQ,fu,ht,bK,es,gg,gR,fA,fo,gV,ff,gk,cT,ds,gO,cX,gF,cE,gm,g8,
gx,ei,ef,gp,eG,ek,bR,c0,bu,hq,fx,gT,eP,db,dQ,gt,eS,e6,gu],Sw=Lu,Sx=ML,Sy=JE,Sz=J9,SA=vK,SB=Mc,SC=lV,SD=K6,SE
=KJ,SF=KM,SG=L_,SH=hj,SI=bO,SJ=JS,SK=JH,SL=bv,SM=Li,SN=LX,SO=pT,SP=qf,SQ=iF,SR=lQ,Sh=MH,Si=J3,Sj=KY,Sk=KW,Sl
=JD,Sm=L5,Sn=J4,So=Lp,Sp=JQ,Sq=MI,Sr=JF,Ss=Lf,St=LO,Su=Jh,Sv=LP,Se=lI,Sf=kf,Sg=iw,SS=[0,[18,[1,[0,[11,gX,0],
gX]],[11,"{ ",0]],"@[<2>{ "],ST="Loc.line",SU=[0,[18,[1,[0,0,e]],[2,0,[11,LT,[17,[0,iA,1,0],0]]]],JG],SV=[0,
[4,0,0,0,0],j8],SW=[0,[17,0,0],wH],SX=[0,[12,59,[17,[0,iA,1,0],0]],";@ "],SY=lr,SZ=[0,[18,[1,[0,0,e]],[2,0,[
11,LT,[17,[0,iA,1,0],0]]]],JG],S0=[0,[4,0,0,0,0],j8],S1=[0,[17,0,0],wH],S2=[0,[17,[0,iA,1,0],[12,iH,[17,0,0]
]],"@ }@]"],S3=e,S8="Object literal may not have data and accessor property with the same name",S9="Object l
iteral may not have multiple get/set accessors with the same name",S_="Unexpected token <. Remember, adjacen
t JSX elements must be wrapped in an enclosing parent tag",S$="`let [` is ambiguous in this position because
 it is either a `let` binding pattern, or a member expression.",Ta="Async functions can only be declared at
top level or immediately within another function.",Tb="`await` is an invalid identifier in async functions",
Tc="`await` is not allowed in async function parameters.",Td="Computed properties must have a value.",Te="Co
nstructor can't be an accessor.",Tf="Constructor can't be an async function.",Tg="Constructor can't be a gen
erator.",Th="It is sufficient for your declare function to just have a Promise return type.",Ti="async is an
 implementation detail and isn't necessary for your declare function statement. ",Tj="`declare` modifier can
 only appear on class fields.",Tk="Unexpected token `=`. Initializers are not allowed in a `declare`.",Tl="U
nexpected token `=`. Initializers are not allowed in a `declare opaque type`.",Tm="Classes may only have one
 constructor",Tn="Rest element must be final element of an array pattern",To="Cannot export an enum with `ex
port type`, try `export enum E {}` or `module.exports = E;` instead.",Tp="Enum members are separated with `,
`. Replace `;` with `,`.",Tq="`const` enums are not supported. Flow Enums are designed to allow for inlining
, however the inlining itself needs to be part of the build system (whatever you use) rather than Flow itsel
f.",Tr="Expected an object pattern, array pattern, or an identifier but found an expression instead",Ts="Mis
sing comma between export specifiers",Tt="Generators can only be declared at top level or immediately within
 another function.",Tu="Getter should have zero parameters",Tv="A getter cannot have a `this` parameter.",Tw
="Illegal break statement",Tx="Illegal continue statement",Ty="Illegal return statement",Tz="Illegal Unicode
 escape",TA="Missing comma between import specifiers",TB="It cannot be used with `import type` or `import ty
peof` statements",TC="The `type` and `typeof` keywords on named imports can only be used on regular `import`
 statements. ",TD="Explicit inexact syntax cannot appear inside an explicit exact object type",TE="Explicit
inexact syntax can only appear inside an object type",TF="Component params must be an identifier. If you'd l
ike to destructure, you should use `name as {destructure}`",TG="A bigint literal must be an integer",TH="JSX
 value should be either an expression or a quoted JSX text",TI="Invalid left-hand side in assignment",TJ="In
valid left-hand side in exponentiation expression",TK="Invalid left-hand side in for-in",TL="Invalid left-ha
nd side in for-of",TM="Invalid optional indexed access. Indexed access uses bracket notation. Use the format
 `T?.[K]`.",TN="Invalid regular expression",TO="A bigint literal cannot use exponential notation",TP="Tuple
spread elements cannot be optional.",TQ="Tuple variance annotations can only be used with labeled tuple elem
ents, e.g. `[+foo: number]`",TR="`typeof` can only be used to get the type of variables.",TS="JSX attributes
 must only be assigned a non-empty expression",TT="Literals cannot be used as shorthand properties.",TU="Mal
formed unicode",TV="`match` argument must not be empty",TW="`match` argument cannot contain spread elements"
,TX="Object pattern can't contain methods",TY="Expected at least one type parameter.",TZ="Type parameter dec
laration needs a default, since a preceding type parameter declaration has a default.",T0="More than one def
ault clause in switch statement",T1="Illegal newline after throw",T2="Illegal newline before arrow",T3="Miss
ing catch or finally after try",T4="Const must be initialized",T5="Destructuring assignment must be initiali
zed",T6="An optional chain may not be used in a `new` expression.",T7="Template literals may not be used in
an optional chain.",T8="Rest parameter must be final parameter of an argument list",T9="Private fields may n
ot be deleted.",T_="Private fields can only be referenced from within a class.",T$="Rest property must be fi
nal property of an object pattern",Ua="Setter should have exactly one parameter",Ub="A setter cannot have a
`this` parameter.",Uc="Catch variable may not be eval or arguments in strict mode",Ud="Delete of an unqualif
ied identifier in strict mode.",Ue="Duplicate data property in object literal not allowed in strict mode",Uf
="Function name may not be eval or arguments in strict mode",Ug="Assignment to eval or arguments is not allo
wed in strict mode",Uh="Postfix increment/decrement may not have eval or arguments operand in strict mode",U
i="Prefix increment/decrement may not have eval or arguments operand in strict mode",Uj="Strict mode code ma
y not include a with statement",Uk="Number literals with leading zeros are not allowed in strict mode.",Ul="
Octal literals are not allowed in strict mode.",Um="Strict mode function may not have duplicate parameter na
mes",Un="Parameter name eval or arguments is not allowed in strict mode",Uo='Illegal "use strict" directive
in function with non-simple parameter list',Up="Use of reserved word in strict mode",Uq="Variable name may n
ot be eval or arguments in strict mode",Ur="You may not access a private field through the `super` keyword."
,Us="Flow does not support abstract classes.",Ut="Flow does not support template literal types.",Uu="A type
annotation is required for the `this` parameter.",Uv="Arrow functions cannot have a `this` parameter; arrow
functions automatically bind `this` when declared.",Uw="Constructors cannot have a `this` parameter; constru
ctors don't bind `this` like other functions.",Ux="The `this` parameter cannot be optional.",Uy="The `this`
parameter must be the first function parameter.",Uz="A trailing comma is not permitted after the rest elemen
t",UA="Unexpected end of input",UB="Explicit inexact syntax must come at the end of an object type",UC="Opaq
ue type aliases are not allowed in untyped mode",UD="Unexpected proto modifier",UE="Unexpected reserved word
",UF="Unexpected reserved type",UG="Spreading a type is only allowed inside an object type",UH="Unexpected s
tatic modifier",UI="Unexpected `super` outside of a class method",UJ="`super()` is only valid in a class con
structor",UK="Type aliases are not allowed in untyped mode",UL="Type annotations are not allowed in untyped
mode",UM="Type declarations are not allowed in untyped mode",UN="Type exports are not allowed in untyped mod
e",UO="Type imports are not allowed in untyped mode",UP="Interfaces are not allowed in untyped mode",UQ="Une
xpected variance sigil",UR="Found a decorator in an unsupported position.",US="Invalid regular expression: m
issing /",UT="Unexpected whitespace between `#` and identifier",UU="`yield` is an invalid identifier in gene
rators",UV="Yield expression not allowed in formal parameter",UW=[0,[11,"Duplicate export for `",[2,0,[12,96
,0]]],"Duplicate export for `%s`"],UX=[0,[11,"Private fields may only be declared once. `#",[2,0,[11,"` is d
eclared more than once.",0]]],"Private fields may only be declared once. `#%s` is declared more than once."]
,UY=[0,[11,"bigint enum members need to be initialized, e.g. `",[2,0,[11," = 1n,` in enum `",[2,0,[11,h6,0]]
]]],"bigint enum members need to be initialized, e.g. `%s = 1n,` in enum `%s`."],UZ=[0,[11,"Boolean enum mem
bers need to be initialized. Use either `",[2,0,[11," = true,` or `",[2,0,[11," = false,` in enum `",[2,0,[1
1,h6,0]]]]]]],"Boolean enum members need to be initialized. Use either `%s = true,` or `%s = false,` in enum
 `%s`."],U0=[0,[11,"Enum member names need to be unique, but the name `",[2,0,[11,"` has already been used b
efore in enum `",[2,0,[11,h6,0]]]]],"Enum member names need to be unique, but the name `%s` has already been
 used before in enum `%s`."],U1=[0,[11,LR,[2,0,[11,"` has inconsistent member initializers. Either use no in
itializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.
",0]]],"Enum `%s` has inconsistent member initializers. Either use no initializers, or consistently use lite
rals (either booleans, numbers, or strings) for all member initializers."],U2="The `...` must come at the en
d of the enum body. Remove the trailing comma.",U3="The `...` must come after all enum members. Move it to t
he end of the enum body.",U4=[0,[11,"Use one of `boolean`, `number`, `string`, `symbol`, or `bigint` in enum
 `",[2,0,[11,h6,0]]],"Use one of `boolean`, `number`, `string`, `symbol`, or `bigint` in enum `%s`."],U5=[0,
[11,"Enum type `",[2,0,[11,"` is not valid. ",[2,0,0]]]],"Enum type `%s` is not valid. %s"],U6=[0,[11,"Suppl
ied enum type is not valid. ",[2,0,0]],"Supplied enum type is not valid. %s"],U7=[0,[11,"Enum member names a
nd initializers are separated with `=`. Replace `",[2,0,[11,":` with `",[2,0,[11," =`.",0]]]]],"Enum member
names and initializers are separated with `=`. Replace `%s:` with `%s =`."],U9=[0,[11,LR,[2,0,[11,"` has typ
e `",[2,0,[11,"`, so the initializer of `",[2,0,[11,"` needs to be a ",[2,0,[11," literal.",0]]]]]]]]],"Enum
 `%s` has type `%s`, so the initializer of `%s` needs to be a %s literal."],U8=[0,[11,"Symbol enum members c
annot be initialized. Use `",[2,0,[11,",` in enum `",[2,0,[11,h6,0]]]]],"Symbol enum members cannot be initi
alized. Use `%s,` in enum `%s`."],U_=[0,[11,"The enum member initializer for `",[2,0,[11,"` needs to be a li
teral (either a boolean, number, or string) in enum `",[2,0,[11,h6,0]]]]],"The enum member initializer for `
%s` needs to be a literal (either a boolean, number, or string) in enum `%s`."],U$=[0,[11,"Enum member names
 cannot start with lowercase 'a' through 'z'. Instead of using `",[2,0,[11,"`, consider using `",[2,0,[11,"`
, in enum `",[2,0,[11,h6,0]]]]]]],"Enum member names cannot start with lowercase 'a' through 'z'. Instead of
 using `%s`, consider using `%s`, in enum `%s`."],Va=[0,[11,"Number enum members need to be initialized, e.g
. `",[2,0,[11," = 1,` in enum `",[2,0,[11,h6,0]]]]],"Number enum members need to be initialized, e.g. `%s =
1,` in enum `%s`."],Vb=[0,[11,"String enum members need to consistently either all use initializers, or use
no initializers, in enum ",[2,0,[12,46,0]]],"String enum members need to consistently either all use initial
izers, or use no initializers, in enum %s."],Vc=[0,[11,"Expected corresponding JSX closing tag for ",[2,0,0]
],"Expected corresponding JSX closing tag for %s"],Vd="immediately within another function.",Ve="In strict m
ode code, functions can only be declared at top level or ",Vf="inside a block, or as the body of an if state
ment.",Vg="In non-strict mode code, functions can only be declared at top level, ",Vh="static ",Vm=e,Vi="met
hods",Vl="fields",Vj=Jx,Vk=[0,[11,"Classes may not have ",[2,0,[2,0,[11," named `",[2,0,[11,h6,0]]]]]],"Clas
ses may not have %s%s named `%s`."],Vn="Components use `renders` instead of `:` to annotate the render type
of a component.",Vo=LD,Vq=e,Vp=[0,[11,"String params require local bindings using `as` renaming. You can use
 `'",[2,0,[11,"' as ",[2,0,[2,0,[11,": <TYPE>` ",0]]]]]],"String params require local bindings using `as` re
naming. You can use `'%s' as %s%s: <TYPE>` "],Vr="Remove the period.",Vt="Indexed access uses bracket notati
on.",Vs=[0,[11,"Invalid indexed access. ",[2,0,[11," Use the format `T[K]`.",0]]],"Invalid indexed access. %
s Use the format `T[K]`."],Vu=[0,[11,"Invalid flags supplied to RegExp constructor '",[2,0,[12,39,0]]],"Inva
lid flags supplied to RegExp constructor '%s'"],Vv=cG,Vx=pa,Vw=[0,[11,"In match ",[2,0,[11," pattern, the re
st must be the last element in the pattern",0]]],"In match %s pattern, the rest must be the last element in
the pattern"],Vy=[0,[11,"JSX element ",[2,0,[11," has no corresponding closing tag.",0]]],"JSX element %s ha
s no corresponding closing tag."],Vz=[0,[11,MK,[2,0,[11,"`. Parentheses are required to combine `??` with `&
&` or `||` expressions.",0]]],"Unexpected token `%s`. Parentheses are required to combine `??` with `&&` or
`||` expressions."],VA=[0,[2,0,[11," '",[2,0,[11,"' has already been declared",0]]]],"%s '%s' has already be
en declared"],VE=e,VF=lZ,VG=" You can try using JavaScript private fields by prepending `#` to the field nam
e.",VH=lA,VB=" Fields and methods are public by default. You can simply omit the `public` keyword.",VC=lq,VD
=[0,[11,"Flow does not support using `",[2,0,[11,"` in classes.",[2,0,0]]]],"Flow does not support using `%s
` in classes.%s"],VI=[0,[11,"Private fields must be declared before they can be referenced. `#",[2,0,[11,"`
has not been declared.",0]]],"Private fields must be declared before they can be referenced. `#%s` has not b
een declared."],VJ=[0,[11,JA,[2,0,0]],"Unexpected %s"],VK=[0,[11,MK,[2,0,[11,"`. Did you mean `",[2,0,[11,"`
?",0]]]]],"Unexpected token `%s`. Did you mean `%s`?"],VL=[0,[11,JA,[2,0,[11,", expected ",[2,0,0]]]],"Unexp
ected %s, expected %s"],VM=[0,[11,"Undefined label '",[2,0,[12,39,0]]],"Undefined label '%s'"],S5="Parse_err
or.Error",VN=[0,[0,36,37],[0,48,58],[0,65,91],[0,95,96],[0,97,cy],[0,pd,qR],[0,Cl,og],[0,AQ,qi],[0,nG,vm],[0
,kv,DE],[0,vY,o_],[0,ah,706],[0,K9,722],[0,736,741],[0,748,749],[0,750,751],[0,768,885],[0,886,888],[0,890,8
94],[0,895,896],[0,902,907],[0,908,909],[0,910,930],[0,Lw,1014],[0,1015,1154],[0,1155,1160],[0,1162,1328],[0
,1329,1367],[0,1369,1370],[0,1376,1417],[0,1425,1470],[0,1471,1472],[0,1473,1475],[0,1476,1478],[0,1479,1480
],[0,1488,1515],[0,1519,1523],[0,1552,1563],[0,1568,1642],[0,1646,1748],[0,1749,1757],[0,1759,1769],[0,1770,
1789],[0,1791,1792],[0,1808,1867],[0,1869,1970],[0,1984,2038],[0,2042,2043],[0,2045,2046],[0,Df,2094],[0,211
2,2140],[0,2144,2155],[0,2208,2229],[0,2230,2238],[0,2259,2274],[0,2275,2404],[0,2406,2416],[0,2417,2436],[0
,2437,2445],[0,2447,2449],[0,2451,2473],[0,2474,2481],[0,2482,2483],[0,2486,2490],[0,2492,2501],[0,2503,2505
],[0,2507,2511],[0,2519,2520],[0,2524,2526],[0,2527,2532],[0,2534,2546],[0,2556,2557],[0,2558,2559],[0,2561,
2564],[0,2565,2571],[0,2575,2577],[0,2579,2601],[0,2602,2609],[0,2610,2612],[0,2613,2615],[0,2616,2618],[0,2
620,2621],[0,2622,2627],[0,2631,2633],[0,2635,2638],[0,2641,2642],[0,2649,2653],[0,2654,2655],[0,2662,2678],
[0,2689,2692],[0,2693,2702],[0,2703,2706],[0,2707,2729],[0,2730,2737],[0,2738,2740],[0,2741,2746],[0,2748,27
58],[0,2759,2762],[0,2763,2766],[0,2768,2769],[0,2784,2788],[0,2790,2800],[0,2809,2816],[0,2817,2820],[0,282
1,2829],[0,2831,2833],[0,2835,2857],[0,2858,2865],[0,2866,2868],[0,2869,2874],[0,2876,2885],[0,2887,2889],[0
,2891,2894],[0,2902,2904],[0,2908,2910],[0,2911,2916],[0,2918,2928],[0,2929,2930],[0,2946,2948],[0,2949,2955
],[0,2958,2961],[0,2962,2966],[0,2969,2971],[0,2972,2973],[0,2974,2976],[0,2979,2981],[0,2984,2987],[0,2990,
3002],[0,3006,3011],[0,3014,3017],[0,3018,3022],[0,3024,3025],[0,3031,3032],[0,3046,3056],[0,3072,3085],[0,3
086,3089],[0,3090,3113],[0,3114,3130],[0,3133,3141],[0,3142,3145],[0,3146,3150],[0,3157,3159],[0,3160,3163],
[0,3168,3172],[0,3174,3184],[0,3200,3204],[0,3205,3213],[0,3214,3217],[0,3218,3241],[0,3242,3252],[0,3253,32
58],[0,3260,3269],[0,3270,3273],[0,3274,3278],[0,3285,3287],[0,3294,3295],[0,3296,3300],[0,3302,3312],[0,331
3,3315],[0,3328,3332],[0,3333,3341],[0,3342,3345],[0,3346,3397],[0,3398,3401],[0,3402,3407],[0,3412,3416],[0
,3423,3428],[0,3430,3440],[0,3450,3456],[0,3458,3460],[0,3461,3479],[0,3482,3506],[0,3507,3516],[0,3517,3518
],[0,3520,3527],[0,3530,3531],[0,3535,3541],[0,3542,3543],[0,3544,3552],[0,3558,3568],[0,3570,3572],[0,3585,
3643],[0,3648,3663],[0,3664,3674],[0,3713,3715],[0,3716,3717],[0,3718,3723],[0,3724,3748],[0,3749,3750],[0,3
751,3774],[0,3776,3781],[0,3782,3783],[0,3784,3790],[0,3792,3802],[0,3804,3808],[0,3840,3841],[0,3864,3866],
[0,3872,3882],[0,3893,3894],[0,3895,3896],[0,3897,3898],[0,3902,3912],[0,3913,3949],[0,3953,3973],[0,3974,39
92],[0,3993,4029],[0,4038,4039],[0,LI,4170],[0,4176,4254],[0,4256,4294],[0,4295,4296],[0,4301,4302],[0,4304,
4347],[0,4348,4681],[0,4682,4686],[0,4688,4695],[0,4696,4697],[0,4698,4702],[0,4704,4745],[0,4746,4750],[0,4
752,4785],[0,4786,4790],[0,4792,4799],[0,4800,4801],[0,4802,4806],[0,4808,4823],[0,4824,4881],[0,4882,4886],
[0,4888,4955],[0,4957,4960],[0,4969,4978],[0,4992,5008],[0,5024,5110],[0,5112,5118],[0,5121,5741],[0,5743,we
],[0,5761,5787],[0,5792,5867],[0,5870,5881],[0,5888,5901],[0,5902,5909],[0,5920,5941],[0,5952,5972],[0,5984,
5997],[0,5998,6001],[0,6002,6004],[0,6016,6100],[0,6103,6104],[0,6108,6110],[0,6112,6122],[0,6155,6158],[0,6
160,6170],[0,6176,6265],[0,6272,6315],[0,6320,6390],[0,6400,6431],[0,6432,6444],[0,6448,6460],[0,6470,6510],
[0,6512,6517],[0,6528,6572],[0,6576,6602],[0,6608,6619],[0,6656,6684],[0,6688,6751],[0,6752,6781],[0,6783,67
94],[0,6800,6810],[0,6823,6824],[0,6832,6846],[0,6912,6988],[0,6992,7002],[0,7019,7028],[0,7040,7156],[0,716
8,7224],[0,7232,7242],[0,7245,7294],[0,7296,7305],[0,7312,7355],[0,7357,7360],[0,7376,7379],[0,7380,7419],[0
,7424,7674],[0,7675,7958],[0,7960,7966],[0,7968,8006],[0,8008,8014],[0,8016,8024],[0,8025,8026],[0,8027,8028
],[0,8029,8030],[0,8031,8062],[0,8064,8117],[0,8118,8125],[0,8126,8127],[0,8130,8133],[0,8134,8141],[0,8144,
8148],[0,8150,8156],[0,8160,8173],[0,8178,8181],[0,8182,8189],[0,JZ,Ks],[0,8255,8257],[0,8276,8277],[0,qC,83
06],[0,oT,8320],[0,8336,8349],[0,8400,8413],[0,8417,8418],[0,8421,8433],[0,nM,8451],[0,pi,8456],[0,8458,o6],
[0,o2,8470],[0,KB,8478],[0,qG,nE],[0,or,pS],[0,pR,qh],[0,8490,8506],[0,8508,8512],[0,8517,8522],[0,pL,8527],
[0,8544,8585],[0,11264,11311],[0,11312,11359],[0,11360,11493],[0,11499,11508],[0,11520,nO],[0,q5,11560],[0,o
w,11566],[0,11568,11624],[0,qL,11632],[0,pV,11671],[0,11680,qt],[0,11688,oD],[0,11696,q4],[0,11704,qS],[0,11
712,qz],[0,11720,q1],[0,11728,op],[0,11736,11743],[0,11744,11776],[0,12293,12296],[0,12321,oq],[0,12337,1234
2],[0,12344,12349],[0,12353,12439],[0,12441,pw],[0,12449,p_],[0,12540,12544],[0,12549,nF],[0,12593,12687],[0
,12704,12731],[0,12784,12800],[0,13312,19894],[0,19968,40944],[0,40960,42125],[0,42192,42238],[0,42240,42509
],[0,42512,42540],[0,42560,42608],[0,42612,pX],[0,42623,42738],[0,42775,42784],[0,42786,42889],[0,42891,4294
4],[0,42946,42951],[0,nX,43048],[0,43072,43124],[0,43136,43206],[0,43216,43226],[0,43232,43256],[0,oX,n2],[0
,43261,43310],[0,43312,43348],[0,43360,43389],[0,43392,43457],[0,pu,43482],[0,43488,qZ],[0,KR,43575],[0,4358
4,43598],[0,43600,43610],[0,43616,43639],[0,qw,43715],[0,43739,43742],[0,43744,43760],[0,43762,43767],[0,437
77,43783],[0,43785,43791],[0,43793,43799],[0,43808,oA],[0,43816,oQ],[0,43824,nQ],[0,43868,p4],[0,43888,44011
],[0,44012,44014],[0,44016,44026],[0,44032,55204],[0,55216,55239],[0,55243,55292],[0,63744,64110],[0,64112,6
4218],[0,64256,64263],[0,64275,64280],[0,qP,q0],[0,64298,oN],[0,64312,oC],[0,oW,n9],[0,64320,qc],[0,64323,p8
],[0,64326,64434],[0,64467,64830],[0,64848,64912],[0,64914,64968],[0,65008,65020],[0,65024,65040],[0,65056,6
5072],[0,65075,65077],[0,65101,65104],[0,65136,qe],[0,65142,65277],[0,65296,65306],[0,65313,65339],[0,65343,
nN],[0,65345,65371],[0,65382,65471],[0,65474,65480],[0,65482,65488],[0,65490,65496],[0,65498,65501],[0,lT,qa
],[0,65549,oG],[0,65576,o1],[0,65596,pQ],[0,65599,65614],[0,65616,65630],[0,65664,65787],[0,65856,65909],[0,
66045,66046],[0,66176,66205],[0,66208,66257],[0,66272,66273],[0,66304,66336],[0,66349,66379],[0,66384,66427]
,[0,66432,66462],[0,66464,66500],[0,66504,nA],[0,66513,66518],[0,66560,66718],[0,66720,66730],[0,66736,66772
],[0,66776,66812],[0,66816,66856],[0,66864,66916],[0,67072,67383],[0,67392,67414],[0,67424,67432],[0,67584,6
7590],[0,o4,qN],[0,67594,nz],[0,67639,67641],[0,nR,67645],[0,67647,67670],[0,67680,67703],[0,67712,67743],[0
,67808,oc],[0,67828,67830],[0,67840,67862],[0,67872,67898],[0,67968,68024],[0,68030,68032],[0,oo,68100],[0,6
8101,68103],[0,68108,pI],[0,68117,ps],[0,68121,68150],[0,68152,68155],[0,68159,68160],[0,68192,68221],[0,682
24,68253],[0,68288,pB],[0,68297,68327],[0,68352,68406],[0,68416,68438],[0,68448,68467],[0,68480,68498],[0,68
608,68681],[0,68736,68787],[0,68800,68851],[0,68864,68904],[0,68912,68922],[0,69376,69405],[0,qm,69416],[0,6
9424,69457],[0,69600,69623],[0,69632,69703],[0,69734,nC],[0,69759,69819],[0,69840,69865],[0,69872,69882],[0,
69888,69941],[0,69942,69952],[0,p1,pO],[0,69968,70004],[0,qj,70007],[0,70016,70085],[0,70089,70093],[0,70096
,nI],[0,qI,70109],[0,70144,pl],[0,70163,70200],[0,70206,70207],[0,70272,qp],[0,nU,pM],[0,70282,nJ],[0,70287,
po],[0,70303,70313],[0,70320,70379],[0,70384,70394],[0,70400,pb],[0,70405,70413],[0,70415,70417],[0,70419,ou
],[0,70442,nS],[0,70450,pp],[0,70453,70458],[0,70459,70469],[0,70471,70473],[0,70475,70478],[0,qY,70481],[0,
70487,70488],[0,70493,70500],[0,70502,70509],[0,70512,70517],[0,70656,70731],[0,70736,70746],[0,o5,70752],[0
,70784,qk],[0,oU,70856],[0,70864,70874],[0,71040,71094],[0,71096,71105],[0,71128,71134],[0,71168,71233],[0,p
F,71237],[0,71248,71258],[0,71296,71353],[0,71360,71370],[0,71424,71451],[0,71453,71468],[0,71472,71482],[0,
71680,71739],[0,71840,71914],[0,71935,71936],[0,72096,72104],[0,72106,72152],[0,72154,pA],[0,pj,72165],[0,qM
,72255],[0,72263,72264],[0,pK,72346],[0,qH,72350],[0,72384,72441],[0,72704,ov],[0,72714,72759],[0,72760,7276
9],[0,72784,72794],[0,72818,72848],[0,72850,72872],[0,72873,72887],[0,72960,nW],[0,72968,ph],[0,72971,73015]
,[0,73018,73019],[0,73020,73022],[0,73023,73032],[0,73040,73050],[0,73056,oM],[0,73063,nL],[0,73066,73103],[
0,73104,73106],[0,73107,73113],[0,73120,73130],[0,73440,73463],[0,73728,74650],[0,74752,74863],[0,74880,7507
6],[0,77824,78895],[0,82944,83527],[0,92160,92729],[0,92736,92767],[0,92768,92778],[0,92880,92910],[0,92912,
92917],[0,92928,92983],[0,92992,92996],[0,93008,93018],[0,93027,93048],[0,93053,93072],[0,93760,93824],[0,93
952,94027],[0,nK,94088],[0,94095,94112],[0,94176,o3],[0,p3,94180],[0,94208,100344],[0,100352,101107],[0,1105
92,110879],[0,110928,110931],[0,110948,110952],[0,110960,111356],[0,113664,113771],[0,113776,113789],[0,1137
92,113801],[0,113808,113818],[0,113821,113823],[0,119141,119146],[0,119149,119155],[0,119163,119171],[0,1191
73,119180],[0,119210,119214],[0,119362,119365],[0,119808,oh],[0,119894,n5],[0,119966,119968],[0,nZ,119971],[
0,119973,119975],[0,119977,pe],[0,119982,pn],[0,oI,qy],[0,119997,qK],[0,120005,pf],[0,120071,120075],[0,1200
77,qX],[0,120086,oy],[0,120094,of],[0,120123,pt],[0,120128,oV],[0,n1,120135],[0,120138,os],[0,120146,120486]
,[0,120488,qV],[0,120514,qE],[0,120540,p9],[0,120572,pN],[0,120598,pD],[0,120630,o8],[0,120656,nV],[0,120688
,oe],[0,120714,pc],[0,120746,o0],[0,120772,120780],[0,120782,120832],[0,121344,121399],[0,121403,121453],[0,
121461,121462],[0,121476,121477],[0,121499,121504],[0,121505,121520],[0,122880,122887],[0,122888,122905],[0,
122907,122914],[0,122915,122917],[0,122918,122923],[0,123136,123181],[0,123184,123198],[0,123200,123210],[0,
q2,123215],[0,123584,123642],[0,124928,125125],[0,125136,125143],[0,125184,125260],[0,125264,125274],[0,1264
64,o7],[0,126469,qs],[0,126497,p$],[0,oj,126501],[0,qn,oH],[0,126505,ok],[0,126516,oK],[0,pg,oE],[0,ob,12652
4],[0,nB,126531],[0,p7,oa],[0,on,qu],[0,qb,p2],[0,126541,n3],[0,126545,qd],[0,nH,126549],[0,oJ,o9],[0,qO,oO]
,[0,qv,nD],[0,qW,p0],[0,qB,qU],[0,126561,pZ],[0,ot,126565],[0,126567,oi],[0,126572,n$],[0,126580,oL],[0,1265
85,oY],[0,pC,pk],[0,126592,od],[0,126603,126620],[0,126625,nT],[0,126629,oP],[0,126635,126652],[0,131072,173
783],[0,173824,177973],[0,177984,178206],[0,178208,183970],[0,183984,191457],[0,194560,195102],[0,917760,918
000]],VP=[0,1,0],VO=[0,0,[0,1,0],[0,1,0]],_t=Jq,_u="end of input",_B=lt,_C="template literal part",_F=lt,_G=
Le,_r=Jq,_v=lt,_w=kt,_x=lt,_y=jp,_z=lt,_A=kb,_D="an",_E=cf,_s=hb,_q=[0,[11,"token `",[2,0,[12,96,0]]],"token
 `%s`"],X_="{",X$=oF,Ya="{|",Yb="|}",Yc=Kt,Yd=LE,Ye="[",Yf="]",Yg=zZ,Yh=Me,Yi=cw,Yj="=>",Yk="...",Yl=L9,Ym=J
x,Yn=ke,Yo=qx,Yp=iF,Yq=lQ,Yr=bN,Ys=bP,Yt=BM,Yu=i_,Yv=bS,Yw=pq,Yx=lI,Yy=q3,Yz=pz,YA=iw,YB=kf,YC=jr,YD=h7,YE=h
W,YF=bR,YG=pY,YH=ox,YI=bK,YJ=jm,YK=n7,YL=px,YM=pv,YN=ly,YO=gC,YP=bL,YQ=qT,YR=ju,YS=lH,YT=h5,YU=hZ,YV=lF,YW=n
y,YX=bk,YY=kg,YZ=jk,Y0=bu,Y1=pP,Y2=lA,Y3=lZ,Y4=lq,Y5=bo,Y6=bM,Y7=lp,Y8=eg,Y9=xu,Y_=Cf,Y$=iy,Za=js,Zb="%check
s",Zc=JQ,Zd=Lp,Ze=J4,Zf=JF,Zg=MI,Zh=Lf,Zi=L5,Zj=JD,Zk=KY,Zl=KW,Zm=J3,Zn=MH,Zo=LO,Zp=Jh,Zq=LP,Zr=AX,Zs="?.",Z
t=Dt,Zu=LD,Zv=jy,Zw=JC,Zx=Jy,Zy=LX,Zz=pT,ZA=qf,ZB=Lu,ZC=ML,ZD=JE,ZE=J9,ZF=Mc,ZG=K6,ZH=vK,ZI=lV,ZJ=KJ,ZK=KM,Z
L=L_,ZM=hj,ZN=bO,ZO=bv,ZP=JS,ZQ=JH,ZR=Li,ZS=Nc,ZT=Kh,ZU=Mw,ZV=JU,ZW=e,ZX=pW,ZY=n8,ZZ=bE,Z0=kt,Z1=jp,Z2=kb,Z3
=hZ,Z4=lC,Z5=pU,Z6=n6,Z7=qQ,Z8=ql,Z9=jl,Z_=K7,Z$=lD,_a=kq,_b=kk,_c=MQ,_d=JI,_e=lz,_f=lz,_g=Kn,_h=lz,_i=lz,_j
=oF,_k=oF,_l=Kn,_m=bv,_n=bv,_o=lG,_p=nP,VQ="T_LCURLY",VR="T_RCURLY",VS="T_LCURLYBAR",VT="T_RCURLYBAR",VU="T_
LPAREN",VV="T_RPAREN",VW="T_LBRACKET",VX="T_RBRACKET",VY="T_SEMICOLON",VZ="T_COMMA",V0="T_PERIOD",V1="T_ARRO
W",V2="T_ELLIPSIS",V3="T_AT",V4="T_POUND",V5="T_FUNCTION",V6="T_IF",V7="T_IN",V8="T_INSTANCEOF",V9="T_RETURN
",V_="T_SWITCH",V$="T_MATCH",Wa="T_THIS",Wb="T_THROW",Wc="T_TRY",Wd="T_VAR",We="T_WHILE",Wf="T_WITH",Wg="T_C
ONST",Wh="T_LET",Wi="T_NULL",Wj="T_FALSE",Wk="T_TRUE",Wl="T_BREAK",Wm="T_CASE",Wn="T_CATCH",Wo="T_CONTINUE",
Wp="T_DEFAULT",Wq="T_DO",Wr="T_FINALLY",Ws="T_FOR",Wt="T_CLASS",Wu="T_EXTENDS",Wv="T_STATIC",Ww="T_ELSE",Wx=
"T_NEW",Wy="T_DELETE",Wz="T_TYPEOF",WA="T_VOID",WB="T_ENUM",WC="T_EXPORT",WD="T_IMPORT",WE="T_SUPER",WF="T_I
MPLEMENTS",WG="T_INTERFACE",WH="T_PACKAGE",WI="T_PRIVATE",WJ="T_PROTECTED",WK="T_PUBLIC",WL="T_YIELD",WM="T_
DEBUGGER",WN="T_DECLARE",WO="T_TYPE",WP="T_OPAQUE",WQ="T_OF",WR="T_ASYNC",WS="T_AWAIT",WT="T_CHECKS",WU="T_R
SHIFT3_ASSIGN",WV="T_RSHIFT_ASSIGN",WW="T_LSHIFT_ASSIGN",WX="T_BIT_XOR_ASSIGN",WY="T_BIT_OR_ASSIGN",WZ="T_BI
T_AND_ASSIGN",W0="T_MOD_ASSIGN",W1="T_DIV_ASSIGN",W2="T_MULT_ASSIGN",W3="T_EXP_ASSIGN",W4="T_MINUS_ASSIGN",W
5="T_PLUS_ASSIGN",W6="T_NULLISH_ASSIGN",W7="T_AND_ASSIGN",W8="T_OR_ASSIGN",W9="T_ASSIGN",W_="T_PLING_PERIOD"
,W$="T_PLING_PLING",Xa="T_PLING",Xb="T_COLON",Xc="T_OR",Xd="T_AND",Xe="T_BIT_OR",Xf="T_BIT_XOR",Xg="T_BIT_AN
D",Xh="T_EQUAL",Xi="T_NOT_EQUAL",Xj="T_STRICT_EQUAL",Xk="T_STRICT_NOT_EQUAL",Xl="T_LESS_THAN_EQUAL",Xm="T_GR
EATER_THAN_EQUAL",Xn="T_LESS_THAN",Xo="T_GREATER_THAN",Xp="T_LSHIFT",Xq="T_RSHIFT",Xr="T_RSHIFT3",Xs="T_PLUS
",Xt="T_MINUS",Xu="T_DIV",Xv="T_MULT",Xw="T_EXP",Xx="T_MOD",Xy="T_NOT",Xz="T_BIT_NOT",XA="T_INCR",XB="T_DECR
",XC="T_EOF",XD="T_ANY_TYPE",XE="T_MIXED_TYPE",XF="T_EMPTY_TYPE",XG="T_NUMBER_TYPE",XH="T_BIGINT_TYPE",XI="T
_STRING_TYPE",XJ="T_VOID_TYPE",XK="T_SYMBOL_TYPE",XL="T_UNKNOWN_TYPE",XM="T_NEVER_TYPE",XN="T_UNDEFINED_TYPE
",XO="T_KEYOF",XP="T_READONLY",XQ="T_INFER",XR="T_IS",XS="T_ASSERTS",XT="T_IMPLIES",XU=Ki,XV=Ki,XW="T_NUMBER
",XX="T_BIGINT",XY="T_STRING",XZ="T_TEMPLATE_PART",X0="T_IDENTIFIER",X1="T_REGEXP",X2="T_INTERPRETER",X3="T_
ERROR",X4="T_JSX_IDENTIFIER",X5=Mf,X6=Mf,X7="T_BOOLEAN_TYPE",X8="T_NUMBER_SINGLETON_TYPE",X9="T_BIGINT_SINGL
ETON_TYPE",_K=[0,JM,qr,9],_L=[0,JM,xF,9],_U=Ln,_V="*/",_W=Ln,_X="unreachable line_comment",$a="unreachable s
tring_quote",$b="\\",$c="unreachable template_part",$d="\r\n",$e=u4,$w="unreachable regexp_class",$x=J7,$z="
unreachable regexp_body",$A=e,$B=e,$C=e,$D=e,adC=LY,adD="{'>'}",adE=lV,adF="{'}'}",adG=oF,adH=iD,adI=zZ,adJ=
qf,adK=LY,adL=iD,adM=zZ,adN=qf,ad6="unreachable type_token wholenumber",ad5="unreachable type_token wholebig
int",ad4="unreachable type_token floatbigint",ad3="unreachable type_token scinumber",ad2="unreachable type_t
oken scibigint",ad1="unreachable type_token hexnumber",ad0="unreachable type_token hexbigint",adZ="unreachab
le type_token legacyoctnumber",adY="unreachable type_token octnumber",adX="unreachable type_token octbigint"
,adW="unreachable type_token binnumber",adV="unreachable type_token bigbigint",adT="unreachable type_token",
adU=Lo,ad7=[11,1],ad8=[11,0],adQ="unreachable template_tail",adR=e,adS=e,adP="unreachable jsx_child",adO="un
reachable jsx_tag",adv=[0,xX],adw=[0,913],adx=[0,kv],ady=[0,BG],adz=[0,JX],adA=[0,Mh],adB=[0,8747],adn=[0,L7
],ado=[0,916],adp=[0,8225],adq=[0,935],adr=[0,Mn],ads=[0,914],adt=[0,Lq],adu=[0,LJ],adf=[0,w4],adg=[0,915],a
dh=[0,L6],adi=[0,919],adj=[0,917],adk=[0,Mo],adl=[0,J1],ac9=[0,LS],ac_=[0,924],ac$=[0,923],ada=[0,922],adb=[
0,uM],adc=[0,921],add=[0,KD],ade=[0,xF],adm=[0,MY],ac1=[0,vY],ac2=[0,927],ac3=[0,937],ac4=[0,L4],ac5=[0,M0],
ac6=[0,K1],ac7=[0,338],acT=[0,352],acU=[0,929],acV=[0,936],acW=[0,8243],acX=[0,928],acY=[0,934],acZ=[0,Jk],a
c0=[0,M$],acL=[0,933],acM=[0,LC],acN=[0,Js],acO=[0,Mb],acP=[0,920],acQ=[0,932],acR=[0,K8],acD=[0,JT],acE=[0,
KG],acF=[0,M3],acG=[0,918],acH=[0,376],acI=[0,xe],acJ=[0,926],acK=[0,LN],acS=[0,Lw],ac8=[0,925],acv=[0,39],a
cw=[0,8736],acx=[0,8743],acy=[0,38],acz=[0,945],acA=[0,8501],acB=[0,jj],acn=[0,8226],aco=[0,J2],acp=[0,946],
acq=[0,8222],acr=[0,Nb],acs=[0,MF],act=[0,8776],acu=[0,Mp],acf=[0,8773],acg=[0,9827],ach=[0,K9],aci=[0,967],
acj=[0,Mz],ack=[0,qi],acl=[0,J$],ab9=[0,KK],ab_=[0,8595],ab$=[0,8224],aca=[0,8659],acb=[0,JW],acc=[0,8746],a
cd=[0,8629],ace=[0,JR],acm=[0,8745],ab1=[0,8195],ab2=[0,8709],ab3=[0,Ld],ab4=[0,Jo],ab5=[0,Kp],ab6=[0,o_],ab
7=[0,9830],abT=[0,8707],abU=[0,8364],abV=[0,ME],abW=[0,ki],abX=[0,951],abY=[0,8801],abZ=[0,949],ab0=[0,8194]
,abL=[0,8805],abM=[0,947],abN=[0,8260],abO=[0,zI],abP=[0,L2],abQ=[0,qr],abR=[0,8704],abE=[0,MN],abF=[0,Mm],a
bG=[0,8230],abH=[0,9829],abI=[0,8596],abJ=[0,8660],abK=[0,62],abS=[0,402],ab8=[0,948],acC=[0,MX],abw=[0,Bc],
abx=[0,8712],aby=[0,qg],abz=[0,953],abA=[0,8734],abB=[0,8465],abC=[0,MD],abo=[0,8220],abp=[0,8968],abq=[0,85
92],abr=[0,qR],abs=[0,10216],abt=[0,955],abu=[0,8656],abv=[0,954],abg=[0,60],abh=[0,8216],abi=[0,8249],abj=[
0,Ks],abk=[0,9674],abl=[0,8727],abm=[0,8970],aa_=[0,Ll],aa$=[0,8711],aba=[0,956],abb=[0,8722],abc=[0,AQ],abd
=[0,Cl],abe=[0,8212],abf=[0,M6],abn=[0,8804],aa2=[0,957],aa3=[0,KQ],aa4=[0,8836],aa5=[0,8713],aa6=[0,M2],aa7
=[0,8715],aa8=[0,8800],aaU=[0,8853],aaV=[0,959],aaW=[0,969],aaX=[0,8254],aaY=[0,My],aaZ=[0,339],aa0=[0,jg],a
a1=[0,Jw],aaM=[0,og],aaN=[0,j_],aaO=[0,8855],aaP=[0,CG],aaQ=[0,ah],aaR=[0,nG],aaS=[0,pd],aaE=[0,Kf],aaF=[0,z
e],aaG=[0,982],aaH=[0,960],aaI=[0,966],aaJ=[0,8869],aaK=[0,8240],aaL=[0,8706],aaT=[0,8744],aa9=[0,8211],aaw=
[0,10217],aax=[0,8730],aay=[0,8658],aaz=[0,34],aaA=[0,968],aaB=[0,8733],aaC=[0,8719],aao=[0,961],aap=[0,8971
],aaq=[0,Mg],aar=[0,8476],aas=[0,8221],aat=[0,8969],aau=[0,8594],aav=[0,vm],aag=[0,Ly],aah=[0,MU],aai=[0,890
1],aaj=[0,353],aak=[0,8218],aal=[0,8217],aam=[0,8250],$_=[0,8835],$$=[0,8721],aaa=[0,8838],aab=[0,8834],aac=
[0,9824],aad=[0,8764],aae=[0,962],aaf=[0,963],aan=[0,8207],$2=[0,952],$3=[0,8756],$4=[0,964],$5=[0,nY],$6=[0
,8839],$7=[0,Md],$8=[0,L0],$U=[0,kn],$V=[0,8657],$W=[0,8482],$X=[0,DE],$Y=[0,732],$Z=[0,ks],$0=[0,8201],$1=[
0,977],$M=[0,KB],$N=[0,kd],$O=[0,965],$P=[0,978],$Q=[0,Ml],$R=[0,Ck],$S=[0,Lh],$F=[0,JZ],$G=[0,8205],$H=[0,9
50],$I=[0,pJ],$J=[0,MT],$K=[0,uf],$L=[0,958],$T=[0,8593],$9=[0,Kd],aaD=[0,8242],abD=[0,Ms],$E="unreachable r
egexp",$u="unreachable token wholenumber",$t="unreachable token wholebigint",$s="unreachable token floatbigi
nt",$r="unreachable token scinumber",$q="unreachable token scibigint",$p="unreachable token hexnumber",$o="u
nreachable token hexbigint",$n="unreachable token legacyoctnumber",$m="unreachable token legacynonoctnumber"
,$l="unreachable token octnumber",$k="unreachable token octbigint",$j="unreachable token bignumber",$i="unre
achable token bigint",$f="unreachable token",$g=Lo,$h=[7,"#!"],$v="expected ?",_Y="unreachable string_escape
",_Z=bm,_0=lP,_1=lP,_2=bm,_3=yK,_4=LK,_5="n",_6="r",_7="t",_8=KI,_9=lP,__=iD,_$=iD,_R="unreachable id_char",
_S=iD,_T=iD,_P=lP,_O=Mv,_N=Ma,_Q=uL,_M=[26,"token ILLEGAL"],aep=[0,[11,"the identifier `",[2,0,[12,96,0]]],"
the identifier `%s`"],aeo=[0,1],aen=[0,1],aem=MR,ael=MR,aej=[0,[11,"an identifier. When exporting a ",[2,0,[
11," as a named export, you must specify a ",[2,0,[11," name. Did you mean `export default ",[2,0,[11," ...`
?",0]]]]]]],"an identifier. When exporting a %s as a named export, you must specify a %s name. Did you mean
`export default %s ...`?"],aek=p6,aei="Peeking current location when not available",aeh=[0,"src/parser/parse
r_env.ml",365,9],aeg="Internal Error: Tried to add_declared_private with outside of class scope.",aef="Inter
nal Error: `exit_class` called before a matching `enter_class`",aec=e,aed=[0,0,0],aee=[0,0,0],aeq="Parser_en
v.Try.Rollback",aex=e,aev=e,aer=[0,bo,dg,gT,JO,Lx,hi,bl,em,dS,c5,gz,en,fB,g$,ds,hf,hn,dR,fK,ft,eV,fJ,ev,hm,d
V,fq,fU,fW,e8,ed,ge,fp,gP,gM,cU,d6,gy,f2,bS,e6,gV,f_,ff,fC,c7,gq,bP,gv,g9,dI,ht,d0,dy,fX,f7,bN,eG,f8,db,hw,d
c,e0,gn,bJ,c$,g0,dC,eX,eR,dl,gR,hr,c8,eS,d8,fy,f9,hC,da,eL,eW,dv,fh,g1,eO,bQ,cY,e7,gF,eI,fd,hA,hy,dT,ei,c1,d
W,ga,dq,c9,fv,eK,dh,gc,gs,g7,dA,fE,fM,fL,eF,e5,du,fg,dr,cW,el,gu,dD,g_,ez,he,e9,gh,et,hk,dm,ee,de,ep,hh,dG,h
s,dZ,fT,fR,ha,d5,dH,cX,hq,eE,e$,eZ,dX,d7,g4,gQ,eQ,eU,gN,ej,gi,d_,gx,hl,ea,eJ,fs,e3,eY,dJ,c_,dO,fe,dz,fD,ew,f
l,dY,fP,g6,f0,df,bu,eb,d1,c6,eN,gL,gm,fz,gb,bk,ex,dL,go,cf,dt,fk,gf,eT,f$,dx,dE,eC,gU,dP,gD,d$,dB,fZ,es,ef,f
b,fQ,fu,hz,gk,ey,eD,dn,cV,gO,hv,dQ,gJ,fH,dN,fn,d2,e2,aP,gd,cZ,eu,cT,f6,e_,fA,c2,ek,gw,fm,fc,hp,fi,gI,gB,c4,h
d,eM,ho,bE,dj,fO,hD,fo,d9,g3,fj,eA,fw,fV,gW,fY,gG,gp,bM,bK,fx,di,eH,gt,d3,f3,eP,eh,c3,gg,hB,gA,gY,gH,f1,gS,K
0,dK,Kc,MO,er,gZ,e1,gE,fr,f5,g5,g2,eB,fN,gK,g8,fS,eq,hx,dw,hu,dp,fG,fa,bR,hg,d4,cE,f4,dM,fI,gl,e4,hc,dF,fF,c
0,dk,ec,cG,dd],aes=[0,bo,dg,gT,hi,bl,em,dS,c5,gz,en,fB,g$,ds,hf,hn,dR,fK,ft,eV,fJ,ev,hm,dV,fq,fU,fW,e8,ed,ge
,fp,gP,gM,cU,d6,gy,f2,bS,e6,gV,f_,ff,fC,c7,gq,bP,gv,g9,dI,ht,d0,dy,fX,f7,bN,eG,f8,db,hw,dc,e0,gn,bJ,c$,g0,dC
,eX,eR,dl,gR,hr,c8,eS,d8,fy,f9,hC,da,eL,eW,dv,fh,g1,eO,bQ,cY,e7,gF,eI,fd,hA,hy,dT,ei,c1,dW,ga,dq,c9,fv,eK,dh
,gc,gs,g7,dA,fE,fM,fL,eF,e5,du,fg,dr,cW,el,gu,dD,g_,ez,he,e9,gh,et,hk,dm,ee,de,ep,hh,dG,hs,dZ,fT,fR,ha,d5,dH
,cX,hq,eE,e$,eZ,dX,d7,g4,gQ,eQ,eU,gN,ej,gi,d_,gx,hl,ea,eJ,fs,e3,eY,dJ,c_,dO,fe,dz,fD,ew,fl,dY,fP,g6,f0,df,bu
,eb,d1,c6,eN,gL,gm,fz,gb,bk,ex,dL,go,cf,dt,fk,gf,eT,f$,dx,dE,eC,gU,dP,gD,d$,dB,fZ,es,ef,fb,fQ,fu,hz,gk,ey,eD
,dn,cV,gO,hv,dQ,gJ,fH,dN,fn,d2,e2,aP,gd,cZ,eu,cT,f6,e_,fA,c2,ek,gw,fm,fc,hp,fi,gI,gB,c4,hd,eM,ho,bE,dj,fO,hD
,fo,d9,g3,fj,eA,fw,fV,gW,fY,gG,gp,bM,bK,fx,di,eH,gt,d3,f3,eP,eh,c3,gg,hB,gA,gY,gH,f1,gS,dK,er,gZ,e1,gE,fr,f5
,g5,g2,eB,fN,gK,g8,fS,eq,hx,dw,hu,dp,fG,fa,bR,hg,d4,cE,f4,dM,fI,gl,e4,hc,dF,fF,c0,dk,ec,cG,dd],aet=[0,d0,dz,
d$,dt,eC,fa,eF,dh,hl,f0,d4,fU,hy,bP,fd,cZ,hk,de,gK,cU,dq,dJ,du,eb,dO,c4,hp,dg,eL,eT,gy,eD,f9,gQ,d9,eh,gf,gB,
cW,cf,hi,gJ,c8,fw,dp,dB,hu,e3,c2,c$,dx,dn,gq,gs,dL,fR,dI,e9,eN,hd,g4,dr,g2,gZ,cY,dd,eR,dm,gY,hm,eK,dC,gi,fr,
dT,bJ,ga,gU,e7,el,ea,eY,fk,e$,di,e8,fm,hs,ep,d_,eZ,gD,dH,hr,dk,fj,e_,g_,hw,eO,ec,ho,fG,f7,bl,g0,fY,dR,f8,ex,
he,fI,ey,f2,fl,fN,fE,c7,bE,hv,fW,bo,dX,d6,gW,dl,g$,fh,gG,d5,dc,gl,fB,er,fV,fL,c5,dG,c_,dF,fp,g6,fi,fn,hA,eu,
d7,dv,fH,ft,ge,gH,em,gP,dy,fK,g9,en,f5,d1,cV,e1,eE,dP,f1,gz,dK,fM,eU,c3,e4,ez,eq,eB,hB,dZ,eW,gN,gA,dD,bk,bN,
hn,eV,gv,da,bS,bM,e5,go,eI,e2,fe,bQ,hg,fb,gI,c6,gE,gd,fZ,fD,dE,hf,fc,gn,hz,fz,ee,gw,f6,d3,dA,fX,gc,gL,c1,d8,
ed,fv,eX,dW,fJ,g3,hh,hx,eA,f4,dY,fC,eM,gM,f$,e0,gb,c9,fS,g7,fs,g5,ha,df,dj,fq,cG,dS,fO,dw,dV,hD,eJ,ew,eH,eQ,
fy,fg,fP,dN,fT,ej,ev,f_,hc,et,f3,hC,fF,dM,aP,g1,gS,d2,gh,fQ,fu,ht,bK,es,gg,gR,fA,fo,gV,ff,gk,cT,ds,gO,cX,gF,
cE,gm,g8,gx,ei,ef,gp,eG,ek,bR,c0,bu,hq,fx,gT,eP,db,dQ,gt,eS,e6,gu],aeu=[0,d0,dz,d$,dt,eC,fa,eF,dh,hl,f0,d4,f
U,hy,bP,fd,cZ,hk,de,gK,cU,dq,dJ,du,eb,dO,c4,hp,dg,eL,eT,gy,eD,f9,gQ,d9,eh,gf,gB,cW,cf,hi,Lx,gJ,c8,fw,dp,dB,h
u,e3,c2,c$,dx,dn,gq,gs,dL,fR,dI,e9,eN,hd,g4,dr,g2,gZ,cY,dd,eR,dm,gY,Kc,hm,eK,dC,gi,fr,dT,bJ,ga,gU,e7,el,ea,e
Y,fk,e$,di,e8,fm,hs,ep,d_,eZ,gD,dH,hr,dk,fj,e_,g_,hw,eO,ec,ho,fG,f7,bl,g0,fY,dR,f8,ex,he,fI,ey,f2,fl,fN,fE,c
7,bE,hv,fW,bo,dX,d6,gW,dl,g$,fh,gG,d5,dc,gl,fB,er,fV,fL,c5,dG,c_,dF,fp,g6,fi,fn,hA,eu,d7,dv,fH,ft,ge,gH,em,g
P,dy,fK,g9,en,f5,d1,cV,e1,eE,dP,f1,gz,dK,fM,eU,c3,e4,ez,eq,eB,hB,dZ,eW,gN,gA,dD,bk,bN,hn,eV,gv,da,bS,bM,e5,g
o,eI,e2,fe,bQ,hg,fb,gI,c6,gE,gd,fZ,fD,dE,hf,fc,gn,hz,fz,ee,gw,f6,d3,dA,fX,gc,gL,c1,d8,ed,fv,eX,dW,fJ,g3,hh,h
x,eA,f4,dY,MO,fC,eM,gM,f$,e0,gb,c9,fS,g7,fs,g5,ha,df,dj,fq,K0,cG,dS,fO,dw,dV,JO,hD,eJ,ew,eH,eQ,fy,fg,fP,dN,f
T,ej,ev,f_,hc,et,f3,hC,fF,dM,aP,g1,gS,d2,gh,fQ,fu,ht,bK,es,gg,gR,fA,fo,gV,ff,gk,cT,ds,gO,cX,gF,cE,gm,g8,gx,e
i,ef,gp,eG,ek,bR,c0,bu,hq,fx,gT,eP,db,dQ,gt,eS,e6,gu],aeA=ke,aeB=qx,aeC=iF,aeD=lQ,aeE=bN,aeF=bP,aeG=BM,aeH=i
_,aeI=bS,aeJ=pq,aeK=lI,aeL=q3,aeM=pz,aeN=iw,aeO=kf,aeP=jr,aeQ=h7,aeR=hW,aeS=bR,aeT=pY,aeU=ox,aeV=bK,aeW=jm,a
eX=n7,aeY=px,aeZ=pv,ae0=ly,ae1=gC,ae2=bL,ae3=qT,ae4=ju,ae5=lH,ae6=h5,ae7=hZ,ae8=lF,ae9=ny,ae_=bk,ae$=kg,afa=
jk,afb=bu,afc=pP,afd=lA,afe=lZ,aff=lq,afg=bo,afh=bM,afi=lp,afj=eg,afk=xu,afl=Cf,afm=iy,afn=js,afo=pW,afp=n8,
afq=bE,afr=kt,afs=jp,aft=kb,afu=hZ,afv=lC,afw=pU,afx=n6,afy=qQ,afz=ql,afA=jl,afB=lD,afC=kq,afD=kk,afE=lG,afF
=nP,aey=[0,p6],aez=e,afP=[18,1],afQ=[18,0],afR=[0,0],afU=h2,afV=[0,0],afS=[0,"a type"],afT=[0,0],afW=[0,"a n
umber literal type"],afX=[0,0],afY=lD,afZ=kq,af0=kk,af1="You should only call render_type after making sure
the next token is a renders variant",af2=[0,[0,0,0,0,0]],af3=[0,0,0,0],agf=[0,1],af9=[0,j9,1451,6],af_=[0,j9
,1454,6],agc=[0,j9,1557,8],agd=[0,1],age=[0,j9,1574,8],af$="Can not have both `static` and `proto`",aga=bL,a
gb=DH,af7=[0,0],af6=[0,"the end of a tuple type (no trailing comma is allowed in inexact tuple type)."],af5=
[0,j9,jj,15],af4=[0,j9,qg,15],afH=bO,afG=bO,agn=n0,ago=lr,agm=[0,[11,"Failure while looking up ",[2,0,[11,".
 Index: ",[4,0,0,0,[11,". Length: ",[4,0,0,0,[12,46,0]]]]]]],"Failure while looking up %s. Index: %d. Length
: %d."],agj=[0,0,0,0],agk="Offset_utils.Offset_lookup_failed",agp=ap,agq=Lb,agr=lr,ags=n0,agt=L8,agu=lr,agv=
n0,agw=M7,agx=yo,agy="normal",agB=eg,agC="jsxTag",agD="jsxChild",agE="template",agF=Le,agz="context",agA=eg,
agI=[6,0],agO=[0,0],agJ=[0,1],agK=[0,4],agL=[0,2],agM=[0,3],agN=[0,0],agH=bO,agG=[0,0,0,0,0,0],ahF=[0,1],ahG
=[0,0],ahH=h2,ahI=[0,71],ahJ=[0,82],ahK=Kz,ahL=zS,ahM="exports",ahN=lS,ahO=[0,e,e,0],ahP=[0,Ka],ahQ=[0,82],a
hR=[0,"a declaration, statement or export specifiers"],ahT=[0,1],ahS=[0,Ba,1854,21],ahA=[0,"the keyword `as`
"],ahz=[0,30],ahy=[0,30],ahx=[0,0],ahw=[0,1],ahu=[0,Ka],aht=[0,"the keyword `from`"],ahs=[0,e,e,0],ahq=[0,MC
],ahn="Label",ahm=[0,MC],ag9=[0,0,0],ag0=[0,39],ag1=[0,Ba,372,22],agY=[0,38],agZ=[0,Ba,391,22],agV=[0,0],agR
="the token `;`",agQ=[0,0],agP=[0,0],ahW=M5,ahX=[0,p6],ahU=M5,ahV=[26,cf],aij=h2,aik=[0,71],aie=[0,e,0],aid=
cd,aic=[0,e,0],ah7=[0,71],ah8=[0,71],ah9=ke,ah_=[0,e,0],ah5=[0,0,0],ah4=[0,0,0],ain=[0,[0,8]],aio=[0,[0,7]],
aip=[0,[0,6]],aiq=[0,[0,10]],air=[0,[0,9]],ais=[0,[0,11]],ait=[0,[0,5]],aiu=[0,[0,4]],aiv=[0,[0,2]],aiw=[0,[
0,3]],aix=[0,[0,1]],aiy=[0,[0,0]],aiz=[0,[0,12]],aiA=[0,[0,13]],aiB=[0,[0,14]],aiC=[0,0],aiD=[0,1],aiE=[0,0]
,aiF=[0,2],aiG=[0,3],aiH=[0,7],aiI=[0,6],aiJ=[0,4],aiK=[0,5],aiM=[0,1],aiL=[0,0],aiO=[0,1],aiN=[0,0],aiQ=kg,
aiP=[0,"either a call or access of `super`"],aiR=kg,aiS=bk,aiT=lw,aiU=lw,aiV=ju,aiW=[0,"the identifier `targ
et`"],aiX=[0,0],ai0=[0,1],ai1=[0,1],aiY=[0,1],aiZ=[0,1],ai2=[0,1],ai3=[0,71],ai6=lP,ai5=Mv,ai7=uL,ai8=uL,ai4
=Ma,ai_=[0,0],ai$=[0,1],ai9=[0,0],aje=bv,ajf=bv,aja=[0,"a regular expression"],ajb=e,ajc=e,ajd=e,ajg=[0,79],
ajI=[0,"src/parser/expression_parser.ml",1444,17],ajJ=[0,"a template literal part"],ajK=[0,[0,e,e],1],ajG=jo
,ajF=[0,6],ajj=[0,[0,17,[0,2]]],ajk=[0,[0,18,[0,3]]],ajl=[0,[0,19,[0,4]]],ajm=[0,[0,0,[0,5]]],ajn=[0,[0,1,[0
,5]]],ajo=[0,[0,2,[0,5]]],ajp=[0,[0,3,[0,5]]],ajq=[0,[0,5,[0,6]]],ajr=[0,[0,7,[0,6]]],ajs=[0,[0,4,[0,6]]],aj
t=[0,[0,6,[0,6]]],aju=[0,[0,8,[0,7]]],ajv=[0,[0,9,[0,7]]],ajw=[0,[0,10,[0,7]]],ajx=[0,[0,11,[0,8]]],ajy=[0,[
0,12,[0,8]]],ajz=[0,[0,15,[0,9]]],ajA=[0,[0,13,[0,9]]],ajB=[0,[0,14,[1,10]]],ajC=[0,[0,16,[0,9]]],ajD=[0,[0,
21,[0,6]]],ajE=[0,[0,20,[0,6]]],aji=[22,Dt],ajQ=[13,"JSX fragment"],ajS=jy,ajT=cw,ajP=[0,cD],ajO=[1,cD],ajN=
[0,e,e,0],ajL=[0,p6],ajM=e,ajU=[0,"a number or string literal"],ajV=[0,e,'""',0],ajW=[0,0],ajX=[0,"a number
literal"],ajY=[0,[0,0.,bm,0]],ajZ=[0,82],aj0=[20,Kx],aj1=[20,lO],akf=ly,akg=[0,e,0],akd="unexpected PrivateN
ame in Property, expected a PrivateField",ake=[0,0,0],aj8=iG,akc="Must be one of the above",aka=[0,1],akb=[0
,1],aj$=[0,1],aj7=iG,aj6=iG,aj4=AX,aj3="Internal Error: private name found in object props",ako=[0,0,0,0],ak
q=[0,MW],akr=[19,[0,0]],akp=[0,MW],aks=u4,akt="Nooo: ",akk=jm,akj="Parser error: No such thing as an express
ion pattern!",akl=[0,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],akm=[0,"src/parser/parser_fl
ow.ml",ze,28],aku=[0,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],akC=Lb,akD=yo,akE=M_,akF=JY,
akH=JY,akI=M_,akG=eg,akJ=Nf,akK=ax,akL=ap,akM="InterpreterDirective",akN="interpreter",akO="Program",akP=lX,
akQ="BreakStatement",akR=lX,akS="ContinueStatement",akT="DebuggerStatement",akZ=jq,ak0="DeclareExportAllDecl
aration",akU=jq,akV=AZ,akW=CJ,akX=jm,akY="DeclareExportDeclaration",ak1=ax,ak2=b,ak3="DeclareModule",ak4=aQ,
ak5="DeclareModuleExports",ak6=ax,ak7=b,ak8=Mj,ak9="DeclareNamespace",ak_=kj,ak$=ax,ala="DoWhileStatement",a
lb="EmptyStatement",alc=Cu,ald=CJ,ale="ExportDefaultDeclaration",alk=Cu,all=t3,alm=jq,aln="ExportAllDeclarat
ion",alf=Cu,alg=jq,alh=AZ,ali=CJ,alj="ExportNamedDeclaration",alo="directive",alp=aP,alq="ExpressionStatemen
t",alr=ax,als="update",alt=kj,alu=gj,alv="ForStatement",alw="each",alx=ax,aly=cF,alz=hX,alA="ForInStatement"
,alB=js,alC=ax,alD=cF,alE=hX,alF="ForOfStatement",alG=JV,alH=ws,alI=kj,alJ="IfStatement",alK=eg,alP=h5,alQ=a
p,alL=Na,alM=jq,alN=AZ,alO="ImportDeclaration",alR=ax,alS=lX,alT="LabeledStatement",alU=vu,alV=a_,alW="Match
Statement",alX=a_,alY="ReturnStatement",alZ=vu,al0="discriminant",al1="SwitchStatement",al2=a_,al3="ThrowSta
tement",al4="finalizer",al5="handler",al6=cE,al7="TryStatement",al8=ax,al9=kj,al_="WhileStatement",al$=ax,am
a=pa,amb="WithStatement",amc=xd,amd="ArrayExpression",ame=bi,amf=om,amg=aP,amh=bJ,ami=Eg,amj=iy,amk=ax,aml=c
B,amm=b,amn="ArrowFunctionExpression",amo=aP,amp="AsConstExpression",amq=aQ,amr=aP,ams="AsExpression",amx=AX
,amt=cF,amu=hX,amv=jc,amw="AssignmentExpression",amy=cF,amz=hX,amA=jc,amB="BinaryExpression",amC="CallExpres
sion",amD=JV,amE=ws,amF=kj,amG="ConditionalExpression",amH=jq,amI="ImportExpression",amJ=JC,amO=Jy,amP=Dt,am
K=cF,amL=hX,amM=jc,amN="LogicalExpression",amQ=vu,amR=a_,amS="MatchExpression",amT="MemberExpression",amU=qq
,amV=lw,amW="MetaProperty",amX=uE,amY=pE,amZ=L1,am0="NewExpression",am1=qJ,am2="ObjectExpression",am3=b1,am4
="OptionalCallExpression",am5=b1,am6="OptionalMemberExpression",am7=LG,am8="SequenceExpression",am9="Super",
am_="ThisExpression",am$=aQ,ana=aP,anb="TypeCastExpression",anc=aQ,and=aP,ane="SatisfiesExpression",anf=a_,a
ng="AwaitExpression",anh=bO,anm=hj,ann=Nc,ano=Kh,anp=h5,anq=hZ,anr=lH,ans="matched above",ani=a_,anj=JK,ank=
jc,anl="UnaryExpression",ant=JU,any=Mw,anu=JK,anv=a_,anw=jc,anx="UpdateExpression",anz="delegate",anA=a_,anB
="YieldExpression",anC="MatchExpressionCase",anD="guard",anE=ax,anF=bQ,anG="MatchStatementCase",anS=pG,anT=b
Q,anU=iE,anV="MatchObjectPatternProperty",anP=qq,anQ="base",anR="MatchMemberPattern",anH="literal",anI="Matc
hLiteralPattern",anJ="MatchWildcardPattern",anK=bO,anO=hj,anL=a_,anM=jc,anN="MatchUnaryPattern",anW=lR,anX=q
J,anY="MatchObjectPattern",anZ=lR,an0=xd,an1="MatchArrayPattern",an2="patterns",an3="MatchOrPattern",an4=ol,
an5=bQ,an6="MatchAsPattern",an7=b,an8="MatchIdentifierPattern",an9=hY,an_=b,an$="MatchBindingPattern",aoa=a_
,aob="MatchRestPattern",aon="Unexpected FunctionDeclaration with BodyExpression",aoc="HookDeclaration",aoi=a
P,aoj=bJ,aok=Eg,aol=iy,aom="FunctionDeclaration",aod=bi,aoe=om,aof=ax,aog=cB,aoh=b,aoy="Unexpected FunctionE
xpression with BodyExpression",aoo=bi,aop=om,aoq=aP,aor=bJ,aos=Eg,aot=iy,aou=ax,aov=cB,aow=b,aox="FunctionEx
pression",aoz=b1,aoA=aQ,aoB=bU,aoC=zv,aoD=b1,aoE=aQ,aoF=bU,aoG="PrivateIdentifier",aoH=b1,aoI=aQ,aoJ=bU,aoK=
zv,aoL=ws,aoM=kj,aoN="SwitchCase",aoO=ax,aoP="param",aoQ="CatchClause",aoR=ax,aoS="BlockStatement",aoT=hY,ao
U=b,aoV="DeclareVariable",aoZ="DeclareHook",aoW=bJ,aoX="DeclareFunction",aoY=b,ao0=Ky,ao1=jk,ao2=gC,ao3=ax,a
o4=bi,ao5=b,ao6="DeclareClass",ao7=bi,ao8=A1,ao9=cB,ao_=lR,ao$=cB,apa=b,apb="DeclareComponent",apc=bi,apd=A1
,ape=lR,apf=cB,apg="ComponentTypeAnnotation",aph=b1,api=aQ,apj=bU,apk="ComponentTypeParameter",apl=ax,apm=b,
apn="DeclareEnum",apo=gC,app=ax,apq=bi,apr=b,aps="DeclareInterface",apt=ap,apu=eg,apv=t3,apw="ExportNamespac
eSpecifier",apx=cF,apy=bi,apz=b,apA="DeclareTypeAlias",apB=cF,apC=bi,apD=b,apE="TypeAlias",apF="DeclareOpaqu
eType",apK="OpaqueType",apG="supertype",apH="impltype",apI=bi,apJ=b,apL="ClassDeclaration",apM="ClassExpress
ion",apN=qF,apO=jk,apP="superTypeParameters",apQ="superClass",apR=bi,apS=ax,apT=b,apU=aP,apV="Decorator",apW
=bi,apX=b,apY="ClassImplements",apZ=ax,ap0="ClassBody",ap1=ja,ap9=lL,ap_=jx,ap$=j$,ap2=qF,ap3=kl,ap4=bL,ap5=
hY,ap6=ap,ap7=iE,ap8="MethodDefinition",aqa=lp,aqi=qF,aqb=bl,aqc=bL,aqd=kl,aqe=aQ,aqf=ap,aqg=iE,aqh=Kk,aqs="
Internal Error: Private name found in class prop",aqj=lp,aqr=qF,aqk=bl,aql=bL,aqm=kl,aqn=aQ,aqo=ap,aqp=iE,aq
q=Kk,aqt=bi,aqu=A1,aqv=cB,aqw=b,aqx=ax,aqy="ComponentDeclaration",aqz=a_,aqA=CH,aqB=cF,aqC=hX,aqD=qo,aqE=pG,
aqF=lN,aqG=bU,aqH="ComponentParameter",ara=gj,arb=b,arc="EnumBigIntMember",aq6=b,aq7=LV,aq2=gj,aq3=b,aq4="En
umStringMember",aqW=b,aqX=LV,aqR=gj,aqS=b,aqT="EnumNumberMember",aqK=gj,aqL=b,aqM="EnumBooleanMember",aqI=ls
,aqJ=pm,aqN=lx,aqO="EnumBooleanBody",aqP=ls,aqQ=pm,aqU=lx,aqV="EnumNumberBody",aqY=ls,aqZ=pm,aq0=lx,aq1="Enu
mStringBody",aq5=ls,aq8=lx,aq9="EnumSymbolBody",aq_=ls,aq$=pm,ard=lx,are="EnumBigIntBody",arf=ax,arg=b,arh="
EnumDeclaration",ari=gC,arj=ax,ark=bi,arl=b,arm="InterfaceDeclaration",arn=bi,aro=b,arp="InterfaceExtends",a
rq=aQ,arr=qJ,ars="ObjectPattern",art=aQ,aru=xd,arv="ArrayPattern",arw=cF,arx=hX,ary=qo,arz=aQ,arA=bU,arB=zv,
arC=a_,arD=CH,arE=a_,arF=CH,arG=cF,arH=hX,arI=qo,arJ=gj,arS=gj,arT=jx,arU=j$,arR=K2,arK=kl,arL=pG,arM=lL,arN
=hY,arO=ap,arP=iE,arQ=KP,arV=a_,arW=M8,arX=cF,arY=hX,arZ=qo,ar0=kl,ar1=pG,ar2=lL,ar3=hY,ar4=ap,ar5=iE,ar6=KP
,ar7=a_,ar8=M8,ar9=ce,ar_=ap,ar$=ku,ase=e,asa=ce,asb=jp,asc=ap,asd=ku,asf=ce,asg=ap,ash=ku,asi=hW,asm=h7,asj
=ce,ask=ap,asl=ku,asn="flags",aso=bQ,asp="regex",asq=ce,asr=ap,ass=ku,ast=ce,asu=ap,asv=ku,asw=LG,asx="quasi
s",asy="TemplateLiteral",asz="cooked",asA=ce,asB="tail",asC=ap,asD="TemplateElement",asE="quasi",asF="tag",a
sG="TaggedTemplateExpression",asH=hY,asI="declarations",asJ="VariableDeclaration",asK=gj,asL=b,asM="Variable
Declarator",asN="plus",asQ=KC,asR=jl,asS=iF,asT=u3,asU="in-out",asO=hY,asP="Variance",asV="AnyTypeAnnotation
",asW="MixedTypeAnnotation",asX="EmptyTypeAnnotation",asY="VoidTypeAnnotation",asZ="NullLiteralTypeAnnotatio
n",as0="SymbolTypeAnnotation",as1="NumberTypeAnnotation",as2="BigIntTypeAnnotation",as3="StringTypeAnnotatio
n",as4="BooleanTypeAnnotation",as5=aQ,as6="NullableTypeAnnotation",as7="UnknownTypeAnnotation",as8="NeverTyp
eAnnotation",as9="UndefinedTypeAnnotation",as_=hY,as$=aQ,ata="parameterName",atb="TypePredicate",atc="HookTy
peAnnotation",ati="FunctionTypeAnnotation",ath=i_,atd=bi,ate=lR,atf=om,atg=cB,atj=b1,atk=aQ,atl=bU,atm=MJ,at
n=b1,ato=aQ,atp=bU,atq=MJ,atr=[0,0,0,0,0],ats="internalSlots",att="callProperties",atu="indexers",atv=qJ,atw
="exact",atx=Kq,aty="ObjectTypeAnnotation",atL=K2,atM="There should not be computed object type property key
s",atz=gj,atJ=jx,atK=j$,atA=hY,atB=bl,atC=DH,atD=bL,atE=b1,atF=lL,atG=ap,atH=iE,atI="ObjectTypeProperty",atN
=a_,atO="ObjectTypeSpreadProperty",atP=bl,atQ=bL,atR=ap,atS=iE,atT=b,atU="ObjectTypeIndexer",atV=bL,atW=ap,a
tX="ObjectTypeCallProperty",atY=b1,atZ=bl,at0="sourceType",at1="propType",at2="keyTparam",at3="ObjectTypeMap
pedTypeProperty",at4=ap,at5=lL,at6=bL,at7=b1,at8=b,at9="ObjectTypeInternalSlot",at_=ax,at$=gC,aua="Interface
TypeAnnotation",aub=Jt,auc="ArrayTypeAnnotation",aud="falseType",aue="trueType",auf="extendsType",aug="check
Type",auh="ConditionalTypeAnnotation",aui="typeParameter",auj="InferTypeAnnotation",auk=b,aul=KL,aum="Qualif
iedTypeIdentifier",aun=bi,auo=b,aup="GenericTypeAnnotation",auq="indexType",aur="objectType",aus="IndexedAcc
essType",aut=b1,auu="OptionalIndexedAccessType",auv=AV,auw="UnionTypeAnnotation",aux=AV,auy="IntersectionTyp
eAnnotation",auz=pE,auA=a_,auB="TypeofTypeAnnotation",auC=b,auD=KL,auE="QualifiedTypeofIdentifier",auF=a_,au
G="KeyofTypeAnnotation",auH=kr,auI=MQ,auJ=JI,auK=aQ,auL=jc,auM="TypeOperator",auN=jl,auO=Kq,auP="elementType
s",auQ="TupleTypeAnnotation",auR=b1,auS=bl,auT=Jt,auU=lX,auV="TupleTypeLabeledElement",auW=aQ,auX=lX,auY="Tu
pleTypeSpreadElement",auZ=ce,au0=ap,au1="StringLiteralTypeAnnotation",au2=ce,au3=ap,au4="NumberLiteralTypeAn
notation",au5=ce,au6=ap,au7="BigIntLiteralTypeAnnotation",au8=hW,ava=h7,au9=ce,au_=ap,au$="BooleanLiteralTyp
eAnnotation",avb="ExistsTypeAnnotation",avc=aQ,avd=LM,ave=aQ,avf=LM,avg=cB,avh="TypeParameterDeclaration",av
i="usesExtendsBound",avj=jm,avk=bl,avl=iw,avm="bound",avn=bU,avo="TypeParameter",avp=cB,avq=LB,avr=cB,avs=LB
,avt=jo,avu=Jl,avv="closingElement",avw="openingElement",avx="JSXElement",avy="closingFragment",avz=Jl,avA="
openingFragment",avB="JSXFragment",avC=pE,avD="selfClosing",avE="attributes",avF=bU,avG="JSXOpeningElement",
avH="JSXOpeningFragment",avI=bU,avJ="JSXClosingElement",avK="JSXClosingFragment",avL=ap,avM=bU,avN="JSXAttri
bute",avO=a_,avP="JSXSpreadAttribute",avS="JSXEmptyExpression",avQ=aP,avR="JSXExpressionContainer",avT=aP,av
U="JSXSpreadChild",avV=ce,avW=ap,avX="JSXText",avY=qq,avZ=pa,av0="JSXMemberExpression",av1=bU,av2=zS,av3="JS
XNamespacedName",av4=bU,av5="JSXIdentifier",av6=t3,av7=lN,av8="ExportSpecifier",av9=lN,av_="ImportDefaultSpe
cifier",av$=lN,awa="ImportNamespaceSpecifier",awb=Na,awc=lN,awd="imported",awe="ImportSpecifier",awf="Line",
awh="Block",awg=ap,awi=ap,awj="DeclaredPredicate",awk="InferredPredicate",awl=uE,awm=pE,awn=L1,awo=kl,awp=qq
,awq=pa,akA="message",akB=yo,akx=L8,aky=M7,akz=jq,akv=lr,akw=n0,awr=[0,bo,dg,gT,hi,bl,em,dS,c5,gz,en,fB,g$,d
s,hf,hn,dR,fK,ft,eV,fJ,ev,hm,dV,fq,fU,fW,e8,ed,ge,fp,gP,gM,cU,d6,gy,f2,bS,e6,gV,f_,ff,fC,c7,gq,bP,gv,g9,dI,h
t,d0,dy,fX,f7,bN,eG,f8,db,hw,dc,e0,gn,bJ,c$,g0,dC,eX,eR,dl,gR,hr,c8,eS,d8,fy,f9,hC,da,eL,eW,dv,fh,g1,eO,bQ,c
Y,e7,gF,eI,fd,hA,hy,dT,ei,c1,dW,ga,dq,c9,fv,eK,dh,gc,gs,g7,dA,fE,fM,fL,eF,e5,du,fg,dr,cW,el,gu,dD,g_,ez,he,e
9,gh,et,hk,dm,ee,de,ep,hh,dG,hs,dZ,fT,fR,ha,d5,dH,cX,hq,eE,e$,eZ,dX,d7,g4,gQ,eQ,eU,gN,ej,gi,d_,gx,hl,ea,eJ,f
s,e3,eY,dJ,c_,dO,fe,dz,fD,ew,fl,dY,fP,g6,f0,df,bu,eb,d1,c6,eN,gL,gm,fz,gb,bk,ex,dL,go,cf,dt,fk,gf,eT,f$,dx,d
E,eC,gU,dP,gD,d$,dB,fZ,es,ef,fb,fQ,fu,hz,gk,ey,eD,dn,cV,gO,hv,dQ,gJ,fH,dN,fn,d2,e2,aP,gd,cZ,eu,cT,f6,e_,fA,c
2,ek,gw,fm,fc,hp,fi,gI,gB,c4,hd,eM,ho,bE,dj,fO,hD,fo,d9,g3,fj,eA,fw,fV,gW,fY,gG,gp,bM,bK,fx,di,eH,gt,d3,f3,e
P,eh,c3,gg,hB,gA,gY,gH,f1,gS,dK,er,gZ,e1,gE,fr,f5,g5,g2,eB,fN,gK,g8,fS,eq,hx,dw,hu,dp,fG,fa,bR,hg,d4,cE,f4,d
M,fI,gl,e4,hc,dF,fF,c0,dk,ec,cG,dd],aws=[0,d0,dz,d$,dt,eC,fa,eF,dh,hl,f0,d4,fU,hy,bP,fd,cZ,hk,de,gK,cU,dq,dJ
,du,eb,dO,c4,hp,dg,eL,eT,gy,eD,f9,gQ,d9,eh,gf,gB,cW,cf,hi,gJ,c8,fw,dp,dB,hu,e3,c2,c$,dx,dn,gq,gs,dL,fR,dI,e9
,eN,hd,g4,dr,g2,gZ,cY,dd,eR,dm,gY,hm,eK,dC,gi,fr,dT,bJ,ga,gU,e7,el,ea,eY,fk,e$,di,e8,fm,hs,ep,d_,eZ,gD,dH,hr
,dk,fj,e_,g_,hw,eO,ec,ho,fG,f7,bl,g0,fY,dR,f8,ex,he,fI,ey,f2,fl,fN,fE,c7,bE,hv,fW,bo,dX,d6,gW,dl,g$,fh,gG,d5
,dc,gl,fB,er,fV,fL,c5,dG,c_,dF,fp,g6,fi,fn,hA,eu,d7,dv,fH,ft,ge,gH,em,gP,dy,fK,g9,en,f5,d1,cV,e1,eE,dP,f1,gz
,dK,fM,eU,c3,e4,ez,eq,eB,hB,dZ,eW,gN,gA,dD,bk,bN,hn,eV,gv,da,bS,bM,e5,go,eI,e2,fe,bQ,hg,fb,gI,c6,gE,gd,fZ,fD
,dE,hf,fc,gn,hz,fz,ee,gw,f6,d3,dA,fX,gc,gL,c1,d8,ed,fv,eX,dW,fJ,g3,hh,hx,eA,f4,dY,fC,eM,gM,f$,e0,gb,c9,fS,g7
,fs,g5,ha,df,dj,fq,cG,dS,fO,dw,dV,hD,eJ,ew,eH,eQ,fy,fg,fP,dN,fT,ej,ev,f_,hc,et,f3,hC,fF,dM,aP,g1,gS,d2,gh,fQ
,fu,ht,bK,es,gg,gR,fA,fo,gV,ff,gk,cT,ds,gO,cX,gF,cE,gm,g8,gx,ei,ef,gp,eG,ek,bR,c0,bu,hq,fx,gT,eP,db,dQ,gt,eS
,e6,gu],awt=[0,dd,cG,ec,dk,c0,fF,dF,hc,e4,gl,fI,dM,f4,cE,d4,hg,bR,fa,fG,dp,hu,dw,hx,eq,fS,g8,gK,fN,eB,g2,g5,
f5,fr,gE,e1,gZ,er,dK,gS,f1,gH,gY,gA,hB,gg,c3,eh,eP,f3,d3,gt,eH,di,fx,bK,bM,gp,gG,fY,gW,fV,fw,eA,fj,g3,d9,fo,
hD,fO,dj,bE,ho,eM,hd,c4,gB,gI,fi,hp,fc,fm,gw,ek,c2,fA,e_,f6,cT,eu,cZ,gd,aP,e2,d2,fn,dN,fH,gJ,dQ,hv,gO,cV,dn,
eD,ey,gk,hz,fu,fQ,fb,ef,es,fZ,dB,d$,gD,dP,gU,eC,dE,dx,f$,eT,gf,fk,dt,cf,go,dL,ex,bk,gb,fz,gm,gL,eN,c6,d1,eb,
bu,df,f0,g6,fP,dY,fl,ew,fD,dz,fe,dO,c_,dJ,eY,e3,fs,eJ,ea,hl,gx,d_,gi,ej,gN,eU,eQ,gQ,g4,d7,dX,eZ,e$,eE,hq,cX,
dH,d5,ha,fR,fT,dZ,hs,dG,hh,ep,de,ee,dm,hk,et,gh,e9,he,ez,g_,dD,gu,el,cW,dr,fg,du,e5,eF,fL,fM,fE,dA,g7,gs,gc,
dh,eK,fv,c9,dq,ga,dW,c1,ei,dT,hy,hA,fd,eI,gF,e7,cY,bQ,eO,g1,fh,dv,eW,eL,da,hC,f9,fy,d8,eS,c8,hr,gR,dl,eR,eX,
dC,g0,c$,bJ,gn,e0,dc,hw,db,f8,eG,bN,f7,fX,dy,d0,ht,dI,g9,gv,bP,gq,c7,fC,ff,f_,gV,e6,bS,f2,gy,d6,cU,gM,gP,fp,
ge,ed,e8,fW,fU,fq,dV,hm,ev,fJ,eV,ft,fK,dR,hn,hf,ds,g$,fB,en,gz,c5,dS,em,bl,hi,gT,dg,bo],awv="Jsoo_runtime.Er
ror.Exn",awH=[0,0],awA="use_strict",awB=AV,awC="esproposal_decorators",awD="pattern_matching",awE="enums",aw
F="components",awI="Internal error: ",NZ=[ah,"CamlinternalLazy.Undefined",hG(0)];function
./node_modules/readable-stream/lib/internal/streams/from-browser.js:module.exports = function () {
./node_modules/readable-stream/lib/internal/streams/buffer_list.js:module.exports = /*#__PURE__*/function ()
 {
./node_modules/@react-native-async-storage/async-storage/lib/module/hooks.js:export function useAsyncStorage
(key) {
./node_modules/@react-native-async-storage/async-storage/lib/module/shouldFallbackToLegacyNativeModule.js:ex
port function shouldFallbackToLegacyNativeModule() {
./node_modules/@react-native-async-storage/async-storage/lib/module/helpers.js:export function checkValidArg
s(keyValuePairs, callback) {
./node_modules/@react-native-async-storage/async-storage/lib/module/helpers.js:export function checkValidInp
ut(...input) {
./node_modules/@react-native-async-storage/async-storage/lib/module/helpers.js:export function convertError(
error) {
./node_modules/@react-native-async-storage/async-storage/lib/module/helpers.js:export function convertErrors
(errs) {
./node_modules/@react-native-async-storage/async-storage/src/helpers.ts:export function checkValidArgs(keyVa
luePairs: unknown[], callback: unknown) {
./node_modules/@react-native-async-storage/async-storage/src/helpers.ts:export function checkValidInput(...i
nput: unknown[]) {
./node_modules/@react-native-async-storage/async-storage/src/helpers.ts:export function convertError(error?:
 ErrorLike): Error | null {
./node_modules/@react-native-async-storage/async-storage/src/hooks.ts:export function useAsyncStorage(key: s
tring): AsyncStorageHook {
./node_modules/@react-native-async-storage/async-storage/src/shouldFallbackToLegacyNativeModule.ts:export fu
nction shouldFallbackToLegacyNativeModule(): boolean {
./node_modules/babel-preset-expo/build/expo-inline-manifest-plugin.d.ts:export declare function expoInlineMa
nifestPlugin(api: ConfigAPI & {
./node_modules/babel-preset-expo/build/environment-restricted-imports.d.ts:export declare function environme
ntRestrictedImportsPlugin(api: ConfigAPI & {
./node_modules/babel-preset-expo/build/inline-env-vars.d.ts:export declare function expoInlineEnvVars(api: C
onfigAPI & {
./node_modules/babel-preset-expo/build/web-preset.js:module.exports = function (babel, options) {
./node_modules/babel-preset-expo/build/server-actions-plugin.d.ts:export declare function reactServerActions
Plugin(api: ConfigAPI & {
./node_modules/babel-preset-expo/build/detect-dynamic-exports.d.ts:export declare function detectDynamicExpo
rts(api: ConfigAPI & {
./node_modules/babel-preset-expo/build/restricted-react-api-plugin.d.ts:export declare function environmentR
estrictedReactAPIsPlugin(api: ConfigAPI & {
./node_modules/babel-preset-expo/build/use-dom-directive-plugin.d.ts:export declare function expoUseDomDirec
tivePlugin(api: ConfigAPI & {
./node_modules/babel-preset-expo/build/expo-router-plugin.d.ts:export declare function expoRouterBabelPlugin
(api: ConfigAPI & {
./node_modules/babel-preset-expo/build/server-actions-plugin.js:                // Convert `export default f
unction foo() {}` to `function foo() {}; export { foo as default }`
./node_modules/babel-preset-expo/build/server-actions-plugin.js:                                // 1. if it'
s a `export async function foo() {}`, the declaration will be hoisted,
./node_modules/babel-preset-expo/build/minify-platform-select-plugin.d.ts:export default function minifyPlat
formSelectPlugin({ types: t, }: ConfigAPI & {
./node_modules/loader-runner/lib/loadLoader.js:module.exports = function loadLoader(loader, callback) {
./node_modules/loader-runner/lib/LoaderRunner.js:exports.getContext = function getContext(resource) {
./node_modules/loader-runner/lib/LoaderRunner.js:exports.runLoaders = function runLoaders(options, callback)
 {
./node_modules/fetch-retry/index.js:module.exports = function (fetch, defaults) {
./node_modules/entities/lib/esm/escape.js:export function encodeXML(str) {
./node_modules/entities/lib/esm/index.js:export function decode(data, options = EntityLevel.XML) {
./node_modules/entities/lib/esm/index.js:export function decodeStrict(data, options = EntityLevel.XML) {
./node_modules/entities/lib/esm/index.js:export function encode(data, options = EntityLevel.XML) {
./node_modules/entities/lib/esm/encode.js:export function encodeHTML(data) {
./node_modules/entities/lib/esm/encode.js:export function encodeNonAsciiHTML(data) {
./node_modules/entities/lib/esm/decode.js:export function determineBranch(decodeTree, current, nodeIdx, char
) {
./node_modules/entities/lib/esm/decode.js:export function decodeHTML(str, mode = DecodingMode.Legacy) {
./node_modules/entities/lib/esm/decode.js:export function decodeHTMLAttribute(str) {
./node_modules/entities/lib/esm/decode.js:export function decodeHTMLStrict(str) {
./node_modules/entities/lib/esm/decode.js:export function decodeXML(str) {
./node_modules/entities/lib/esm/decode_codepoint.js:export function replaceCodePoint(codePoint) {
./node_modules/entities/lib/esm/decode_codepoint.js:export default function decodeCodePoint(codePoint) {
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "encodeXML", { enumerable: true, get: fu
nction () { return escape_js_2.encodeXML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "escape", { enumerable: true, get: funct
ion () { return escape_js_2.escape; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "escapeUTF8", { enumerable: true, get: f
unction () { return escape_js_2.escapeUTF8; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "escapeAttribute", { enumerable: true, g
et: function () { return escape_js_2.escapeAttribute; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "escapeText", { enumerable: true, get: f
unction () { return escape_js_2.escapeText; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "encodeHTML", { enumerable: true, get: f
unction () { return encode_js_2.encodeHTML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "encodeNonAsciiHTML", { enumerable: true
, get: function () { return encode_js_2.encodeNonAsciiHTML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "encodeHTML4", { enumerable: true, get: 
function () { return encode_js_2.encodeHTML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "encodeHTML5", { enumerable: true, get: 
function () { return encode_js_2.encodeHTML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "EntityDecoder", { enumerable: true, get
: function () { return decode_js_2.EntityDecoder; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "DecodingMode", { enumerable: true, get:
 function () { return decode_js_2.DecodingMode; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeXML", { enumerable: true, get: fu
nction () { return decode_js_2.decodeXML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeHTML", { enumerable: true, get: f
unction () { return decode_js_2.decodeHTML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeHTMLStrict", { enumerable: true, 
get: function () { return decode_js_2.decodeHTMLStrict; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeHTMLAttribute", { enumerable: tru
e, get: function () { return decode_js_2.decodeHTMLAttribute; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeHTML4", { enumerable: true, get: 
function () { return decode_js_2.decodeHTML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeHTML5", { enumerable: true, get: 
function () { return decode_js_2.decodeHTML; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeHTML4Strict", { enumerable: true,
 get: function () { return decode_js_2.decodeHTMLStrict; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeHTML5Strict", { enumerable: true,
 get: function () { return decode_js_2.decodeHTMLStrict; } });
./node_modules/entities/lib/index.js:Object.defineProperty(exports, "decodeXMLStrict", { enumerable: true, g
et: function () { return decode_js_2.decodeXML; } });
./node_modules/entities/lib/decode.js:Object.defineProperty(exports, "replaceCodePoint", { enumerable: true,
 get: function () { return decode_codepoint_js_2.replaceCodePoint; } });
./node_modules/entities/lib/decode.js:Object.defineProperty(exports, "fromCodePoint", { enumerable: true, ge
t: function () { return decode_codepoint_js_2.fromCodePoint; } });
./node_modules/normalize-path/index.js:module.exports = function(path, stripTrailing) {
./node_modules/ws/lib/validation.js:  module.exports.isValidUTF8 = function (buf) {
./node_modules/ws/lib/validation.js:    module.exports.isValidUTF8 = function (buf) {
./node_modules/ws/lib/buffer-util.js:    module.exports.mask = function (source, mask, output, offset, lengt
h) {
./node_modules/ws/lib/buffer-util.js:    module.exports.unmask = function (buffer, mask) {
./node_modules/ws/browser.js:module.exports = function () {
./node_modules/fast-deep-equal/react.js:module.exports = function equal(a, b) {
./node_modules/fast-deep-equal/index.js:module.exports = function equal(a, b) {
./node_modules/fast-deep-equal/es6/react.js:module.exports = function equal(a, b) {
./node_modules/fast-deep-equal/es6/index.js:module.exports = function equal(a, b) {
./node_modules/jest-watch-typeahead/node_modules/char-regex/index.js:export default function charRegex() {
./node_modules/jest-watch-typeahead/node_modules/string-length/index.js:export default function stringLength
(string, {countAnsiEscapeCodes = false} = {}) {
./node_modules/jest-watch-typeahead/node_modules/slash/index.js:export default function slash(path) {
./node_modules/require-from-string/index.js:module.exports = function requireFromString(code, filename, opts
) {
./node_modules/selfsigned/index.js:exports.generate = function generate(attrs, options, done) {
./node_modules/glob-parent/index.js:module.exports = function globParent(str, opts) {
./node_modules/source-map-js/lib/quick-sort.js:exports.quickSort = function (ary, comparator, start = 0) {
./node_modules/source-map-js/lib/util.js:exports.isAbsolute = function (aPath) {
./node_modules/source-map-js/lib/base64-vlq.js:exports.encode = function base64VLQ_encode(aValue) {
./node_modules/source-map-js/lib/base64-vlq.js:exports.decode = function base64VLQ_decode(aStr, aIndex, aOut
Param) {
./node_modules/source-map-js/lib/binary-search.js:exports.search = function search(aNeedle, aHaystack, aComp
are, aBias) {
./node_modules/source-map-js/lib/base64.js:exports.encode = function (number) {
./node_modules/source-map-js/lib/base64.js:exports.decode = function (charCode) {
./node_modules/es-object-atoms/RequireObjectCoercible.js:module.exports = function RequireObjectCoercible(va
lue) {
./node_modules/es-object-atoms/isObject.js:module.exports = function isObject(x) {
./node_modules/es-object-atoms/ToObject.js:module.exports = function ToObject(value) {
./node_modules/path-scurry/node_modules/lru-cache/dist/commonjs/index.min.js:"use strict";var G=(l,t,e)=>{if
(!t.has(l))throw TypeError("Cannot "+e)};var j=(l,t,e)=>(G(l,t,"read from private field"),e?e.call(l):t.get(
l)),I=(l,t,e)=>{if(t.has(l))throw TypeError("Cannot add the same private member more than once");t instanceo
f WeakSet?t.add(l):t.set(l,e)},x=(l,t,e,i)=>(G(l,t,"write to private field"),i?i.call(l,e):t.set(l,e),e);Obj
ect.defineProperty(exports,"__esModule",{value:!0});exports.LRUCache=void 0;var T=typeof performance=="objec
t"&&performance&&typeof performance.now=="function"?performance:Date,P=new Set,U=typeof process=="object"&&p
rocess?process:{},H=(l,t,e,i)=>{typeof U.emitWarning=="function"?U.emitWarning(l,t,e,i):console.error(`[${e}
] ${t}: ${l}`)},D=globalThis.AbortController,N=globalThis.AbortSignal;if(typeof D>"u"){N=class{onabort;_onab
ort=[];reason;aborted=!1;addEventListener(i,s){this._onabort.push(s)}},D=class{constructor(){t()}signal=new
N;abort(i){if(!this.signal.aborted){this.signal.reason=i,this.signal.aborted=!0;for(let s of this.signal._on
abort)s(i);this.signal.onabort?.(i)}}};let l=U.env?.LRU_CACHE_IGNORE_AC_WARNING!=="1",t=()=>{l&&(l=!1,H("Abo
rtController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-
abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be
relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have
undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.","NO_ABORT_CONTROL
LER","ENOTSUP",t))}}var V=l=>!P.has(l),Y=Symbol("type"),A=l=>l&&l===Math.floor(l)&&l>0&&isFinite(l),k=l=>A(l
)?l<=Math.pow(2,8)?Uint8Array:l<=Math.pow(2,16)?Uint16Array:l<=Math.pow(2,32)?Uint32Array:l<=Number.MAX_SAFE
_INTEGER?E:null:null,E=class extends Array{constructor(t){super(t),this.fill(0)}},v,O=class{heap;length;stat
ic create(t){let e=k(t);if(!e)return[];x(O,v,!0);let i=new O(t,e);return x(O,v,!1),i}constructor(t,e){if(!j(
O,v))throw new TypeError("instantiate Stack using Stack.create(n)");this.heap=new e(t),this.length=0}push(t)
{this.heap[this.length++]=t}pop(){return this.heap[--this.length]}},W=O;v=new WeakMap,I(W,v,!1);var C=class{
#g;#f;#p;#w;#R;#W;ttl;ttlResolution;ttlAutopurge;updateAgeOnGet;updateAgeOnHas;allowStale;noDisposeOnSet;noU
pdateTTL;maxEntrySize;sizeCalculation;noDeleteOnFetchRejection;noDeleteOnStaleGet;allowStaleOnFetchAbort;all
owStaleOnFetchRejection;ignoreFetchAbort;#n;#S;#s;#i;#t;#l;#c;#o;#h;#_;#r;#b;#m;#u;#y;#E;#a;static unsafeExp
oseInternals(t){return{starts:t.#m,ttls:t.#u,sizes:t.#b,keyMap:t.#s,keyList:t.#i,valList:t.#t,next:t.#l,prev
:t.#c,get head(){return t.#o},get tail(){return t.#h},free:t.#_,isBackgroundFetch:e=>t.#e(e),backgroundFetch
:(e,i,s,n)=>t.#x(e,i,s,n),moveToTail:e=>t.#C(e),indexes:e=>t.#A(e),rindexes:e=>t.#F(e),isStale:e=>t.#d(e)}}g
et max(){return this.#g}get maxSize(){return this.#f}get calculatedSize(){return this.#S}get size(){return t
his.#n}get fetchMethod(){return this.#R}get memoMethod(){return this.#W}get dispose(){return this.#p}get dis
poseAfter(){return this.#w}constructor(t){let{max:e=0,ttl:i,ttlResolution:s=1,ttlAutopurge:n,updateAgeOnGet:
h,updateAgeOnHas:o,allowStale:r,dispose:g,disposeAfter:b,noDisposeOnSet:f,noUpdateTTL:u,maxSize:c=0,maxEntry
Size:F=0,sizeCalculation:d,fetchMethod:S,memoMethod:a,noDeleteOnFetchRejection:w,noDeleteOnStaleGet:m,allowS
taleOnFetchRejection:p,allowStaleOnFetchAbort:_,ignoreFetchAbort:z}=t;if(e!==0&&!A(e))throw new TypeError("m
ax option must be a nonnegative integer");let y=e?k(e):Array;if(!y)throw new Error("invalid max value: "+e);
if(this.#g=e,this.#f=c,this.maxEntrySize=F||this.#f,this.sizeCalculation=d,this.sizeCalculation){if(!this.#f
&&!this.maxEntrySize)throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize
");if(typeof this.sizeCalculation!="function")throw new TypeError("sizeCalculation set to non-function")}if(
a!==void 0&&typeof a!="function")throw new TypeError("memoMethod must be a function if defined");if(this.#W=
a,S!==void 0&&typeof S!="function")throw new TypeError("fetchMethod must be a function if specified");if(thi
s.#R=S,this.#E=!!S,this.#s=new Map,this.#i=new Array(e).fill(void 0),this.#t=new Array(e).fill(void 0),this.
#l=new y(e),this.#c=new y(e),this.#o=0,this.#h=0,this.#_=W.create(e),this.#n=0,this.#S=0,typeof g=="function
"&&(this.#p=g),typeof b=="function"?(this.#w=b,this.#r=[]):(this.#w=void 0,this.#r=void 0),this.#y=!!this.#p
,this.#a=!!this.#w,this.noDisposeOnSet=!!f,this.noUpdateTTL=!!u,this.noDeleteOnFetchRejection=!!w,this.allow
StaleOnFetchRejection=!!p,this.allowStaleOnFetchAbort=!!_,this.ignoreFetchAbort=!!z,this.maxEntrySize!==0){i
f(this.#f!==0&&!A(this.#f))throw new TypeError("maxSize must be a positive integer if specified");if(!A(this
.maxEntrySize))throw new TypeError("maxEntrySize must be a positive integer if specified");this.#P()}if(this
.allowStale=!!r,this.noDeleteOnStaleGet=!!m,this.updateAgeOnGet=!!h,this.updateAgeOnHas=!!o,this.ttlResoluti
on=A(s)||s===0?s:1,this.ttlAutopurge=!!n,this.ttl=i||0,this.ttl){if(!A(this.ttl))throw new TypeError("ttl mu
st be a positive integer if specified");this.#U()}if(this.#g===0&&this.ttl===0&&this.#f===0)throw new TypeEr
ror("At least one of max, maxSize, or ttl is required");if(!this.ttlAutopurge&&!this.#g&&!this.#f){let R="LR
U_CACHE_UNBOUNDED";V(R)&&(P.add(R),H("TTL caching without ttlAutopurge, max, or maxSize can result in unboun
ded memory consumption.","UnboundedCacheWarning",R,C))}}getRemainingTTL(t){return this.#s.has(t)?1/0:0}#U(){
let t=new E(this.#g),e=new E(this.#g);this.#u=t,this.#m=e,this.#M=(n,h,o=T.now())=>{if(e[n]=h!==0?o:0,t[n]=h
,h!==0&&this.ttlAutopurge){let r=setTimeout(()=>{this.#d(n)&&this.#T(this.#i[n],"expire")},h+1);r.unref&&r.u
nref()}},this.#v=n=>{e[n]=t[n]!==0?T.now():0},this.#O=(n,h)=>{if(t[h]){let o=t[h],r=e[h];if(!o||!r)return;n.
ttl=o,n.start=r,n.now=i||s();let g=n.now-r;n.remainingTTL=o-g}};let i=0,s=()=>{let n=T.now();if(this.ttlReso
lution>0){i=n;let h=setTimeout(()=>i=0,this.ttlResolution);h.unref&&h.unref()}return n};this.getRemainingTTL
=n=>{let h=this.#s.get(n);if(h===void 0)return 0;let o=t[h],r=e[h];if(!o||!r)return 1/0;let g=(i||s())-r;ret
urn o-g},this.#d=n=>{let h=e[n],o=t[n];return!!o&&!!h&&(i||s())-h>o}}#v=()=>{};#O=()=>{};#M=()=>{};#d=()=>!1
;#P(){let t=new E(this.#g);this.#S=0,this.#b=t,this.#z=e=>{this.#S-=t[e],t[e]=0},this.#G=(e,i,s,n)=>{if(this
.#e(i))return 0;if(!A(s))if(n){if(typeof n!="function")throw new TypeError("sizeCalculation must be a functi
on");if(s=n(i,e),!A(s))throw new TypeError("sizeCalculation return invalid (expect positive integer)")}else
throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, si
zeCalculation or size must be set.");return s},this.#D=(e,i,s)=>{if(t[e]=i,this.#f){let n=this.#f-t[e];for(;
this.#S>n;)this.#L(!0)}this.#S+=t[e],s&&(s.entrySize=i,s.totalCalculatedSize=this.#S)}}#z=t=>{};#D=(t,e,i)=>
{};#G=(t,e,i,s)=>{if(i||s)throw new TypeError("cannot set size without setting maxSize or maxEntrySize on ca
che");return 0};*#A({allowStale:t=this.allowStale}={}){if(this.#n)for(let e=this.#h;!(!this.#j(e)||((t||!thi
s.#d(e))&&(yield e),e===this.#o));)e=this.#c[e]}*#F({allowStale:t=this.allowStale}={}){if(this.#n)for(let e=
this.#o;!(!this.#j(e)||((t||!this.#d(e))&&(yield e),e===this.#h));)e=this.#l[e]}#j(t){return t!==void 0&&thi
s.#s.get(this.#i[t])===t}*entries(){for(let t of this.#A())this.#t[t]!==void 0&&this.#i[t]!==void 0&&!this.#
e(this.#t[t])&&(yield[this.#i[t],this.#t[t]])}*rentries(){for(let t of this.#F())this.#t[t]!==void 0&&this.#
i[t]!==void 0&&!this.#e(this.#t[t])&&(yield[this.#i[t],this.#t[t]])}*keys(){for(let t of this.#A()){let e=th
is.#i[t];e!==void 0&&!this.#e(this.#t[t])&&(yield e)}}*rkeys(){for(let t of this.#F()){let e=this.#i[t];e!==
void 0&&!this.#e(this.#t[t])&&(yield e)}}*values(){for(let t of this.#A())this.#t[t]!==void 0&&!this.#e(this
.#t[t])&&(yield this.#t[t])}*rvalues(){for(let t of this.#F())this.#t[t]!==void 0&&!this.#e(this.#t[t])&&(yi
eld this.#t[t])}[Symbol.iterator](){return this.entries()}[Symbol.toStringTag]="LRUCache";find(t,e={}){for(l
et i of this.#A()){let s=this.#t[i],n=this.#e(s)?s.__staleWhileFetching:s;if(n!==void 0&&t(n,this.#i[i],this
))return this.get(this.#i[i],e)}}forEach(t,e=this){for(let i of this.#A()){let s=this.#t[i],n=this.#e(s)?s._
_staleWhileFetching:s;n!==void 0&&t.call(e,n,this.#i[i],this)}}rforEach(t,e=this){for(let i of this.#F()){le
t s=this.#t[i],n=this.#e(s)?s.__staleWhileFetching:s;n!==void 0&&t.call(e,n,this.#i[i],this)}}purgeStale(){l
et t=!1;for(let e of this.#F({allowStale:!0}))this.#d(e)&&(this.#T(this.#i[e],"expire"),t=!0);return t}info(
t){let e=this.#s.get(t);if(e===void 0)return;let i=this.#t[e],s=this.#e(i)?i.__staleWhileFetching:i;if(s===v
oid 0)return;let n={value:s};if(this.#u&&this.#m){let h=this.#u[e],o=this.#m[e];if(h&&o){let r=h-(T.now()-o)
;n.ttl=r,n.start=Date.now()}}return this.#b&&(n.size=this.#b[e]),n}dump(){let t=[];for(let e of this.#A({all
owStale:!0})){let i=this.#i[e],s=this.#t[e],n=this.#e(s)?s.__staleWhileFetching:s;if(n===void 0||i===void 0)
continue;let h={value:n};if(this.#u&&this.#m){h.ttl=this.#u[e];let o=T.now()-this.#m[e];h.start=Math.floor(D
ate.now()-o)}this.#b&&(h.size=this.#b[e]),t.unshift([i,h])}return t}load(t){this.clear();for(let[e,i]of t){i
f(i.start){let s=Date.now()-i.start;i.start=T.now()-s}this.set(e,i.value,i)}}set(t,e,i={}){if(e===void 0)ret
urn this.delete(t),this;let{ttl:s=this.ttl,start:n,noDisposeOnSet:h=this.noDisposeOnSet,sizeCalculation:o=th
is.sizeCalculation,status:r}=i,{noUpdateTTL:g=this.noUpdateTTL}=i,b=this.#G(t,e,i.size||0,o);if(this.maxEntr
ySize&&b>this.maxEntrySize)return r&&(r.set="miss",r.maxEntrySizeExceeded=!0),this.#T(t,"set"),this;let f=th
is.#n===0?void 0:this.#s.get(t);if(f===void 0)f=this.#n===0?this.#h:this.#_.length!==0?this.#_.pop():this.#n
===this.#g?this.#L(!1):this.#n,this.#i[f]=t,this.#t[f]=e,this.#s.set(t,f),this.#l[this.#h]=f,this.#c[f]=this
.#h,this.#h=f,this.#n++,this.#D(f,b,r),r&&(r.set="add"),g=!1;else{this.#C(f);let u=this.#t[f];if(e!==u){if(t
his.#E&&this.#e(u)){u.__abortController.abort(new Error("replaced"));let{__staleWhileFetching:c}=u;c!==void
0&&!h&&(this.#y&&this.#p?.(c,t,"set"),this.#a&&this.#r?.push([c,t,"set"]))}else h||(this.#y&&this.#p?.(u,t,"
set"),this.#a&&this.#r?.push([u,t,"set"]));if(this.#z(f),this.#D(f,b,r),this.#t[f]=e,r){r.set="replace";let
c=u&&this.#e(u)?u.__staleWhileFetching:u;c!==void 0&&(r.oldValue=c)}}else r&&(r.set="update")}if(s!==0&&!thi
s.#u&&this.#U(),this.#u&&(g||this.#M(f,s,n),r&&this.#O(r,f)),!h&&this.#a&&this.#r){let u=this.#r,c;for(;c=u?
.shift();)this.#w?.(...c)}return this}pop(){try{for(;this.#n;){let t=this.#t[this.#o];if(this.#L(!0),this.#e
(t)){if(t.__staleWhileFetching)return t.__staleWhileFetching}else if(t!==void 0)return t}}finally{if(this.#a
&&this.#r){let t=this.#r,e;for(;e=t?.shift();)this.#w?.(...e)}}}#L(t){let e=this.#o,i=this.#i[e],s=this.#t[e
];return this.#E&&this.#e(s)?s.__abortController.abort(new Error("evicted")):(this.#y||this.#a)&&(this.#y&&t
his.#p?.(s,i,"evict"),this.#a&&this.#r?.push([s,i,"evict"])),this.#z(e),t&&(this.#i[e]=void 0,this.#t[e]=voi
d 0,this.#_.push(e)),this.#n===1?(this.#o=this.#h=0,this.#_.length=0):this.#o=this.#l[e],this.#s.delete(i),t
his.#n--,e}has(t,e={}){let{updateAgeOnHas:i=this.updateAgeOnHas,status:s}=e,n=this.#s.get(t);if(n!==void 0){
let h=this.#t[n];if(this.#e(h)&&h.__staleWhileFetching===void 0)return!1;if(this.#d(n))s&&(s.has="stale",thi
s.#O(s,n));else return i&&this.#v(n),s&&(s.has="hit",this.#O(s,n)),!0}else s&&(s.has="miss");return!1}peek(t
,e={}){let{allowStale:i=this.allowStale}=e,s=this.#s.get(t);if(s===void 0||!i&&this.#d(s))return;let n=this.
#t[s];return this.#e(n)?n.__staleWhileFetching:n}#x(t,e,i,s){let n=e===void 0?void 0:this.#t[e];if(this.#e(n
))return n;let h=new D,{signal:o}=i;o?.addEventListener("abort",()=>h.abort(o.reason),{signal:h.signal});let
 r={signal:h.signal,options:i,context:s},g=(d,S=!1)=>{let{aborted:a}=h.signal,w=i.ignoreFetchAbort&&d!==void
 0;if(i.status&&(a&&!S?(i.status.fetchAborted=!0,i.status.fetchError=h.signal.reason,w&&(i.status.fetchAbort
Ignored=!0)):i.status.fetchResolved=!0),a&&!w&&!S)return f(h.signal.reason);let m=c;return this.#t[e]===c&&(
d===void 0?m.__staleWhileFetching?this.#t[e]=m.__staleWhileFetching:this.#T(t,"fetch"):(i.status&&(i.status.
fetchUpdated=!0),this.set(t,d,r.options))),d},b=d=>(i.status&&(i.status.fetchRejected=!0,i.status.fetchError
=d),f(d)),f=d=>{let{aborted:S}=h.signal,a=S&&i.allowStaleOnFetchAbort,w=a||i.allowStaleOnFetchRejection,m=w|
|i.noDeleteOnFetchRejection,p=c;if(this.#t[e]===c&&(!m||p.__staleWhileFetching===void 0?this.#T(t,"fetch"):a
||(this.#t[e]=p.__staleWhileFetching)),w)return i.status&&p.__staleWhileFetching!==void 0&&(i.status.returne
dStale=!0),p.__staleWhileFetching;if(p.__returned===p)throw d},u=(d,S)=>{let a=this.#R?.(t,n,r);a&&a instanc
eof Promise&&a.then(w=>d(w===void 0?void 0:w),S),h.signal.addEventListener("abort",()=>{(!i.ignoreFetchAbort
||i.allowStaleOnFetchAbort)&&(d(void 0),i.allowStaleOnFetchAbort&&(d=w=>g(w,!0)))})};i.status&&(i.status.fet
chDispatched=!0);let c=new Promise(u).then(g,b),F=Object.assign(c,{__abortController:h,__staleWhileFetching:
n,__returned:void 0});return e===void 0?(this.set(t,F,{...r.options,status:void 0}),e=this.#s.get(t)):this.#
t[e]=F,F}#e(t){if(!this.#E)return!1;let e=t;return!!e&&e instanceof Promise&&e.hasOwnProperty("__staleWhileF
etching")&&e.__abortController instanceof D}async fetch(t,e={}){let{allowStale:i=this.allowStale,updateAgeOn
Get:s=this.updateAgeOnGet,noDeleteOnStaleGet:n=this.noDeleteOnStaleGet,ttl:h=this.ttl,noDisposeOnSet:o=this.
noDisposeOnSet,size:r=0,sizeCalculation:g=this.sizeCalculation,noUpdateTTL:b=this.noUpdateTTL,noDeleteOnFetc
hRejection:f=this.noDeleteOnFetchRejection,allowStaleOnFetchRejection:u=this.allowStaleOnFetchRejection,igno
reFetchAbort:c=this.ignoreFetchAbort,allowStaleOnFetchAbort:F=this.allowStaleOnFetchAbort,context:d,forceRef
resh:S=!1,status:a,signal:w}=e;if(!this.#E)return a&&(a.fetch="get"),this.get(t,{allowStale:i,updateAgeOnGet
:s,noDeleteOnStaleGet:n,status:a});let m={allowStale:i,updateAgeOnGet:s,noDeleteOnStaleGet:n,ttl:h,noDispose
OnSet:o,size:r,sizeCalculation:g,noUpdateTTL:b,noDeleteOnFetchRejection:f,allowStaleOnFetchRejection:u,allow
StaleOnFetchAbort:F,ignoreFetchAbort:c,status:a,signal:w},p=this.#s.get(t);if(p===void 0){a&&(a.fetch="miss"
);let _=this.#x(t,p,m,d);return _.__returned=_}else{let _=this.#t[p];if(this.#e(_)){let M=i&&_.__staleWhileF
etching!==void 0;return a&&(a.fetch="inflight",M&&(a.returnedStale=!0)),M?_.__staleWhileFetching:_.__returne
d=_}let z=this.#d(p);if(!S&&!z)return a&&(a.fetch="hit"),this.#C(p),s&&this.#v(p),a&&this.#O(a,p),_;let y=th
is.#x(t,p,m,d),L=y.__staleWhileFetching!==void 0&&i;return a&&(a.fetch=z?"stale":"refresh",L&&z&&(a.returned
Stale=!0)),L?y.__staleWhileFetching:y.__returned=y}}async forceFetch(t,e={}){let i=await this.fetch(t,e);if(
i===void 0)throw new Error("fetch() returned undefined");return i}memo(t,e={}){let i=this.#W;if(!i)throw new
 Error("no memoMethod provided to constructor");let{context:s,forceRefresh:n,...h}=e,o=this.get(t,h);if(!n&&
o!==void 0)return o;let r=i(t,o,{options:h,context:s});return this.set(t,r,h),r}get(t,e={}){let{allowStale:i
=this.allowStale,updateAgeOnGet:s=this.updateAgeOnGet,noDeleteOnStaleGet:n=this.noDeleteOnStaleGet,status:h}
=e,o=this.#s.get(t);if(o!==void 0){let r=this.#t[o],g=this.#e(r);return h&&this.#O(h,o),this.#d(o)?(h&&(h.ge
t="stale"),g?(h&&i&&r.__staleWhileFetching!==void 0&&(h.returnedStale=!0),i?r.__staleWhileFetching:void 0):(
n||this.#T(t,"expire"),h&&i&&(h.returnedStale=!0),i?r:void 0)):(h&&(h.get="hit"),g?r.__staleWhileFetching:(t
his.#C(o),s&&this.#v(o),r))}else h&&(h.get="miss")}#I(t,e){this.#c[e]=t,this.#l[t]=e}#C(t){t!==this.#h&&(t==
=this.#o?this.#o=this.#l[t]:this.#I(this.#c[t],this.#l[t]),this.#I(this.#h,t),this.#h=t)}delete(t){return th
is.#T(t,"delete")}#T(t,e){let i=!1;if(this.#n!==0){let s=this.#s.get(t);if(s!==void 0)if(i=!0,this.#n===1)th
is.#N(e);else{this.#z(s);let n=this.#t[s];if(this.#e(n)?n.__abortController.abort(new Error("deleted")):(thi
s.#y||this.#a)&&(this.#y&&this.#p?.(n,t,e),this.#a&&this.#r?.push([n,t,e])),this.#s.delete(t),this.#i[s]=voi
d 0,this.#t[s]=void 0,s===this.#h)this.#h=this.#c[s];else if(s===this.#o)this.#o=this.#l[s];else{let h=this.
#c[s];this.#l[h]=this.#l[s];let o=this.#l[s];this.#c[o]=this.#c[s]}this.#n--,this.#_.push(s)}}if(this.#a&&th
is.#r?.length){let s=this.#r,n;for(;n=s?.shift();)this.#w?.(...n)}return i}clear(){return this.#N("delete")}
#N(t){for(let e of this.#F({allowStale:!0})){let i=this.#t[e];if(this.#e(i))i.__abortController.abort(new Er
ror("deleted"));else{let s=this.#i[e];this.#y&&this.#p?.(i,s,t),this.#a&&this.#r?.push([i,s,t])}}if(this.#s.
clear(),this.#t.fill(void 0),this.#i.fill(void 0),this.#u&&this.#m&&(this.#u.fill(0),this.#m.fill(0)),this.#
b&&this.#b.fill(0),this.#o=0,this.#h=0,this.#_.length=0,this.#S=0,this.#n=0,this.#a&&this.#r){let e=this.#r,
i;for(;i=e?.shift();)this.#w?.(...i)}}};exports.LRUCache=C;
./babel.config.js:module.exports = function(api) {
./App.js:export default function App() {

```

---

_****_



---



---

