import React from "react";
import { InputForm, Button } from "../../components";

const Login = () => {
  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm ">
      <h3 className="font-semibold text-2xl mb-3">Dang nhap</h3>
      <div className="w-full flex flex-col gap-5">
        <InputForm label={"SO DIEN THOAI"} />
        <InputForm label={"MAT KHAU"} />
        <Button
          text="Dang nhap"
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
        />
      </div>
      <div className="flex justify-between items-center" >
        <small className="text-[blue] hover:text-[red] cursor-pointer">Ban quen mat khau</small>
        <small className="text-[blue] hover:text-[red] cursor-pointer">Tao tai khoan moi</small>
      </div>
    </div>
  );
};

export default Login;
