<script lang="ts">
    import { onMount } from 'svelte';
    import { getAuth, type User } from 'firebase/auth';
    import { app } from '../../firebase/Firebase';
    import { goto } from '$app/navigation';
    import NavigaceMenu from '../../components/Admin/Sidebar.svelte';
  
    // Deklarace proměnných
    const auth = getAuth(app);
    let user: User | null = null;
    let isPageLoading = true; // Nová proměnná pro zobrazení spinneru
  
    // Funkce, která se spustí při načtení stránky
    onMount(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          user = authUser;
        } else {
          goto('/prihlaseni');
        }
        // Skrytí spinneru po 5 sekundách
        setTimeout(() => {
          isPageLoading = false;
        }, 2000);
      });
      return () => unsubscribe();
    });
  
    // Otevření a zavření modálního okna pro editaci profilu
    let showModal = false;
    const handleOpenModal = () => {
      showModal = true;
    };
    const handleCloseModal = () => {
      showModal = false;
    };
  </script>
  
  <!-- Nová část s spinnerem -->
  {#if isPageLoading}
    <div class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white z-50">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
    </div>
  {/if}
  
  <div class="flex h-screen">
    <NavigaceMenu {user} />
  
    <div class="flex-1 p-10">
        <div>
            <img src="https://firebasestorage.googleapis.com/v0/b/dev-lekarny.appspot.com/o/Lekerna%20Admin.png?alt=media&token=507039a0-1eba-4707-9666-6f5dcad9a9f2&_gl=1*1qtoxe9*_ga*MTA2NDMzNzg5Mi4xNjg1NjQ0MTUw*_ga_CW55HF8NVT*MTY4NTcxNDYwNS43LjEuMTY4NTcxNTEzNS4wLjAuMA.." alt="Logo Dental Adel" class="mx-auto h-16 mb-4">
          </div>
      <slot />
    </div>
  </div>