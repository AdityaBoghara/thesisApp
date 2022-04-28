import { useEffect, useState } from 'react'
const effects = [
    {
        title: 'TEXT 1',
        source: 'bold',
        id: 0,
        current: false,
        text: "He didn't want to work at all and he built his house out of straw.The second little pig worked a little bit harder but he was somewhat lazy too and he build built his house out of sticks."
    },
    {
        title: 'TEXT 2',
        source: 'negative',
        id: 1,
        current: false,
        text: "NASA has discovered the eighth planet of a star system, similar to our solar system. The star, Kepler-90  is over 2,500 light years away and larger and hotter than our sun. It is the first star known to have as many planets as our solar system."
    },
]


export default function Example({ postData }) {

    const [text, setText] = useState("")

    useEffect(() => {
        fetch('/haptic_test').then(res => res.json()).then(data => {
            console.log("")
        });
    }, []);

    function handleClick(effect_type) {

    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="mx-auto px-96 ml-40 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-48 px-48 gap-x-24 gap-y-20">
                {effects.map((file) => (
                    <button
                        onClick={() => setText(file.text)}
                        key={file.title}
                        className={classNames(
                            file.current ? 'border-indigo-900 ' : 'border-gray-300',
                            'text-center relative rounded-lg border  bg-gray-50 p-12 shadow-sm  items-center  hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2'
                        )}
                    >
                        <p className=" text-3xl font-light text-gray-900">{file.title}</p>
                    </button>
                ))}
                <div className="col-span-2">
                    <div className="mt-10 text-6xl tracking-wide leading-loose h-196 overflow-scroll">
                        <div >{text}</div>
                    </div >
                </div >
            </div>
        </div>

    )
}

