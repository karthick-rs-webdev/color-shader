import React from 'react'
import "../custom.css"
import { useState, useEffect, useCallback } from 'react';
import { SERP_KEY } from '../constants'
import sortColorsByHue from 'sort-colors-js';
import loadash from "lodash";


function ShadeGenerator() {
    const [dynamicColors, setDynamicColors] = useState("Enter Color Input in Search Box");
    const [imageValue, setImageValue] = useState("");

    useEffect(() => {
        if (imageValue) {
            const img = new Image();
            img.onload = function () {
                console.log("imageValue", imageValue);
                var hexValues = hexArray(img);
                if (hexValues.length > 0) {
                    setDynamicColors("");
                    let colorContent = "";
                    sortColorsByHue(hexValues).forEach(hex => {
                        let colorCard = `<div style="background-color: ${hex}" class="colorCard"><p>${hex}</p></div>`;
                        colorContent = colorContent + colorCard;
                    });
                    setDynamicColors(colorContent);
                }
                else {
                    setDynamicColors("Could Not Fetch Color Card");
                }
            }
            img.src = imageValue;
            img.crossOrigin = 'anonymous';
        }
    }, [imageValue]);

    function hexArray(imgEl) {
        var blockSize = 5,
            defaultRGB = { r: 0, g: 0, b: 0 },
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = { r: 0, g: 0, b: 0 },
            count = 0;
        if (!context) {
            return defaultRGB;
        }
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        context.drawImage(imgEl, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch (e) {
            /* security error, img on diff domain */
            setDynamicColors("Security Error Occurs.See Console");
            console.log("security error", e);
            return defaultRGB;
        }

        length = data.data.length;

        while ((i += blockSize * 4) < length) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        var resultArray = [];
        for (let i = 0; i < 10; i++) {
            var p = 0, temp, random = Math.random(), result = '#', rgbValue = [rgb.r, rgb.g, rgb.b];
            while (p < 3) {
                temp = rgbValue[p];
                temp = temp + Math.floor((255 - temp) * random);
                result = result + temp.toString(16).padStart(2, '0');
                p++;
            }
            resultArray = [...resultArray, result];
        }
        return resultArray;
    }

    function fetchDynamicColor(value) {
        if (value.length == 0) {
            setDynamicColors("Enter Color Input in Search Box");
        }
        else if (value.length >= 3) {
            if (SERP_KEY) {
                setDynamicColors("Getting Color...");
                fetchImage(value);
            }
            else alert("SERP API Key Not Found");
        }
        else {
            setDynamicColors("Keep Typing...");
        }
    }

    const getData = (enteredText) => {
        let url = `https://serpapi.com/search.json?q=${enteredText} color&tbm=isch&safe=active&num=10&api_key=` + SERP_KEY;
        enteredText.length >=3 && fetch(url, {
            "Access-Control-Allow-Origin": "http://localhost:3000/",
            method: 'GET',
        })
            .then(response => response.json())
            .then(results => results.suggested_searches[0])
            .then(image => setImageValue(image['thumbnail']))
            .catch(err => console.log(err));
        // setImageValue("https://serpapi.com/searches/61e150fc3944b00cf20e9700/images/d37041f5a21dcc1f740bfeb770ae7c7457ce3daf135b9dbc40d1d344a974175d.jpeg");
    }
    const fetchImage = useCallback(loadash.debounce(q => getData(q), 500), []);
    return (
        <div className="colorContainer">
            <div className="searchContainer">
                <h2>Color Shade Generator</h2>
                <input type="text" className="searchInput" placeholder="Search Color" onInput={e => fetchDynamicColor(e.target.value)} />
            </div>
            <div className="resultContainer" dangerouslySetInnerHTML={{ __html: dynamicColors }}>
            </div>
        </div>
    )
}

export default ShadeGenerator
