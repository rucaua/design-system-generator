<template>
  <div>
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600">
          <font-awesome-icon icon="palette" class="mr-2" />
          Color Theme Generator
        </h1>
        <div>
          <a 
            href="https://github.com/yourusername/color-generator" 
            target="_blank"
            class="text-gray-600 hover:text-gray-900"
            title="View on GitHub"
          >
            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
          </a>
        </div>
      </div>
    </header>
    
    <main>
      <slot />
    </main>
    
    <footer class="bg-gray-100 mt-12">
      <div class="container mx-auto px-4 py-6 text-center text-gray-600">
        <p>
          Built with Vue.js, Nuxt.js, and Tailwind CSS
        </p>
        <p class="mt-2 text-sm">
          © {{ new Date().getFullYear() }} Color Theme Generator
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Layout component for the application
</script>