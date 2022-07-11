<script setup lang="ts">
import { ref } from 'vue';
import {
  Layout, Menu, Input,
} from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
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
    AInput: Input,
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
      theme="light"
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
      <a-input class="search">
        <template #prefix>
          <search-outlined type="search" />
        </template>
      </a-input>
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

<style lang="less" scoped>
.ant-menu {
  border-bottom: 0px;

  :deep(.ant-menu-item:hover:before),
  :deep(.ant-menu-item-selected::before),
  :deep(.ant-menu-item-active:before) {
    border-top: 2px solid @primary-color;
  }
}

.ant-menu-horizontal {

  :deep(.ant-menu-item::before),
  :deep(.ant-menu-sub-menu::before) {
    position: absolute;
    right: 20px;
    top: 0;
    left: 20px;
    border-bottom: 2px solid transparent;
    transition: border-color 0.3s,
      padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    content: '';
  }

  :deep(.ant-menu-item::after),
  :deep(.ant-menu-sub-menu::after) {
    content: none;
  }
}

.header {
  display: flex;
  flex-flow: row nowrap;
  padding: 0 25px;
  background-color: @white;
  box-shadow: 0 2px 8px #f0f1f2;
}

.logo-wrapper {
  cursor: pointer;
  margin-right: 20px;
}

.logo {
  height: 40px;
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
  display: flex;
  flex-flow: row nowrap;
  width: 30px;
  cursor: pointer;
  justify-content: center;
  margin-left: 5px;
}
</style>
