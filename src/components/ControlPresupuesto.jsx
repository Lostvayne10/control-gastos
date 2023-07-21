import {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"

 function ControlPresupuesto
({
    presupuesto,
    gastos,
    setGastos,
    setPresupuesto,
    setIsValidPresupuesto
}) {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0)
    
    useEffect(()=>{
        setGastado(0)
        setDisponible(0)
    }, [])
    useEffect(()=>{

        const TotalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0 )
        const TotalDisponible = presupuesto-TotalGastado;
        const nuevoPorcentaje = (( (TotalGastado) / presupuesto ) * 100).toFixed(2);

        setGastado(TotalGastado)
        setDisponible(TotalDisponible)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);

    },[gastos])

    const handleResetApp = () => {
        const resultado = confirm("¿Deseas reiniciar presupuesto y gatos?");
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                    value={porcentaje}
                    styles={
                        buildStyles({
                            pathColor: porcentaje > 100 ?'#DC2626':'#3B82F6',
                            trailColor: '#F5F5F5',
                            textColor: porcentaje > 100 ?'#DC2626':'#3B82F6'
                        })
                    }
                    text={`${porcentaje}% Gastado`}
                    >
                    </CircularProgressbar>
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type="button" onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>

    </div>
  )
}

 export default ControlPresupuesto
