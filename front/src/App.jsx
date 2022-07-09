import './App.css'
import { ChartPositions } from './components/ChartPositions'
import { TradingsterTable } from './components/TradingsterTable';
import { ColorPicker, useColor } from "react-color-palette";
import currencies from "../../files/2022-05-10.json";
import "react-color-palette/lib/css/styles.css";
import { useState } from 'react';
import CurrencySelect from './components/CurrencySelect';
import { Button } from 'antd';

const Layout = ({ nightMode, children }) => {
  return nightMode ? (
    <div className='dayTheme'>
      {children}
    </div>
  ) : (
    <div className='nightTheme'>
      {children}
    </div>
  )
}

const Navbar = ({ theme, setTheme, setCurrency }) => {
  const switchTheme = (theme) => {
    setTheme(!theme)
  }

  return (
    <div id="navbar" >
      <Button onClick={() => switchTheme(theme)} >{theme ? "Night Mode" : "Day Mode"}</Button>
      <CurrencySelect setCurrency={setCurrency} currenciesInfo={currencies} />
    </div>
  )
}

const App = () => {
  const [color, setColor] = useColor("hex", "#121212");
  const [currency, setCurrency] = useState(currencies[0]);
  const [currencyIndex, setCurrencyIndex] = useState(undefined);
  const [theme, setTheme] = useState(false)
  const [labelIndex, setLabelIndex] = useState(undefined);
  const [bgColors, setBgColors] = useState("");

  const saveColor = () => {
    let temporal = [...bgColors];
    let alpha = color.rgb.a;
    const minimunAlpha = 0.10;
    if (alpha === undefined) {
      alpha = 1;
    }
    if (alpha >= 0 && alpha < minimunAlpha) {
      alpha = minimunAlpha;
    }
    temporal[labelIndex] = ("rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + alpha + ")");

    setBgColors(temporal);
    localStorage.setItem("colors", JSON.stringify(temporal));
    setLabelIndex(undefined);
  }

  return (
    <Layout nightMode={theme} >
      <Navbar theme={theme} setTheme={setTheme} currency={currency} setCurrency={setCurrency} />
      <div className="App">
        <div id='leftSide'>
          {
            (labelIndex !== undefined) ?
              <>

                <h1 className='gridChild'>Color Picker</h1>
                <ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV alpha={true} dark />
                <button onClick={saveColor}>save</button>
              </>
              :
              <TradingsterTable currency={currency} />
          }
        </div>
        <div className='grid'>
          <div></div>
          <div id='rightSide'>
            <div id='barChart' style={{ height: "80vh" }}>
              <ChartPositions key={bgColors.toString()} bgColors={bgColors} setCurrencyIndex={setCurrencyIndex} setLabelIndex={setLabelIndex} currency={currency} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
