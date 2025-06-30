// Declaración de módulos para imágenes PNG y JPG
// Permite importar imágenes en TypeScript sin error de tipo

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}
