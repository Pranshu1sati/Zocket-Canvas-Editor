import "./App.css";
import ImageUpload from "./Components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { setCaptionText, setCtaText } from "./redux/slice";
import ColorPicker from "./Components/ColorPicker";
import Canvas from "./Components/Canvas";

function App() {
  const dispatch = useDispatch();
  const caption = useSelector((state) => state.data.caption.text);
  const cta = useSelector((state) => state.data.cta.text);
  // console.log(caption);
  return (
    <div className="mx-auto px-20 w-full lg:grid grid-cols-5 ">
      <div className="col-span-2 py-20 my-10">
        <Canvas />
      </div>
      <div className="w-full col-span-3 my-10 grid font-poppins">
        <div className="pt-10">
          <h3 className="w-full font-poppins font-bold text-lg text-center subpixel-antialiased">
            Ad Customization
          </h3>
          <p className="text-gray-400 pd-4 text-center mb-8">
            Customise your ad and get the templates accordingly
          </p>

          <div className="border rounded-xl mx-24 p-3">
            <ImageUpload />
          </div>
          <div className="mx-24 mt-8">
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-6 text-gray-400">Edit contents</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            <div className="border rounded-xl px-4 p-1 mt-8">
              <p className="text-xs mt-0 text-gray-400">Ad Content</p>
              <input
                type="text"
                className="w-full block outline-none font-bold"
                placeholder={"Buy More"}
                value={caption}
                onChange={(event) =>
                  dispatch(setCaptionText(event.target.value))
                }
              />
            </div>
            <div className="border rounded-xl px-4 p-1 mt-8">
              <p className="text-xs mt-0 text-gray-400">CTA</p>
              <input
                type="text"
                className="w-full block outline-none font-bold"
                placeholder="Add to Cart"
                value={cta}
                onChange={(event) => dispatch(setCtaText(event.target.value))}
              />
            </div>

            <div className="mt-2">
              <ColorPicker />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
