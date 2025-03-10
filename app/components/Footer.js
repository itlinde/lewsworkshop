const Footer = () => {
  return (
    <div className="flex bg-primary mt-20">
      <div className="w-full h-[240px] flex justify-around text-background px-20">
        <div className="w-full h-[240px] flex flex-col justify-around">
          <h2 className="font-darumadrop text-2xl">lewswork.shop</h2>
          <a href="https://www.instagram.com/lewsworkshop/" target="_blank">
            <button className="flex space-x-3 font-inclusiveSans text-base">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FEF9F2"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.34652 0.075C8.67986 0.0138863 9.10486 0 12.5 0C15.8958 0 16.3201 0.0145795 17.6527 0.075C18.984 0.13542 19.8931 0.347227 20.6882 0.65625C21.5222 0.970239 22.2776 1.4622 22.902 2.09792C23.5378 2.72227 24.0299 3.4778 24.3438 4.31181C24.6527 5.10694 24.8639 6.01598 24.925 7.34652C24.9861 8.67986 25 9.10486 25 12.5C25 15.8951 24.9855 16.3201 24.925 17.6535C24.8645 18.984 24.6527 19.8931 24.3438 20.6882C24.0243 21.5098 23.5965 22.2076 22.902 22.902C22.2777 23.5378 21.5222 24.0299 20.6882 24.3438C19.8931 24.6527 18.984 24.8639 17.6535 24.925C16.3201 24.9861 15.8951 25 12.5 25C9.10486 25 8.67986 24.9855 7.34652 24.925C6.01598 24.8645 5.10694 24.6527 4.31181 24.3438C3.49027 24.0243 2.79236 23.5965 2.09792 22.902C1.46209 22.2777 0.970091 21.5222 0.65625 20.6882C0.347227 19.8931 0.136114 18.984 0.075 17.6535C0.0138863 16.3201 0 15.8958 0 12.5C0 9.10417 0.0145795 8.67986 0.075 7.34723C0.13542 6.01598 0.347227 5.10694 0.65625 4.31181C0.970239 3.47785 1.4622 2.72236 2.09792 2.09792C2.72226 1.46209 3.47778 0.970091 4.31181 0.65625C5.10694 0.347227 6.01598 0.136114 7.34652 0.075ZM17.5514 2.325C16.2333 2.26527 15.8375 2.25208 12.5 2.25208C9.1625 2.25208 8.76667 2.26527 7.44861 2.325C6.22986 2.38056 5.56806 2.58402 5.12777 2.75556C4.54444 2.98194 4.12777 3.25277 3.69027 3.69027C3.25348 4.12777 2.98194 4.54444 2.75556 5.12777C2.58402 5.56806 2.38056 6.22986 2.325 7.44861C2.26527 8.76667 2.25208 9.1625 2.25208 12.5C2.25208 15.8375 2.26527 16.2333 2.325 17.5514C2.38056 18.7701 2.58402 19.4319 2.75556 19.8723C2.95581 20.4152 3.27522 20.9064 3.69027 21.3098C4.09357 21.7248 4.58478 22.0442 5.12777 22.2444C5.56806 22.416 6.22986 22.6194 7.44861 22.675C8.76667 22.7348 9.16181 22.748 12.5 22.748C15.8382 22.748 16.2333 22.7348 17.5514 22.675C18.7701 22.6194 19.4319 22.416 19.8723 22.2444C20.4556 22.0181 20.8723 21.7473 21.3098 21.3098C21.7248 20.9065 22.0442 20.4152 22.2444 19.8723C22.416 19.4319 22.6194 18.7701 22.675 17.5514C22.7348 16.2333 22.748 15.8375 22.748 12.5C22.748 9.1625 22.7348 8.76667 22.675 7.44861C22.6194 6.22986 22.416 5.56806 22.2444 5.12777C22.0181 4.54444 21.7473 4.12777 21.3098 3.69027C20.8723 3.25348 20.4556 2.98194 19.8723 2.75556C19.4319 2.58402 18.7701 2.38056 17.5514 2.325ZM10.904 16.3533C11.41 16.563 11.9523 16.6708 12.5 16.6708C13.6062 16.6708 14.667 16.2314 15.4492 15.4492C16.2315 14.667 16.6709 13.6061 16.6709 12.5C16.6709 11.3939 16.2315 10.333 15.4492 9.55077C14.667 8.76859 13.6062 8.32916 12.5 8.32916C11.9523 8.32916 11.41 8.43705 10.904 8.64665C10.3978 8.85625 9.9381 9.16347 9.55081 9.55077C9.16351 9.93807 8.85628 10.3978 8.64668 10.9039C8.43708 11.4099 8.32921 11.9523 8.32921 12.5C8.32921 13.0477 8.43708 13.5901 8.64668 14.0961C8.85628 14.6022 9.16351 15.0619 9.55081 15.4492C9.9381 15.8365 10.3978 16.1437 10.904 16.3533ZM7.95688 7.95683C9.1618 6.75191 10.796 6.07499 12.5 6.07499C14.2041 6.07499 15.8383 6.75191 17.0432 7.95683C18.2481 9.16175 18.925 10.796 18.925 12.5C18.925 14.204 18.2481 15.8382 17.0432 17.0432C15.8383 18.2481 14.2041 18.925 12.5 18.925C10.796 18.925 9.1618 18.2481 7.95688 17.0432C6.75195 15.8382 6.07503 14.204 6.07503 12.5C6.07503 10.796 6.75195 9.16175 7.95688 7.95683ZM20.3497 7.03225C20.6344 6.74742 20.7944 6.36112 20.7944 5.95833C20.7944 5.55552 20.6344 5.16923 20.3497 4.88441C20.0648 4.59959 19.6785 4.43958 19.2757 4.43958C18.873 4.43958 18.4866 4.59959 18.2018 4.88441C17.9169 5.16923 17.7569 5.55552 17.7569 5.95833C17.7569 6.36112 17.9169 6.74742 18.2018 7.03225C18.4866 7.31707 18.873 7.47708 19.2757 7.47708C19.6785 7.47708 20.0648 7.31707 20.3497 7.03225Z"
                />
              </svg>
              <p>@lewsworkshop</p>
            </button>
          </a>
          <a href="mailto:lewsworkshop@gmail.com">
            <button className="flex space-x-3 font-inclusiveSans text-base mt-2">
              <svg
                width="25"
                height="23"
                viewBox="0 0 29 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 2.125H24.5C25.875 2.125 27 3.17969 27 4.46875V18.5312C27 19.8203 25.875 20.875 24.5 20.875H4.5C3.125 20.875 2 19.8203 2 18.5312V4.46875C2 3.17969 3.125 2.125 4.5 2.125Z"
                  stroke="#FEF9F2"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27 4.46887L14.5 12.672L2 4.46887"
                  stroke="#FEF9F2"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>lewsworkshop@gmail.com</p>
            </button>
          </a>
        </div>
      </div>
      <div className="opacity-20 relative h-[240px] w-full overflow-hidden">
        <svg
          className="absolute -right-20 -top-12"
          width="451"
          height="321"
          viewBox="0 0 451 321"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M110.886 187.919C98.3164 164.013 70.5889 149.558 91.2743 117.191C109.983 87.918 150.03 68.2217 188.663 66.2218C207.826 65.2298 221.173 83.2713 230.161 93.4246C239.03 103.444 236.953 116.952 244.999 96.0585C254.994 70.1014 266.793 53.2144 292.065 33.0187C299.973 26.6994 323.252 6.82046 333.671 13.6545C363.396 33.1517 390.62 54.4632 366.147 92.7554C355.394 109.581 342.028 122.944 322.435 133.975C313.24 139.152 295.484 150.203 310.693 155.662C342.538 167.094 395.919 176.409 406.756 206.857C417.936 238.271 384.089 259.054 349.411 271.396C332.714 277.338 323.029 271.901 310.543 264.603C306.698 262.355 292.882 244.728 293.58 249.054C299.971 288.664 284.887 319.676 241.529 344.088C188.913 373.711 152.734 315.066 162.934 279.482C166.355 267.545 150.25 300.432 145.766 305.019C136.705 314.286 115.763 324.331 102.706 328.978C70.4465 340.459 60.9515 297.581 55.0319 280.949C47.3691 259.417 43.4573 243.829 65.2043 223.604C78.2257 211.494 108.308 188.837 125.691 182.65"
            stroke="#FEF9F2"
            strokeWidth="22.5443"
            strokeLinecap="round"
          />
          <path
            d="M220.694 192.01C225.931 206.725 240.276 200.162 234.817 184.825C232.27 177.668 225.382 181.319 217.967 184.346C210.176 187.526 216.929 197.053 218.486 201.43"
            stroke="#FEF9F2"
            strokeWidth="22.5443"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Footer;
