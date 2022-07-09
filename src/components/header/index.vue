<script setup lang="ts">
import { ref } from 'vue';
import {
  Layout, Menu, InputSearch,
} from 'ant-design-vue';
import { invoke } from '@tauri-apps/api';
import logo from '@/assets/logo.svg';
import WindowState, { getWindowState } from '@/types/window-state.d';

const current = ref<string[]>(['']);

const currentWindowState = ref<WindowState>(WindowState.Normal);

const changeWindowState = async (windowState: WindowState) => {
  try {
    const response: string = await invoke('change_window_state', {
      invokeMsg: windowState,
    });
    currentWindowState.value = getWindowState(response);
  } catch (err) {
    console.log(err);
  }
};

const exit = async () => {
  await invoke('exit');
};

</script>

<script lang="ts">

const { Header } = Layout;

const { Item } = Menu;

export default {
  name: 'AppHeader',
  components: {
    ALayout: Layout,
    ALayoutHeader: Header,
    AMenu: Menu,
    AMenuItem: Item,
    AInputSearch: InputSearch,
  },
};

</script>

<template>
  <a-layout-header class="header">
    <div class="logo-wrapper">
      <img
        class="logo"
        :src="logo"
        alt="logo"
      >
    </div>
    <a-menu
      v-model:selectedKeys="current"
      theme="dark"
      mode="horizontal"
    >
      <a-menu-item :key="1">
        nav 1
      </a-menu-item>
      <a-menu-item :key="2">
        nav 2
      </a-menu-item>
      <a-menu-item :key="3">
        nav 3
      </a-menu-item>
    </a-menu>
    <div class="search-wrapper">
      <a-input-search class="search" />
    </div>
    <div class="option-wrapper">
      <div
        class="minimize option"
        @click="changeWindowState(WindowState.Minimized)"
      >
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-minimize" />
        </svg>
      </div>
      <div
        v-if="currentWindowState === WindowState.Normal"
        class="normal option"
        @click="changeWindowState(WindowState.Maximized)"
      >
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-normal-size" />
        </svg>
      </div>
      <div
        v-if="currentWindowState === WindowState.Maximized"
        class="maxmize option"
        @click="changeWindowState(WindowState.Normal)"
      >
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-maximize" />
        </svg>
      </div>
      <div
        class="close option"
        @click="exit"
      >
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-close" />
        </svg>
      </div>
    </div>
  </a-layout-header>
</template>

<style>
.header {
  display: flex;
  flex-flow: row nowrap;
}

.logo-wrapper {
  cursor: pointer;
}

.logo {
  height: 30px;
}

.nav {
  display: flex;
  flex-flow: row nowrap;
}

.search-wrapper {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.search {
  width: 200px;
}

.option-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.option-wrapper:last-child {
  margin-left: auto;
}

.option {
  width: 30px;
  cursor: pointer;
}

.option svg {
  fill: white;
}
</style>
