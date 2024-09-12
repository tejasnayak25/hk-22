import { RefObject } from "react";

interface Item {
    type: string;
    id?: string;
    label: string;
    ref?: RefObject<HTMLInputElement>;
    placeholder?: string;
    href?: string;
    inp_type?: string;
    onClick?: Function;
    disabled?: boolean;
}


export default function Form({ items } : { items: Array<Item> }) {
//   const [inputs, setInputs] = useState({});

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs(values => ({...values, [name]: value}))
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(inputs);
//   }

    function inputs() {
        let arr = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            if(element.type === "input") {
                arr.push(
                    <div key={element.id} className="relative mb-4 flex flex-col z-10">
                        <label htmlFor={element.id} className="leading-7 text-xs text-[#00bcae] bg-[#003a35] p-1 pb-0 m-0 ml-3 w-fit relative z-[9]">{element.label}</label>
                        <input
                            ref={element.ref}
                            type={element.inp_type}
                            id={element.id}
                            name={element.id}
                            placeholder={element.placeholder}
                            readOnly={element.disabled ? true : false} // Set readOnly conditionally
                            className="placeholder:text-[#057775] read-only:text-slate-400 -mt-3 input input-bordered bg-transparent border-2 border-solid border-[#00bcae] relative z-[8]"
                        />
                    </div>
                );
            } else if(element.type === "button") {
                arr.push(
                    <div key={element.id} className="relative mb-4 flex flex-col z-10">
                        <button onClick={() => {
                            if(element.onClick) {
                                element.onClick();
                            }
                        }} className=' w-full btn border-0 rounded-full bg-[#00bcae] text-white hover:bg-[#00bcafc9]'>{element.label}</button>
                    </div>
                );
            } else if(element.type === "link") {
                arr.push(
                    <div key={element.id} className="relative mb-4 flex flex-col z-10">
                        <a className="text-base w-full text-right -mt-2 text-gray-400 hover:underline" href={element.href}>{element.label}</a>
                    </div>
                );
            }
        }
        return arr;
    }

  return (
    <>
    {inputs()}
    </>
  )
}