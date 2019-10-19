import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

// Exposing history for deep integration needs
// For dashboard, saga and utilities
export { history };
