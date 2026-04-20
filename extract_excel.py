import openpyxl
import json

# Leer el Excel
wb = openpyxl.load_workbook(r'c:\Users\mselmo\OneDrive - Arcor\lanza ok\VERSION 2\Negocio-segmento.xlsx')
ws = wb.active

# Extraer datos
data = []
for row in ws.iter_rows(min_row=2, values_only=True):
    if row and row[0]:
        data.append({
            'codigo_negocio': str(row[0]).strip() if row[0] else '',
            'negocio': str(row[1]).strip() if row[1] else '',
            'segmento': str(row[2]).strip() if len(row) > 2 and row[2] else ''
        })

# Mostrar en formato JSON
print(json.dumps(data, ensure_ascii=False, indent=2))
