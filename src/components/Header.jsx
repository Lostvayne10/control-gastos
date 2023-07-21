import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

function Header({
    gastos,
    presupuesto, 
    setPresupuesto, 
    setGastos,
    isValidPresupuesto, 
    setIsValidPresupuesto 
}) {
  return (
    <header>
        <h1>
            Planificador de Gastos
        </h1>
        { !isValidPresupuesto ? 
            <NuevoPresupuesto 
              presupuesto={presupuesto} 
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
            />
            :
            
            <ControlPresupuesto 
              presupuesto={presupuesto}
              gastos={gastos}
              setGastos={setGastos}
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
            />
        }

    </header>
  )
}

export default Header