import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'

import { InputForm, Button } from "../../components";

import * as actions from "../../store/actions";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const location = useLocation();
  const [isRegister, setRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    msg && Swal.fire('Oop!', msg, 'error')
  },[msg, update])

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Vui long khong bo trong truong nay",
          },
        ]);
        invalids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mat khau phai lon hon 6 ki tu",
              },
            ]);
            invalids++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "So dien thoai khong hop le",
              },
            ]);
            invalids++;
          }
          break;

        default:
          break;
      }
    });
    return invalids;
  };

  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm ">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Dang ky tai khoan" : "Dang nhap"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"HO TEN"}
            value={payload.name}
            setValue={setPayload}
            keyPayload={"name"}
          />
        )}
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"SO DIEN THOAI"}
          value={payload.phone}
          setValue={setPayload}
          keyPayload={"phone"}
        />
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"MAT KHAU"}
          value={payload.password}
          setValue={setPayload}
          keyPayload={"password"}
          type='password'
        />
        <Button
          text={isRegister ? "Dang ky" : "Dang nhap"}
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      <div className="flex justify-between items-center">
        {isRegister ? (
          <small>
            ban da co tai khoan?
            <span
              className="text-blue-500 hover:underline ml-2 cursor-pointer"
              onClick={() => {
                setRegister(false);
                setPayload({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
            >
              Dang nhap ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Ban quen mat khau
            </small>
            <small
              onClick={() => {
                setRegister(true);
                setPayload({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
              className="text-[blue] hover:text-[red] cursor-pointer"
            >
              Tao tai khoan moi
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
