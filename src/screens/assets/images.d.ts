// Declaración de módulos para imágenes PNG
// Permite importar imágenes en TypeScript sin error de tipo

declare module '*.png' {
  const value: any;
  export default value;
}