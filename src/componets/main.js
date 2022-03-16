/* This example requires Tailwind CSS v2.0+ */
import Buttons from './buttons'
import Text from './sentence_level'
import Word from './word_level'
import { useEffect, useState } from 'react'

export default function Example() {

    const [object, setObject] = useState('')
    const [html, sethtml] = useState('')
    const [level, setLevel] = useState('')


    useEffect(() => {
        fetch('/process_text').then(res => res.json()).then(data => {
            console.log(data)
            sethtml(data.object)
            //setWords(data.words.slice(0, 530))
            //setIndexeses(data.indexes)
            //setEffects(data.effects);
        });
    }, []);





    return (
        <div className="w-2/4 h-96		mx-auto mt-36 ">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                    onClick={() => setLevel("word")}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    Word level
                </button>
                <button
                    onClick={() => setLevel("sentence")}
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    Sentence level
             </button>
            </span>
            {level === "word" ?
                <Word object={object} />
                :
                <Text object={object} />
            }
        </div >
    )
}
