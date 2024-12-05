import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);
  const passwords = localStorage.getItem("passwords");
  useEffect(() => {
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      alert("Write something");
    } else {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );

      setForm({ site: "", username: "", password: "" });
    }
  };

  const deletePassword = (id) => {
    let con = confirm("Do you wnat to delete this password");
    if (con) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };
  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  let ref = useRef();
  let passwordRef = useRef();
  let copy = useRef();

  const showPassword = () => {
    if (ref.current.src.includes("src/assets/eye.png")) {
      ref.current.src = "src/assets/eyecross.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "src/assets/eye.png";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    copy.current.src = "src/assets/check.png";
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      copy.current.src = "src/assets/copy.png";
    }, 2000);
  };
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="container my-10 mx-auto  max-w-4xl px-3">
        <h1 className="font-bold text-center text-2xl">
          <span className="text-white">Pass</span>
          <span className="text-green-700">keeper</span>
        </h1>

        <p className="font-light text-center text-white">
          Your own password manager
        </p>
        <div className="flex flex-col gap-4 py-5 items-center">
          <input
            className="rounded-full border-2 bg-gray-600 border-black text-white px-4 py-1 w-full"
            value={form.site}
            name="site"
            onChange={handleChange}
            type="text"
            placeholder="Enter Your URL"
          />
          <div className="flex gap-6 w-full">
            <input
              className="rounded-full border-2 bg-gray-600 border-black text-white px-4 w-full"
              value={form.username}
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
            />

            <div className="relative w-full">
              <input
                ref={passwordRef}
                className="rounded-full border-2 bg-gray-600 border-black text-white px-4 py-1 w-full"
                value={form.password}
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={16}
                  src="src/assets/eyecross.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            className="mx-auto flex items-center gap-1 border-2 border-black px-3 rounded-full bg-green-400 font-semibold"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="my-10">
          <h1 className="text-green-500 font-extrabold">Saved Password</h1>
          {passwordArray.length === 0 ? (
            <div className="text-white">No password to show</div>
          ) : (
            <table className="table-auto bg-white w-full overflow-hidden rounded-lg border-2 ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2 border-2 border-gray-500">Site</th>
                  <th className="py-2 border-2 border-gray-500">Username</th>
                  <th className="py-2 border-2 border-gray-500">Password</th>
                  <th className="py-2 border-2 border-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-2 border-gray-100 py-2 text-center w-32">
                        <div className="flex items-center gap-2 justify-center">
                          {item.site}
                          <div
                            className="cursor-pointer"
                            title="copy"
                            onClick={() => copyText(item.site)}
                          >
                            <img
                              ref={copy}
                              width={12}
                              src="src/assets/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border-2 border-gray-100 py-2 text-center w-32">
                        <div className="flex items-center gap-2 justify-center">
                          {item.username}
                          <div
                            className="cursor-pointer"
                            title="copy"
                            onClick={() => copyText(item.username)}
                          >
                            <img width={12} src="src/assets/copy.png" alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="border-2 border-gray-100 py-2 text-center w-32">
                        <div className="flex items-center gap-2 justify-center">
                          {item.password}
                          <div
                            className="cursor-pointer"
                            title="copy"
                            onClick={() => copyText(item.password)}
                          >
                            <img width={12} src="src/assets/copy.png" alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="border-2 border-gray-100 py-2 text-center w-32">
                        <div className="flex gap-3 items-center justify-center">
                          <span
                            title="delete"
                            className="flex items-center justify-center gap-2  cursor-pointer "
                            onClick={() => deletePassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "16px", height: "16px" }}
                            ></lord-icon>
                          </span>

                          <span
                            title="edit"
                            className="flex items-center justify-center gap-2  cursor-pointer "
                            onClick={() => editPassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/jpgpblwn.json"
                              trigger="hover"
                              style={{ width: "16px", height: "16px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
