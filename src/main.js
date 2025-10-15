import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.getElementById("btnBuscar").addEventListener("click", () => {
  const texto = document.getElementById("texto").value;
  const entrada = document.getElementById("busqueda").value;

  if (entrada.length === 0) {
    document.getElementById("resultado").textContent = "Escribe al menos una palabra para buscar.";
    document.getElementById("textoResaltado").innerHTML = texto;
    return;
  }


  const palabras = entrada.split(",").map(p => p.length === 0 ? " " : p).filter(p => p.length > 0 || p === " ");

  let textoResaltado = texto;
  let totalCoincidencias = 0;

  palabras.forEach(palabra => {
    let regex;

    if (palabra === " ") {
 
      regex = / /g;
    } else {
 
      regex = new RegExp(`\\b(${palabra})\\b`, "gi");
    }

    const coincidencias = texto.match(regex);

    if (coincidencias) {
      totalCoincidencias += coincidencias.length;

      if (palabra === " ") {
     
        textoResaltado = textoResaltado.replace(regex, '<mark> </mark>');
      } else {
        textoResaltado = textoResaltado.replace(regex, '<mark>$1</mark>');
      }
    }
  });


  document.getElementById("textoResaltado").innerHTML = textoResaltado;

  
  if (totalCoincidencias > 0) {
    document.getElementById("resultado").textContent = `Se encontraron ${totalCoincidencias} coincidencias exactas.`;
  } else {
    document.getElementById("resultado").textContent = "No se encontraron coincidencias exactas.";
  }
});
