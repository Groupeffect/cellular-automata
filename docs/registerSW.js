if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/cellular-automata/sw.js', { scope: '/cellular-automata/' })})}