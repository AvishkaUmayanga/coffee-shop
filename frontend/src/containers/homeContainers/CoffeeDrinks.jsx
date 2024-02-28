import React, { useEffect, useState } from 'react'
import CoffeeGrid from './CoffeeGrid';
import CoffeeButtons from '../../components/CoffeeButtons';
import axios from 'axios';

export default function CoffeeDrinks() {
  const [activeBtn, setActiveBtn] = useState('Cappuccino')
  const [allCoffee, setAllCoffee] = useState(null)
  const [cappuccinoData, setCappuccinoData] = useState(null)
  const [macchiatoData, setMacchiatoData] = useState(null)
  const [latteData, setLatteData] = useState(null)
  
  useEffect(()=>{
    const getAllCoffee = async() =>{
      try{
        const response = await axios.get('http://localhost:4000/get_coffee')
        setAllCoffee(response.data.allCoffee)
      }
      catch(err){
        console.error(err.response.data);
      }
    }
    getAllCoffee()
  },[])

  useEffect(()=>{
    if(allCoffee){
      const filteredCappuccino = allCoffee.filter(cappuccino => cappuccino.coffeeCategory === 'Cappuccino')
      setCappuccinoData(filteredCappuccino)
      const filteredMacchiato = allCoffee.filter(macchiato => macchiato.coffeeCategory === 'Macchiato')
      setMacchiatoData(filteredMacchiato)
      const filteredLatte = allCoffee.filter(latte => latte.coffeeCategory === 'Latte')
      setLatteData(filteredLatte)
      
    }
  },[allCoffee])
  
  return (
    <div className='flex flex-col gap-8 px-5 '>
      <div className='flex justify-between '>
        <CoffeeButtons btnText='Cappuccino' onClick={()=> setActiveBtn('Cappuccino')} isActive={activeBtn === 'Cappuccino'} />
        <CoffeeButtons btnText='Macchiato' onClick={()=> setActiveBtn('Macchiato')} isActive={activeBtn === 'Macchiato'} />
        <CoffeeButtons btnText='Latte' onClick={()=> setActiveBtn('Latte')} isActive={activeBtn === 'Latte'} />
      </div>
      { activeBtn === 'Cappuccino' && <CoffeeGrid coffeeData={cappuccinoData}/>}
      { activeBtn === 'Macchiato' && <CoffeeGrid coffeeData={macchiatoData} />}
      { activeBtn === 'Latte' && <CoffeeGrid coffeeData={latteData}/>}
    </div>
  )
}
