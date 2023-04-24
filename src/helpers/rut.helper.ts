const cleanRut = (rut: string): string => {
  return rut
    .toString()
    .toLocaleLowerCase()
    .replace(/[^0-9k]/g, '');
};

export { cleanRut };
