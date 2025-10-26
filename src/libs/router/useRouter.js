import { useState, useEffect } from "react";

export default function useRouter() {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return path;
}

export function navigate(href) {
  window.location.hash = href; // 会触发 hashchange 事件
}
