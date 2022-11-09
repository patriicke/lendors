import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { BiEdit, BiUpload } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { useSelector } from "react-redux";
import { addCar, uploadImage } from "../../hooks";
import { IUser } from "../../types/userTypes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCarRedux } from "../../redux/slices/carsSlice";

const AddCarComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const userSlice = useSelector((state: any) => state?.userSlice);
  const user: IUser = userSlice.user;
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Add New Car | Lendors";
  }, []);
  const [carInfo, setCarInfo] = useState<any>({
    name: "",
    imageStr: "",
    brand: "",
    isUrl: false,
    description: "",
    price: "",
    currency: ""
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!carInfo.imageStr) return;
      const url = await uploadImage(carInfo.imageStr);
      const response = await addCar(
        `${user.token}`,
        carInfo.name,
        carInfo.price,
        carInfo.brand,
        carInfo.currency,
        await url,
        carInfo.description,
        toast,
        dispatch,
        addCarRedux
      );
      if (response) {
        setCarInfo({
          name: "",
          imageStr: "",
          brand: "",
          isUrl: false,
          description: "",
          price: "",
          currency: ""
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const previewFile = () => {
    const input: any = document.querySelector("#carImage");
    const file = input.files[0];
    const reader = new FileReader();

    reader.addEventListener("loadend", () => {
      setCarInfo({ ...carInfo, imageStr: reader.result });
    });
    reader.readAsDataURL(file);
  };
  const onDrop = (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        setCarInfo({ ...carInfo, imageStr: reader.result });
      });
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };
  return (
    <div className="w-screen flex items-center justify-center flex-col">
      <div className="form mt-2 w-full h-fit flex flex-col px-4 md:px-12">
        <div className="md:p-6 shadow-xl w-full xl:w-4/5 rounded-lg h-fit flex flex-col md:flex-row items-center justify-center">
          <div className="w-1/2 flex h-fit flex-col">
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit}
            >
              <input
                onChange={(e) => {
                  setCarInfo({ ...carInfo, name: e.target.value });
                }}
                className="my-2 h-12 font-poppins border-2 outline-none border-drive-blue p-2 rounded w-full"
                type="text"
                value={carInfo.name}
                placeholder="Car Name"
              />
              <input
                onChange={(e) => {
                  setCarInfo({ ...carInfo, brand: e.target.value });
                }}
                value={carInfo.brand}
                className="my-2 h-12 font-poppins border-2 outline-none border-drive-blue p-2 rounded w-full"
                type="text"
                placeholder="Car Brand"
              />

              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCarInfo({ ...carInfo, price: e.target.value });
                }}
                value={carInfo.price}
                className="my-2 h-12 font-poppins border-2 outline-none border-drive-blue p-2 rounded w-full"
                type="number"
                placeholder="Price"
              />
              <input
                onChange={(e) => {
                  setCarInfo({ ...carInfo, currency: e.target.value });
                }}
                value={carInfo.currency}
                className="my-2 h-12 font-poppins border-2 outline-none border-drive-blue p-2 rounded w-full"
                type="text"
                placeholder="Currency"
              />

              <textarea
                name=""
                id=""
                cols={20}
                rows={6}
                value={carInfo.description}
                onChange={(e) => {
                  setCarInfo({ ...carInfo, description: e.target.value });
                }}
                placeholder="Description"
                className="font-poppins p-2 box-border w-full resize-none border-2 my-2 rounded border-drive-blue"
              ></textarea>
              <div className="w-full">
                <button
                  type="submit"
                  className="hover:animate-ring bg-redish rounded disabled:bg-gray-500 w-1/4 py-3 text-white cursor-pointer font-poppins mt-4"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Add Car"}
                </button>
              </div>
            </form>
          </div>
          <div className="p-4 w-1/2 h-[28rem] flex items-center justify-center">
            {carInfo.imageStr ? (
              <div className="w-full h-full border-4 border-dashed rounded-xl border-slate-500 flex items-center justify-center">
                <div className="w-4/5 h-4/5 rounded relative flex items-center justify-center">
                  <img
                    src={carInfo.imageStr}
                    alt="Uploaded Image"
                    className="rounded w-full h-full object-cover"
                  />
                  <div className="absolute right-2 top-2 flex items-center justify-center">
                    <label
                      title="Change Image"
                      htmlFor="carImage"
                      className=" cursor-pointer mx-2 bg-drive-blue p-2 rounded-full text-white"
                    >
                      <BiEdit />
                    </label>
                    <button
                      title="Remove Image"
                      onClick={() => {
                        setCarInfo((cur: any) => {
                          return { ...cur, imageStr: "" };
                        });
                      }}
                      className="text-white  bg-drive-blue rounded-full p-2 mx-2"
                    >
                      <BsX />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Dropzone
                accept={{ "image/*": [] }}
                onDrop={onDrop}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <label
                    {...getRootProps({ className: "dropzone" })}
                    htmlFor="carImage"
                    className="border-4 border-dashed rounded-xl border-slate-500 w-full h-full flex items-center justify-center"
                  >
                    <div className="text-slate-500 flex flex-col items-center justify-center">
                      <BiUpload className="text-3xl" />
                      <input
                        {...getInputProps()}
                        type="file"
                        name="car-image"
                        id="carImage"
                        className="hidden"
                        onChange={previewFile}
                      />
                      <span className="font-light font-poppins text-black">
                        Drag Image here or Click to upload
                      </span>
                    </div>
                  </label>
                )}
              </Dropzone>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarComponent;
