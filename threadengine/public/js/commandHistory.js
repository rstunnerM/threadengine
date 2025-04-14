let commandHistory = [];
let currentCommandIndex = -1;

export function addCommandToHistory(command) {
  if (command && command.trim() !== "") {
    commandHistory.push(command);
    currentCommandIndex = commandHistory.length - 1;
  }
}

export function getPreviousCommand() {
  if (currentCommandIndex > 0) {
    currentCommandIndex--;
    return commandHistory[currentCommandIndex];
  }
  return "";
}

export function getNextCommand() {
  if (currentCommandIndex < commandHistory.length - 1) {
    currentCommandIndex++;
    return commandHistory[currentCommandIndex];
  }
  return "";
}

export function clearCommandHistory() {
  commandHistory = [];
  currentCommandIndex = -1;
}
