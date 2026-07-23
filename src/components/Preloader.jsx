import { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    document.body.classList.add('preloading');

    const timer = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.classList.add('hidden');
      document.body.classList.remove('preloading');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="preloader" id="preloader" aria-label="Loading portfolio" role="status">
      <div className="preloader-orb preloader-orb-1"></div>
      <div className="preloader-orb preloader-orb-2"></div>
      <div className="preloader-content">
        <div className="preloader-ring">
          <span>{'</>'}</span>
        </div>
        <p>Loading Portfolio</p>
        <div className="preloader-bar" aria-hidden="true">
          <span></span>
        </div>
      </div>
    </div>
  );
}
