import './scrollMenu.css'
import useDraggableScroll from 'use-draggable-scroll';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { getTemas } from '../../services/PostsService';

const ScrollMenu = ({handleTemas, handleReiniciarTemas}) =>{
    const ref = useRef(null);
    const { onMouseDown } = useDraggableScroll(ref,{direction: 'horizontal'});
    const [temasTotales,setTemasTotales] = useState()
  
    
    //Traer la peticion de temas por peticion aqui que facilita los filtros
    const enviarTema = (tema) =>{
      handleTemas(tema);
    }


    useEffect(() => {
      getTemas().then((res) => {
        setTemasTotales(res);
      });
  
    }, [])
    
    
    return (
      <div ref={ref} onMouseDown={onMouseDown} className="scroll-menu">
         {/* //Poner posible pipeline para nombres largos */}
        <div className="tema item" onClick={() => handleReiniciarTemas()}>Todo</div>
         {temasTotales ?
          temasTotales.map((tema) => (
            <div key={`${tema.id}`} className={`tema item${tema.id}`} onClick={() => enviarTema(tema)}>{tema.nombre}</div>
          ))
          :null}
      </div>
    );
}

export default ScrollMenu