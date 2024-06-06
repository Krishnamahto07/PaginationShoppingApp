import { useEffect, useState } from 'react';
import './App.css';

export default function App() {

  const url = 'https://fakestoreapi.com/products';
  const [products , setProducts] = useState([]);
  const getAllProducts = async() => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log("Failed to Fetch API due to Error")
      console.log(error);
    }
    
  }

  const [page , setPage] = useState(1);

  useEffect(()=>{
    getAllProducts()
  },[])

  const pageHandle = (i) =>{
    setPage(i);
  }


  return (
    <div className='w-full h-full m-0 p-0 flex flex-col justify-center items-center  bg-gray-800'>
      <h1 className='font-semibold py-2 underline text-3xl my-3 text-white'>Pagination Practice</h1>
        <section className='flex flex-wrap gap-5 items-center justify-center'>
            {
              products.length > 0 && products.slice(page*5-5,page*5).map((product,i)=>{
                return <span id={i} className='flex flex-col object-fill bg-gray-300 md:w-[350px] w-[250px] h-[350px] rounded-md justify-center items-center my-auto mx-2 px-2'>
                    <img src={product.image} alt={product.title} width={150} height={100} 
                    className='my-2 mx-auto object-contain'/>
                    <p className=' font-semibold text-center'>{product.title}</p>
                    <div className='flex gap-x-3'>
                      <p><span className='text-yellow-500 font-bold text-xl mx-1'>$</span>{product.price}</p>
                      <p>⭐{product.rating.rate}</p>
                    </div>
                    <p className=' text-sm'>{product.category}</p>
                </span>
              })
            }
        </section>
        <footer className='w-full bg-slate-400 mt-5  flex  items-center justify-center'> 
          <button onClick={()=>setPage(page-1)}
          className={page > 1 ? ` text-xl`:` hidden`}>⬅️</button>
          {
            [...Array(products.length/5)].map((_,i)=>{
              return i > 0 && <span key={i} onClick={()=>pageHandle(i)}
              className={ i === page ? (` bg-slate-500 font-bold m-2 px-3 py-2 text-xl cursor-pointer `):(` m-2 p-3 text-xl cursor-pointer`)  }
              >{i}</span>
            })
          }
          <button onClick={()=>setPage(page+1)}
          className={page < products.length/5 ? `text-xl`:` hidden`}>➡️</button>
        </footer>
    </div>
  )
}