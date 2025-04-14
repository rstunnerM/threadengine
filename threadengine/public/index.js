import {
    startDevFlow,
    applyGptSuggestion,
    copyGptSuggestion,
    clearGptSuggestion
  } from './promptFlow.js';
  
  import { initializeGoalDiscovery } from './goalDiscovery.js';
  import { runGptConsole } from './consoleRunner.js';
  import {
    openCodeDrawer,
    switchCodeTab,
    closeCodeDrawer,
    toggleDrawerPin,
    syncDrawerToEditor,
    applyDrawerToCanvas
  } from './codeDrawer.js';
  
  import { handleDebugSubmit } from './utils.js';
  
  window.startDevFlow = startDevFlow;
  window.applyGptSuggestion = applyGptSuggestion;
  window.copyGptSuggestion = copyGptSuggestion;
  window.clearGptSuggestion = clearGptSuggestion;
  window.runGptConsole = runGptConsole;
  window.openCodeDrawer = openCodeDrawer;
  window.switchCodeTab = switchCodeTab;
  window.closeCodeDrawer = closeCodeDrawer;
  window.toggleDrawerPin = toggleDrawerPin;
  window.syncDrawerToEditor = syncDrawerToEditor;
  window.applyDrawerToCanvas = applyDrawerToCanvas;
  window.handleDebugSubmit = handleDebugSubmit;
  
  document.addEventListener("DOMContentLoaded", () => {
    initializeGoalDiscovery();
  });
  