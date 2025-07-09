import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook returns a mutable ref object
  //.current property
  //returned object persists for the lifetime of the component
  const passwordRef = useRef(null);

  //useCallback is a hook that lets us cache a function definition
  //between callbacks
  //useCallBack(fn,dependencies) (memoization)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl px-6 py-10 my-16 bg-white shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 tracking-tight font-sans">
        PassWiz
      </h1>
      <h2 className="text-lg font-mono text-gray-500 text-center mb-8">
        Password Generator
      </h2>
      <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden mb-8 bg-gray-50 border border-gray-100">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-4 px-4 text-lg bg-transparent font-mono tracking-widest text-gray-700"
          placeholder="Your secure password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="transition-all duration-150 outline-none bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 text-base font-medium rounded-none rounded-b-xl sm:rounded-b-none sm:rounded-r-xl"
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col sm:flex-row text-base gap-y-6 gap-x-10 items-center justify-between">
        <div className="flex items-center gap-x-4 w-full sm:w-auto">
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            className="cursor-pointer accent-gray-700 w-full sm:w-48"
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <label className="font-medium text-gray-600">
            Length: <span className="font-bold text-gray-800">{length}</span>
          </label>
        </div>
        <div className="flex items-center gap-x-2 w-full sm:w-auto">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            className="accent-gray-700 w-5 h-5"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="font-medium text-gray-600">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-2 w-full sm:w-auto">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            className="accent-gray-700 w-5 h-5"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput" className="font-medium text-gray-600">
            Special
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
