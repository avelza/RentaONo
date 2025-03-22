
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  form.innerHTML = `
    <label>Precio de compra (€)</label>
    <input type="number" id="precioCompra" />

    <label>Capital inicial (€)</label>
    <input type="number" id="capitalInicial" />

    <label>Hipoteca (¿Sí o No?)</label>
    <select id="tieneHipoteca" onchange="toggleHipoteca()">
      <option value="no">No</option>
      <option value="si">Sí</option>
    </select>

    <div id="datosHipoteca" style="display:none;">
      <label>Importe de hipoteca (€)</label>
      <input type="number" id="importeHipoteca" />
      <label>Duración (años)</label>
      <input type="number" id="duracionHipoteca" />
      <label>Tipo de interés</label>
      <select id="tipoInteres" onchange="mostrarInteres()">
        <option value="">Selecciona</option>
        <option value="fijo">Fijo</option>
        <option value="variable">Variable</option>
      </select>
      <div id="interesFijo" style="display:none;">
        <label>Interés fijo anual (%)</label>
        <input type="number" id="interesFijoValor" />
      </div>
      <div id="interesVariable" style="display:none;">
        <label>Diferencial (%)</label>
        <input type="number" id="diferencial" />
        <label>Euríbor (%) separados por coma</label>
        <input type="text" id="euriborValores" placeholder="Ej: 2.5,2.6,2.7" />
      </div>
    </div>

    <label>Ingreso mensual por alquiler (€)</label>
    <input type="number" id="alquilerMensual" />

    <label>Duración análisis (años)</label>
    <input type="number" id="duracionAnalisis" />

    <label>Precio venta estimado (€)</label>
    <input type="number" id="precioVenta" />
  `;
});

function toggleHipoteca() {
  const tiene = document.getElementById("tieneHipoteca").value;
  document.getElementById("datosHipoteca").style.display = tiene === "si" ? "block" : "none";
}

function mostrarInteres() {
  const tipo = document.getElementById("tipoInteres").value;
  document.getElementById("interesFijo").style.display = tipo === "fijo" ? "block" : "none";
  document.getElementById("interesVariable").style.display = tipo === "variable" ? "block" : "none";
}

function calcularRentabilidad() {
  const precioCompra = parseFloat(document.getElementById("precioCompra").value);
  const capitalInicial = parseFloat(document.getElementById("capitalInicial").value);
  const alquilerMensual = parseFloat(document.getElementById("alquilerMensual").value);
  const precioVenta = parseFloat(document.getElementById("precioVenta").value);
  const duracion = parseFloat(document.getElementById("duracionAnalisis").value);

  const ingresos = alquilerMensual * 12 * duracion;
  const beneficio = (precioVenta + ingresos) - precioCompra;
  const roi = (beneficio / capitalInicial) * 100;

  document.getElementById("resultados").innerHTML = `
    <h3>Resultados</h3>
    <p>Ingresos por alquiler: €${ingresos.toFixed(2)}</p>
    <p>Beneficio total: €${beneficio.toFixed(2)}</p>
    <p>ROI: ${roi.toFixed(2)}%</p>
  `;
  document.getElementById("resultados").style.display = "block";
}
