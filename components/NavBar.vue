<template>
  <div>
    <nav class="nav-bar fixed px-4 h-12 flex items-center justify-between w-full top-0 bg-gray-800 z-20">
      <span class="text-2xl logo">scorebot</span>
      <div class="flex gap-1">
        <button class="p-1" @click="$emit('addPlayer')">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
          </svg>
        </button>
        <button class="p-1" @click="$emit('save', true)">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
          </svg>
        </button>
        <button class="p-1" @click="$emit('share')">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
          </svg>
        </button>
        <button class="p-1" @click="$emit('resetClick')">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,13H19V11H5M3,17H17V15H3M7,7V9H21V7" />
          </svg>
        </button>
      </div>
    </nav>
  </div>
</template>
