<script lang="ts">
    import type { User } from 'firebase/auth';
    import { getAuth } from 'firebase/auth';
    import { app } from '../../firebase/Firebase';
    import { goto } from '$app/navigation';

  export let user: User | null;
  let isLoading = true;

  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      goto('/prihlaseni');
    } catch (error) {
      console.log(error);
    }
  };

  setTimeout(() => {
    isLoading = false;
  }, 4000); // Zpoždění zobrazení seznamu odkazů o alespoň 4 sekundy

  $: {
    if (user !== null) {
      isLoading = false;
    }
  }

  </script>
  {#if isLoading}
  <div class="flex justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
  </div>
{:else}
 {#if user}
 <div class="flex flex-col h-screen">
   <div class="flex items-center justify-between flex-wrap bg-gray-100 p-6">
     <div class="flex items-center flex-shrink-0 text-gray-800 mr-6 border border-solid" >
     </div>
     <div class="block md:hidden">
       <button id="menu-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-gray-900">
         <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
       </button>
     </div>
     <div class="hidden md:block">
       <p class="text-green-500 text-center font-bold text-2xl ">Vítejte {user.email}</p>
       <button class="ml-16 px-8 py-2 text-sm font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 " on:click={handleLogout}>Odhlásit se</button>
     </div>
   </div>
   <nav class="flex-grow pb-4 pr-4 pl-6 hidden md:block">
    <a class="block px-4 py-2 mt-8 mb-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-700" href="/admin">Pridani po domluve</a>
    <a class="block px-4 py-2 mt-8 mb-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-700" href="/admin">Pridani po domluve</a>
    <a class="block px-4 py-2 mt-8 mb-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-700" href="/admin">Pridani po domluve</a>
    <a class="block px-4 py-2 mt-8 mb-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-700" href="/admin">Pridani po domluve</a>
    <a class="block px-4 py-2 mt-8 mb-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-700" href="/admin">Pridani po domluve</a>
  </nav>
  </div>
  {:else}
  <p>Přihlaste se, aby viděli dashboard.</p>
{/if}  
{/if}