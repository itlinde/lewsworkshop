const Header = () => {
  return (
    <div className="flex justify-between items-center md:mb-8 text-primary">
      <div className="flex items-center gap-3">
        <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" d="M27.3232 10.8221C30.8499 10.4302 33.8725 8.25134 36.9797 11.3586C39.7899 14.1688 40.4664 18.7091 39.0063 22.5052C38.2821 24.3882 35.4499 25.0565 33.7907 25.575C32.1533 26.0866 30.5666 25.4225 32.8071 26.9161C35.5907 28.7718 37.1673 30.4901 38.5593 33.622C38.9948 34.602 40.4356 37.5306 39.1256 38.3012C35.3881 40.4997 31.5358 42.3945 27.8597 38.7185C26.2444 37.1032 25.175 35.3547 24.6707 33.0855C24.4341 32.0206 23.8461 29.928 22.495 31.2079C19.6662 33.8879 16.1477 38.7185 11.8849 38.7185C7.4867 38.7185 6.40097 34.7391 6.40097 30.9695C6.40097 29.1544 7.50497 28.4067 8.9641 27.4526C9.4135 27.1588 12.2149 26.4311 11.6464 26.3499C6.44159 25.6063 3.25495 23.0861 2.13902 18.0644C0.784857 11.9707 9.67249 10.4937 13.6433 12.6997C14.9753 13.4397 11.6008 10.7566 11.2292 10.1664C10.4784 8.97395 10.1562 6.60852 10.1562 5.18917C10.1562 1.68236 15.9044 2.23859 18.2331 2.23859C21.2476 2.23859 23.3576 2.39644 24.9091 5.18917C25.8381 6.86137 27.3232 10.5418 27.3232 12.4315" strokeWidth="3" strokeLinecap="round"/>
          <path stroke="currentColor" d="M21.9586 21.2764C19.8983 21.2764 20.0795 22.8858 22.2268 22.8858C23.2288 22.8858 23.0797 22.0958 23.0315 21.2764C22.9809 20.4155 21.4983 20.7399 20.8857 20.7399" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <h1 className="font-darumadrop text-primary text-xl md:text-3xl">Lew's Workshop</h1>
      </div>
      <button>
        <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 0.979187H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M1 8.89587H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M1 16.0209H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Header;
