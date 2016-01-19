const listeners = [];
let lastPosition;
let lastTime;
let watchId;

function watchPosition() {
  watchId = navigator.geolocation.watchPosition(pos => {
    const time = Date.now();
    if (lastPosition && lastTime) {
      const speed = pos.coords.speed ? (pos.coords.speed * 3.6) : 0.0;
      listeners.forEach(listener => listener({
        timestamp: pos.timestamp,
        coords: pos.coords,
        error: null,
        speed,
      }));
    }
    lastPosition = pos;
    lastTime = time;
  }, error => {
    listeners.forEach(listener => listener({ error }));
  }, {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 5000,
  });
}

export function startTracking() {
  watchPosition();
}

export function stopTracking() {
  navigator.geolocation.clearWatch(watchId);
}

export function position() {
  return lastPosition || { coords: {} };
}

export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}
