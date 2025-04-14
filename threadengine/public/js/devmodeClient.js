// devmodeClient.js — ThreadEngine frontend DevMode logic

import {
    startDevFlow,
    applyGptSuggestion,
    copyGptSuggestion,
    clearGptSuggestion
  } from '../promptFlow.js';
  
  import { initializeGoalDiscovery } from './goalDiscovery.js';
  import { runGptConsole } from '../consoleRunner.js';
  import {
    openCodeDrawer,
    switchCodeTab,
    closeCodeDrawer,
    toggleDrawerPin,
    syncDrawerToEditor,
    applyDrawerToCanvas
  } from '../codeDrawer.js';
  
  import {
    loadProjectContext,
    handleDebugSubmit
  } from '../utils.js';
  
  import { queryNexuCore } from '../nexuCoreBridge.js';
  
  window.startDevFlow = startDevFlow;
  window.applyGptSuggestion = applyGptSuggestion;
  window.copyGptSuggestion = copyGptSuggestion;
  window.clearGptSuggestion = clearGptSuggestion;
  
  window.initializeGoalDiscovery = initializeGoalDiscovery;
  window.runGptConsole = runGptConsole;
  
  window.openCodeDrawer = openCodeDrawer;
  window.switchCodeTab = switchCodeTab;
  window.closeCodeDrawer = closeCodeDrawer;
  window.toggleDrawerPin = toggleDrawerPin;
  window.syncDrawerToEditor = syncDrawerToEditor;
  window.applyDrawerToCanvas = applyDrawerToCanvas;
  
  window.loadProjectContext = loadProjectContext;
  window.queryNexuCore = queryNexuCore;
  window.handleDebugSubmit = handleDebugSubmit;
  
  // 🧠 Auto-initialize listeners
  initializeGoalDiscovery();
  
  // === DevMode: Save session via frontend ===
  window.saveSession = async () => {
    const session = {
      code: code.value,
      debugged: debugged.value,
      explanation: explanation.value,
      refactored: refactored.value,
      goal: refactorGoal.value,
      timestamp: new Date().toISOString()
    };
  
    const res = await fetch("/devmode/save-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session)
    });
  
    const result = await res.json();
    alert(result.message + "\nDownload: " + result.downloadUrl);
  };
  