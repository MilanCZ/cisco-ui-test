import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

// Exposing history for deep integration needs
// For home, saga and utilities
export { history };
