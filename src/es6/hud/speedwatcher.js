const listeners = [];
let lastPosition;
let lastTime;
let watchId;
let watching = false;

function watchPosition() {

  function fetchPos() {
    if (!watching) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const speed = pos.coords.speed ? (pos.coords.speed * 3.6) : 0.0;
      listeners.forEach(listener => listener({
        timestamp: pos.timestamp,
        coords: pos.coords,
        error: null,
        speed,
      }));
      setTimeout(fetchPos, 2000);
    }, error => {
      listeners.forEach(listener => listener({ error }));
      setTimeout(fetchPos, 2000);
    }, {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 1000,
    });
  }
  fetchPos();
}

export function startTracking() {
  watching = true;
  watchPosition();
}

export function stopTracking() {
  watching = false;
  // navigator.geolocation.clearWatch(watchId);
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
