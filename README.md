# Wildu Hub — GitHub Pages Shell

Questa è una shell PWA minimale per aprire il pannello Google Apps Script di Wildu Hub con icona e installazione pulita.

## File inclusi

- `index.html` — pagina principale installabile
- `manifest.json` — manifest PWA
- `sw.js` — service worker leggero solo per la shell
- `version.json` — versione shell
- `icon-192-maskable.png`
- `icon-512-maskable.png`

## Come pubblicarla

1. Crea un repository GitHub, per esempio `wildu-hub-shell`.
2. Carica tutti questi file nella root del repository.
3. Vai in `Settings` → `Pages`.
4. In `Build and deployment`, scegli:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Apri l’URL GitHub Pages generato.
6. Installa la PWA dal browser.

## Link GAS configurato

`https://script.google.com/macros/s/AKfycbyFtBdZ0RGjCBpyHN8E4qOGnAny_VfLMpiJaKyaq8edZBRQ6XwlptP9BLcVibk_6xsS/exec`

Per cambiarlo, modifica in `index.html`:
- l’attributo `href` del bottone `openAppBtn`
- la costante `GAS_EXEC_URL`

La shell non contiene dati sensibili e non usa iframe.
