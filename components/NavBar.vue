<template>
  <nav class="nav-bar px-4 h-20 flex items-center justify-between w-full top-0 bg-gray-800 z-20">
    <span class="text-2xl logo">scorebot</span>
    <div class="flex gap-3">
      <svg class="hover:text-lime-500/90 active:stroke-gray-600" style="width:28px;height:28px" viewBox="0 0 24 24">
        <g>
          <path fill="currentColor" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
          <rect
            class="btn cursor-pointer hover:stroke-transparent hover:fill-transparent focus:fill-transparent focus:stroke-transparent active:fill-transparent active:stroke-transparent"
            fill="transparent"
            x="0"
            y="0"
            width="32"
            height="32"
            @click="$emit('addPlayer')"
          />
        </g>
      </svg>
      <svg class="hover:text-lime-500/90 active:stroke-gray-600" style="width:28px;height:28px" viewBox="0 0 24 24">
        <g>
          <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
          <rect
            class="btn"
            fill="transparent"
            x="0"
            y="0"
            width="32"
            height="32"
            @click="$emit('save', true)"
          />
        </g>
      </svg>
      <svg class="hover:text-lime-500/90 active:stroke-gray-600" style="width:28px;height:28px" viewBox="0 0 24 24">
        <g>
          <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          <rect
            id="loadButton"
            class="btn"
            fill="transparent"
            x="0"
            y="0"
            width="32"
            height="32"
            @click="$emit('load', true)"
          />
        </g>
      </svg>
      <svg class="hover:text-lime-500/90 active:stroke-gray-600" style="width:28px;height:28px" viewBox="0 0 24 24">
        <g>
          <path fill="currentColor" d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
          <rect
            id="shareButton"
            class="btn"
            fill="transparent"
            x="0"
            y="0"
            width="32"
            height="32"
            @click="$emit('share')"
          />
        </g>
      </svg>
      <svg class="hover:text-lime-500/90 active:stroke-gray-600" style="width:28px;height:28px;" viewBox="0 0 24 24">
        <g>
          <path fill="currentColor" d="M5,13H19V11H5M3,17H17V15H3M7,7V9H21V7" />
          <rect
            id="resetButton"
            class="btn"
            fill="transparent"
            x="0"
            y="0"
            width="32"
            height="32"
            @click="$emit('resetClick')"
          />
        </g>
      </svg>
    </div>
  </nav>
</template>
