import React from 'react';
import { useEffect, useState } from 'react'
import ReactHtmlParser from "react-html-parser";
import Stats from './stats'
import SideMenu from './side_bar'

export default function Example({ postData }) {
    const [enabled, setEnabled] = useState(false)
    const [html, sethtml] = useState('')
    const [intonation_dict, setIntonation_dict] = useState([])

    const options = {
        decodeEntities: true,
        transform
    };

    useEffect(() => {
        fetch('/start_tracking').then(res => res.json()).then(data => {
            console.log("")
        });
    }, []);

    function transform(node) {
        if (enabled) {
            if (node.type === "tag" && node.name === "b") {
                return (
                    <b
                        onMouseOver={() => play_sound("bold")}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</b>)
            }
            if (node.type === "tag" && node.name === "i") {

                return (
                    <i
                        onMouseOver={() => play_sound("italics")}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</i>)
            }
        }
        else {
            if (node.type === "tag" && node.attribs.class === "adjective" && node.name === "span") {
                return (
                    <span
                        className="text-red-300"
                        onMouseOver={() => play_sound(node.attribs.id)}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</span>)
            }
            if (node.type === "tag" && node.attribs.class === "noun" && node.name === "span") {
                return (
                    <span
                        className="text-pink-300"
                        onMouseOver={() => play_sound(node.attribs.id)}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</span>)
            }
            if (node.type === "tag" && node.attribs.class === "verb" && node.name === "span") {
                return (
                    <span
                        className="text-green-300"
                        onMouseOver={() => play_sound(node.attribs.id)}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</span>)
            }
            if (node.type === "tag" && node.attribs.class === "intonation" && node.name === "span") {
                let object = setIntonation(node.children[0].data)
                if (object !== undefined)
                    return (
                        <span>
                            {object.array.map((syl, index) =>
                                index === object.index ?
                                    <span
                                        className="text-green-600"
                                        onMouseOver={() => play_sound(node.attribs.id)}
                                        onMouseLeave={() => stop_sound()}
                                    >{syl}</span>
                                    :
                                    <span
                                        className="text-red-600"
                                    >{syl}</span>
                            )
                            }
                        </span >)
            }
        }

    }

    function setIntonation(word) {
        word = word.replace(/ /g, '')
        return (intonation_dict.find(element => element.word === word.toLowerCase()));
    }

    function play_sound(effect_type) {
        postData('/play', { value: (effect_type) })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }

    function stop_sound() {
        fetch('/stop_touching').then(res => res.json()).then(data => {
            console.log(data)
        });

    }

    return (
        <div className="grid grid-cols-4  mt-24 ">
            <SideMenu sethtml={sethtml} setIntonation_dict={setIntonation_dict} postData={postData} enabled={enabled} setEnabled={setEnabled} />
            <div className="h-96	mx-auto col-span-2">
                <Stats />
                <div className="ml-20 mt-10 text-6xl tracking-wide leading-loose h-196 overflow-scroll">
                    <div >{ReactHtmlParser(html, options)}</div>
                </div >
            </div >
            <div className="px-16 " />
        </div>
    )
}
