export const formatTime = (seconds) => {
    const s = Math.max(0, seconds);
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}:${ss < 10 ? "0" : ""}${ss}`;
  };
  