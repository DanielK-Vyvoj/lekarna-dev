<script lang="ts">
    import { onMount } from "svelte";
    import { read, utils } from "xlsx";
    import type { Worksheet } from "xlsx";
    import type { FirebaseRef, DatabaseReference } from "firebase/database";
    import { db } from "../../firebase/Firebase"; // Import instance databáze z vašeho `firebase.js` souboru
  
    let selectedFile: File | undefined;
    let excelData: any[] = [];
  
    function handleFileUpload(event: InputEvent) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        selectedFile = fileInput.files[0];
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0]; // Předpokládáme, že chcete načíst první list
  
          const worksheet = workbook.Sheets[sheetName] as Worksheet;
          excelData = utils.sheet_to_json(worksheet, { header: 1 });
  
          console.log(excelData); // Vypsání dat z Excelu v konzoli
        };
  
        reader.readAsArrayBuffer(selectedFile);
      }
    }
  
    function handleSaveData() {
      if (excelData.length > 0) {
        const newRef: FirebaseRef = db.ref("excelData").push();
        newRef
          .set(excelData)
          .then(() => {
            console.log("Data byla uložena do databáze.");
          })
          .catch((error) => {
            console.error("Chyba při ukládání dat:", error);
          });
      }
    }
  
    onMount(() => {
      // Reset selectedFile a excelData při načítání komponenty
      selectedFile = undefined;
      excelData = [];
    });
  </script>
  
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">Nahrát a zobrazit Excel soubor</h1>
  
    <div>
      <label for="excelFile" class="block text-sm font-medium text-gray-700 mb-1">
        Vyberte Excel soubor:
      </label>
      <input
        type="file"
        id="excelFile"
        accept=".xlsx"
        class="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
        on:change={handleFileUpload}
      />
    </div>
  
    {#if excelData.length > 0}
      <h2 class="text-xl font-bold mt-6 mb-2">Zobrazená data:</h2>
  
      <table class="min-w-full border border-gray-300">
        <thead>
          <tr>
            {#each excelData[0] as headerItem}
              <th class="py-2 px-4 border-b border-gray-300">{headerItem}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each excelData.slice(1) as row}
            <tr>
              {#each row as cell}
                <td class="py-2 px-4 border-b border-gray-300">{cell}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
  
      <button
        type="button"
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        on:click={handleSaveData}
      >
        Uložit data do databáze
      </button>
    {/if}
  </main>
  
  <style>
    /* Přidejte vlastní styly pro komponentu */
  </style>
  