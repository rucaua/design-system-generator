<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Color Theme Generator</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Color Input Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Choose Base Color</h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Color Picker
            </label>
            <div class="flex items-center">
              <input 
                type="color" 
                v-model="baseColor"
                class="h-10 w-10 rounded border border-gray-300 cursor-pointer"
              />
              <div 
                class="ml-2 h-10 w-10 rounded border border-gray-300"
                :style="{ backgroundColor: baseColor }"
              ></div>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Hex Value
            </label>
            <div class="flex items-center">
              <input 
                type="text" 
                v-model="baseColor"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="#3B82F6"
              />
              <button 
                @click="pickRandomColor"
                class="ml-2 p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                title="Random Color"
              >
                <font-awesome-icon icon="sync" />
              </button>
            </div>
          </div>
          
          <button 
            @click="generateColors"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <font-awesome-icon icon="palette" class="mr-2" />
            Generate Theme
          </button>
        </div>
        
        <!-- Color Palette Preview -->
        <div class="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 class="text-xl font-semibold mb-4">Color Palette</h2>
          
          <div v-if="isLoading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          
          <div v-else-if="!palette" class="flex justify-center items-center h-64 text-gray-500">
            <p>Generate a theme to see the palette</p>
          </div>
          
          <div v-else>
            <!-- Semantic Colors -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-2">Semantic Colors</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                <div 
                  v-for="(color, name) in tokens" 
                  :key="name"
                  class="flex flex-col items-center"
                >
                  <div 
                    class="h-12 w-full rounded-md mb-1 border border-gray-200"
                    :style="{ backgroundColor: color }"
                  ></div>
                  <span class="text-xs text-gray-600">{{ name }}</span>
                  <span class="text-xs font-mono">{{ color }}</span>
                </div>
              </div>
            </div>
            
            <!-- Color Scales -->
            <div v-for="(shades, colorName) in palette" :key="colorName" class="mb-4">
              <h3 class="text-lg font-medium mb-2 capitalize">{{ colorName }}</h3>
              <div class="flex flex-wrap">
                <div 
                  v-for="(hex, shade) in shades" 
                  :key="`${colorName}-${shade}`"
                  class="flex flex-col items-center mr-2 mb-2"
                >
                  <div 
                    class="h-10 w-10 rounded-md mb-1 border border-gray-200"
                    :style="{ backgroundColor: hex }"
                  ></div>
                  <span class="text-xs text-gray-600">{{ shade }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Export Options -->
      <div v-if="palette" class="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Export Options</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Tailwind Config -->
          <div>
            <h3 class="text-lg font-medium mb-2">Tailwind Config</h3>
            <pre class="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-60">{{ tailwindConfigString }}</pre>
            <button 
              @click="copyToClipboard(tailwindConfigString)"
              class="mt-2 bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <font-awesome-icon icon="copy" class="mr-1" />
              Copy
            </button>
          </div>
          
          <!-- Figma Tokens -->
          <div>
            <h3 class="text-lg font-medium mb-2">Figma Tokens</h3>
            <pre class="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-60">{{ figmaTokensString }}</pre>
            <button 
              @click="copyToClipboard(figmaTokensString)"
              class="mt-2 bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <font-awesome-icon icon="copy" class="mr-1" />
              Copy
            </button>
            <a 
              href="#"
              @click.prevent="downloadFigmaTokens"
              class="ml-2 inline-block bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <font-awesome-icon icon="download" class="mr-1" />
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const baseColor = ref('#3B82F6') // Default blue
const isLoading = ref(false)
const palette = ref(null)
const tokens = ref(null)
const tailwindConfig = ref(null)
const figmaTokens = ref(null)

// Computed
const tailwindConfigString = computed(() => {
  if (!tailwindConfig.value) return ''
  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(tailwindConfig.value, null, 2)}
    }
  }
}`
})

const figmaTokensString = computed(() => {
  if (!figmaTokens.value) return ''
  return JSON.stringify(figmaTokens.value, null, 2)
})

// Methods
const generateColors = async () => {
  try {
    isLoading.value = true
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        baseColor: baseColor.value
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to generate colors')
    }
    
    const data = await response.json()
    
    palette.value = data.palette
    tokens.value = data.tokens
    tailwindConfig.value = data.tailwindConfig
    figmaTokens.value = data.figmaTokens
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to generate colors. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const pickRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  baseColor.value = color
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Copied to clipboard!')
    })
    .catch(err => {
      console.error('Failed to copy:', err)
      alert('Failed to copy to clipboard')
    })
}

const downloadFigmaTokens = () => {
  if (!figmaTokens.value) return
  
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(figmaTokens.value, null, 2))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute("href", dataStr)
  downloadAnchorNode.setAttribute("download", "figma-tokens.json")
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
</script>