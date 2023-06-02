<script lang="ts">
    import { onMount } from 'svelte';
    import { read, utils } from 'xlsx';
    import type { WorkSheet, WorkBook } from 'xlsx';
    import { db, storage } from '../../firebase/firebase';
    import { createEventDispatcher } from 'svelte';
  
    let selectedFile: File | undefined;
    let formData: Record<string, any> = {};
    let displayFields: string[] = [];
  
    const handleFileChange = (event: Event & { target: { files: FileList } }) => {
      selectedFile = event.target.files?.[0];
    };
  
    const dispatch = createEventDispatcher();
  
    const uploadFile = async () => {
      if (selectedFile) {
        const fileReader = new FileReader();
        fileReader.onload = async (event: ProgressEvent<FileReader>) => {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook: WorkBook = read(data, { type: 'array' });
          const worksheet: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = utils.sheet_to_json(worksheet, { header: 1 }) as Record<string, any>[];
  
          // Výběr polí pro zobrazení a uložení
          displayFields = Object.keys(jsonData[0]);
        };
  
        fileReader.readAsArrayBuffer(selectedFile);
      }
    };
  
    const handleSubmit = async () => {
      // Vytvoření objektu dat pro uložení do databáze
      const dataToSave: Record<string, any> = {};
      for (const field of displayFields) {
        if (formData[field]) {
          dataToSave[field] = formData[field];
        }
      }
  
      // Uložení dat do Firebase Realtime Database
      await db.ref('/excelData').push(dataToSave);
  
      alert('Data úspěšně uložena.');
  
      // Vyčištění formuláře
      formData = {};
      dispatch('formSubmitted');
    };
  
    onMount(() => {
      // Zde můžeš provést inicializaci a konfiguraci Firebase (pokud ještě nebyla provedena)
    });
  </script>
  
  <main>
    <h1>Upload Excel</h1>
    <input type="file" accept=".xlsx,.xls" on:change={handleFileChange} />
    <button on:click={uploadFile}>Upload</button>
  
    {#if displayFields.length > 0}
      <h2>Výběr dat pro uložení:</h2>
      <form on:submit|preventDefault={handleSubmit}>
        {#each displayFields as field}
          <label>
            {field}
            <input type="text" bind:value={formData[field]} />
          </label>
        {/each}
        <button type="submit">Uložit</button>
      </form>
    {/if}
  </main>
  
  <style>
    /* Přidej styly pro komponentu zde pomocí Tailwind CSS */
  </style>
  