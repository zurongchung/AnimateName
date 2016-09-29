/*---------------------------------------------------------
  When we are in design section. we usually make mistakes
  Histroy function provides us a easy way to jump back to
  previous state one step at a time.

---------------------------------------------------------*/
var History = {
  pointCollector: [],
  pointCollectorWithoutRemoved: [],
};
History.saveState = function(_state) {
  History.pointCollector = _state;
};
History.saveStateWithoutRemoved = function (_state) {
  History.pointCollectorWithoutRemoved = _state;
};
History.clearSavedState = function() {
  pointCollector = [];
};
History.clearSavedStateWithoutRemoved = function() {
  pointCollectorWithoutRemoved = [];
};
