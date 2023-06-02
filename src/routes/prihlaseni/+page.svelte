<script lang="ts">
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { app } from '../../firebase/Firebase';
    import { createEventDispatcher } from 'svelte';
  
    const auth = getAuth(app);
    const dispatch = createEventDispatcher();
  
    let email = '';
    let password = '';
  
    let errorMessage: string | null = null;
    let showModal = false;
  
    const handleSignIn = async (event: Event) => {
      event.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        goto('/admin');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
          errorMessage = 'Nastala chyba při přihlašování: Zkuste jiné heslo nebo email' // Zde můžeš změnit chybovou hlášku
          showModal = true;
        } else {
          console.error('Neočekávaná chyba:', error);
        }
      }
    };
    
    const handleCloseModal = () => {
      showModal = false;
    }
  </script>

  <div>
    <form on:submit={handleSignIn}>
      <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            class="absolute inset-0 bg-gradient-to-r from-green-200 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/dev-lekarny.appspot.com/o/Lekerna%20Admin.png?alt=media&token=507039a0-1eba-4707-9666-6f5dcad9a9f2&_gl=1*1qtoxe9*_ga*MTA2NDMzNzg5Mi4xNjg1NjQ0MTUw*_ga_CW55HF8NVT*MTY4NTcxNDYwNS43LjEuMTY4NTcxNTEzNS4wLjAuMA.." alt="Logo" class="mx-auto h-16 mb-4">
              </div>
              <div>
                <h1 class="text-2xl font-semibold text-black">Přihlášení do administrace</h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div class="relative">
                    <input bind:value={email} required  autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                    <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                  </div>
                  <div class="relative">
                    <input bind:value={password} required autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                    <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Vaše heslo</label>
                  </div>
                  <div class="flex justify-center">
                    <button type="submit" class="justify-items-center bg-green-500 hover:bg-green-800 text-white rounded-md px-2 py-1">Přihlášení</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  
    {#if showModal}
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Překrytí obrazovky -->
          <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <!-- Modální okno -->
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <!-- Ikona -->
                  <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Chyba přihlášení
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm leading-5 text-gray-500">{errorMessage}</p>
                    <button class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-green-500" on:click={handleCloseModal}>
                      Zavřít
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>