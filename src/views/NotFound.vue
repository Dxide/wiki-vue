<template>
  <div class="md:flex min-h-screen">
    <div class="w-full  bg-white flex items-center justify-center">
      <div class="max-w-sm m-8">
        <div class="text-black text-5xl md:text-15xl font-black">
          404                    </div>
        <div class="w-16 h-1 bg-purple-light my-3 md:my-6"></div>

        <p class="text-grey-darker text-2xl md:text-3xl font-light mb-8 leading-normal">
          抱歉，你访问的页面走丢了                   </p>
          <button @click="onClick"
              class="bg-transparent text-grey-darkest font-bold uppercase tracking-wide py-3 px-6 border-2 border-grey-light hover:border-grey rounded-lg">
            返回首页
          </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router=useRouter()
const onClick=()=>{
  router.push('/ebook')
}
</script>

<style scoped>
html {
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}

header,
nav,
section {
  display: block;
}

figcaption,
main {
  display: block;
}


strong {
  font-weight: inherit;
}

strong {
  font-weight: bolder;
}

code {
  font-family: monospace, monospace;
  font-size: 1em;
}

dfn {
  font-style: italic;
}

svg:not(:root) {
  overflow: hidden;
}

button,
input {
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

button,
input {
  overflow: visible;
}

button {
  text-transform: none;
}

button,
html [type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

legend {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}

[type="checkbox"],
[type="radio"] {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

menu {
  display: block;
}

canvas {
  display: inline-block;
}

template {
  display: none;
}

[hidden] {
  display: none;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: sans-serif;
}

*,
*::before,
*::after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

p {
  margin: 0;
}

button {
  background: transparent;
  padding: 0;
}



*,
*::before,
*::after {
  border-width: 0;
  border-style: solid;
  border-color: #dae1e7;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  border-radius: 0;
}

button,
input {
  font-family: inherit;
}

input::-webkit-input-placeholder {
  color: inherit;
  opacity: .5;
}

input:-ms-input-placeholder {
  color: inherit;
  opacity: .5;
}

input::-ms-input-placeholder {
  color: inherit;
  opacity: .5;
}

input::placeholder {
  color: inherit;
  opacity: .5;
}

button,
[role=button] {
  cursor: pointer;
}

.bg-transparent {
  background-color: transparent;
}

.bg-white {
  background-color: #fff;
}


.bg-purple-light {
  background-color: #a779e9;
}


.border-grey-light {
  border-color: #dae1e7;
}

.hover\:border-grey:hover {
  border-color: #b8c2cc;
}

.rounded-lg {
  border-radius: .5rem;
}

.border-2 {
  border-width: 2px;
}


.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.items-center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.justify-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}



.font-light {
  font-weight: 300;
}

.font-bold {
  font-weight: 700;
}

.font-black {
  font-weight: 900;
}

.h-1 {
  height: .25rem;
}

.leading-normal {
  line-height: 1.5;
}

.m-8 {
  margin: 2rem;
}

.my-3 {
  margin-top: .75rem;
  margin-bottom: .75rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.max-w-sm {
  max-width: 30rem;
}

.min-h-screen {
  min-height: 100vh;
}

.py-3 {
  padding-top: .75rem;
  padding-bottom: .75rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}




.text-black {
  color: #22292f;
}

.text-grey-darkest {
  color: #3d4852;
}

.text-grey-darker {
  color: #606f7b;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-5xl {
  font-size: 3rem;
}

.uppercase {
  text-transform: uppercase;
}


.tracking-wide {
  letter-spacing: .05em;
}

.w-16 {
  width: 4rem;
}

.w-full {
  width: 100%;
}

@media (min-width: 768px) {

  .md\:flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .md\:my-6 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }


  .md\:text-3xl {
    font-size: 1.875rem;
  }

  .md\:text-15xl {
    font-size: 9rem;
  }
}

</style>