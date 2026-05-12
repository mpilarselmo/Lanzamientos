const state = {
  estadoRows: [],
  lanzamientos: [], // Array of {code, rows, name}
  filteredEstadoRows: [],
  comparisonRows: [],
  columns: {},
  chart: null,
  lanzamientoCode: "MANUAL",
  negocioMap: new Map(),
  segmentoMap: new Map(),
  negocioCodificadoMap: new Map(),
  negocioSourceRows: [],
  currentMonth: null,
  currentYear: null,
};

// Datos hardcodeados de Negocio-Segmento
const NEGOCIO_SEGMENTO_DATA = [
  { "codigo negocio": "01", "negocio": "Golosinas" },
  { "codigo negocio": "03", "negocio": "Alimentos" },
  { "codigo negocio": "08", "negocio": "Agroindustria" },
  { "codigo negocio": "10", "negocio": "Chocolates" },
  { "codigo negocio": "12", "negocio": "Harinas" }
];

// Datos hardcodeados de Codigo VTA 1 - Segmento
const CODIGO_VTA_1_SEGMENTO_DATA = [
  { "codigo vta 1": "0001", "segmento": "CARAMELOS DE LECHE" },
  { "codigo vta 1": "0002", "segmento": "MASTICABLES" },
  { "codigo vta 1": "0003", "segmento": "CARAMELOS DUROS" },
  { "codigo vta 1": "0004", "segmento": "CHUPETINES" },
  { "codigo vta 1": "0005", "segmento": "CARAMELOS DE GOMA" },
  { "codigo vta 1": "0007", "segmento": "TURRON OBLEA" },
  { "codigo vta 1": "0008", "segmento": "DUROS AGRUPADOS" },
  { "codigo vta 1": "0009", "segmento": "CHICLES PLEGADOS" },
  { "codigo vta 1": "0010", "segmento": "CHICLES CONFITADOS" },
  { "codigo vta 1": "0013", "segmento": "NAVIDAD GOLOSINAS" },
  { "codigo vta 1": "0016", "segmento": "HALLOWEEN GOLOSINAS" },
  { "codigo vta 1": "0160", "segmento": "NUTRICION" },
  { "codigo vta 1": "0177", "segmento": "GOLOSINAS MARCAS BLANCAS" },
  { "codigo vta 1": "0201", "segmento": "EXTRUDADOS" },
  { "codigo vta 1": "0030", "segmento": "DULCES SOLIDOS" },
  { "codigo vta 1": "0031", "segmento": "MERMELADAS" },
  { "codigo vta 1": "0033", "segmento": "CONSERVAS VEGETALES" },
  { "codigo vta 1": "0035", "segmento": "PREMEZCLAS CHICAS" },
  { "codigo vta 1": "0036", "segmento": "JUGOS EN POLVO" },
  { "codigo vta 1": "0037", "segmento": "CACAO EN POLVO" },
  { "codigo vta 1": "0038", "segmento": "POLENTA" },
  { "codigo vta 1": "0039", "segmento": "ACEITE" },
  { "codigo vta 1": "0042", "segmento": "CONSERVAS DE PESCADO" },
  { "codigo vta 1": "0043", "segmento": "ALIMENTOS MARCAS BLANCAS" },
  { "codigo vta 1": "0044", "segmento": "ALIMENTOS INDUSTRIALES" },
  { "codigo vta 1": "0116", "segmento": "BEBIDAS" },
  { "codigo vta 1": "0122", "segmento": "DULCE DE LECHE" },
  { "codigo vta 1": "0123", "segmento": "ADEREZOS" },
  { "codigo vta 1": "0124", "segmento": "PASTAS SECAS" },
  { "codigo vta 1": "0138", "segmento": "SABORES" },
  { "codigo vta 1": "0172", "segmento": "PREMEZCLAS SIN GLUTEN" },
  { "codigo vta 1": "0203", "segmento": "PREMEZCLAS HORNEABLES" },
  { "codigo vta 1": "0206", "segmento": "RAMEN" },
  { "codigo vta 1": "0214", "segmento": "TOMATES MASIVOS" },
  { "codigo vta 1": "0215", "segmento": "TOMATES PREMIUM" },
  { "codigo vta 1": "0171", "segmento": "ENDULZANTES" },
  { "codigo vta 1": "0060", "segmento": "BOCADITOS Y BOMBONES" },
  { "codigo vta 1": "0061", "segmento": "TABLETAS" },
  { "codigo vta 1": "0063", "segmento": "OBLEAS BAÑADAS" },
  { "codigo vta 1": "0064", "segmento": "CONFITES Y MANI BAÑADO" },
  { "codigo vta 1": "0065", "segmento": "LINEA INFANTIL" },
  { "codigo vta 1": "0066", "segmento": "LINEA HOGAR" },
  { "codigo vta 1": "0067", "segmento": "HUEVOS DE PASCUA" },
  { "codigo vta 1": "0069", "segmento": "NAVIDAD CHOCOLATES" },
  { "codigo vta 1": "0072", "segmento": "HALLOWEEN CHOCOLATES" },
  { "codigo vta 1": "0078", "segmento": "CANDY BAR" },
  { "codigo vta 1": "0079", "segmento": "INDUSTRIALES" },
  { "codigo vta 1": "0120", "segmento": "HELADOS IMPULSO" },
  { "codigo vta 1": "0159", "segmento": "FRUTAS CON CHOCOLATE" },
  { "codigo vta 1": "0165", "segmento": "HELADOS HOGAR" },
  { "codigo vta 1": "0076", "segmento": "SURTIDAS" },
  { "codigo vta 1": "0080", "segmento": "GALLETAS DULCES SECAS" },
  { "codigo vta 1": "0081", "segmento": "DULCES RELLENAS" },
  { "codigo vta 1": "0082", "segmento": "CRACKERS SANDWICH" },
  { "codigo vta 1": "0083", "segmento": "GALLETITAS CEREALES" },
  { "codigo vta 1": "0084", "segmento": "OBLEAS" },
  { "codigo vta 1": "0086", "segmento": "SNACKS HORNEADOS" },
  { "codigo vta 1": "0089", "segmento": "NAVIDAD HARINAS" },
  { "codigo vta 1": "0111", "segmento": "BARRAS DE CEREAL" },
  { "codigo vta 1": "0113", "segmento": "ALFAJORES" },
  { "codigo vta 1": "0114", "segmento": "CRACKERS AGUA" },
  { "codigo vta 1": "0129", "segmento": "TOSTADAS" },
  { "codigo vta 1": "0130", "segmento": "CEREALES PARA DESAYUNO" },
  { "codigo vta 1": "0133", "segmento": "SNACKS DE COPETIN" },
  { "codigo vta 1": "0155", "segmento": "GALLETAS BAÑADAS" },
  { "codigo vta 1": "0207", "segmento": "COOKIES" }
];

const CATEGORY_LABELS = {
  facturada_hoy_580_610: "Facturado hoy 580/610",
  facturada_610_999: "Facturado 610/999",
  depurado_980_984_999: "Depurado 980/999 y 984/999",
  listo_cargar_560_565: "Listo cargar 560/565",
  carga_proceso_535_555: "Carga proceso 535-555",
  sin_carga_menor_535: "Sin carga < 535",
  depurado_cuota_527: "Depurado cuota 527",
  otros: "Otros",
};

const CATEGORY_ORDER = [
  "facturada_hoy_580_610",
  "facturada_610_999",
  "depurado_980_984_999",
  "listo_cargar_560_565",
  "carga_proceso_535_555",
  "sin_carga_menor_535",
  "depurado_cuota_527",
  "otros",
];

const els = {
  estadoFile: document.getElementById("estadoFile"),
  launchPlansContainer: document.getElementById("launchPlansContainer"),
  addLaunchPlanBtn: document.getElementById("addLaunchPlanBtn"),
  loadBtn: document.getElementById("loadBtn"),
  loadStatus: document.getElementById("loadStatus"),
  filtersSection: document.getElementById("filtersSection"),
  resultsSection: document.getElementById("resultsSection"),
  lanzamientoSection: document.getElementById("lanzamientoSection"),
  applyFilters: document.getElementById("applyFilters"),
  vigenciaDate: document.getElementById("vigenciaDate"),
  ocSelect: document.getElementById("ocSelect"),
  tpContainer: document.getElementById("tpContainer"),
  applyBtn: document.getElementById("applyBtn"),
  filtersMeta: document.getElementById("filtersMeta"),
  cards: document.getElementById("cards"),
  chartType: document.getElementById("chartType"),
  statusChart: document.getElementById("statusChart"),
  comparisonControls: document.getElementById("comparisonControls"),
  comparisonTable: document.getElementById("comparisonTable"),
  lanzamientoTable: document.getElementById("lanzamientoTable"),
  exportLanzamientoBtn: document.getElementById("exportLanzamientoBtn"),
  exportBtn: document.getElementById("exportBtn"),
  exportDetailedBtn: document.getElementById("exportDetailedBtn"),
  saveHistoryBtn: document.getElementById("saveHistoryBtn"),
  saveHistoryStatus: document.getElementById("saveHistoryStatus"),
  closeMonthBtn: document.getElementById("closeMonthBtn"),
};

els.saveHistoryBtn.disabled = true;
els.closeMonthBtn.disabled = true;

els.loadBtn.addEventListener("click", onLoadFiles);
els.addLaunchPlanBtn.addEventListener("click", addLaunchPlanRow);
els.applyBtn.addEventListener("click", refreshAnalysis);
els.chartType.addEventListener("change", () => renderChart());
els.exportLanzamientoBtn.addEventListener("click", exportLanzamientoConsolidadoExcel);
els.exportBtn.addEventListener("click", exportComparisonCsv);
els.exportDetailedBtn.addEventListener("click", exportDetailedReport);
els.saveHistoryBtn.addEventListener("click", saveHistorico);
els.closeMonthBtn.addEventListener("click", closeMonth);

els.applyFilters.addEventListener("change", () => refreshAnalysis());
els.ocSelect.addEventListener("change", () => refreshAnalysis());
els.vigenciaDate.addEventListener("change", () => {
  normalizeDateField(els.vigenciaDate);
  refreshAnalysis();
});

initializeLaunchPlanRows();

function normalizeLabel(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function parseNumber(value) {
  if (value === null || value === undefined) {
    return 0;
  }
  const text = String(value).trim();
  if (!text) {
    return 0;
  }
  let cleaned = text.replace(/\s/g, "");

  const hasComma = cleaned.includes(",");
  const hasDot = cleaned.includes(".");

  if (hasComma && hasDot) {
    const lastComma = cleaned.lastIndexOf(",");
    const lastDot = cleaned.lastIndexOf(".");
    if (lastComma > lastDot) {
      cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
    } else {
      cleaned = cleaned.replace(/,/g, "");
    }
  } else if (hasComma) {
    const commaThousands = /^[-+]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(cleaned);
    if (commaThousands) {
      cleaned = cleaned.replace(/,/g, "");
    } else {
      cleaned = cleaned.replace(/,/g, ".");
    }
  } else if (hasDot) {
    const dotThousands = /^[-+]?\d{1,3}(\.\d{3})+(,\d+)?$/.test(cleaned);
    if (dotThousands) {
      cleaned = cleaned.replace(/\./g, "");
    }
  }

  const numeric = Number(cleaned);
  return Number.isFinite(numeric) ? numeric : 0;
}

function parseIntSafe(value) {
  const text = String(value || "").trim();
  if (!text) {
    return null;
  }

  const compact = text.replace(/\s/g, "");

  // Casos comunes de Excel: 610, 610.0, 610,0, 610.00, 610,00
  if (/^[-+]?\d+(?:[\.,]\d+)?$/.test(compact)) {
    const normalized = compact.replace(",", ".");
    const numeric = Number(normalized);
    if (Number.isFinite(numeric)) {
      return Math.round(numeric);
    }
  }

  // Fallback: toma el primer entero cuando el valor viene con texto adicional.
  const match = compact.match(/[-+]?\d+/);
  return match ? Number(match[0]) : null;
}

function normalizeArticleCode(value) {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }
  const asInt = parseIntSafe(text);
  return asInt !== null ? String(asInt) : text.toUpperCase();
}

function parseDateValue(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }
  const text = String(value || "").trim();
  if (!text) {
    return null;
  }

  const monthNameParsed = parseSpanishMonthDate(text);
  if (monthNameParsed) {
    return monthNameParsed;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const d = new Date(`${text}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const slash = text.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})$/);
  if (slash) {
    const day = Number(slash[1]);
    const month = Number(slash[2]) - 1;
    const year = Number(slash[3].length === 2 ? `20${slash[3]}` : slash[3]);
    const d = new Date(year, month, day);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const numeric = Number(text);
  if (Number.isFinite(numeric) && numeric > 20000 && numeric < 70000) {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const millis = numeric * 86400000;
    const d = new Date(excelEpoch.getTime() + millis);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const fallback = new Date(text);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function parseSpanishMonthDate(text) {
  const monthMap = {
    enero: 0,
    feb: 1,
    febrero: 1,
    mar: 2,
    marzo: 2,
    abr: 3,
    abril: 3,
    may: 4,
    mayo: 4,
    jun: 5,
    junio: 5,
    jul: 6,
    julio: 6,
    ago: 7,
    agosto: 7,
    sep: 8,
    sept: 8,
    septiembre: 8,
    oct: 9,
    octubre: 9,
    nov: 10,
    noviembre: 10,
    dic: 11,
    diciembre: 11,
  };

  const normalized = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,]/g, " ")
    .replace(/[\/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const m = normalized.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{2,4})$/);
  if (!m) {
    return null;
  }

  const day = Number(m[1]);
  const monthToken = m[2];
  const year = Number(m[3].length === 2 ? `20${m[3]}` : m[3]);
  if (!Number.isFinite(day) || !Number.isFinite(year) || !(monthToken in monthMap)) {
    return null;
  }

  const month = monthMap[monthToken];
  const date = new Date(year, month, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toDateInputValue(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toSlashDateValue(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}

function normalizeDateField(element) {
  const parsed = parseDateValue(element.value);
  if (parsed) {
    element.value = toSlashDateValue(parsed);
  }
}

function createLaunchPlanRow() {
  const row = document.createElement("div");
  row.className = "launch-plan-row";
  row.innerHTML = `
    <label class="field">
      <span>Plan Lanzamiento</span>
      <input type="file" class="launch-file-input" accept=".xlsx,.xls,.csv">
    </label>
    <label class="field">
      <span>Fecha inicio lanzamiento</span>
      <input type="text" class="launch-date-input" placeholder="dd/mm/aaaa o 1 abril 2026" inputmode="text">
    </label>
    <button type="button" class="btn btn-secondary remove-launch-btn hidden">Eliminar</button>
  `;

  const dateInput = row.querySelector(".launch-date-input");
  const removeBtn = row.querySelector(".remove-launch-btn");

  dateInput.addEventListener("change", () => normalizeDateField(dateInput));
  removeBtn.addEventListener("click", () => {
    row.remove();
    refreshLaunchPlanButtons();
  });

  return row;
}

function refreshLaunchPlanButtons() {
  const rows = els.launchPlansContainer.querySelectorAll(".launch-plan-row");
  rows.forEach((row) => {
    const removeBtn = row.querySelector(".remove-launch-btn");
    if (removeBtn) {
      removeBtn.classList.toggle("hidden", rows.length <= 1);
    }
  });
}

function addLaunchPlanRow() {
  els.launchPlansContainer.appendChild(createLaunchPlanRow());
  refreshLaunchPlanButtons();
}

function initializeLaunchPlanRows() {
  els.launchPlansContainer.innerHTML = "";
  els.launchPlansContainer.appendChild(createLaunchPlanRow());
  refreshLaunchPlanButtons();
}

function nextMondayPlus11() {
  const now = new Date();
  const weekday = now.getDay();
  const mapMonday = weekday === 0 ? 7 : weekday;
  let daysUntilMonday = 8 - mapMonday;
  if (daysUntilMonday === 0) {
    daysUntilMonday = 7;
  }
  const start = new Date(now);
  start.setDate(start.getDate() + daysUntilMonday);
  const end = new Date(start);
  end.setDate(end.getDate() + 11);
  return { start, end, reason: "default operativo (proximo lunes + 11)" };
}

function findColumn(rows, candidates) {
  if (!rows.length) {
    return null;
  }
  const keys = Object.keys(rows[0]);
  const normalizedMap = new Map(keys.map((key) => [normalizeLabel(key), key]));
  for (const candidate of candidates) {
    const found = normalizedMap.get(normalizeLabel(candidate));
    if (found) {
      return found;
    }
  }
  return null;
}

function resolveColumns(rows, candidates) {
  const resolved = [];
  const seen = new Set();
  for (const candidate of candidates) {
    const column = findColumn(rows, [candidate]);
    if (column && !seen.has(column)) {
      resolved.push(column);
      seen.add(column);
    }
  }
  return resolved;
}

function chooseEstadoArticleColumn(rows, referenceSet) {
  if (!rows.length) {
    return null;
  }

  const candidateNames = [
    "nº corto artículo",
    "nro corto articulo",
    "numero corto articulo",
    "articulo",
    "2º nº artículo",
    "2o nº articulo",
    "3er nº artículo",
    "3er n articulo",
    "3er numero articulo",
    "sku",
    "codigo articulo",
  ];

  const resolved = resolveColumns(rows, candidateNames);
  if (!resolved.length) {
    return null;
  }

  if (!referenceSet || !referenceSet.size) {
    return resolved[0];
  }

  let bestColumn = resolved[0];
  let bestOverlap = -1;
  for (const column of resolved) {
    const seriesCodes = new Set(rows.map((row) => normalizeArticleCode(row[column])).filter(Boolean));
    let overlap = 0;
    for (const code of seriesCodes) {
      if (referenceSet.has(code)) {
        overlap += 1;
      }
    }
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      bestColumn = column;
    }
  }

  return bestColumn;
}

function scopeEstadoRowsToReferenceCodes(rows, referenceSet) {
  if (!rows.length || !referenceSet || !referenceSet.size) {
    return [...rows];
  }

  const candidateNames = [
    "nº corto artículo",
    "nro corto articulo",
    "numero corto articulo",
    "articulo",
    "2º nº artículo",
    "2o nº articulo",
    "3er nº artículo",
    "3er n articulo",
    "3er numero articulo",
    "sku",
    "codigo articulo",
  ];

  const resolved = resolveColumns(rows, candidateNames);
  if (!resolved.length) {
    return [...rows];
  }

  return rows.filter((row) => {
    for (const column of resolved) {
      const code = normalizeArticleCode(row[column]);
      if (code && referenceSet.has(code)) {
        return true;
      }
    }
    return false;
  });
}

function classifyEstado(ultimo, siguiente) {
  if (ultimo === 580 && siguiente === 610) return "facturada_hoy_580_610";
  if (ultimo === 610 && siguiente === 999) return "facturada_610_999";
  if ((ultimo === 980 || ultimo === 984 || ultimo === 955) && siguiente === 999) return "depurado_980_984_999";
  if (ultimo === 560 && siguiente === 565) return "listo_cargar_560_565";
  if (ultimo === 527 || siguiente === 527) return "depurado_cuota_527";
  if ((ultimo !== null && ultimo >= 535 && ultimo <= 555) || (siguiente !== null && siguiente >= 535 && siguiente <= 555)) {
    return "carga_proceso_535_555";
  }
  if ((ultimo !== null && ultimo < 535) || (siguiente !== null && siguiente < 535)) {
    return "sin_carga_menor_535";
  }
  return "otros";
}

function mapEstadoToMotivo(estado) {
  const motivos = {
    "facturada_hoy_580_610": "facturado",
    "facturada_610_999": "facturado",
    "depurado_980_984_999": "cancelado",
    "depurado_cuota_527": "cancelado",
    "listo_cargar_560_565": "carga en proceso",
    "carga_proceso_535_555": "carga en proceso",
    "sin_carga_menor_535": "sin carga",
    "otros": "otros",
  };
  return motivos[estado] || "otros";
}

function parseLanzaFromName(name) {
  const match = String(name || "").match(/LANZA[_\-\s]*(\d+)[_\-\s]*(\d{2,4})/i);
  if (!match) {
    return "MANUAL";
  }
  const num = Number(match[1]);
  const year = Number(match[2]) % 100;
  return `LANZA_${num}_${String(year).padStart(2, "0")}`;
}

async function readRowsFromFile(file, preferBestEstadoSheet) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array", cellDates: false, raw: false });

  let targetSheetName = workbook.SheetNames[0];
  if (preferBestEstadoSheet) {
    let bestScore = Number.NEGATIVE_INFINITY;
    for (const sheetName of workbook.SheetNames) {
      const sheetRows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
      const score = scoreEstadoSheet(sheetRows, sheetName);
      if (score > bestScore) {
        bestScore = score;
        targetSheetName = sheetName;
      }
    }
  }

  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[targetSheetName], { defval: "" });
  return { rows, sheetName: targetSheetName };
}

function readRowsFromBuffer(buffer, preferBestEstadoSheet) {
  const workbook = XLSX.read(buffer, { type: "array", cellDates: false, raw: false });
  let targetSheetName = workbook.SheetNames[0];

  if (preferBestEstadoSheet) {
    let bestScore = Number.NEGATIVE_INFINITY;
    for (const sheetName of workbook.SheetNames) {
      const sheetRows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
      const score = scoreEstadoSheet(sheetRows, sheetName);
      if (score > bestScore) {
        bestScore = score;
        targetSheetName = sheetName;
      }
    }
  }

  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[targetSheetName], { defval: "" });
  return { rows, sheetName: targetSheetName };
}

async function loadNegocioSegmentoFromProject() {
  // Usar datos hardcodeados en lugar de cargar desde archivo
  try {
    buildNegocioMapping(NEGOCIO_SEGMENTO_DATA);
    return true;
  } catch (error) {
    console.warn("Error al procesar datos Negocio-Segmento:", error);
    return false;
  }
}

function scoreEstadoSheet(rows, sheetName) {
  if (!rows.length) {
    return -999;
  }
  const scoreByCol = (candidates, ok, bad) => (findColumn(rows, candidates) ? ok : bad);
  let score = 0;
  score += scoreByCol(["articulo", "nº corto artículo", "nro corto articulo", "sku"], 3, -3);
  score += scoreByCol(["ultimo estado", "último estado"], 2, -2);
  score += scoreByCol(["estado sig", "estado siguiente"], 2, -2);
  score += scoreByCol(["cantidad enviada", "cantidad", "cantidad solicitada"], 2, -2);
  score += scoreByCol(["fecha orden", "fecha pedido", "fecha solicitud"], 1, -1);
  if (normalizeLabel(sheetName).includes("dinamica") || normalizeLabel(sheetName).includes("pivot")) {
    score -= 4;
  }
  score += rows.length > 20 ? 1 : -1;
  return score;
}

function extractTpValues(rows, tpColumn) {
  if (!tpColumn) {
    return [];
  }
  return [...new Set(rows.map((row) => String(row[tpColumn] || "").trim().toUpperCase()).filter(Boolean))].sort();
}

function extractOcValues(rows, ocColumn) {
  if (!ocColumn) {
    return [];
  }
  return [...new Set(rows.map((row) => String(row[ocColumn] || "").trim()).filter(Boolean))].sort();
}

function findDateMin(rows, dateColumn) {
  if (!dateColumn) {
    return null;
  }
  const parsed = rows.map((row) => parseDateValue(row[dateColumn])).filter(Boolean);
  if (!parsed.length) {
    return null;
  }
  parsed.sort((a, b) => a - b);
  return parsed[0];
}

async function onLoadFiles() {
  try {
    if (!els.estadoFile.files[0]) {
      els.loadStatus.textContent = "Debe seleccionar archivo de estado.";
      return;
    }

    els.loadStatus.textContent = "Leyendo archivos...";

    const estadoFile = els.estadoFile.files[0];
    const estadoData = await readRowsFromFile(estadoFile, true);
    state.estadoRows = estadoData.rows;

    if (!state.estadoRows.length) {
      els.loadStatus.textContent = "El archivo de estado no tiene filas legibles.";
      return;
    }

    const loaded = await loadNegocioSegmentoFromProject();
    if (!loaded) {
      state.negocioMap.clear();
      state.segmentoMap.clear();
      state.negocioCodificadoMap.clear();
      state.negocioSourceRows = [];
    }

    // Cargar segmento desde el archivo de estado usando codigo vta 1 como clave
    buildSegmentoMapping(state.estadoRows);

    const planRows = Array.from(els.launchPlansContainer.querySelectorAll(".launch-plan-row"));
    const lanzamientoFiles = planRows.map((row) => {
      const fileInput = row.querySelector(".launch-file-input");
      const dateInput = row.querySelector(".launch-date-input");
      return {
        file: fileInput?.files[0] || null,
        rawStartDate: dateInput?.value || "",
        startDate: parseDateValue(dateInput?.value),
      };
    }).filter((item) => item.file);

    if (!lanzamientoFiles.length) {
      els.loadStatus.textContent = "Debe seleccionar al menos un archivo de Plan Lanzamiento.";
      return;
    }

    state.lanzamientos = [];
    for (const item of lanzamientoFiles) {
      const data = await readRowsFromFile(item.file, false);
      const code = parseLanzaFromName(item.file.name);
      state.lanzamientos.push({
        code,
        rows: data.rows,
        name: item.file.name,
        rawStartDate: item.rawStartDate,
        startDate: item.startDate,
      });
    }

    // Combine all lanzamiento rows into one array, adding lanzamientoCode and lanzamientoStartDate columns
    state.lanzamientoRows = [];
    for (const lanzamiento of state.lanzamientos) {
      for (const row of lanzamiento.rows) {
        const newRow = {
          ...row,
          lanzamientoCode: lanzamiento.code,
          lanzamientoStartDate: lanzamiento.rawStartDate || null,
        };
        state.lanzamientoRows.push(newRow);
      }
    }

    const lanzamientoSummary = state.lanzamientos
      .map((l) => `${l.name} (${l.rows.length} filas${l.rawStartDate ? `, inicio ${l.rawStartDate}` : ""})`).join(" | ");

    detectColumns();
    setupFilterControls();

    els.filtersSection.classList.remove("hidden");
    els.resultsSection.classList.remove("hidden");

    refreshAnalysis();
    els.loadStatus.textContent = `Estado cargado: ${estadoFile.name} | hoja ${estadoData.sheetName}. Lanzamientos: ${lanzamientoSummary}.`;
  } catch (error) {
    console.error(error);
    els.loadStatus.textContent = `Error leyendo archivos: ${error.message}`;
  }
}

function detectColumns() {
  const rows = state.estadoRows;
  state.columns = {
    estadoArticulo: findColumn(rows, ["nº corto artículo", "nro corto articulo", "numero corto articulo", "articulo", "2º nº artículo", "3er nº artículo", "sku", "codigo articulo"]),
    estadoDescripcion: findColumn(rows, ["descripcion", "descripción", "descripcion 1", "descripción 1", "producto"]),
    estadoUltimo: findColumn(rows, ["ultimo estado", "último estado"]),
    estadoSiguiente: findColumn(rows, ["estado sig", "estado siguiente"]),
    estadoCantidad: findColumn(rows, ["cantidad enviada", "cantidad", "cantidad solicitada"]),
    estadoCantidadPedido: findColumn(rows, ["cantidad solicitada", "cantidad", "cantidad enviada"]),
    estadoFecha: findColumn(rows, ["fecha orden", "fecha pedido", "fecha solicitud"]),
    estadoTp: findColumn(rows, ["tp ord", "tipo orden", "tipo pedido"]),
    estadoOc: findColumn(rows, ["oc cliente", "orden cliente", "oc"]),
    estadoNegocio: findColumn(rows, ["codigo vta 2", "codigo negocio", "cod negocio", "negocio", "codigo vta 1", "codigo"]),
    estadoSegmento: findColumn(rows, ["codigo vta 1", "codigo segmento", "cod segmento", "segmento"]),
    estadoFecha: findColumn(rows, ["fecha de factura", "fecha factura", "fecha orden", "fecha pedido", "fecha solicitud"]),
    estadoCasaMatriz: findColumn(rows, ["casa matriz", "Casa Matriz", "numero principal"]),
    estadoSucursal: findColumn(rows, ["sucursal", "Sucursal", "destino envio", "destino envío"]),
    estadoCantidadCancelada: findColumn(rows, ["cantidad cancelada", "cantidad cancelado", "cancelado"]),
    estadoArticuloEffective: null,
    lanzaArticulo: findColumn(state.lanzamientoRows, ["articulo", "nº corto artículo", "nro corto articulo", "numero corto articulo", "2º nº artículo", "3er nº artículo", "sku", "codigo articulo"]),
    lanzaDescripcion: findColumn(state.lanzamientoRows, ["descripcion", "descripción", "descripcion 1", "descripción 1", "producto"]),
    lanzaCantidad: findColumn(state.lanzamientoRows, ["cantidad", "cantidad solicitada", "cantidad pedida", "pedido"]),
    lanzaOc: findColumn(state.lanzamientoRows, ["orden de compra", "oc", "oc cliente", "orden cliente"]),
    lanzaCasaMatriz: findColumn(state.lanzamientoRows, ["cliente", "casa matriz", "Casa Matriz", "venta"]),
    lanzaSucursal: findColumn(state.lanzamientoRows, ["sucursal", "Sucursal", "destino envio", "destino envío"]),
    lanzaCode: "lanzamientoCode", // Added column
  };
}

function buildNegocioMapping(rows) {
  state.negocioMap.clear();
  state.segmentoMap.clear();
  state.negocioCodificadoMap.clear();
  state.negocioSourceRows = [];

  if (!rows || !rows.length) {
    return;
  }

  const codeColumn = findColumn(rows, ["codigo negocio", "cod negocio", "negocio", "codigo vta 2", "codigo"]);
  const negocioTextColumn = findColumn(rows, ["negocio texto", "texto negocio", "nombre negocio", "descripcion negocio", "descripción negocio", "negocio"]);
  const segmentoTextColumn = findColumn(rows, ["segmento", "segmento texto", "texto segmento", "descripcion segmento", "descripción segmento"]);

  if (!codeColumn) {
    return;
  }

  state.negocioSourceRows = rows.slice();

  for (const row of rows) {
    const rawCodeValue = String(row[codeColumn] || "").trim();
    const codeValue = normalizeLabel(rawCodeValue);
    if (!codeValue) continue;

    state.negocioCodificadoMap.set(codeValue, rawCodeValue);

    if (negocioTextColumn && row[negocioTextColumn] !== undefined) {
      const textValue = String(row[negocioTextColumn] || "").trim();
      if (textValue) {
        state.negocioMap.set(codeValue, textValue);
      }
    }

    if (segmentoTextColumn && row[segmentoTextColumn] !== undefined) {
      const segmentValue = String(row[segmentoTextColumn] || "").trim();
      if (segmentValue) {
        state.segmentoMap.set(codeValue, segmentValue);
      }
    }
  }
}

function getNegocioDescripcion(rawNegocio) {
  if (!rawNegocio) return "";
  const key = normalizeLabel(rawNegocio);
  return state.negocioMap.get(key) || rawNegocio;
}

function buildSegmentoMapping(rows) {
  state.segmentoMap.clear();

  if (!rows || !rows.length) {
    return;
  }

  const codeColumn = findColumn(rows, ["codigo vta 1", "codigo segmento", "cod segmento", "codigo"]);
  const segmentoTextColumn = findColumn(rows, ["segmento", "segmento texto", "texto segmento", "descripcion segmento", "descripción segmento"]);

  if (!codeColumn || !segmentoTextColumn) {
    return;
  }

  for (const row of rows) {
    const rawCodeValue = String(row[codeColumn] || "").trim();
    const codeValue = normalizeLabel(rawCodeValue);
    if (!codeValue) continue;

    const textValue = String(row[segmentoTextColumn] || "").trim();
    if (textValue) {
      state.segmentoMap.set(codeValue, textValue);
      const numericCode = parseIntSafe(rawCodeValue);
      if (numericCode !== null) {
        state.segmentoMap.set(String(numericCode), textValue);
        state.segmentoMap.set(String(numericCode).padStart(4, "0"), textValue);
      }
    }
  }
}

function getSegmentoDescripcion(rawSegmento) {
  if (!rawSegmento) return "";
  const candidate = String(rawSegmento).trim();
  const key = normalizeLabel(candidate);
  if (state.segmentoMap.has(key)) {
    return state.segmentoMap.get(key);
  }
  const numericKey = parseIntSafe(candidate);
  if (numericKey !== null) {
    const paddedKey = String(numericKey).padStart(4, "0");
    if (state.segmentoMap.has(paddedKey)) {
      return state.segmentoMap.get(paddedKey);
    }
    const unpaddedKey = String(numericKey);
    if (state.segmentoMap.has(unpaddedKey)) {
      return state.segmentoMap.get(unpaddedKey);
    }
  }
  return candidate;

}


function setupFilterControls() {
  const tpValues = extractTpValues(state.estadoRows, state.columns.estadoTp);
  const ocValues = extractOcValues(state.estadoRows, state.columns.estadoOc);

  els.tpContainer.innerHTML = "";
  for (const tp of tpValues) {
    const item = document.createElement("label");
    item.className = "tp-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.value = tp;
    checkbox.dataset.tp = "1";
    const text = document.createElement("span");
    text.textContent = tp;
    item.append(checkbox, text);
    els.tpContainer.appendChild(item);
  }

  els.ocSelect.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "Todos";
  allOption.textContent = "Todos";
  els.ocSelect.appendChild(allOption);
  for (const oc of ocValues) {
    const option = document.createElement("option");
    option.value = oc;
    option.textContent = oc;
    els.ocSelect.appendChild(option);
  }

  els.vigenciaDate.value = toSlashDateValue(new Date());

  for (const node of els.tpContainer.querySelectorAll('input[data-tp="1"]')) {
    node.addEventListener("change", () => refreshAnalysis());
  }
}

function selectedTpSet() {
  const checks = [...els.tpContainer.querySelectorAll('input[data-tp="1"]')];
  return new Set(checks.filter((node) => node.checked).map((node) => node.value));
}

function refreshAnalysis() {
  // Ignorar filtros por ahora: el análisis debe funcionar con todos los datos del estado.
  let filtered = [...state.estadoRows];

  // No se aplica ningún filtro en esta etapa.
  state.filteredEstadoRows = filtered;
  const pedidoByArticle = buildPedidoByArticle();
  const referenceArticleCodes = new Set(
    [...pedidoByArticle.values()]
      .map((item) => String(item.articulo || "").trim())
      .filter(Boolean)
  );
  const scopedEstadoRows = scopeEstadoRowsToReferenceCodes(filtered, referenceArticleCodes);
  state.filteredEstadoRows = scopedEstadoRows;

  const estadoByArticle = buildEstadoByArticle(scopedEstadoRows, referenceArticleCodes);

  els.filtersMeta.textContent = `Filtros ignorados | Filas total estado: ${filtered.length} | Filas en alcance articulo: ${scopedEstadoRows.length} | Articulo usado: ${state.columns.estadoArticuloEffective || state.columns.estadoArticulo || "-"} | Cantidad usada: ${state.columns.estadoCantidad || "-"}`;

  state.comparisonRows = buildComparison(pedidoByArticle, estadoByArticle);

  renderCards();
  renderChart();
  renderComparisonTable();
  renderLanzamientoReport();

  // Mostrar controles de comparación si hay datos
  if (state.comparisonRows.length) {
    els.comparisonControls.classList.remove("hidden");
    els.saveHistoryBtn.disabled = false;
  } else {
    els.comparisonControls.classList.add("hidden");
    els.saveHistoryBtn.disabled = true;
  }
}

function getMonthKey(monthName, year) {
  return `historico_${monthName}_${year}`;
}

function parseMonthYearFromKey(monthKey) {
  const match = String(monthKey || "").match(/^historico_(.+)_(\d{4})$/);
  if (!match) {
    return null;
  }
  return { month: match[1], year: Number(match[2]) };
}

function getMonthKeyFromDate(date) {
  if (!date) return null;
  const monthName = formatMonthName(date);
  const year = date.getFullYear();
  return { key: getMonthKey(monthName, year), month: monthName, year };
}

function loadHistoricoFromStorage(monthKey) {
  const stored = localStorage.getItem(monthKey);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function saveHistoricoToStorage(monthKey, historico, isClosed = false) {
  const data = {
    ...historico,
    closed: isClosed,
    lastUpdated: new Date().toISOString(),
  };
  console.log(`Guardando en localStorage: ${monthKey}`);
  console.log('Datos a guardar:', data);
  if (data.reportRows) {
    console.log(`ReportRows tiene ${data.reportRows.length} filas`);
    console.log('Primeras 2 filas:', data.reportRows.slice(0, 2));
  }
  localStorage.setItem(monthKey, JSON.stringify(data));
}

// Mantener disponible para futuro, pero desactivar descarga automática por ahora.
const ENABLE_HISTORICO_AUTO_EXPORT = false;

function saveHistorico() {
  if (!state.lanzamientos.length || !state.comparisonRows.length) {
    els.saveHistoryStatus.textContent = 'Carga primero el plan y el archivo de estado para generar el histórico.';
    return;
  }

  const reportRows = buildLanzamientoReport();
  if (!reportRows.length) {
    els.saveHistoryStatus.textContent = 'No hay datos en el reporte consolidado para guardar.';
    return;
  }

  const monthYearKeys = Array.from(new Set(reportRows.map((row) => {
    const fecha = parseDateValue(row.fechaInicio);
    if (!fecha) return null;
    return getMonthKey(formatMonthName(fecha), fecha.getFullYear());
  }).filter(Boolean)));

  if (!monthYearKeys.length) {
    els.saveHistoryStatus.textContent = 'No se pudo determinar el mes/año de los lanzamientos. Revisa las fechas de inicio.';
    return;
  }

  monthYearKeys.forEach((monthKey) => {
    const parsed = parseMonthYearFromKey(monthKey);
    if (!parsed) {
      return;
    }

    const { month, year } = parsed;
    const monthRows = reportRows.filter((row) => {
      const fecha = parseDateValue(row.fechaInicio);
      return fecha && formatMonthName(fecha) === month && fecha.getFullYear() === year;
    });

    const existing = loadHistoricoFromStorage(monthKey) || {
      mes: month,
      anio: year,
      negocios: {},
      ocs: [],
    };

    const negocioMap = {};
    const ocMap = new Map();

    monthRows.forEach((row) => {
      const negocio = row.negocio || 'Sin negocio';
      const ocId = row.oc || 'SIN_OC';
      const pedido = Number(row.cantidadPedida) || 0;
      const facturado = Number(row.cantidadFacturada) || 0;
      const ns15 = Number(row.ns15) || 0;
      const cancelado = Number(row.cantidadCancelado) || 0;
      const facturado15 = pedido > 0 ? (ns15 / 100) * pedido : 0;

      if (!ocMap.has(ocId)) {
        ocMap.set(ocId, {
          negocio,
          totalPedido: 0,
          totalFacturado: 0,
          totalFacturado15: 0,
          totalCancelado: 0,
        });
      }

      const ocEntry = ocMap.get(ocId);
      ocEntry.totalPedido += pedido;
      ocEntry.totalFacturado += facturado;
      ocEntry.totalFacturado15 += facturado15;
      ocEntry.totalCancelado += cancelado;
    });

    const ocs = Array.from(ocMap.entries()).map(([ocId, ocData]) => {
      const ns15Value = ocData.totalPedido > 0 ? (ocData.totalFacturado15 / ocData.totalPedido) * 100 : 0;
      const nsValue = ocData.totalPedido > 0 ? (ocData.totalFacturado / ocData.totalPedido) * 100 : 0;
      const facturadoValue = nsValue;
      const canceladoValue = ocData.totalPedido > 0 ? (ocData.totalCancelado / ocData.totalPedido) * 100 : 0;

      if (!negocioMap[ocData.negocio]) {
        negocioMap[ocData.negocio] = {
          ocCount: 0,
          totalNs15: 0,
          totalFacturado: 0,
          totalCancelado: 0,
        };
      }
      negocioMap[ocData.negocio].ocCount += 1;
      negocioMap[ocData.negocio].totalNs15 += ns15Value;
      negocioMap[ocData.negocio].totalFacturado += facturadoValue;
      negocioMap[ocData.negocio].totalCancelado += canceladoValue;

      return {
        id: ocId,
        negocio: ocData.negocio,
        incluido: true,
        ns_15_dias: Number(ns15Value.toFixed(1)),
        ns: Number(nsValue.toFixed(1)),
        facturado: Number(facturadoValue.toFixed(1)),
        cancelado: Number(canceladoValue.toFixed(1)),
      };
    });

    const negocios = {};
    Object.entries(negocioMap).forEach(([negocio, values]) => {
      negocios[negocio] = {
        ns_15_dias: values.ocCount > 0 ? Number((values.totalNs15 / values.ocCount).toFixed(1)) : 0,
        ns: values.ocCount > 0 ? Number((values.totalFacturado / values.ocCount).toFixed(1)) : 0,
        facturado: values.ocCount > 0 ? Number((values.totalFacturado / values.ocCount).toFixed(1)) : 0,
        cancelado: values.ocCount > 0 ? Number((values.totalCancelado / values.ocCount).toFixed(1)) : 0,
      };
    });

    existing.negocios = negocios;
    existing.ocs = ocs.sort((a, b) => sortLanzaKey(a.id, b.id));
    existing.reportRows = monthRows;
    console.log(`Guardando histórico ${monthKey} con ${monthRows.length} filas de reporte`);
    console.log('Primeras filas de reporte:', monthRows.slice(0, 2));
    saveHistoricoToStorage(monthKey, existing, false);

    // Exportar a Excel (desactivado por configuración)
    if (ENABLE_HISTORICO_AUTO_EXPORT) {
      exportHistoricoToExcel(monthKey, existing, reportRows);
    }
  });

  // Setear el mes actual para poder cerrarlo después
  if (monthYearKeys.length > 0) {
    const lastMonthKey = monthYearKeys[monthYearKeys.length - 1];
    const parts = lastMonthKey.split('_');
    if (parts.length >= 2) {
      state.currentMonth = parts[0];
      state.currentYear = Number(parts[1]);
    }
  }

  els.saveHistoryStatus.textContent = `Histórico guardado para ${monthYearKeys.map((key) => key.replace('_', ' ')).join(', ')}. Puede agregar más planes o hacer clic en "Cerrar mes".`;
  els.closeMonthBtn.disabled = false;
}

function closeMonth() {
  // Obtener meses desde las fechas de inicio de los lanzamientos cargados
  if (!state.lanzamientos.length) {
    els.saveHistoryStatus.textContent = 'Carga primero los lanzamientos para cerrar el mes.';
    return;
  }

  // Obtener meses únicos de los lanzamientos cargados
  const monthYearKeys = Array.from(new Set(state.lanzamientos.map((lanzamiento) => {
    const fecha = lanzamiento.startDate;
    if (!fecha) return null;
    const monthName = formatMonthName(fecha);
    const year = fecha.getFullYear();
    return getMonthKey(monthName, year);
  }).filter(Boolean)));

  if (!monthYearKeys.length) {
    els.saveHistoryStatus.textContent = 'No se pudo determinar el mes/año de los lanzamientos para cerrar.';
    return;
  }

  // Cerrar todos los meses encontrados
  monthYearKeys.forEach((monthKey) => {
    const historico = loadHistoricoFromStorage(monthKey);
    
    if (!historico) {
      els.saveHistoryStatus.textContent = `Guarda el histórico antes de cerrar ${monthKey.replace('_', ' ')}.`;
      return;
    }

    saveHistoricoToStorage(monthKey, historico, true);
    console.log(`Mes cerrado: ${monthKey}`);
  });

  const closedMonths = monthYearKeys.map(k => k.replace('_', ' ')).join(', ');
  els.saveHistoryStatus.textContent = `${closedMonths} cerrado(s). No se pueden modificar.`;
  els.closeMonthBtn.disabled = true;
}

function formatMonthName(date) {
  if (!date) return null;
  const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return monthNames[date.getMonth()];
}

function sortLanzaKey(a, b) {
  const regex = /lanza_(\d+)/i;
  const aMatch = a.match(regex);
  const bMatch = b.match(regex);
  if (aMatch && bMatch) {
    const aNum = Number(aMatch[1]);
    const bNum = Number(bMatch[1]);
    if (aNum !== bNum) return aNum - bNum;
  }
  return a.localeCompare(b);
}

function normalizeOcKey(oc) {
  return normalizeLabel(String(oc || "").trim()) || "sin_oc";
}

function buildOcArticuloKey(oc, articulo) {
  return `${normalizeOcKey(oc)}||${articulo}`;
}

function buildOcArticuloCasaSucursalKey(oc, articulo, casaMatriz, sucursal) {
  return `${normalizeOcKey(oc)}||${articulo}||${normalizeLabel(casaMatriz)}||${normalizeLabel(sucursal)}`;
}

function buildPedidoByArticle() {
  const result = new Map();

  if (state.lanzamientoRows.length && state.columns.lanzaArticulo && state.columns.lanzaCantidad) {
    for (const row of state.lanzamientoRows) {
      const articulo = normalizeArticleCode(row[state.columns.lanzaArticulo]);
      if (!articulo) {
        continue;
      }
      const oc = String(row[state.columns.lanzaOc] || "").trim() || "SIN_OC";
      const key = buildOcArticuloKey(oc, articulo);
      const item = result.get(key) || {
        oc,
        articulo,
        descripcion: "",
        pedido: 0,
      };
      item.pedido += Math.abs(parseNumber(row[state.columns.lanzaCantidad]));
      if (state.columns.lanzaDescripcion) {
        item.descripcion = item.descripcion || String(row[state.columns.lanzaDescripcion] || "").trim();
      }
      result.set(key, item);
    }
    return result;
  }

  if (!state.columns.estadoCantidadPedido) {
    return result;
  }

  const pedidoArticuloColumn = chooseEstadoArticleColumn(state.filteredEstadoRows, null) || state.columns.estadoArticulo;
  if (!pedidoArticuloColumn) {
    return result;
  }

  for (const row of state.filteredEstadoRows) {
    const articulo = normalizeArticleCode(row[pedidoArticuloColumn]);
    if (!articulo) {
      continue;
    }
    const oc = String(row[state.columns.estadoOc] || "").trim() || "SIN_OC";
    const key = buildOcArticuloKey(oc, articulo);
    const item = result.get(key) || {
      oc,
      articulo,
      descripcion: "",
      pedido: 0,
    };
    item.pedido += Math.abs(parseNumber(row[state.columns.estadoCantidadPedido]));
    if (state.columns.estadoDescripcion) {
      item.descripcion = item.descripcion || String(row[state.columns.estadoDescripcion] || "").trim();
    }
    result.set(key, item);
  }

  return result;
}

function getEstadoRowCantidad(row, category) {
  let cantidad = Math.abs(parseNumber(row[state.columns.estadoCantidad]));
  if ((category === "depurado_980_984_999" || category === "depurado_cuota_527") && state.columns.estadoCantidadCancelada) {
    const cantidadCancelada = Math.abs(parseNumber(row[state.columns.estadoCantidadCancelada]));
    if (cantidadCancelada) {
      cantidad = cantidadCancelada;
    }
  }
  return cantidad;
}

function buildEstadoByArticle(rows, referenceSet) {
  const out = new Map();
  const estadoArticuloColumn = chooseEstadoArticleColumn(rows, referenceSet) || state.columns.estadoArticulo;
  state.columns.estadoArticuloEffective = estadoArticuloColumn;

  if (!estadoArticuloColumn || !state.columns.estadoUltimo || !state.columns.estadoSiguiente || !state.columns.estadoCantidad) {
    return out;
  }

  for (const row of rows) {
    const articulo = normalizeArticleCode(row[estadoArticuloColumn]);
    const oc = String(row[state.columns.estadoOc] || "").trim() || "SIN_OC";
    const key = buildOcArticuloKey(oc, articulo);
    if (!articulo || (referenceSet.size && !referenceSet.has(articulo))) {
      continue;
    }

    const item = out.get(key) || {
      oc,
      articulo,
      descripcion: "",
      facturada_hoy_580_610: 0,
      facturada_610_999: 0,
      depurado_980_984_999: 0,
      listo_cargar_560_565: 0,
      carga_proceso_535_555: 0,
      sin_carga_menor_535: 0,
      depurado_cuota_527: 0,
      otros: 0,
    };

    if (state.columns.estadoDescripcion) {
      item.descripcion = item.descripcion || String(row[state.columns.estadoDescripcion] || "").trim();
    }

    const ultimo = parseIntSafe(row[state.columns.estadoUltimo]);
    const siguiente = parseIntSafe(row[state.columns.estadoSiguiente]);
    const category = classifyEstado(ultimo, siguiente);
    const cantidad = getEstadoRowCantidad(row, category);
    item[category] += cantidad;

    out.set(key, item);
  }

  return out;
}

function buildComparison(pedidoByArticle, estadoByArticle) {
  const rows = [];

  for (const [key, pedidoItem] of pedidoByArticle.entries()) {
    const [oc, articulo] = String(key).split("||");
    const estadoItem = estadoByArticle.get(key) || {
      descripcion: "",
      facturada_hoy_580_610: 0,
      facturada_610_999: 0,
      depurado_980_984_999: 0,
      listo_cargar_560_565: 0,
      carga_proceso_535_555: 0,
      sin_carga_menor_535: 0,
      depurado_cuota_527: 0,
      otros: 0,
    };

    // Buscar negocio y segmento desde las filas de estado para este OC + artículo
    let negocio = "";
    let segmento = "";
    let ocDisplay = pedidoItem.oc || oc || "";
    for (const estadoRow of state.filteredEstadoRows) {
      const rowArticulo = normalizeArticleCode(estadoRow[state.columns.estadoArticulo]);
      const rowOc = String(estadoRow[state.columns.estadoOc] || "").trim();
      if (rowArticulo === articulo && (!rowOc || normalizeLabel(rowOc) === normalizeLabel(ocDisplay))) {
        if (!negocio && state.columns.estadoNegocio) {
          const rawNegocio = String(estadoRow[state.columns.estadoNegocio] || "").trim();
          negocio = getNegocioDescripcion(rawNegocio);
        }
        if (!segmento && state.columns.estadoSegmento) {
          const rawSegmento = String(estadoRow[state.columns.estadoSegmento] || "").trim();
          segmento = getSegmentoDescripcion(rawSegmento);
        }
        if (!ocDisplay && state.columns.estadoOc) {
          ocDisplay = rowOc;
        }
        if (negocio && segmento && ocDisplay) break;
      }
    }

    const totalFacturado = estadoItem.facturada_hoy_580_610 + estadoItem.facturada_610_999;
    rows.push({
      articulo,
      descripcion: pedidoItem.descripcion || estadoItem.descripcion || "",
      pedido: pedidoItem.pedido,
      negocio,
      segmento,
      oc: ocDisplay,
      facturada_hoy_580_610: estadoItem.facturada_hoy_580_610,
      facturada_610_999: estadoItem.facturada_610_999,
      total_facturado: totalFacturado,
      depurado_980_984_999: estadoItem.depurado_980_984_999,
      listo_cargar_560_565: estadoItem.listo_cargar_560_565,
      carga_proceso_535_555: estadoItem.carga_proceso_535_555,
      sin_carga_menor_535: estadoItem.sin_carga_menor_535,
      depurado_cuota_527: estadoItem.depurado_cuota_527,
      diferencia_vs_facturada: pedidoItem.pedido - totalFacturado,
      otros: estadoItem.otros,
    });
  }
  rows.sort((a, b) => a.oc.localeCompare(b.oc) || a.articulo.localeCompare(b.articulo));
  return rows;
}

function totalsFromComparison() {
  const total = {
    pedido: 0,
    facturada_hoy_580_610: 0,
    facturada_610_999: 0,
    depurado_980_984_999: 0,
    listo_cargar_560_565: 0,
    carga_proceso_535_555: 0,
    sin_carga_menor_535: 0,
    depurado_cuota_527: 0,
    otros: 0,
  };

  for (const row of state.comparisonRows) {
    for (const key of Object.keys(total)) {
      total[key] += row[key] || 0;
    }
  }

  total.total_facturado = total.facturada_hoy_580_610 + total.facturada_610_999;
  total.en_proceso = total.listo_cargar_560_565 + total.carga_proceso_535_555;
  total.depurado = total.depurado_980_984_999 + total.depurado_cuota_527;

  return total;
}

function renderCards() {
  const totals = totalsFromComparison();
  const avancePct = totals.pedido > 0 ? (totals.total_facturado / totals.pedido) * 100 : 0;
  const entries = [
    ["Pedida", totals.pedido],
    ["Facturado hoy 580/610", totals.facturada_hoy_580_610],
    ["Facturado 610/999", totals.facturada_610_999],
    ["Total facturado", totals.total_facturado],
    ["% avance facturado", `${avancePct.toFixed(1)}%`],
    ["En proceso", totals.en_proceso],
    ["Depurado", totals.depurado],
    ["Sin carga < 535", totals.sin_carga_menor_535],
  ];

  els.cards.innerHTML = "";
  for (const [label, value] of entries) {
    const node = document.createElement("article");
    node.className = "card";
    const displayValue = typeof value === "number" ? Math.round(value).toLocaleString("es-AR") : value;
    node.innerHTML = `<div class="label">${label}</div><div class="value">${displayValue}</div>`;
    els.cards.appendChild(node);
  }
}

function renderChart() {
  const totals = totalsFromComparison();
  const chartMode = els.chartType.value;

  if (state.chart) {
    state.chart.destroy();
  }

  const ctx = els.statusChart.getContext("2d");

  if (chartMode === "line") {
    const lineData = buildLineSeries();
    state.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: lineData.labels,
        datasets: lineData.datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    return;
  }

  const labels = CATEGORY_ORDER.slice(0, 7).map((key) => CATEGORY_LABELS[key]);
  const values = [
    totals.facturada_hoy_580_610,
    totals.facturada_610_999,
    totals.depurado_980_984_999,
    totals.listo_cargar_560_565,
    totals.carga_proceso_535_555,
    totals.sin_carga_menor_535,
    totals.depurado_cuota_527,
  ].map((value) => Math.round(value));

  state.chart = new Chart(ctx, {
    type: chartMode === "pie" ? "pie" : "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Cantidad",
          data: values,
          backgroundColor: ["#2f8f83", "#3987cf", "#d48f33", "#5f6ee0", "#8f63d7", "#7a8d2b", "#cb5f5f"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: chartMode === "pie" ? {} : { y: { beginAtZero: true } },
    },
  });
}

function buildLineSeries() {
  if (!state.columns.estadoFecha || !state.columns.estadoUltimo || !state.columns.estadoSiguiente || !state.columns.estadoCantidad) {
    return { labels: [], datasets: [] };
  }

  const bucket = new Map();
  for (const row of state.filteredEstadoRows) {
    const dt = parseDateValue(row[state.columns.estadoFecha]);
    if (!dt) {
      continue;
    }
    const dateKey = toDateInputValue(dt);
    const cat = classifyEstado(parseIntSafe(row[state.columns.estadoUltimo]), parseIntSafe(row[state.columns.estadoSiguiente]));
    const amount = Math.abs(parseNumber(row[state.columns.estadoCantidad]));
    const key = `${dateKey}|${cat}`;
    bucket.set(key, (bucket.get(key) || 0) + amount);
  }

  const dateSet = new Set();
  for (const key of bucket.keys()) {
    dateSet.add(key.split("|")[0]);
  }
  const isoLabels = [...dateSet].sort();
  const labels = isoLabels.map((iso) => {
    const parsed = parseDateValue(iso);
    return parsed ? toSlashDateValue(parsed) : iso;
  });

  const colors = {
    facturada_hoy_580_610: "#2f8f83",
    facturada_610_999: "#3987cf",
    depurado_980_984_999: "#d48f33",
    listo_cargar_560_565: "#5f6ee0",
    carga_proceso_535_555: "#8f63d7",
    sin_carga_menor_535: "#7a8d2b",
    depurado_cuota_527: "#cb5f5f",
    otros: "#888888",
  };

  const datasets = CATEGORY_ORDER.map((cat) => {
    const values = isoLabels.map((dateKey) => Math.round(bucket.get(`${dateKey}|${cat}`) || 0));
    const sum = values.reduce((acc, value) => acc + value, 0);
    if (!sum) {
      return null;
    }
    return {
      label: CATEGORY_LABELS[cat],
      data: values,
      borderColor: colors[cat],
      backgroundColor: colors[cat],
      fill: false,
      tension: 0.2,
    };
  }).filter(Boolean);

  return { labels, datasets };
}

function renderComparisonTable() {
  const headers = [
    "articulo",
    "descripcion",
    "pedido",
    "facturada_hoy_580_610",
    "facturada_610_999",
    "total_facturado",
    "depurado_980_984_999",
    "listo_cargar_560_565",
    "carga_proceso_535_555",
    "sin_carga_menor_535",
    "depurado_cuota_527",
    "diferencia_vs_facturada",
  ];

  const thead = els.comparisonTable.querySelector("thead");
  const tbody = els.comparisonTable.querySelector("tbody");
  thead.innerHTML = `<tr>${headers.map((head) => `<th>${head}</th>`).join("")}</tr>`;

  const lines = state.comparisonRows.map((row) => {
    const cells = headers.map((key) => {
      const value = key === "descripcion" || key === "articulo" ? row[key] : Math.round(row[key] || 0);
      return `<td>${escapeHtml(String(value))}</td>`;
    }).join("");
    return `<tr>${cells}</tr>`;
  });

  tbody.innerHTML = lines.join("");
}

function exportComparisonCsv() {
  if (!state.comparisonRows.length) {
    return;
  }
  const headers = [
    "articulo",
    "descripcion",
    "pedido",
    "facturada_hoy_580_610",
    "facturada_610_999",
    "total_facturado",
    "depurado_980_984_999",
    "listo_cargar_560_565",
    "carga_proceso_535_555",
    "sin_carga_menor_535",
    "depurado_cuota_527",
    "diferencia_vs_facturada",
  ];

  const lines = [headers.join(",")];
  for (const row of state.comparisonRows) {
    const values = headers.map((key) => {
      const raw = key === "descripcion" || key === "articulo" ? String(row[key] || "") : String(Math.round(row[key] || 0));
      return `"${raw.replace(/"/g, '""')}"`;
    });
    lines.push(values.join(","));
  }

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "comparativo_avance.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportDetailedReport() {
  console.log("=== Iniciando exportDetailedReport ===");
  console.log("estadoRows:", state.estadoRows.length);
  console.log("lanzamientos:", state.lanzamientos.length);
  
  if (!state.estadoRows.length) {
    alert("No hay datos de estado cargados. Carga el archivo de estado primero.");
    return;
  }
  
  if (!state.lanzamientos.length) {
    alert("No hay lanzamientos cargados.");
    return;
  }

  // Filtrar estadoRows a solo artículos presentes en el plan
  const referenceArticleCodes = new Set();
  for (const row of state.lanzamientoRows) {
    const articulo = normalizeArticleCode(row[state.columns.lanzaArticulo]);
    if (articulo) referenceArticleCodes.add(articulo);
  }
  const estadoArticuloColumn = state.columns.estadoArticuloEffective || state.columns.estadoArticulo;
  const filteredEstadoRows = state.estadoRows.filter(row => {
    const articulo = normalizeArticleCode(row[estadoArticuloColumn]);
    return articulo && referenceArticleCodes.has(articulo);
  });
  console.log("Filas estado filtradas por artículos del plan:", filteredEstadoRows.length);

  // Construir mapa del plan por casa matriz + sucursal + OC + articulo
  const planTotals = new Map();
  for (const row of state.lanzamientoRows) {
    const articulo = normalizeArticleCode(row[state.columns.lanzaArticulo]);
    if (!articulo) continue;
    const oc = String(row[state.columns.lanzaOc] || "").trim() || "SIN_OC";
    const casaMatriz = String(row[state.columns.lanzaCasaMatriz] || "").trim();
    const sucursal = String(row[state.columns.lanzaSucursal] || "").trim();
    const key = `${casaMatriz}||${sucursal}||${oc}||${articulo}`;
    const item = planTotals.get(key) || {
      casaMatriz,
      sucursal,
      oc,
      articulo,
      descripcion: "",
      pedido: 0,
    };
    item.pedido += Math.abs(parseNumber(row[state.columns.lanzaCantidad]));
    if (state.columns.lanzaDescripcion) {
      item.descripcion = item.descripcion || String(row[state.columns.lanzaDescripcion] || "").trim();
    }
    planTotals.set(key, item);
  }

  // Construir mapa del estado por casa matriz + sucursal + OC + articulo usando filas filtradas
  const estadoTotals = new Map();
  if (!estadoArticuloColumn || !state.columns.estadoUltimo || !state.columns.estadoSiguiente || !state.columns.estadoCantidad) {
    alert("El archivo de estado no tiene las columnas necesarias para calcular el detalle.");
    return;
  }

  for (const row of filteredEstadoRows) {
    const articulo = normalizeArticleCode(row[estadoArticuloColumn]);
    if (!articulo) continue;
    const oc = String(row[state.columns.estadoOc] || "").trim() || "SIN_OC";
    const casaMatriz = String(row[state.columns.estadoCasaMatriz] || "").trim();
    const sucursal = String(row[state.columns.estadoSucursal] || "").trim();
    const key = `${casaMatriz}||${sucursal}||${oc}||${articulo}`;
    const item = estadoTotals.get(key) || {
      casaMatriz,
      sucursal,
      oc,
      articulo,
      descripcion: "",
      facturada_hoy_580_610: 0,
      facturada_610_999: 0,
      depurado_980_984_999: 0,
      listo_cargar_560_565: 0,
      carga_proceso_535_555: 0,
      sin_carga_menor_535: 0,
      depurado_cuota_527: 0,
      otros: 0,
    };
    if (state.columns.estadoDescripcion) {
      item.descripcion = item.descripcion || String(row[state.columns.estadoDescripcion] || "").trim();
    }

    const ultimo = parseIntSafe(row[state.columns.estadoUltimo]);
    const siguiente = parseIntSafe(row[state.columns.estadoSiguiente]);
    const category = classifyEstado(ultimo, siguiente);
    const cantidad = getEstadoRowCantidad(row, category);
    item[category] += cantidad;

    estadoTotals.set(key, item);
  }

  // Cruzar plan y estado por la clave completa
  const allKeys = new Set([...planTotals.keys(), ...estadoTotals.keys()]);
  const detailLines = [];
  let totalPedido = 0;
  let totalFacturado = 0;
  let totalCanceladoCuota527 = 0;
  let totalCanceladoOtros = 0;

  for (const key of allKeys) {
    const planItem = planTotals.get(key) || { casaMatriz: "", sucursal: "", oc: "", articulo: "", descripcion: "", pedido: 0 };
    const estadoItem = estadoTotals.get(key) || {
      facturada_hoy_580_610: 0,
      facturada_610_999: 0,
      depurado_980_984_999: 0,
      depurado_cuota_527: 0,
    };

    const pedido = planItem.pedido || 0;
    const totalFacturadoLinea = (estadoItem.facturada_hoy_580_610 || 0) + (estadoItem.facturada_610_999 || 0);
    const canceladoCuota527 = estadoItem.depurado_cuota_527 || 0;
    const canceladoOtros = estadoItem.depurado_980_984_999 || 0;
    const deudaNeta = pedido - totalFacturadoLinea;
    const cumplio = pedido > 0 && totalFacturadoLinea >= pedido ? "Sí" : "No";

    if (pedido === 0 && totalFacturadoLinea === 0 && canceladoCuota527 === 0 && canceladoOtros === 0) {
      continue;
    }

    totalPedido += pedido;
    totalFacturado += totalFacturadoLinea;
    totalCanceladoCuota527 += canceladoCuota527;
    totalCanceladoOtros += canceladoOtros;

    const [casaMatriz, sucursal, oc, articulo] = String(key).split("||");
    detailLines.push([
      casaMatriz,
      sucursal,
      oc,
      articulo,
      canceladoCuota527,
      canceladoOtros,
      pedido,
      totalFacturadoLinea,
      deudaNeta,
      cumplio,
    ]);
  }

  if (!detailLines.length) {
    alert("No hay datos para exportar. Verifica que existan matches entre OC/articulo de plan y estado.");
    return;
  }

  const totalCancelado = totalCanceladoCuota527 + totalCanceladoOtros;
  const totalDeudaNeta = totalPedido - totalFacturado;
  const lines = [];
  lines.push(["Resumen", "Total Pedido", "Total Facturado", "Total Cancelado", "Deuda Neta"]);
  lines.push(["", totalPedido, totalFacturado, totalCancelado, totalDeudaNeta]);
  lines.push(["Casa Matriz", "Sucursal", "OC", "Articulo", "Cancelado Cuota 527", "Cancelado (980/984/999)", "Total Pedido", "Total Facturado", "Deuda Neta", "Cumplió Plan"]);
  lines.push(...detailLines);

  const ws = XLSX.utils.aoa_to_sheet(lines);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Deudas Casas Matrices");
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "deudas_casas_matrices.xlsx";
  console.log("Descargando archivo");
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildLanzamientoReport() {
  const reportRows = [];
  const hoy = new Date();
  const selectedOc = els.ocSelect.value || "Todos";
  
  // Usar state.comparisonRows que ya tienen los cálculos correctos
  const comparisonData = state.comparisonRows;
  
  if (!comparisonData.length) return reportRows;
  
  // Crear mapa de estado rows por OC + articulo
  const estadoByOcArticulo = new Map();
  for (const row of state.filteredEstadoRows) {
    const articulo = normalizeArticleCode(row[state.columns.estadoArticuloEffective || state.columns.estadoArticulo]);
    const oc = String(row[state.columns.estadoOc] || "").trim() || "SIN_OC";
    if (!articulo) continue;
    const key = buildOcArticuloKey(oc, articulo);
    if (!estadoByOcArticulo.has(key)) estadoByOcArticulo.set(key, []);
    estadoByOcArticulo.get(key).push(row);
  }
  
  // Crear mapa de datos del Plan por OC+articulo y por OC, con fecha de inicio
  const planDataMap = new Map();
  const planDataByOc = new Map();
  for (const lanzaRow of state.lanzamientoRows) {
    const articulo = normalizeArticleCode(lanzaRow[state.columns.lanzaArticulo]);
    const oc = String(lanzaRow[state.columns.lanzaOc] || "").trim() || "SIN_OC";
    if (!articulo) continue;

    const rowStartRaw = String(lanzaRow.lanzamientoStartDate || "").trim();
    const rowStartDate = parseDateValue(rowStartRaw);
    const candidate = {
      segmento: state.columns.lanzaSegmento ? String(lanzaRow[state.columns.lanzaSegmento] || "").trim() : "",
      negocioPlan: state.columns.lanzaNegocio ? String(lanzaRow[state.columns.lanzaNegocio] || "").trim() : "",
      fechaInicio: rowStartRaw || "",
      fechaInicioDate: rowStartDate || null,
    };

    const key = buildOcArticuloKey(oc, articulo);
    const existing = planDataMap.get(key);
    if (!existing) {
      planDataMap.set(key, candidate);
    } else if (candidate.fechaInicioDate && existing.fechaInicioDate) {
      if (candidate.fechaInicioDate < existing.fechaInicioDate) {
        planDataMap.set(key, candidate);
      }
    } else if (candidate.fechaInicioDate && !existing.fechaInicioDate) {
      planDataMap.set(key, candidate);
    }

    const ocKey = normalizeOcKey(oc);
    const existingOc = planDataByOc.get(ocKey);
    if (!existingOc) {
      planDataByOc.set(ocKey, candidate);
    } else if (candidate.fechaInicioDate && existingOc.fechaInicioDate) {
      if (candidate.fechaInicioDate < existingOc.fechaInicioDate) {
        planDataByOc.set(ocKey, candidate);
      }
    } else if (candidate.fechaInicioDate && !existingOc.fechaInicioDate) {
      planDataByOc.set(ocKey, candidate);
    }
  }
  
  // Crear un mapa de datos agrupados por OC + articulo
  const reportMap = new Map();
  
  for (const comp of comparisonData) {
    const oc = comp.oc || "SIN_OC";
    const articulo = comp.articulo;
    
    // Filtrar por OC seleccionada
    if (selectedOc !== "Todos" && oc !== selectedOc) {
      continue;
    }
    
    const key = buildOcArticuloKey(oc, articulo);
    const planData = planDataMap.get(key) || planDataByOc.get(normalizeOcKey(oc)) || { segmento: "", negocioPlan: "", fechaInicio: "", fechaInicioDate: null };
    
    // Si no existe entrada, crearla
    if (!reportMap.has(key)) {
      const rawNegocio = comp.negocio || planData.negocioPlan || "";
      const negocioText = getNegocioDescripcion(rawNegocio);
      const negocioCodigo = rawNegocio ? (state.negocioCodificadoMap.get(normalizeLabel(rawNegocio)) || rawNegocio) : "";

      reportMap.set(key, {
        oc,
        articulo,
        negocio: negocioText,
        negocioCodigo,
        segmento: comp.segmento || planData.segmento || "",
        planData,
        cantidadPedida: comp.pedido || 0,
        facturadaHoy: comp.facturada_hoy_580_610 || 0,
        facturada610: comp.facturada_610_999 || 0,
        cargaEnProceso: comp.carga_proceso_535_555 || 0,
        listoCargar: comp.listo_cargar_560_565 || 0,
        cancelado: comp.depurado_980_984_999 || 0,
        sinCarga: comp.sin_carga_menor_535 || 0,
        descripcion: comp.descripcion || "",
        estadoRows: estadoByOcArticulo.get(key) || [],
      });
    } else {
      // Si existe, acumular cantidades
      const entry = reportMap.get(key);
      entry.cantidadPedida += comp.pedido || 0;
      entry.facturadaHoy += comp.facturada_hoy_580_610 || 0;
      entry.facturada610 += comp.facturada_610_999 || 0;
      entry.cargaEnProceso += comp.carga_proceso_535_555 || 0;
      entry.listoCargar += comp.listo_cargar_560_565 || 0;
      entry.cancelado += comp.depurado_980_984_999 || 0;
      entry.sinCarga += comp.sin_carga_menor_535 || 0;
    }
  }
  
  // Calcular métricas adicionales para cada entrada
  for (const entry of reportMap.values()) {
    const planData = entry.planData || { fechaInicio: "", fechaInicioDate: null };
    const fechaInicioDate = planData.fechaInicioDate || null;
    
    // NS 15 días
    let ns15 = 0;
    if (fechaInicioDate) {
      const end15 = new Date(fechaInicioDate);
      end15.setDate(end15.getDate() + 15);
      let facturado15 = 0;
      for (const row of entry.estadoRows) {
        const fecha = parseDateValue(row[state.columns.estadoFecha]);
        if (fecha && fecha <= end15) {
          const ultimo = parseIntSafe(row[state.columns.estadoUltimo]);
          const siguiente = parseIntSafe(row[state.columns.estadoSiguiente]);
          const category = classifyEstado(ultimo, siguiente);
          if (category === "facturada_hoy_580_610" || category === "facturada_610_999") {
            facturado15 += getEstadoRowCantidad(row, category);
          }
        }
      }
      ns15 = entry.cantidadPedida > 0 ? (facturado15 / entry.cantidadPedida) * 100 : 0;
    }
    entry.ns15 = ns15;

    // NS hasta hoy (fecha de análisis)
    let nsToday = 0;
    if (fechaInicioDate) {
      let facturadoHastaHoy = 0;
      for (const row of entry.estadoRows) {
        const fecha = parseDateValue(row[state.columns.estadoFecha]);
        if (fecha && fecha <= hoy) {
          const ultimo = parseIntSafe(row[state.columns.estadoUltimo]);
          const siguiente = parseIntSafe(row[state.columns.estadoSiguiente]);
          const category = classifyEstado(ultimo, siguiente);
          if (category === "facturada_hoy_580_610" || category === "facturada_610_999") {
            facturadoHastaHoy += getEstadoRowCantidad(row, category);
          }
        }
      }
      nsToday = entry.cantidadPedida > 0 ? (facturadoHastaHoy / entry.cantidadPedida) * 100 : 0;
    }
    entry.ns = nsToday;

    // Días a 100%
    let daysTo100 = null;
    if (fechaInicioDate && entry.estadoRows.length) {
      let facturadoTotal = 0;
      let lastFactDate = null;
      for (const row of entry.estadoRows) {
        const fecha = parseDateValue(row[state.columns.estadoFecha]);
        if (!fecha) continue;
        const ultimo = parseIntSafe(row[state.columns.estadoUltimo]);
        const siguiente = parseIntSafe(row[state.columns.estadoSiguiente]);
        const category = classifyEstado(ultimo, siguiente);
        if (category === "facturada_hoy_580_610" || category === "facturada_610_999") {
          facturadoTotal += getEstadoRowCantidad(row, category);
          if (!lastFactDate || fecha > lastFactDate) {
            lastFactDate = fecha;
          }
        }
      }
      if (facturadoTotal >= entry.cantidadPedida && lastFactDate) {
        daysTo100 = Math.ceil((lastFactDate - fechaInicioDate) / (1000 * 60 * 60 * 24));
      }
    }
    entry.daysTo100 = daysTo100;
  }
  
  // Construir filas del reporte
for (const entry of reportMap.values()) {
      const planData = entry.planData || { fechaInicio: "", fechaInicioDate: null };
      const fechaInicioDate = planData.fechaInicioDate || null;
      const fechaInicioText = planData.fechaInicio || "";
      const mes = fechaInicioDate ? ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][fechaInicioDate.getMonth()] : "";

      const cantidadFacturadaTotal = entry.facturadaHoy + entry.facturada610;
      const cantidadEnProcesoTotal = entry.cargaEnProceso + entry.listoCargar;
      const pctAvance = entry.cantidadPedida > 0 ? (cantidadFacturadaTotal / entry.cantidadPedida) * 100 : 0;
      const pctCargaProceso = entry.cantidadPedida > 0 ? (cantidadEnProcesoTotal / entry.cantidadPedida) * 100 : 0;
      const pctAvanceTotal = entry.cantidadPedida > 0 ? ((cantidadFacturadaTotal + cantidadEnProcesoTotal) / entry.cantidadPedida) * 100 : 0;
      
      const diasPasados = fechaInicioDate ? Math.ceil((hoy - fechaInicioDate) / (1000 * 60 * 60 * 24)) : 0;
      const diasRestantes = fechaInicioDate ? Math.max(0, 15 - diasPasados) : 0;
      
      const pctCancelado = entry.cantidadPedida > 0 ? (entry.cancelado / entry.cantidadPedida) * 100 : 0;
      reportRows.push({
        mes,
        oc: entry.oc,
        negocio: entry.negocio,
        segmento: entry.segmento,
        articulo: entry.articulo,
        fechaInicio: fechaInicioText,
        cantidadPedida: Math.round(entry.cantidadPedida),
        cantidadFacturada: Math.round(cantidadFacturadaTotal),
        pctAvance,
        cantidadCargaProceso: Math.round(cantidadEnProcesoTotal),
        pctCargaProceso,
        pctAvanceTotal,
        cantidadCancelado: Math.round(entry.cancelado),
        pctCancelado,
        diasRestantes,
        nivelServicio: entry.ns,
        ns15: entry.ns15,
        daysTo100: entry.daysTo100,
      });
    }
    
    reportRows.sort((a, b) => {
      // Extraer número de lanzamiento de oc (ej. Lanza_12_26 -> 12)
      const getLanzaNum = (oc) => {
        const match = String(oc || "").match(/LANZA[_\-\s]*(\d+)/i);
        return match ? Number(match[1]) : 0;
      };
      const numA = getLanzaNum(a.oc);
      const numB = getLanzaNum(b.oc);
      if (numA !== numB) return numA - numB;
      const da = parseDateValue(a.fechaInicio);
      const db = parseDateValue(b.fechaInicio);
      if (da && db) return da - db;
      if (da) return -1;
      if (db) return 1;
      return a.oc.localeCompare(b.oc) || a.articulo.localeCompare(b.articulo);
    });
    
    return reportRows;
  }

function renderLanzamientoReport() {
  const report = buildLanzamientoReport();
  
  if (!report.length) {
    els.lanzamientoSection.classList.add("hidden");
    return;
  }
  
  els.lanzamientoSection.classList.remove("hidden");
  const columns = getLanzamientoColumns();
  
  const thead = els.lanzamientoTable.querySelector("thead");
  const tbody = els.lanzamientoTable.querySelector("tbody");
  
  thead.innerHTML = `<tr>${columns.map((col) => `<th>${col.label}</th>`).join("")}</tr>`;
  
  const lines = report.map((row) => {
    const rowClass = typeof row.ns15 === "number"
      ? getNivelServicioClass(row.ns15)
      : "";
    const cells = columns.map((col) => {
      const rawValue = row[col.key];
      let value = rawValue;
      const numericValue = Number(rawValue);
      if (!Number.isNaN(numericValue) && (col.key.includes("pct") || col.key === "nivelServicio")) {
        value = numericValue.toFixed(1) + "%";
      } else if (!Number.isNaN(numericValue) && col.key === "ns15") {
        value = numericValue.toFixed(1).replace(".", ",") + "%";
      } else if (col.key === "daysTo100") {
        value = row.daysTo100 === null || row.daysTo100 === undefined ? "No cumple" : String(Math.round(row.daysTo100));
      } else if (typeof value === "number") {
        value = Math.round(value);
      }
      return `<td>${escapeHtml(String(value))}</td>`;
    }).join("");
    return `<tr class="${rowClass}">${cells}</tr>`;
  });
  
  tbody.innerHTML = lines.join("");
}

function getLanzamientoColumns() {
  return [
    { key: "mes", label: "Mes" },
    { key: "oc", label: "OC" },
    { key: "negocio", label: "Negocio" },
    { key: "articulo", label: "Articulo" },
    { key: "fechaInicio", label: "Fecha Inicio" },
    { key: "cantidadPedida", label: "Plan" },
    { key: "cantidadFacturada", label: "Bultos Facturados" },
    { key: "pctAvance", label: "% Avance Facturado" },
    { key: "cantidadCargaProceso", label: "Entrega en el corto" },
    { key: "pctCargaProceso", label: "% Avance de entrega en corto" },
    { key: "pctAvanceTotal", label: "% Avance Total" },
    { key: "cantidadCancelado", label: "Cancelado" },
    { key: "pctCancelado", label: "% Cancelado" },
    { key: "diasRestantes", label: "Dias Restantes" },
    { key: "ns15", label: "NS 15 días" },
    { key: "nivelServicio", label: "NS" },
    { key: "daysTo100", label: "Días para cubrir el plan 100%" },
  ];
}

function exportLanzamientoConsolidadoExcel() {
  const report = buildLanzamientoReport();
  if (!report.length) {
    alert("No hay datos en Lanzamiento consolidado para exportar.");
    return;
  }

  const columns = getLanzamientoColumns();
  const rowsForExcel = report.map((row) => {
    const excelRow = {};
    for (const col of columns) {
      let value = row[col.key];
      const numericValue = Number(value);
      if (!Number.isNaN(numericValue) && (col.key.includes("pct") || col.key === "nivelServicio" || col.key === "ns15")) {
        value = Number(numericValue.toFixed(1));
      } else if (col.key === "daysTo100") {
        value = row.daysTo100 === null || row.daysTo100 === undefined ? "No cumple" : Math.round(row.daysTo100);
      } else if (typeof value === "number") {
        value = Math.round(value);
      }
      excelRow[col.label] = value;
    }
    return excelRow;
  });

  const ws = XLSX.utils.json_to_sheet(rowsForExcel);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Lanzamiento Consolidado");

  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  XLSX.writeFile(wb, `lanzamiento_consolidado_${y}${m}${d}.xlsx`);
}

function getNivelServicioClass(value) {
  if (value >= 98) return "ns-high";
  if (value >= 90) return "ns-medium";
  return "ns-low";
}

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function exportHistoricoToExcel(monthKey, historico, reportRows) {
  const workbook = XLSX.utils.book_new();

  // Sheet única: Lanzamiento Consolidado (todo lo que importa)
  const consolidadoSheet = XLSX.utils.json_to_sheet(reportRows);
  XLSX.utils.book_append_sheet(workbook, consolidadoSheet, 'Lanzamiento_Consolidado');

  // Descargar el archivo
  const fileName = `${monthKey}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
