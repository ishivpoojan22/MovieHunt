 
import { useSelector } from "react-redux";
import lan from "../utils/languageConstant";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lan);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
        <input
          type="text"
          className="m-4 p-4 col-span-9 rounded-lg"
          placeholder={lan[langKey].gptSearchPlaceHolder}
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-800 text-white rounded-lg">
          {lan[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
