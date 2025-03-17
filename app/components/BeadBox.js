const BeadBox = ({
  id,
  imagePath,
  price,
  diameter
}) => {
  return(
    <div className="group relative block w-36 h-36 border-textDark/15 border-[1.5px] place-items-center place-content-center rounded-2xl text-center">
      {imagePath}
      <div className="hidden group-hover:flex bg-backgroundDark/50 absolute backdrop-blur-sm w-36 rounded-b-2xl bottom-0 justify-between items-center py-2 px-3 transition ease-in-out duration-1000">
        <div className="bg-backgroundDark p-2 w-fit rounded-md">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.6 1.40002C10.6 0.709669 10.0404 0.150024 9.35 0.150024C8.65964 0.150024 8.1 0.709668 8.1 1.40002V8.25002H1.25C0.559644 8.25002 0 8.80967 0 9.50002C0 10.1904 0.559644 10.75 1.25 10.75H8.1V17.6C8.1 18.2904 8.65964 18.85 9.35 18.85C10.0404 18.85 10.6 18.2904 10.6 17.6V10.75H17.45C18.1404 10.75 18.7 10.1904 18.7 9.50002C18.7 8.80967 18.1404 8.25002 17.45 8.25002H10.6V1.40002Z" fill="#789DBC"/>
          </svg>
        </div>
        <div className="text-sm text-textDark">
          <p>${price}</p>
          <p>{diameter} mm </p>
        </div>
      </div>
    </div>
  )
};

export default BeadBox;